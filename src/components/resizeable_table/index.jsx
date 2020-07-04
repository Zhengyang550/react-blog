/**
 * @author:zy
 * @description：可进行拖拽的table
 * @date:2020-04-27
 */
import { Table } from 'antd';
import { Resizable } from 'react-resizable';
import React, { useState, useEffect } from 'react';
import _ from 'lodash';
import './styles.scss';

/**
 * 可缩放的表格头部
 * @param {*} props
 */
const ResizeableTitle = props => {
    const { onResize, width, ...restProps } = props;

    //如果没有指定宽度
    if (!width) {
        return <th {...restProps} />
    }

    //如果指定了宽度
    return (
        <Resizable
            width={width}
            height={0}
            onResize={onResize}
            draggableOpts={{ enableUserSelectHack: false }}
        >
            <th {...restProps} />
        </Resizable>
    )
}


/**
 * 封装可缩放的表格组件
 */
const ResizeableTable = props => {
    //获取除了列之外的其它参数
    const { columns: originalColumns, ...restProps } = props;

    //设置状态
    const [columns, setColumns] = useState(originalColumns);

    //处理列发生改变
    useEffect(() => {
        setColumns(originalColumns);
    }, [originalColumns]);

    //表头设置
    const components = {
        header: {
            cell: ResizeableTitle,
        },
    };

    //处理表头列拉伸事件
    const handleResize = index => (e, { size }) => {
        const nextColumns = [...columns];
        //设置第index列新宽度
        nextColumns[index] = {
            ...nextColumns[index],
            width: size.width,
        };
        setColumns(nextColumns);
    };

    //给每一列添加拉伸事件 如果没有指定宽度，给一个默认宽度
    const newColumns = _.map(columns, (col, index) => ({
        ...col,
        onHeaderCell: column => ({
            width: column.width ? column.width : 120,
            onResize: handleResize(index),
        }),
    }));

    return (
        //components 覆盖默认的 table 元素
        < Table components={components} columns={newColumns} {...restProps} />
    )
}

export default ResizeableTable;