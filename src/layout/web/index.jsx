/**
 * @author zy
 * @date 2020/4/6
 * @Description: web页面布局  采用Grid栅格布局 支持响应式
 */
import React from 'react';
import {Layout, Row, Col, BackTop} from 'antd';
import WebHeader from './header';
import WebSideBar from './sidebar';
import AppMain from './content';
import styles from './styles.scss';

const Header = Layout.Header;

// 响应式
const siderLayout = {xxl: 4, xl: 5, lg: 5, sm: 0, xs: 0}
const contentLayout = {xxl: 20, xl: 19, lg: 19, sm: 24, xs: 24}

const WebLayout = props => {
    return (
        <Layout className={styles.appContainer}>
            {/* header */}
            <Header id='app-header' className={styles.appHeader}>
                <WebHeader/>
            </Header>

            {/* main */}
            <Row className={styles.appWrapper}>
                {/* sidebar */}
                <Col {...siderLayout}>
                    <WebSideBar/>
                </Col>

                {/* content */}
                <Col {...contentLayout}>
                    <AppMain {...props} />
                </Col>
            </Row>
            <BackTop target={() => document.getElementById('app-main')}/>
        </Layout>
    )
}

export default WebLayout;