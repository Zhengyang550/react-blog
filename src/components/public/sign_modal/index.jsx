/**
 * @author zy
 * @date 2020/4/12
 * @Description: 注册 or 登录对话框
 */
import React, {useState} from 'react';
import {Form, Input, Button, Modal} from 'antd';
import {UserOutlined, LockOutlined} from '@ant-design/icons';
import {login, githubLogin, register} from '@/redux/user/actions';
import {useHistory} from 'react-router-dom';
import {USER_LOGIN} from '@/redux/user/types'
import {useDispatch} from 'react-redux';
import {busListener} from '@/hooks/use_bus';
import {GITHUB} from '@/config';
import {GithubOutlined} from '@ant-design/icons';
import {decodeQuery} from '@/utils';
import useMount from '@/hooks/use_mount';
import styles from './styles.scss';

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
    //获取history
    const history = useHistory();

    //获取表单
    const [form] = Form.useForm();

    //获取dispatch
    const dispatch = useDispatch();

    //对话框可见？
    const [visible, setVisible] = useState(false);

    //github登录中
    const [loading, setLoading] = useState(false);

    //类型：登录 or 注册
    const [type, setType] = useState('USER_LOGIN');

    useMount(() => {
        //解析参数 判断是不是从github授权页面登录进来
        const params = decodeQuery(history.location.search);
        if (params.code) {
            //如果是从github跳转过来的 则显示弹框
            setVisible(true);
            //如果是从github跳转过来的 则表示正在登录中
            setLoading(true);
            //加载类型
            setType(params.state);
            dispatch(githubLogin(params.code)).then(data => {
                setVisible(false);
            }).catch(err => {
                setVisible(true);
            }).finally(() => {
                    //修改url 去除code
                    window.history.replaceState(null, document.title, history.location.pathname);
                    //关闭登录状态
                    setLoading(false);
                }
            );
        }
    });

    //事件监听 如果触发登录或者注册事件，显示该对话框
    busListener('openSignModal', type => {
        form.resetFields();
        setType(type);
        setVisible(true);
    });

    //提交表单且数据验证成功后回调事件
    const onFinish = values => {
        const action = type === USER_LOGIN ? login : register;
        dispatch(action(values)).then((data) => {
            setVisible(false);
        });
    };

    //github登录
    const handleGithubLogin = () => {
        //打开github授权  授权之后 会跳转到github配置的返回url页面  保存登录之前的状态，用户返回后恢复登录前的状态
        window.location.href = `${GITHUB.url}?client_id=${GITHUB.client_id}&state=${type}`;
        setLoading(true);
    };

    //确认密码
    function compareToFirstPassword(rule, value, callback) {
        if (value && value !== form.getFieldValue('password')) {
            callback('两次输入的密码不一致!')
        } else {
            callback()
        }
    }

    return (
        <Modal
            className={styles.login}
            width={420}
            title={type === USER_LOGIN ? '登录' : '注册'}
            visible={visible}
            onCancel={e => setVisible(false)}
            footer={null}
        >
            <Form
                form={form}
                name='normal_login'
                layout='horizontal'
                onFinish={onFinish}
            >
                {
                    //github登录中？
                    loading ? (
                        <div className={styles.github}>
                            <div>
                                <img
                                    src='https://github.githubassets.com/images/spinners/octocat-spinner-64.gif'
                                    alt='loading'
                                />
                            </div>
                            <div className={styles.text}>Loading activity...</div>
                        </div>
                    ) : (
                        //未登录
                        <>
                            {/*登录或注册*/}
                            {type === USER_LOGIN ? (
                                    <>
                                        <Form.Item
                                            name='username'
                                            rules={[{required: true, message: '请输入用户名!'}]}
                                        >
                                            <Input prefix={<UserOutlined/>} placeholder='Username'/>
                                        </Form.Item>

                                        <Form.Item
                                            name='password'
                                            rules={[{required: true, message: '请输入密码!'}]}
                                        >
                                            <Input
                                                prefix={<LockOutlined/>}
                                                type='password'
                                                placeholder='Password'
                                            />
                                        </Form.Item>
                                    </>
                                )
                                : (
                                    <>
                                        <Form.Item
                                            {...FormItemLayout}
                                            label='用户名'
                                            name='username'
                                            rules={[{required: true, message: '请输入用户名!'}]}
                                        >
                                            <Input placeholder='Username'/>
                                        </Form.Item>

                                        <Form.Item
                                            {...FormItemLayout}
                                            label='密码'
                                            name='password'
                                            rules={[{required: true, message: '请输入密码!'}]}
                                        >
                                            <Input
                                                type='password'
                                                placeholder='Password'
                                            />
                                        </Form.Item>

                                        <Form.Item
                                            {...FormItemLayout}
                                            label='确认密码'
                                            name='confirm'
                                            rules={[
                                                {required: true, message: 'Password is required'},
                                                {validator: compareToFirstPassword}
                                            ]}>
                                            <Input placeholder='Confirm Password' type='password'/>
                                        </Form.Item>

                                        <Form.Item
                                            {...FormItemLayout}
                                            label='邮箱'
                                            name='email'
                                            rules={[
                                                {type: 'email', message: '邮箱格式不正确!'},
                                                {required: true, message: '请输入邮箱!'}
                                            ]}>
                                            <Input placeholder='Email'/>
                                        </Form.Item>
                                    </>
                                )
                            }
                            <Button
                                type='primary'
                                htmlType='submit'
                                style={{width: '100%'}}
                            >
                                {type === USER_LOGIN ? '登录' : '注册'}
                            </Button>
                        </>
                    )
                }
            </Form>
            {GITHUB.enable && (
                <Button
                    onClick={handleGithubLogin}
                    style={{marginTop: 10, width: '100%'}}
                    loading={loading}
                >
                    <GithubOutlined/>
                    github login
                </Button>
            )}
        </Modal>
    )
}

export default SignModal;