/**
 * @author zy
 * @date 2020/5/4
 * @Description: 对文章按照年份来绘制时间轴
 */
import React, {Fragment} from 'react';
import {useSelector} from 'react-redux';
import {ARCHIVES_PAGESIZE} from '@/utils/config';
import useFetchList from '@/hooks/use_fetch_list';
import {getArticleList} from '@/service/article';
import {getArticleRoute} from '@/routes/web';
import {groupBy} from '@/utils';
import {Timeline, Spin} from 'antd';
import {Link} from 'react-router-dom';
import Pagination from '@/components/pagination';
import {ClockCircleOutlined} from '@ant-design/icons';
import _ from 'lodash';
import styles from './styles.scss';

const ArchiveByYear = props => {
    //获取搜索条件
    const keyword = useSelector(state => state.article.keyword);

    //根据文章发表时间分页文章
    const {loading, pagination, dataList: articleList} = useFetchList({
        requestService: getArticleList,
        params: {pageSize: ARCHIVES_PAGESIZE, search: keyword},
        fetchDependence: [keyword]
    });

    //对文章按章创建年份进行分组
    const articleListGroup = groupBy(articleList, item => item.createdAt.slice(0, 4));

    return (
        <Spin tip='Loading...' spinning={loading} delay={500}>
            <div id='app-archives' className={styles.appArchives}>
                <Timeline className={styles.timeline}>
                    {_.map(articleListGroup, (articleList, index) => (
                        <Fragment key={index}>
                            {/* first */}
                            {index === 0 && (
                                <Timeline.Item>
                                    <span
                                        className={styles.desc}>{`Nice! ${pagination.total} posts in total. Keep on posting.`}</span>
                                    <br/>
                                    <br/>
                                </Timeline.Item>
                            )}

                            {/* time line */}
                            <Timeline.Item dot={<ClockCircleOutlined style={{fontSize: '16px'}}/>} color='red'>
                                <div className={styles.year}>
                                    {articleList[0]['createdAt'].slice(0, 4)}
                                    ...
                                </div>
                                <br/>
                            </Timeline.Item>

                            {/* articleList title */}
                            {_.map(articleList, article => (
                                <Timeline.Item key={article.id}>
                                    <span className={styles.createAt}>{article.createdAt.slice(5, 10)}</span>
                                    <Link to={getArticleRoute(article.id)}>{article.title}</Link>
                                </Timeline.Item>
                            ))}
                        </Fragment>
                    ))}
                </Timeline>

                {/* pagination */}
                <Pagination className={styles.appPagination} {...pagination} onChange={
                    page => {
                        document.getElementById('app-archives').scrollTop = 0
                        pagination.onChange(page)
                    }
                }/>
            </div>
        </Spin>
    )
}

export default ArchiveByYear;