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
    const {type, payload} = action
    switch (type) {
        case TYPES.USER_LOGIN:
            authService.saveAuthInfo(payload);
            const {token,...user} = payload;
            return {...state,...user};

        case TYPES.USER_LOGIN_OUT:
            authService.removeAuthInfo();
            return {...state, ...defaultState};

        default:
            return state;
    }
}
