/**
 * @author zy
 * @date 2020/4/12
 * @Description: 用户action
 */
import * as TYPES from './types'

import {message} from 'antd'

/**
 * 执行登录操作
 * @author zy
 * @date 2020/4/12
 */
export const login = params => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            //设置用户信息
            dispatch({
                type: TYPES.USER_LOGIN,
                payload: params
            })
            message.success(`登录成功, 欢迎您 ${params.username}`);
            resolve('这里调用登录接口');
        })
    }
}

/**
 * 执行注册操作
 * @author zy
 * @date 2020/4/12
 */
export const register = params => {
    return dispatch => {
        message.success('注册成功，请重新登录您的账号！')
    }
}

/**
 * 执行退出登录操作
 * @author zy
 * @date 2020/4/12
 */
export const loginout = () => ({
    type: TYPES.USER_LOGIN_OUT
})