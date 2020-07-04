/**
 * @author zy
 * @date 2020/5/3
 * @Description: 评论组件
 */
import React, {useState} from 'react';
import {calcCommentCount} from '@/utils';
import Editor from './edtior';
import PropTypes from 'prop-types';
import {message, Comment, Divider, Avatar} from 'antd';
import {GithubOutlined} from '@ant-design/icons';
import CommentList from './list';
import * as articleService from '@/service/article';
import styles from './styles.scss';

const WebComment = ({user, articleId, commentList, setCommentList, ...props}) => {
    //获取用户名 头像
    const {username, avatar} = user;

    //评论内容
    const [value, setValue] = useState('');

    //提交加载
    const [loading, setLoading] = useState(false);

    //提交
    const handleSubmit = () => {
        //评论未输入任何内容
        if (!value) {
            return;
        }

        if (!username) {
            message.info('您未登陆，请登录后再试');
            return;
        }

        setLoading(true);
        articleService.insertComment({
            articleId,
            content: value,
            userId: user.id
        }).then(res => {
            setLoading(false);
            //返回文章的评论列表信息
            setCommentList(res.data.comments);
            setValue('');
        }).catch(err => {
            setLoading(false);
        })
    };

    return (
        <div id="comment" className={styles.comment}>
            {/* header */}
            <div className={styles.commentHeader}>
                <span className={styles.commentCount}>
                    {calcCommentCount(commentList)}
                </span>
                条评论
                <Divider className={styles.hr}/>
            </div>

            {/* editor */}
            <Comment
                avatar={
                    avatar ? (
                        <Avatar src={avatar} alt={username}/>
                    ) : (
                        <GithubOutlined style={{fontSize: 40, margin: '5px 5px 0 0'}}/>
                    )
                }
                content={
                    <Editor
                        onChange={e => setValue(e.target.value)}
                        onSubmit={handleSubmit}
                        loading={loading}
                        value={value}
                    />
                }
            />

            {/* comment list */}
            <CommentList user={user} articleId={articleId} commentList={commentList} setCommentList={setCommentList}/>
        </div>
    )
}

WebComment.propTypes = {
    user: PropTypes.object.isRequired,           //登录用户
    articleId: PropTypes.number.isRequired,      //文章Id
    commentList: PropTypes.array.isRequired,     //文章评论列表
    setCommentList: PropTypes.func.isRequired    //设置评论内容
}

export default WebComment;
