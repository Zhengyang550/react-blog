/**
 * @author zy
 * @date 2020/5/4
 * @Description: 时间线组件
 */
import PropTypes from 'prop-types';
import React from 'react';
import {Timeline} from 'antd';
import {Link} from 'react-router-dom';
import {getArticleRoute} from '@/routes/web';
import _ from 'lodash';
import styles from './styles.scss';

const TimeLineList = ({list, type, name}) => {
    return (
        <Timeline className={styles.timeline}>
            <Timeline.Item>
                <h1 className={styles.title}>
                    <span className={styles.name} title={name}>{name}</span>
                    <span className={styles.type}> {type}</span>
                </h1>
                <br/>
            </Timeline.Item>

            {_.map(list, item => (
                <Timeline.Item key={item.id}>
                    <span className={styles.createAt}>{item.createdAt.slice(5, 10)}</span>
                    <Link to={getArticleRoute(item.id)}>{item.title}</Link>
                </Timeline.Item>
            ))}
        </Timeline>
    )
}

TimeLineList.prototype = {
    list: PropTypes.array.isRequired,            //列表
    type: PropTypes.string.isRequired,           //类型
    name: PropTypes.string.isRequired            //名称

}

export default TimeLineList;