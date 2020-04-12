/**
 * @author zy
 * @date 2020/4/12
 * @Description: 文章action
 */
import * as TYPES from './types';

//设置搜索关键字
export const setKeyword = (params) => ({
    type: TYPES.ARTICLE_SET_KEYWORD,
    payload: params
})
