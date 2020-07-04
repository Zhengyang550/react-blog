/**
 * @author zy
 * @date 2020/4/6
 * @Description: web 头部布局
 */
import React from 'react';
import {Row, Col} from 'antd';
import Left from './left';
import Right from './right';

const WebHeader = () => {
    // 响应式  xxl：超大屏 一行显示24/4列  xl：大屏一行显示24/5 ...
    const responsiveLeft = {xxl: 4, xl: 5, lg: 5, sm: 4, xs: 24};
    const responsiveRight = {xxl: 20, xl: 19, lg: 19, sm: 20, xs: 0};

    return (
        <Row>
            {/* left */}
            <Col {...responsiveLeft}>
                <Left/>
            </Col>
            {/* right */}
            <Col {...responsiveRight}>
                <Right/>
            </Col>
        </Row>
    )
}

export default WebHeader;