/**
 * @author zy
 * @date 2020/5/3
 * @Description: 评论内容展示组件
 */
import React, {useState, useEffect} from 'react';
import {Comment, Input, Tooltip, Avatar, Button, Popconfirm, message} from 'antd';
import {DeleteOutlined} from '@ant-design/icons';
import {translateMarkdown} from '@/utils';
import moment from 'moment';
import * as articleService from '@/service/article';
import styles from './styles.scss';
import _ from 'lodash';

const {TextArea} = Input;

const CommentItem = props => {
    //评论信息
    const {item} = props;

    //评论的回复信息
    const {children} = props;

    //登录用户信息
    const {user} = props;

    //评论id
    const {commentId} = props;

    //文章id
    const {articleId} = props;

    //评论的回复id
    const {replyId} = props;

    //评论列表
    const {commentList} = props;

    //设置文章评论列表
    const {setCommentList} = props;

    //回复可见
    const {replyVisible} = props;

    //设置回复input 目标
    const {onReply} = props;

    //回复内容
    const [value, setValue] = useState('');

    //回复提交缓冲
    const [loading, setLoading] = useState(false);

    //回复input 可见/显示 发生变化，清空输入
    useEffect(() => {
        replyVisible && setValue('')
    }, [replyVisible])

    //按键松开 如果是ctrl + enter提交
    const handleKeyUp = e => {
        if (e.ctrlKey && e.keyCode === 13) {
            handleSubmit();
        }
    };

    //提交
    const handleSubmit = () => {
        if (!user.username) {
            message.info('您未登陆，请登录后再试');
            return;
        }

        setLoading(true);
        articleService.insertReply({
            articleId,
            content: value,
            userId: user.id,
            commentId
        }).then(res => {
            setLoading(false);
            //返回文章的评论列表信息
            setCommentList(res.data.comments);
            setValue('');
            //隐藏回复input
            onReply({commentId: 0, replyId: 0});
        }).catch(err => {
            setLoading(false);
        })

    };

    //删除评论
    const handleDelete = () => {
        //如果删除的评论的回复
        if (replyId) {
            articleService.deleteReply(replyId).then(res => {
                //获取回复对应的评论
                const comment = _.find(commentList, comment => comment.id === commentId);
                //查找评论对应的回复
                comment.replies = _.filter(comment.replies, reply => reply.id !== replyId);
                setCommentList(commentList);
            }).catch(err => {
                message.info('评论删除失败', 2);
            })
        } else {
            articleService.deleteComment(commentId).then(res => {
                //获取回复对应的评论
                const comments = _.filter(commentList, comment => comment.id !== commentId);
                setCommentList(comments);
            }).catch(err => {
                message.info('评论删除失败', 2);
            })
        }
    };

    //显示回复input
    const handleReply = () => {
        onReply({commentId, replyId});
    };

    return (
        <Comment
            actions={[
                //点击回复 显示回复对话框
                <span onClick={handleReply}>Reply to</span>,
                <span>
                     <Popconfirm title={'是否删除该留言？'} cancelText='取消' okText='确认' onConfirm={handleDelete}>
                         <DeleteOutlined className={styles.iconDelete}/>
                    </Popconfirm>
                </span>
            ]}
            author={<span>{item.user && item.user.username}</span>}
            avatar={
                <Avatar
                    src={item.user && item.user.avatar}
                    alt={item.user && item.user.username}
                />
            }
            content={
                <div className='article-detail'
                     dangerouslySetInnerHTML={{__html: translateMarkdown(item.content, true)}}
                />
            }
            datetime={
                <Tooltip title={item.createdAt}>
                    <span>{moment(item.createdAt).fromNow()}</span>
                </Tooltip>
            }
        >
            {/* 回复input可见 */}
            {replyVisible && (
                <div className={styles.replyForm}>
                    <TextArea
                        rows={4}
                        placeholder={`回复${item.user && item.user.username}...`}
                        value={value}
                        onChange={e => setValue(e.target.value)}
                        onKeyUp={handleKeyUp}
                    />
                    <div className={styles.replyFormControls}>
                        <span className={styles.tip}>Ctrl + Enter</span>
                        <Button
                            htmlType="submit"
                            loading={loading}
                            type="primary"
                            disabled={!value.trim()}
                            onClick={handleSubmit}
                        >
                            回复
                        </Button>
                    </div>
                </div>
            )}
            {children}
        </Comment>
    )
}

export default CommentItem;
