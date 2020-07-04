/**
 * @author zy
 * @date 2020/5/3
 * @Description: 评论编辑组件
 */
import React from 'react';
import {Form, Button, Input} from 'antd';
import {InfoCircleOutlined} from '@ant-design/icons';
import PropTypes from "prop-types";
import styles from './styles.scss';

const {TextArea} = Input;

const Editor = ({onChange, onSubmit, loading, value}) => (
    <div className={styles.editor}>
        {/* input */}
        <Form.Item>
            <TextArea
                rows={4}
                placeholder="说点什么..."
                value={value}
                onChange={onChange}
            />
        </Form.Item>

        {/* submit */}
        <Form.Item>
            <div className={styles.controls}>
                <InfoCircleOutlined className={styles.controlsTipIcon}/>
                <span className={styles.controlsTip}>
                    支持 Markdown 语法
                </span>
                <Button
                    htmlType="submit"
                    loading={loading}
                    onClick={onSubmit}
                    type="primary"
                >
                    添加评论
                </Button>
            </div>
        </Form.Item>
    </div>
)


Editor.prototype = {
    onChange: PropTypes.func.onChange,
    onSubmit: PropTypes.func.isRequired,
    loading: PropTypes.bool.isRequired,
    value: PropTypes.string.isRequired
}

export default Editor;


