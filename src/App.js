/**
 * @author zy
 * @date 2020/4/5
 * @Description: 根组件
 */
import React from 'react';
import Routes from '@/routes';
import {BrowserRouter} from 'react-router-dom';
import PublicComponent from '@/components/public';
import { ConfigProvider } from 'antd';
import 'moment/locale/zh-cn';
import zhCN from 'antd/es/locale/zh_CN';

export default function App(props) {
    return (
      <ConfigProvider locale={zhCN}>
        <BrowserRouter>
            <Routes/>
            <PublicComponent/>
        </BrowserRouter>
      </ConfigProvider>
    )
};