/**
 * @author zy
 * @date 2020/5/7
 * @Description: 侧边栏
 */
import React from 'react';
import {Menu} from 'antd';
import {adminMenuTree} from '@/routes/admin';
import {Link, useLocation} from 'react-router-dom';
import _ from "lodash";
import styles from "../../web/header/right/styles.scss";

const {SubMenu} = Menu;

const AdminSideBar = props => {
    //获取当前location对象
    const location = useLocation();

    //菜单样式 内敛
    const {mode = 'inline'} = props;

    /**
     * 生成菜单树
     * @author zy
     * @date 2020/5/7
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

    /**
     * 获取每一个子菜单项的父菜单 当选中一个子菜单时，展开父菜单
     * @author zy
     * @date 2020/5/7
     */
    const getMenuOpenKeys = (menus, selectedKey) => {
        //遍历每一个菜单项
        for (let menu of menus) {
            if (menu.subMenus) {
                for (let child of menu.subMenus) {
                    //如果子菜单的key是当前选中的key 返回父菜单key
                    if (child.path === selectedKey) {
                        return [menu.path];
                    }
                }
            }
        }
        return [];
    };


    return (
        <Menu className={styles.sidebar} mode={mode}
              defaultOpenKeys={getMenuOpenKeys(adminMenuTree, location.pathname)}
              selectedKeys={[location.pathname]}
        >
            {genMenuTree(adminMenuTree)}
        </Menu>
    )
}

export default AdminSideBar;