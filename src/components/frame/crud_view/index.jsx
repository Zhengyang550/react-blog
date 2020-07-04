/**
 * @author zy
 * @date 2020/5/10
 * @description:  公共页面组件 头部是action、中间是table
 */
import React from 'react';
import styles from './styles.scss';
import PropTypes from 'prop-types';
import ResizeableTable from '@/components/resizeable_table';

const CrudView = ({tableProps, actionButtons = [], queryItems = []}) => {
    return (
        <div className={styles.crudView}>
            {
                (actionButtons.length > 0 || queryItems.length > 0) &&
                <div className={styles.toolbar}>
                    <div className={styles.actionButtons}>
                        {actionButtons}
                    </div>
                    <div className={styles.queryItems}>
                        {queryItems}
                    </div>
                </div>
            }
            <div className={styles.tableWrapper}>
                <ResizeableTable {...tableProps} />
            </div>
        </div>
    )
};

CrudView.prototype = {
    actionButtons: PropTypes.array,
    queryItems: PropTypes.array
}

CrudView.defaultProps = {
    actionButtons: [],
    queryItems: []
}

export default CrudView;