/**
 * @author zy
 * @date 2020/8/28
 * @Description: 查询信息
 */
import React from 'react';
import {Form, Input, Select, Button} from 'antd';
import _ from 'lodash';

const {useForm} = Form;

interface FieldData {
    name: string[];
    value: any;
    touched: boolean;
    validating: boolean;
    errors: string[];
}

//自定义form item属性
interface CustomizedFormProps {
    onChange: (fields: FieldData[]) => void;
    fields: FieldData[];
}

const QueryForm: React.FC<CustomizedFormProps> = (
    {onChange, fields, onFinish,tagList,downLoadAll,...props}
) => {

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
            <Form.Item name='keyword' label='关键字'>
                <Input style={{width: 200}} placeholder='请输入文章关键字' allowClear/>
            </Form.Item>

            <Form.Item name='selectTag' label='标签'>
                <Select style={{width: 200}} allowClear>
                    {_.map(tagList, item => (
                        <Select.Option key={item.name} value={item.name}>
                            {item.name}
                        </Select.Option>
                    ))}
                </Select>
            </Form.Item>

            <Form.Item>
                <Button type='primary' htmlType='submit' style={{marginRight: 8}}>检索</Button>
                <Button type='primary' onClick={downLoadAll} style={{ marginRight: 8 }}>
                    导出全部文章
                </Button>
            </Form.Item>
        </Form>
    )
};


export default QueryForm;