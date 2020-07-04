/**
 * @author zy
 * @date 2020/4/6
 * @Description: 顶部右侧布局
 */
import React from 'react';
import Search from './search';
import Navbar from './navbar';
import User from './user';
import styles from './styles.scss';


const WebHeaderRight = props => {
    return (
        <div className={styles.headerRight}>
            <Search/>
            <Navbar/>
            <User/>
        </div>
    )
}

export default WebHeaderRight;
