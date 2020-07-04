/**
 * @author zy
 * @date 2020/5/7
 * @Description: admin页面布局  采用Layout布局 不支持支持响应式
 */
import React from 'react';
import AdminHeader from './header';
import AdminSideBar from './sidebar';
import AppMain from './content';
import {Layout} from 'antd';
import styles from './styles.scss';

const {Header, Content, Sider} = Layout;

const AdminLayout = props => {
    return (
        // layout
        <Layout className={styles.appContainer}>
            {/* header */}
            <Header className={styles.appHeader}>
                <AdminHeader/>
            </Header>

            {/* main */}
            <Layout className={styles.appWrapper}>
                {/* sidebar */}
                <Sider className={styles.appSideBar}>
                    <AdminSideBar/>
                </Sider>

                {/* content */}
                <Content><AppMain {...props} /></Content>
            </Layout>
        </Layout>
    )
}

export default AdminLayout;