/**
 * @author zy
 * @date 2020/4/27
 * @Description: 文章标签组件
 */
import PropTypes from 'prop-types';
import React from 'react';
import {Link} from 'react-router-dom';
import {Divider, Badge, Tag} from 'antd';
import {TagsOutlined} from '@ant-design/icons';
import _ from "lodash";
import {generateColor} from '@/utils';
import {getTagRoute} from '@/routes/web';
import styles from "./styles.scss";

const ArticleTag = props => {
    //给每个标签对象添加颜色字段
    const tagList = generateColor(props.tagList);

    //是否显示标签图标 显示徽标数
    const {showTagIcon, showBadge} = props;

    return (
        <>
            {tagList.length > 0 ?
                <div className={styles.list}>
                    <Divider type='vertical'/>

                    {showTagIcon && <TagsOutlined style={{marginRight: 8}}/>}

                    {_.map(tagList, (tag, index) => {
                        return showBadge ? (
                            <Badge key={index} className={styles.badge} count={tag.count}>
                                <Tag color={tag.color}>
                                    <Link className={styles.link} title={tag.name} to={getTagRoute(tag.name)}>
                                        {tag.name}
                                    </Link>
                                </Tag>
                            </Badge>
                        ) : (
                            <Tag key={index} color={tag.color}>
                                <Link className={styles.link} title={tag.name} to={getTagRoute(tag.name)}>
                                    {tag.name}
                                </Link>
                            </Tag>
                        )
                    })}
                </div>
                : ''
            }
        </>
    )
}

//属性类型限定
ArticleTag.propTypes = {
    tagList: PropTypes.array.isRequired,
    showTagIcon: PropTypes.bool,
    showBadge: PropTypes.bool
}

ArticleTag.defaultProps = {
    showTagIcon: false,
    showBadge: false
}

export default ArticleTag;