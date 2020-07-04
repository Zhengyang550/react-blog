/**
 * @author zy
 * @date 2020/4/30
 * @Description: 文章列表
 */
import { Divider } from 'antd';
import React from 'react';
import { MessageOutlined, EyeOutlined } from '@ant-design/icons';
import ArticleTag from '@/components/article_tag';
import styles from './styles.scss';
import { getArticleRoute } from '@/routes/web';
import { calcCommentCount } from '@/utils';
import { useHistory } from 'react-router-dom';
import _ from 'lodash';

const ArticleList = props => {
    //获取文章列表
    const articleList = props.list;

    //获取history
    const history = useHistory();

    //跳转
    const jumpTo = route => {
        history.push(route);
    }

    return (
        <ul className={styles.articleList}>
            {_.map(articleList, article => (
                <li key={article.id} className={styles.article}>
                    {/* 标题 */}
                    <Divider orientation='left'>
                        <span className={styles.title}
                            onClick={() =>
                                jumpTo(getArticleRoute(article.id))
                            }
                        >
                            {article.title}
                        </span>
                        <span className={styles.postedTime}>
                            {article.createdAt.slice(0, 10)}
                        </span>
                    </Divider>

                    {/*  内容  */}
                    <div
                        onClick={() => jumpTo(getArticleRoute(article.id))}
                        className={`article-detail ${styles.content}`}
                        dangerouslySetInnerHTML={{ __html: article.content }}
                    />

                    {/*  其它 评论标签等  */}
                    <div className={styles.others}>
                        <MessageOutlined />
                        <span style={{ marginLeft: 8, marginRight: 8 }}>
                            {calcCommentCount(article.comments)}
                        </span>
                        <EyeOutlined />
                        <span style={{ marginLeft: 8 }}>
                            {article.viewCount}
                        </span>

                        {/*  标签 */}
                        <ArticleTag tagList={article.tags} />
                    </div>
                </li>
            ))}
        </ul>
    )
}

export default ArticleList;