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
    keyword: '',
    tagList: [],
    articleList: []
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
            return {...state, keyword: payload};
        case TYPES.ARTICLE_GET_TAG_LIST:
            return {...state, tagList: payload}
        case TYPES.ARTICLE_GET_ARTICLE_LIST_BY_VIEW_COUNT_DESC:
            return {...state, articleList: payload.list}
        default:
            return state
    }
}

