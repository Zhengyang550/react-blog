/**
 * @author zy
 * @date 2020/5/7
 * @Description: 新增、编辑文章共用组件  如果获取到文章id，则是编辑
 */
import React, {useState, useEffect} from 'react';
import {useSelector} from 'react-redux';
import styles from './styles.scss';
import {Input, Modal, Button, BackTop, Collapse, message} from 'antd';
import List from './list';
import MdEditor from '@/components/markdown';
import {PlusOutlined, SyncOutlined} from '@ant-design/icons';
import _ from 'lodash';
import {getArticleRoute} from '@/routes/web';
import * as articleService from '@/service/article';

const {Panel} = Collapse;

const Edit = props => {
    //将store状态映射到当前组件
    const store = useSelector(state => ({
        tagList: state.article.tagList || []
    }));

    //文章标题
    const [title, setTitle] = useState('');

    //文章内容
    const [content, setContent] = useState('');

    //标签列表
    const [tagList, setTagList] = useState([]);

    //选中的文章标签列表
    const [selectedTagList, setSelectedTagList] = useState([]);

    //如果是编辑 获取编辑的文章id
    const articleId = props.match.params.id ? parseInt(props.match.params.id) : null;

    useEffect(() => {
        //获取标签名称
        const tags = _.map(store.tagList, tag => tag.name);

        setTagList(tags);
        //新增
        if (!articleId) {
            //默认选中第一个
            tags[0] && setSelectedTagList([tags[0]])
        } else {
            articleService.getArticle(articleId).then(res => {
                console.log('查询结果', res);
                setTitle(res.data.title)
                setContent(res.data.content)
                const tags = _.map(res.data.tags, tag => tag.name);
                setSelectedTagList(tags)
            })
        }
        // eslint-disable-next-line
    }, [store.tagList]);

    //新增
    const insertArticle = () => {
        if (!title) {
            message.warning("标题不能为空");
            return;
        }
        articleService.insertArticle({
            title: title,
            content: content,
            tags: selectedTagList,
        }).then(res => {
            Modal.confirm({
                title: '文章创建成功！是否立即查看？',
                onOk: () => props.history.push(getArticleRoute(res.data.id))
            })
        })
    };

    //更新
    const updateArticle = () => {
        articleService.updateArticle({
            id: articleId,
            title: title,
            content: content,
            tags: selectedTagList,
        }).then(() => {
                message.success('更新成功')
            })
    };

    return (
        <div id='article' className={styles.article}>
            {/* article title */}
            <div className={styles.title}>
                <span className={styles.label}>标题：</span>
                <Input className={styles.input}
                       placeholder='请输入文章标题'
                       value={title}
                       onChange={e => setTitle(e.target.value)}
                />
            </div>

            <div className={styles.content}>
                {/* article contnt */}
                <MdEditor value={content} onChange={setContent}/>
                <Button
                    type='primary'
                    shape='circle'
                    size='large'
                    disabled={!title}
                    className={styles.action}
                    title={articleId ? '更新' : '新增'}
                    icon={articleId ? <SyncOutlined/> : <PlusOutlined/>}
                    onClick={() => {
                        articleId ? updateArticle() : insertArticle()
                    }}
                />
            </div>

            {/*  article tag  */}
            <Collapse defaultActiveKey={['0']} className={styles.collapse}>
                <Panel header='文章标签' key='0'>
                    <List
                        list={tagList}
                        setList={setTagList}
                        selectedList={selectedTagList}
                        setSelectedList={setSelectedTagList}
                    />
                </Panel>
            </Collapse>,

            <BackTop target={() => document.getElementById('article')}/>
        </div>
    )
};

export default Edit;