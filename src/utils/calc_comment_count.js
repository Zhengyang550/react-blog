import _ from 'lodash';

/**
 * 计算评论数
 * @author zy
 * @date 2020/4/6
 * @param {Array} comments：评论列表
 * @return：评论数
 */
const calcCommentCount = comments => {
    let count = comments.length;
    _.forEach(comments, comment => {
        count += comment.replies.length;
    })
    return count;
}

export default calcCommentCount;