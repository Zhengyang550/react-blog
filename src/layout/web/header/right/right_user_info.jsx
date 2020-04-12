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

/**
 * 用户细腻些组件
 * @author zy
 * @date 2020/4/12
 */
function UserInfo(props) {
    //dispatch
    const dispatch = useDispatch()

    //将store状态user映射到组件
    const userInfo = useSelector(state => state.user);

    //获取用户信息
    const {username} = userInfo;

    //使用bus
    const bus = useBus();

    //菜单
    const menuOverLay = (
        <Menu>
            <Menu.Item>
                <span>导入文章</span>
            </Menu.Item>
            <Menu.Item>
                <span>后台管理</span>
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
                    <Dropdown placement='bottomCenter' overlay={menuOverLay} trigger={['click', 'hover']}>
                        <Avatar size={32}
                                src='http://img2.imgtn.bdimg.com/it/u=3906498928,936423956&fm=26&gp=0.jpg'>{username}</Avatar>
                    </Dropdown>
                )
                : (
                    <div>
                        <Button
                            ghost
                            type='primary'
                            size='small'
                            style={{marginRight: 20}}
                            onClick={e => bus.emit('openSignModal', USER_LOGIN)}>
                            登录
                        </Button>
                        <Button ghost
                                type='danger'
                                size='small'
                                onClick={e => bus.emit('openSignModal', USER_REGISTER)}>
                            注册
                        </Button>
                    </div>
                )}
        </div>
    )
}

export default UserInfo;