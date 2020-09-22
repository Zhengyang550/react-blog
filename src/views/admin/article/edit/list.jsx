/**
 * @author zy
 * @date 2020/5/16
 * @Description: 文章标签
 */
import React, {useState} from 'react';
import {Tag, Tooltip, Input} from 'antd';
import _ from 'lodash';
import styles from './styles.scss';
import {PlusOutlined} from '@ant-design/icons';

const {CheckableTag} = Tag;

const List = props => {
    //列表
    let {list, setList} = props;

    //选中的列表
    const {selectedList, setSelectedList} = props;

    //输入框可见
    const [inputVisible, setInputVisible] = useState(false);

    //输入内容
    const [inputValue, setInputValue] = useState('');

    //输入框引用
    let inputRef = null

    //点击选中事件
    const handleSelect = (value, checked) => {
        const newList = checked ? [...selectedList, value] : _.filter(selectedList, item => item !== value);
        setSelectedList(newList);
    };

    //显示输入框
    const handleClick = () => {
        setInputVisible(true)
        inputRef && inputRef.focus();
    };

    //确认
    const handleInputConfirm = () => {
        //新增
        if (inputValue && _.indexOf(list, inputValue) === -1) {
            list = [...list, inputValue];
        }
        setInputVisible(false);
        setInputValue('');
        setList(list);
    };


    //遍历每一个元素
    const genTag = _.map(list, item => {
        const tagElem = (
            <CheckableTag
                className={styles.check}
                key={item}
                checked={selectedList.includes(item)}
                onChange={checked => handleSelect(item, checked)}
            >
                {item}
            </CheckableTag>
        );

        return (
            <Tooltip key={item} title={item}>
                {tagElem}
            </Tooltip>
        );
    });

    return (
        <div className={styles.tagList}>
            {genTag}
            {!inputVisible && (
                <Tag onClick={handleClick}>
                    <PlusOutlined/> New Tag
                </Tag>
            )}
            {inputVisible && (
                <Input
                    className={styles.input}
                    type="text"
                    size="small"
                    ref={el => {
                        inputRef = el
                    }}
                    value={inputValue}
                    onChange={e => setInputValue(e.target.value)}
                    onBlur={handleInputConfirm}
                    onPressEnter={handleInputConfirm}
                />
            )}
        </div>
    )
};

export default List;