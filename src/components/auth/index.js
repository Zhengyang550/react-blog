/**
 * 授权组件 被该组件包裹的组件只有登录才可以访问，否则跳转到首页
 */
import React from 'react';
import PageNotPermit from '@/components/403';
import { getToken } from '@/service/auth';


/*
 * 私有路由组件
 */
const PrivateRoute = Component => {

    return props=> {
        return getToken() ? <Component {...props}> </Component> : <PageNotPermit/>
    }
};

export default PrivateRoute;