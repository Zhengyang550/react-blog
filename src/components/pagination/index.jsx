/**
 * @author zy
 * @date 2020/4/27
 * @Description:分页组件
 */
import React from 'react';
import PropTypes from 'prop-types';
import {Pagination} from 'antd';
import {useMediaQuery} from 'react-responsive';

const WebPagination = ({current, pageSize, total, onChange, ...props}) => {
    //判断宽度是否小于736
    const isLessThan736 = useMediaQuery({
        query: '(max-width: 736px)'
    });

    return (
        <Pagination
            hideOnSinglePage
            current={current}
            pageSize={pageSize}
            total={total}
            onChange={onChange}
            simple={isLessThan736}
            {...props}
        />
    );
}

WebPagination.propTypes = {
    total: PropTypes.number.isRequired,
    onChange: PropTypes.func.isRequired,
    current: PropTypes.number.isRequired,
    pageSize: PropTypes.number
}

WebPagination.defaultProps = {
    pageSize: 10
}

export default WebPagination;

