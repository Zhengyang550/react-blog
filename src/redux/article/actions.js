/**
 * @author zy
 * @date 2020/4/12
 * @Description: 文章action
 */
import * as TYPES from './types';
import * as tagService from '@/service/tag';
import * as articleService from '@/service/article';

//设置搜索关键字
export const setKeyword = (params) => ({
    type: TYPES.ARTICLE_SET_KEYWORD,
    payload: params
})


/**
 * 获取所有标签
 * @author zy
 * @date 2020/4/22
 */
export const getTagList = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            tagService.getTagList().then(res => {
                dispatch({
                    type: TYPES.ARTICLE_GET_TAG_LIST,
                    payload: res.data
                });
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}


/**
 * 按热度分页获取文章（热门文章）
 * @author zy
 * @date 2020/4/22
 */
export const getArticleListByViewCountDesc = () => {
    return dispatch => {
        return new Promise((resolve, reject) => {
            articleService.getArticleListByViewCountDesc({
                all: false,
                current: 1,
                pageSize: 6,
                search: ''
            }).then(res => {
                dispatch({
                    type: TYPES.ARTICLE_GET_ARTICLE_LIST_BY_VIEW_COUNT_DESC,
                    payload: res.data
                });
                resolve(res.data);
            }).catch(err => {
                reject(err);
            })
        })
    }
}
