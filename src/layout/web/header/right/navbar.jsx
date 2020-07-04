/**
 * @author zy
 * @date 2020/4/7
 * @Description: 导航栏
 */
import React from 'react';
import {Link, useLocation} from 'react-router-dom';
import {Menu} from 'antd';
import {webMenuTree} from '@/routes/web';
import _ from 'lodash';
import styles from './styles.scss';

const {SubMenu} = Menu;


const NavBar = props => {
    //获取当前location对象
    const location = useLocation();

    //菜单样式 默认水平
    const {mode = 'horizontal'} = props;

    /**
     * 生成菜单树
     * @author zy
     * @date 2020/4/7
     */
    const genMenuTree = (menus) => {
        return _.map(menus, menu => {
            const title = <span>{menu.icon && <menu.icon/>}{menu.title}</span>;
            return menu.subMenus ? (
                !menu.invisible &&
                <SubMenu key={menu.path} title={title}>
                    {genMenuTree(menu.subMenus)}
                </SubMenu>
            ) : (
                !menu.invisible &&
                <Menu.Item key={menu.path}>
                    <Link to={menu.path}>{title}</Link>
                </Menu.Item>
            )
        })
    };

    return (
        <Menu className={styles.headerNav} mode={mode} selectedKeys={[location.pathname]}>
            {genMenuTree(webMenuTree)}
        </Menu>
    )
}

export default NavBar;