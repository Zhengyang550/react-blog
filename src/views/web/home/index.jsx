/**
 * @author zy
 * @date 2020/4/27
 * @Description: 首页组件
 */
import React from 'react';
import useFetchList from '@/hooks/use_fetch_list';
import {useSelector} from 'react-redux';
import {HOME_PAGESIZE} from '@/utils/config';
import {translateMarkdown} from '@/utils';
import {getArticleList} from '@/service/article';
import _ from 'lodash';
import styles from './styles.scss';
import {Spin, Empty} from 'antd';
import Pagination from '@/components/pagination';
import ArticleList from './article_list';
import Navigation from './navigation';

const Home = props => {
    //获取搜索条件
    const keyword = useSelector(state => state.article.keyword);

    //根据文章发表时间分页文章
    const {loading, pagination, dataList: articleList} = useFetchList({
        requestService: getArticleList,
        queryParams: {pageSize: HOME_PAGESIZE, search: keyword},
        fetchDependence: [keyword]
    });

    //遍历文章列表，并对内容进行处理
    _.forEach(articleList, item => {
        const index = item.content.indexOf('<!--more-->')
        item.content = translateMarkdown(item.content.slice(0, index))
        return item;
    });

    return (
        <Spin tip='Loading...' spinning={loading}>
            <div id='app-home' className={styles.appHome}>
                {/* content */}
                <div className={styles.appContent}>
                    {/* article list  */}
                    {articleList.length !== 0 && < ArticleList list={articleList}/>}

                    {/* serach empty result */}
                    {articleList.length === 0 && keyword && (
                        <div className={styles.noData}>
                            <Empty description={(
                                <span>
                                不存在标题/内容中含有 <span className='keyword'>{keyword}</span> 的文章！
                            </span>
                            )}/>
                        </div>
                    )}

                    {/* quick link */}
                    <Navigation list={articleList}/>
                </div>

                {/* 分页器 */}
                <Pagination className={styles.appPagination} {...pagination} onChange={
                    page => {
                        document.getElementById('app-home').scrollTop = 0
                        pagination.onChange(page)
                    }
                }/>
            </div>
        </Spin>
    )
}

export default Home;