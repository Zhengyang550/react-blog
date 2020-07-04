/**
 * @author zy
 * @date 2020/4/12
 * @Description: 用户action  使用thunk来处理异步:异步action是个函数，参数是(dispatch, getState)
 */
import * as TYPES from './types';

import {message} from 'antd';
import * as authService from '@/service/auth';
import * as userService from '@/service/user';

/**
 * 执行登录操作
 * @author zy
 * @date 2020/4/12
 */
export const login = params => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            authService.login(params).then(res => {
                dispatch({
                    type: TYPES.USER_LOGIN,
                    payload: res.data
                });
                message.success(`登录成功, 欢迎您 ${res.data.username}`, 2);
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}

/**
 * 执行github登录操作
 * @author zy
 * @date 2020/4/12
 */
export const githubLogin = code => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            authService.githubLogin(code).then(res => {
                dispatch({
                    type: TYPES.USER_LOGIN,
                    payload: res.data
                });
                message.success(`登录成功, 欢迎您 ${res.data.username}`, 2);
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}

/**
 * 将用户信息保存到state中
 * @author zy
 * @date 2020/4/12
 */
export const loadUser = (user) => {
    return dispatch => {
        dispatch({
            type: TYPES.USER_LOGIN,
            payload: user
        });
    }
}

/**
 * 执行注册操作
 * @author zy
 * @date 2020/4/12
 */
export const register = params => {
    return dispatch => {
        return new Promise((resolve, reject) => {
             userService.insertUser(params).then(res => {
                 message.success('注册成功，请重新登录您的账号！', 2);
                 resolve(res.data);
             }).catch(err => {
                 reject(err);
             })
        })
    }
}

/**
 * 执行退出登录操作
 * @author zy
 * @date 2020/4/12
 */
export const loginout = () => {
    return dispatch => {
        dispatch({
            type: TYPES.USER_LOGIN_OUT
        });
        message.success('退出成功!', 2);
    }
}