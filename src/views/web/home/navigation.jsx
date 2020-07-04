/**
 * @author zy
 * @date 2020/4/30
 * @Description: 文章列表快速导航
 */
import React, {useState} from "react";
import {Link} from "react-router-dom";
import {useMediaQuery} from 'react-responsive';
import styles from "./styles.scss";
import _ from "lodash";
import {getArticleRoute} from '@/routes/web';
import {Divider, Drawer} from "antd";
import {MenuOutlined} from '@ant-design/icons';


const Navigation = props => {
    //获取文章列表
    const articleList = props.list;

    //文章列表导航抽屉显示？
    const [drawerVisible, setDrawerVisible] = useState(false);

    /**
     * @author zy
     * @date 2020/4/27
     * @Description: 列表导航栏组件
     */
    const Preview = ({list, showTitle = true}) => {
        return (
            <ul className={styles.preview}>
                {showTitle && <Divider>文章列表</Divider>}
                {_.map(list, item => (
                    <li key={item.id}>
                        <Link to={getArticleRoute(item.id)}>{item.title}</Link>
                    </li>
                ))}
            </ul>
        )
    }

    //判断宽度是否大于1300
    const isGreaterThan1300 = useMediaQuery({
        query: '(min-width: 1300px)'
    })

    return (
        <div className={styles.navigation}>
            {/*大屏 显示右侧导航*/}
            {isGreaterThan1300 ? (
                <Preview list={articleList}/>
            ) : (
                //小屏 右侧导航悬浮菜单
                <div>
                    <div
                        className={styles.drawerBtn}
                        onClick={e => setDrawerVisible(true)}
                    >
                        <MenuOutlined/>
                    </div>
                    {/*屏幕边缘滑出的浮层面板*/}
                    <Drawer
                        title='文章列表'
                        placement='right'
                        closable={false}
                        onClose={e => setDrawerVisible(false)}
                        visible={drawerVisible}
                    >
                        <Preview list={articleList} showTitle={false}/>
                    </Drawer>
                </div>
            )}
        </div>
    )
}

export default Navigation;