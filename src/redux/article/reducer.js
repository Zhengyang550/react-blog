/**
 * @author zy
 * @date 2020/4/12
 * @Description: 文章reducer
 */
import * as TYPES from './types';

/**
 * @author zy
 * @date 2020/4/12
 * @Description: 初始化文章信息
 */
const defaultState = {
    keyword: ''
}

/**
 * articleReducer
 * @author zy
 * @date 2020/4/12
 */
export default function articleReducer(state = defaultState, action) {
    const {type, payload} = action
    switch (type) {
        case TYPES.ARTICLE_SET_KEYWORD:
            return {...state, keyword: payload}

        default:
            return state
    }
}
