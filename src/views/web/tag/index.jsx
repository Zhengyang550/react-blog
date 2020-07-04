/**
 * @author zy
 * @date 2020/5/4
 * @Description: tag组件
 */
import React from 'react';
import useFetchList from '@/hooks/use_fetch_list';
import {getAriticleListByTagName} from '@/service/article';
import {TAG_PAGESIZE} from '@/utils/config';
import {Spin} from 'antd';
import Pagination from '@/components/pagination';
import TimeLineList from './time_line_list';
import styles from './styles.scss';

const TagList = props => {
    //获取标签名称
    const tagName = props.match.params.name;

    //根据文章发表时间分页文章 查询条件指定文章标签类型
    const {loading, pagination, dataList: articleList} = useFetchList({
        requestService: getAriticleListByTagName,
        queryParams: {pageSize: TAG_PAGESIZE, tag: tagName}
    });

    return (
        <Spin tip='Loading...' spinning={loading} delay={500}>
            <div id='app-tag' className={styles.appTag}>
                {/* time line */}
                <TimeLineList list={articleList} name={tagName} type='tag'/>

                {/* pagination */}
                <Pagination className={styles.appPagination} {...pagination} onChange={
                    page => {
                        document.getElementById('app-tag').scrollTop = 0
                        pagination.onChange(page)
                    }
                }/>
            </div>
        </Spin>
    )
}

export default TagList;