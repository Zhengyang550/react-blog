/**
 * @author zy
 * @date 2020/4/16
 * @Description: 构建web请求服务  https://www.kancloud.cn/yunye/axios/234845
 */
import axios from 'axios';
import {message} from 'antd';
import * as authService from './auth';

/*
 * 自定义配置新建一个 axios 实例
 */
const service = axios.create({
    baseURL: '',
    timeout: 10000,
    //withCredentials表示跨域请求时是否需要使用凭证
    withCredentials: false
});

/*
 * 拦截请求
 */
service.interceptors.request.use(
    config => {
        const token = authService.getToken();
        if (token) {
            config.headers['Authorization'] = token;
        }
        //文件传输
        if (config.data instanceof FormData) {
            config.headers['Content-Type'] = 'multipart/form-data';
        }

        //json
        if (config.data instanceof Object) {
            config.headers['Content-Type'] = 'application/json';
            config.data = JSON.stringify(config.data);
        }

        console.log('request config', config);
        return config;
    },
    error => {
        console.log('request error', error);
        Promise.reject(error);
    }
)

/*
 * 拦截响应
 */
service.interceptors.response.use(
    //后端成功 一律返回状态码200
    response => {
        console.log('response data', response.data);
        return response.data;
    },
    err => {
        //请求返回的拦截配置-请求失败后的统一处理 请求失败判断自定义状态码
        console.log('response rror', err.response);

        if (err.response) {
            const {data} = err.response;
            message.error(data.msg ? data.msg : data);
            return Promise.reject(data);
        } else {
            message.error(err.message);
            return Promise.reject(err);
        }
    }
)

export default service;