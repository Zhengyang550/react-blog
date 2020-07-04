/**
 * @author zy
 * @date 2020/4/29
 * @Description: 文章组件
 */
import React, {useState,} from 'react';
import {useSelector} from 'react-redux';
import * as articleService from '@/service/article';
import useMount from '@/hooks/use_mount';
import {translateMarkdown, scrollToAnchor, calcCommentCount} from '@/utils';
import {useMediaQuery} from 'react-responsive';
import {Spin, Drawer, Divider} from 'antd';
import {MessageOutlined, MenuOutlined, EyeOutlined, PrinterOutlined} from '@ant-design/icons';
import ArticleTag from '@/components/article_tag';
import Navigation from './navigation';
import Comment from '@/components/comment'
import styles from './styles.scss';


const Article = props => {
    //获取登录用户
    const user = useSelector(state => state.user);

    //获取文章id
    const articleId = props.match.params.id;

    //保存文章信息
    const [article, setArticle] = useState({
        title: '',
        content: '',
        tags: [],
        comments: [],
        createdAt: '',
        viewCount: 0
    })

    //加载状态
    const [loading, setLoading] = useState(false);

    //文章导航抽屉显示
    const [drawerVisible, setDrawerVisible] = useState(false);

    //第一次加载获取文章信息
    useMount(() => {
        setLoading(true);
        articleService.getArticle(articleId)
            .then(res => {
                res.content = translateMarkdown(res.data.content)
                setArticle(res.data);
                setLoading(false);
            }).catch(err => {
                setLoading(false);
            }
        )
    })

    //解构
    const {title, content, tags, comments, createdAt, viewCount} = article;

    //设置评论
    const setCommentList = comments => {
        setArticle({...article, comments: comments})
    }

    //判断宽度是否大于1300
    const isLesserThan1300 = useMediaQuery({
        query: '(max-width: 1300px)'
    })

    return (
        <Spin tip='Loading...' spinning={loading}>
            <div className={styles.appArticle} style={{paddingRight: isLesserThan1300 ? 0 : 275}}>
                {/* article header */}
                <div className={styles.postHeader}>
                    {/* title */}
                    <h1 className={styles.postTitle}>{title}</h1>

                    {/* post time */}
                    <div className={styles.articleDesc}>
                        <span className={styles.postTime}>
                            <PrinterOutlined/>&nbsp; Posted on &nbsp;
                            <span>{createdAt.slice(0, 10)}</span>
                        </span>

                        {/*  tags */}
                        <ArticleTag showTagIcon tagList={tags}/>

                        {/* others */}
                        <span className={styles.commentCount}
                              onClick={() => scrollToAnchor('comment')}
                              style={{color: 'inherit'}}>
                            <Divider type='vertical'/>
                            <MessageOutlined/>
                            <span style={{marginLeft: 8, marginRight: 8}}>
                                {calcCommentCount(comments)}
                            </span>
                        </span>
                        <EyeOutlined/>
                        <span style={{marginLeft: 8}}>
                            {viewCount}
                        </span>
                    </div>
                </div>

                {/* article content */}
                <div className='article-detail' dangerouslySetInnerHTML={{__html: content}}/>

                {/*  navigation  */}
                {isLesserThan1300 ? (
                        //小屏 显示菜单按钮  点击触发按钮抽屉从右滑出
                        <div>
                            <div className={styles.drawerBtn}
                                 onClick={e => setDrawerVisible(true)}
                            >
                                <MenuOutlined/>
                            </div>
                            < Drawer
                                title={title}
                                placement='right'
                                closable={false}
                                onClose={e => setDrawerVisible(false)}
                                visible={drawerVisible}
                            >
                                <div className={styles.drawerNavigation}>
                                    <Navigation content={content}/>
                                </div>
                            </Drawer>
                        </div>
                    )
                    : (
                        < div className={styles.rightNavigation}>
                            <Navigation content={content}/>
                        </div>
                    )}

                {/* comment */}
                <Comment
                    user={user}
                    articleId={articleId}
                    commentList={comments}
                    setCommentList={setCommentList}
                />
            </div>
        </Spin>
    )
}

export default Article;