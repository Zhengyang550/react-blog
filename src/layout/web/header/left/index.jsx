/**
 * @author zy
 * @date 2020/4/6
 * @Description: 头部左侧布局
 */
import React from 'react';
import {DingdingOutlined} from '@ant-design/icons';
import styles from './styles.scss';
import {HEADER_BLOG_NAME} from '@/config'

/**
 * 头部左侧布局组件
 * @author zy
 * @date 2020/4/6
 */
const HeaderLeft = props => {

    return (
        <div className={styles.headerLeft}>
            <a href='/' className={styles.blogIcon}>
                <DingdingOutlined/>{HEADER_BLOG_NAME}
            </a>
        </div>
    )
}

export default HeaderLeft;