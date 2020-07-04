/**
 * @author zy
 * @date 2020/5/6
 * @Description: 对文章按照标签来绘制时间轴
 */
import React from 'react';
import ArticleTag from '@/components/article_tag';
import {useSelector} from "react-redux";
import styles from './styles.scss';

const ArchiveByTag = props => {
    //将store状态tagList映射到当前组件
    const tagList = useSelector(state => state.article.tagList || []);

    return (
        <div className={styles.appTag}>
            <h2>Tag</h2>
            <p className={styles.desc}>{tagList.length} tag in total</p>
            <ArticleTag className={styles.tagList} tagList={tagList} showBadge/>
        </div>
    )
}

export default ArchiveByTag;
