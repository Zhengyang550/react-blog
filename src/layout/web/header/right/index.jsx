/**
 * @author zy
 * @date 2020/4/6
 * @Description: 头部右侧布局
 */
import React from 'react';
import Search from './right_search';
import Navbar from './right_nav_bar';
import UserInfo from './right_user_info';
import styles from './styles.scss';

/**
 * 头部右侧布局组件
 * @author zy
 * @date 2020/4/6
 */
const HeaderRight = props => {
    return (
        <div className={styles.headerRight}>
            <Search/>
            <Navbar/>
            <UserInfo/>
        </div>
    )
}

export default HeaderRight;
