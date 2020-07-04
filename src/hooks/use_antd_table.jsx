/**
 * @author zy
 * @date 2020/5/9
 * @description: 使用antd table控件
 */
import React from 'react';
import useFetchList from './use_fetch_list';
import {Button} from 'antd';
import styles from './styles.scss';


/**
 * @author zy
 * @date 2020/4/20
 * @description: 获取列表数据  如果请求参数不指定页数：默认current: 1, pageSize:10
 * @param {Function} requestService: 请求服务
 * @param {Object} queryParams: 获取列表默认查询参数
 * @param {Object} columns: 列
 */
export default function useAntdTable({
                                         requestService,
                                         queryParams = null,
                                         columns
                                     }) {

    //加载列表数据
    let {
        dataList,
        loading,
        setLoading,
        fetchDataList,
        pagination
    } = useFetchList({requestService, queryParams, widthLoading: true});

    /**
     * 更新数据 更新之前执行func函数
     * @param {Function} func：执行某个func后 更新列表
     */
    const updateList = async func => {
        try {
            setLoading(true);
            await func();
            fetchDataList();
        } catch (error) {
            console.log('updateList error: ', error);
            setLoading(false);
        }
    };

    /**
     * 按条件查询  默认返回查询到的第一页
     * @param {Object} params：更新参数
     */
    const handleSearchChange = params => {
        fetchDataList({current: 1, ...params});
    };

    /**
     * 分页、排序、筛选变化时触发
     * 注意 当前只封装分页
     */
    const handleTableChange = (pagination, filters, sorter) => {
        if (JSON.stringify(filters) === '{}' && JSON.stringify(sorter) === '{}') {
            fetchDataList({current: pagination.current, pageSize: pagination.pageSize});
        }
    };


    return {
        tableProps: {
            className: styles.table,
            loading,
            columns,
            dataSource: dataList,
            //分页属性
            pagination: {
                current: pagination.current,
                pageSize: pagination.pageSize,
                total: pagination.total,
                showTotal: total => `共 ${total} 条`,
                showSizeChanger: true,
                showQuickJumper: {
                    // eslint-disable-next-line react/react-in-jsx-scope
                    goButton: <Button style={{marginLeft: 10}}>确定</Button>
                },
                itemRender: (current, type, originalElement) => {
                    if (type === 'prev') {
                        // eslint-disable-next-line
                        return <a>上一页</a>;
                    }
                    if (type === 'next') {
                        // eslint-disable-next-line
                        return <a>下一页</a>;
                    }
                    return originalElement;
                }
            },
            onChange: handleTableChange,
            rowKey: 'id',
        },
        dataList,
        setLoading,
        updateList,
        onSearch: handleSearchChange,
    }
}

