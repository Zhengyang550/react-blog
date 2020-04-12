/**
 * @author zy
 * @date 2020/4/12
 * @Description: 用户reducer
 */
import * as TYPES from './types';

/**
 * 初始化用户信息
 * @author zy
 * @date 2020/4/12
 */
let defaultState = {
    username: '',
    userId: 0,
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
            const {username, userId, github} = payload;
            return {...state, username, userId, github};

        case TYPES.USER_LOGIN_OUT:
            return {...state, username: '', userId: 0, github: null};

        default:
            return state;
    }
}
