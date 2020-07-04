/**
 * @author zy
 * @date 2020/5/7
 * @Description: 内容
 */
import React from 'react';
import {Breadcrumb} from 'antd';
import {getBreadcrumb} from '@/utils';
import {adminMenuTree} from '@/routes/admin';
import _ from 'lodash';
import styles from './styles.scss';


function AppMain(props) {
    return (
        <div id='app-main' className={styles.appMain}>
            {/* breadcrumb */}
            <Breadcrumb className={styles.breadcrumb}>
                <Breadcrumb.Item key='000'>后台管理</Breadcrumb.Item>
                {_.map(getBreadcrumb(adminMenuTree, props.location.pathname), (title, index) => (
                    <Breadcrumb.Item key={index}>{title}</Breadcrumb.Item>
                ))}
            </Breadcrumb>

            {/* table */}
            <div className={styles.tableWrapper}>
                {props.children}
            </div>
        </div>)
}

export default AppMain;
