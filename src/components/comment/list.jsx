/**
 * @author zy
 * @date 2020/5/3
 * @Description: 评论列表展示组件
 */
import React, {useState} from 'react';
import PropTypes from 'prop-types';
import CommentItem from './item';
import _ from 'lodash';
import styles from './styles.scss';

const CommentList = ({user, articleId, commentList, setCommentList}) => {
    //设置当前点击reply to的评论id，评论的回复id
    const [replyTarget, setReplyTarget] = useState({
        commentId: 0,
        replyId: 0
    });

    return (
        <div className={styles.commentList}>
            {/* 遍历评论列表 */}
            {_.map(commentList, comment => (
                <CommentItem
                    item={comment}                   //评论信息
                    key={comment.id}
                    articleId={articleId}            //文章id
                    user={user}                      //登录用户信息
                    commentId={comment.id}           //评论id
                    commentList={commentList}        //评论列表
                    setCommentList={setCommentList}  //设置评论内容
                    onReply={setReplyTarget}         //设置回复目标
                    replyVisible={replyTarget.commentId === comment.id && !replyTarget.replyId}  //回复的是评论
                >
                    {/* 遍历回复者 */}
                    {_.map(comment.replies, reply => (
                        <CommentItem
                            item={reply}             //评论的回复信息
                            key={reply.id}
                            articleId={articleId}    //文章id
                            user={user}              //登录用户信息
                            commentId={comment.id}   //评论id
                            replyId={reply.id}       //回复id
                            commentList={commentList}
                            setCommentList={setCommentList}
                            onReply={setReplyTarget}
                            replyVisible={replyTarget.commentId === comment.id
                            && replyTarget.replyId === reply.id}                               //回复的是评论的回复
                        />
                    ))}
                </CommentItem>
            ))}
        </div>
    )
}

CommentList.prototype = {
    user: PropTypes.object.isRequired,           //登录用户
    articleId: PropTypes.number.isRequired,      //文章Id
    commentList: PropTypes.array.isRequired,     //文章评论列表
    setCommentList: PropTypes.func.isRequired    //设置评论内容
}

export default CommentList;