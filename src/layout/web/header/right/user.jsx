/**
 * @author zy
 * @date 2020/4/12
 * @Description: 用户信息
 */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Button, Dropdown, Menu, Avatar} from 'antd';
import {useBus} from '@/hooks/use_bus';
import {USER_LOGIN, USER_REGISTER} from '@/redux/user/types';
import {loginout} from '@/redux/user/actions';
import {SIDEBAR} from '@/config';
import {getAdminRoute} from '@/routes/admin';
import {useHistory} from 'react-router-dom';


const User = props => {
    //dispatch
    const dispatch = useDispatch()

    //将store状态user映射到组件
    const userInfo = useSelector(state => state.user);

    //获取用户信息
    const {username} = userInfo;

    //获取history
    const history = useHistory();

    //使用bus
    const bus = useBus();

    //菜单
    const menuOverLay = (
        <Menu>
            <Menu.Item>
                <span>导入文章</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={() => history.push(getAdminRoute())}>后台管理</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={() => dispatch(loginout())}>退出登录</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div>
            {/*登录 or not*/}
            {username ? (
                <Dropdown placement='bottomCenter' overlay={menuOverLay}>
                    <Avatar size={32} src={SIDEBAR.avatar}>
                        {username}
                    </Avatar>
                </Dropdown>
            ) : (
                <div>
                    <Button ghost type='primary' size='small' style={{marginRight: 20}}
                            onClick={e => bus.emit('openSignModal', USER_LOGIN)}
                    >
                        登录
                    </Button>
                    <Button ghost type='danger' size='small'
                            onClick={e => bus.emit('openSignModal', USER_REGISTER)}
                    >
                        注册
                    </Button>
                </div>
            )}
        </div>
    )
}

export default User;