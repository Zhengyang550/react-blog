/**
 * @author zy
 * @date 2020/4/13
 * @Description: 侧边导航栏
 */
import React from 'react';
import {SIDEBAR, ANNOUNCEMENT} from '@/config';
import {useSelector} from 'react-redux';
import {Divider, Alert, Avatar} from 'antd';
import styles from './styles.scss';
import _ from 'lodash';
import ArticleTag from '@/components/article_tag';
import {Link} from 'react-router-dom';
import {getArticleRoute} from '@/routes/web';


/**
 * 侧边导航栏组件
 * @author zy
 * @date 2020/4/13
 */
function SideBar(props) {
    //将store状态tagList映射到当前组件
    const article = useSelector(state => state.article);
    const {tagList, articleList} = article;

    return (
        <div className={styles.appSidebar}>
            {/*头像*/}
            <Avatar size={132}
                    src={SIDEBAR.avatar}
                    className={styles.siderAvatar}
            />
            <h2 className={styles.title}>{SIDEBAR.title}</h2>
            <h5 className={styles.subTitle}>{SIDEBAR.subTitle}</h5>
            <ul className={styles.homePages}>
                {_.map(_.entries(SIDEBAR.homepages), ([linkName, item]) => (
                    <li key={linkName}>
                        <item.icon className={styles.homepageIcon}/>
                        <a target="_blank" rel="noopener noreferrer" href={item.link}>{linkName}</a>
                    </li>
                ))}
            </ul>

            {/*公告*/}
            {ANNOUNCEMENT.enable && <Alert
                className={styles.announcement}
                message={ANNOUNCEMENT.content}
                type="info"/>
            }

            {/*热门文章*/}
            <Divider orientation="left">热门文章</Divider>
            <ul className={styles.articleList}>
                {_.map(articleList, article => (
                    <li key={article.id}>
                        <Link to={getArticleRoute(article.id)}>{article.title}</Link>
                    </li>
                ))}
            </ul>

            {/*标签*/}
            <Divider orientation="left">标签</Divider>

            <ArticleTag tagList={tagList}/>
        </div>
    )
}

export default SideBar;
