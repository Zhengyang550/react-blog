/**
 * @author zy
 * @date 2020/4/6
 * @Description: 顶部左侧布局
 */
import React from 'react';
import {DingdingOutlined} from '@ant-design/icons';
import styles from './styles.scss';
import {HEADER_BLOG_NAME} from '@/config'

const WebHeaderLeft = props => {

    return (
        <div className={styles.headerLeft}>
            <a className={styles.blogIcon}>
                <DingdingOutlined/>
                <div>{HEADER_BLOG_NAME}</div>
            </a>
        </div>
    )
}

export default WebHeaderLeft;