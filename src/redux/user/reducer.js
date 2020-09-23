/**
 * @author zy
 * @date 2020/4/12
 * @Description: 用户reducer
 */
import * as TYPES from './types';
import * as authService from '@/service/auth';

/**
 * 初始化用户信息
 * @author zy
 * @date 2020/4/12
 */
let defaultState = {
    isLogin:false,
    id: 0,
    username: '',
    github: null
}

/**
 * userReducer
 * @author zy
 * @date 2020/4/12
 */
export default function userReducer(state = defaultState, action) {
    const {type, payload} = action;
    switch (type) {
        case TYPES.USER_LOGIN:
            //保存用户信息
            authService.saveAuthInfo(payload);
            const {token,...user} = payload;
            return {...state,...user,isLogin:!!token};

        case TYPES.USER_LOGIN_OUT:
            //移除用户信息
            authService.removeAuthInfo();
            return {...state, ...defaultState};

        default:
            return state;
    }
}
