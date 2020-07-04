/**
 * @author zy
 * @date 2020/5/7
 * @Description: 用户管理
 */
import React, {useState} from 'react';
import useAntdTable from '@/hooks/use_antd_table';
import {Switch, Tag, Popconfirm} from 'antd'
import * as userService from '@/service/user';
import CrudView from '@/components/frame/crud_view';
import _ from 'lodash';
import QueryForm from './query_form';
import {DeleteOutlined} from '@ant-design/icons';
import moment from 'moment';

const User = props => {
    //将字段映射到表单
    const [fields, setFields] = useState([
        {name: ['username'], value: ''},
        {name: ['userType'], value: ''},
        {name: ['createAts'], value: []}
    ]);

    //获取数据列表
    const {tableProps, updateList, onSearch} = useAntdTable({
        requestService: userService.getUserList,
        columns: [
            {title: '用户名', dataIndex: 'username'},
            {title: '邮箱', dataIndex: 'email'},
            {
                title: '邮件通知',
                dataIndex: 'notice',
                render: (text, record) => (
                    <Switch
                        defaultChecked={text}
                        onChange={checked => updateList(() => userService.updateUser({id: record.id, notice: checked}))}
                    />
                )
            },
            {
                title: '禁言',
                dataIndex: 'disabledDiscuss',
                render: (text, record) => (
                    <Switch
                        defaultChecked={text}
                        onChange={checked => updateList(() => userService.updateUser({
                            id: record.id,
                            disabledDiscuss: checked
                        }))}
                    />
                )
            },
            {
                title: '用户类型',
                dataIndex: 'type',
                render: (text, record) => {
                    return record.github ? <Tag color='#1890ff'>github 用户</Tag> : <Tag color='magenta'>站内用户</Tag>
                }
            },
            {
                title: '注册时间',
                dataIndex: 'createdAt',
                sorter: (a, b) => (moment(a.createdAt).isBefore(b.createdAt) ? 1 : -1)
            },
            {
                dataIndex: 'id',
                title: '操作',
                align: 'center',
                render: (userId, record) => (
                    <Popconfirm
                        title='你确定要删除当前用户吗？'
                        onConfirm={() => updateList(() => userService.deleteUser(record.id))}
                    >
                        {/*eslint-disable-next-line*/}
                        <a title='删除'><DeleteOutlined/></a>
                    </Popconfirm>
                )
            }
        ]
    });

    //提交表单且数据验证成功后回调事件
    const onFinish = values => {
        if (Array.isArray(values.createAts)) {
            values.createAts = _.map(values.createAts, item => item.format('YYYY-MM-DD'));
            _.assign(values, {createAtStart: values.createAts[0], createAtEnd: values.createAts[1]});
        }
        let {createAts, ...params} = values;
        onSearch(params);
    };

    //action
    const actionButtons = [
        <QueryForm
            key='query-form'
            fields={fields}
            onChange={newFields => {
                setFields(newFields)
            }}
            onFinish={onFinish}
        />
    ];

    return <CrudView actionButtons={actionButtons} tableProps={tableProps}/>;
}

export default User;