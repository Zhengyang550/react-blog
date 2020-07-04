/**
 * @author zy
 * @date 2020/5/7
 * @Description: 查询信息
 */
import React from 'react';
import {Form, Input, Select, Button, DatePicker} from 'antd';
import _ from 'lodash';

const {useForm} = Form;
const {RangePicker} = DatePicker;

interface FieldData {
    name: string[];
    value: any;
    touched: boolean;
    validating: boolean;
    errors: string[];
}

interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}

const QueryForm: React.FC<CustomizedFormProps> = (
    {onChange, fields, onFinish, ...props}
) => {

    //user type
    const typeMapList = [
        {value: 0, label: 'github 用户'},
        {value: 1, label: '站内用户'}
    ];

    // eslint-disable-next-line react-hooks/rules-of-hooks
    const [form] = props.form || useForm();

    return (
        <Form
            form={form}
            layout='inline'
            fields={fields}
            onFieldsChange={(changedFields, allFields) => {
                onChange(allFields);
            }}
            onFinish={onFinish}
        >
            <Form.Item name='username' label='姓名'>
                <Input style={{width: 200}} placeholder='请输入姓名' allowClear/>
            </Form.Item>

            <Form.Item name='userType' label='用户类型'>
                <Select style={{width: 200}} allowClear>
                    {_.map(typeMapList, item => (
                        <Select.Option key={item.value} value={item.value}>
                            {item.label}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item name='createAts' label='创建日期'>
                <RangePicker/>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' style={{marginRight: 8}}>检索</Button>
            </Form.Item>
        </Form>
    )
};


export default QueryForm;