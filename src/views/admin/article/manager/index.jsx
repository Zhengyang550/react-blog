/**
 * @author zy
 * @date 2020/5/7
 * @Description: 文章管理
 */
import React, {useState} from 'react';
import {Popconfirm, Popover, Switch, Button, Tag} from "antd";
import moment from "moment";
import * as articleSercice from '@/service/article';
import useAntdTable from '@/hooks/use_antd_table';
import {useSelector} from 'react-redux';
import download from '@/utils/download'
import { Link } from 'react-router-dom';
import styles from './styles.scss';
import CrudView from '@/components/frame/crud_view';
import {getArticleRoute,getTagRoute} from '@/routes/web';
import {getArticleEditRoute} from '@/routes/admin';
import {generateColor} from '@/utils';
import QueryForm from './query_form';
import _ from 'lodash';

const Manager = props => {
    //将store状态映射到当前组件
    const store = useSelector(state => ({
        //给每个标签对象添加颜色字段
        tagList: generateColor(state.article.tagList || []),
        categoryList: state.article.categoryList || []
    }));

    //将字段映射到表单
    const [fields, setFields] = useState([
        {name: ['keyword'], value: ''},
        {name: ['selectTag'], value: ''},
    ]);

    //批量操作
    const [batch, setBatch] = useState(false);

    //多选选中行
    const [selectedRowKeys, setSelectedRowKeys] = useState([]);

    //颜色渲染
    const renderColor = (name, tagList) => {
        const target = _.find(tagList,item => item.name === name);
        return target && target.color;
    };

    //导出文章
    const downloadArticle = articleId => {
        download(`/article/output/${articleId}`)
    };

    //导出多个文章
    const downloadArticles = () => {
        download(`/article/output/list/${selectedRowKeys}`)
    };

    //批量删除文章
    const deleteArticles = () => {
        articleSercice.deleteArticles(
            {
                params: selectedRowKeys
            }
        ).then(() => {
            onSearch();
            setSelectedRowKeys([])
        });
    };
    //提交表单且数据验证成功后回调事件
    const onFinish = values => {
        let { ...params} = values;
        onSearch(params);
    };

    //获取数据列表
    const {tableProps, updateList, onSearch} = useAntdTable({
        requestService: articleSercice.getArticleList,
        columns: [
            {
                title: '标题',
                dataIndex: 'title',
                width:200,
                ellipsis:true
            },
            {
                title: '标签',
                dataIndex: 'tags',
                width:200,
                ellipsis:{
                    showTitle:false
                },
                render: (tags) => {
                    let ret = _.map(tags,tag => (
                        <Tag color={renderColor(tag.name, store.tagList)} key={tag.name}>
                            <Link to={getTagRoute(tag.name)}>{tag.name}</Link>
                        </Tag>
                    ));
                    return <Popover  placement='topLeft' content={ret}>
                        {ret}
                    </Popover>
                }
            },
            {
                title: '浏览数',
                dataIndex: 'viewCount',
                width:100,
                ellipsis:true,
                sorter: (a, b) => b.viewCount - a.viewCount
            },
            {
                title: '发布时间',
                dataIndex: 'createdAt',
                width:150,
                ellipsis:true,
                sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
            },
            {
                title: '修改时间',
                dataIndex: 'updatedAt',
                width:150,
                ellipsis:true,
                sorter: (a, b) => (moment(a.updatedAt).isBefore(b.updatedAt) ? 1 : -1)
            },
            {
                dataIndex: 'id',
                title: '操作',
                width:200,
                ellipsis:true,
                render: (articleId) => {
                    return (
                        <ul className={styles.action}>
                            <li>
                                <Link to={getArticleRoute(articleId)}>查看</Link>
                            </li>
                            <li>
                                <Link to={{
                                    pathname: getArticleEditRoute(articleId),
                                    state: {articleId}
                                }}>编辑</Link>
                            </li>
                            <li>
                                <a href='' onClick={e => downloadArticle(articleId)}>导出</a>
                            </li>
                            <li>
                                <Popconfirm title='Are you sure？' cancelText='No'
                                            onConfirm={() => updateList(() => articleSercice.deleteArticle(articleId))}>
                                    <a className='delete-text'>删除</a>
                                </Popconfirm>
                            </li>
                        </ul>
                    )
                }
            }
        ]
    });

    //表格属性
    let table = {...tableProps,
        //选中行  批量操作时
        rowSelection: batch ? {
            selectedRowKeys,
            onChange: selectList => setSelectedRowKeys(selectList)
        } : null,
        footer:() => (
        <>
            批量操作 <Switch checked={batch} onChange={e => setBatch(prev => !prev)}
                         style={{marginRight: 8}}/>

            {
                batch && (
                    <>
                        <Button type='primary' size='small' style={{marginRight: 8}}
                                disabled={selectedRowKeys.length === 0}
                                onClick={downloadArticles}>导出选中项</Button>
                        <Popconfirm
                            title='Are you sure delete the articles?'
                            onConfirm={deleteArticles}
                            okText='Yes'
                            cancelText='No'
                        >
                            <Button type='danger' size='small'
                                    disabled={selectedRowKeys.length === 0}>批量删除</Button>
                        </Popconfirm>

                    </>
                )
            }
        </>
    )};

    const actionButtons = [
        <QueryForm
            key='query-form'
            fields={fields}
            tagList = {store.tagList}
            onChange={newFields => {
                setFields(newFields)
            }}
            onFinish={onFinish}
        />
    ];

    return <CrudView actionButtons={actionButtons} tableProps={table}/>;
}
export default Manager;