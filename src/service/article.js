/**
 * @author zy
 * @date 2020/4/16
 * @description: 文章相关接口请求
 */
import service from './service';

//新增文章
export const insertArticle = article => {
    return service.post('/article/add',article);
}

//根据标签分页获取文章列表
export const getAriticleListByTagName = params => {
    return service.get('/article/listByTagName', {params: params});
}

//根据热度获取文章列表
export const getArticleListByViewCountDesc = params => {
    return service.get('/article/listByViewCountDesc', {params: params});
}

//根据发表时间获取文章列表
export const getArticleList = params => {
    return service.get('/article/list', {params: params});
}

//获取文章
export const getArticle = articleId => {
    return service.get(`/article/${articleId}`, {params: null});
}

//新增文章评论
export const insertComment = comment => {
    return service.post('/comment/add',comment);
}

//删除评论以及评论下的回复
export const deleteComment = commentId => {
    return service.get(`/comment/delete?commentId=${commentId}`,null)
}

//新增文章评论回复
export const insertReply = reply => {
    return service.post('/reply/add',reply);
}

//删除评论下的回复
export const deleteReply = replyId => {
    return service.get(`/reply/delete?replyId=${replyId}`,null)
}
