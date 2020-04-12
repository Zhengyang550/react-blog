/**
 * @author zy
 * @date 2020/4/12
 * @Description: 注册 or 登录对话框
 */
import React, {useState} from 'react';
import {Form, Input, Button, Modal} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {login, register} from '@/redux/user/actions';
import {USER_LOGIN} from '@/redux/user/types'
import {useDispatch} from 'react-redux';
import {busListener} from '@/hooks/use_bus';

//表单样式调整
const FormItemLayout = {
    labelCol: {
        xs: {span: 0},
        sm: {span: 5}
    },
    wrapperCol: {
        xs: {span: 24},
        sm: {span: 19}
    }
}

/**
 * 用户注册 or 登录组件
 * @author zy
 * @date 2020/4/12
 */
function SignModal(props) {
    //获取表单
    const [form] = Form.useForm();

    //获取dispatch
    const dispatch = useDispatch();

    //对话框可见？
    const [visible, setVisible] = useState(false)

    //类型：登录 or 注册
    const [type, setType] = useState('login')

    //事件监听 如果触发登录或者注册事件，显示该对话框
    busListener('openSignModal', type => {
        form.resetFields();
        setType(type);
        setVisible(true);
    })

    //提交表单且数据验证成功后回调事件
    const onFinish = values => {
        console.log('Received values of form: ', values);
        const action = type === USER_LOGIN ? login : register;
        dispatch(action(values)).then(() => {
            setVisible(false);
        })
    };

    //确认密码
    function compareToFirstPassword(rule, value, callback) {
        if (value && value !== form.getFieldValue('password')) {
            callback('Two passwords that you enter is inconsistent!')
        } else {
            callback()
        }
    }

    return (
        <Modal
            width={420}
            title={type === USER_LOGIN ? 'login' : 'register'}
            visible={visible}
            onCancel={e => setVisible(false)}
            footer={null}>
            <Form
                form={form}
                name="normal_login"
                layout="horizontal"
                onFinish={onFinish}

            >
                {/*登录或注册*/}
                {type === USER_LOGIN ? (
                        <div>
                            <Form.Item
                                name="username"
                                rules={[{required: true, message: 'Please input your Username!'}]}
                            >
                                <Input prefix={<UserOutlined className="site-form-item-icon"/>} placeholder="Username"/>
                            </Form.Item>

                            <Form.Item
                                name="password"
                                rules={[{required: true, message: 'Please input your Password!'}]}
                            >
                                <Input
                                    prefix={<LockOutlined/>}
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>
                        </div>
                    )
                    : (
                        <div>
                            <Form.Item
                                {...FormItemLayout}
                                label="用户名"
                                name="username"
                                rules={[{required: true, message: 'Please input your Username!'}]}
                            >
                                <Input placeholder="Username"/>
                            </Form.Item>

                            <Form.Item
                                {...FormItemLayout}
                                label="密码"
                                name="password"
                                rules={[{required: true, message: 'Please input your Password!'}]}
                            >
                                <Input
                                    type="password"
                                    placeholder="Password"
                                />
                            </Form.Item>

                            <Form.Item
                                {...FormItemLayout}
                                label="确认密码"
                                name='confirm'
                                rules={[
                                    {required: true, message: 'Password is required'},
                                    {validator: compareToFirstPassword}
                                ]}>
                                <Input placeholder='Confirm Password' type='password'/>
                            </Form.Item>

                            <Form.Item
                                {...FormItemLayout}
                                label="邮箱"
                                name='email'
                                rules={[
                                    {type: 'email', message: 'The input is not valid E-mail!'},
                                    {required: true, message: 'Please input your E-mail!'}
                                ]}>
                                <Input placeholder='Email'/>
                            </Form.Item>
                        </div>
                    )}
                <Form.Item>
                    <Button type="primary" htmlType="submit" style={{width: '100%'}}>
                        Login
                    </Button>
                </Form.Item>
            </Form>
        </Modal>
    )
}

export default SignModal;