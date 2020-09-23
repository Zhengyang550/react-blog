/**
 * @author zy
 * @date 2020/5/7
 * @Description: 顶部布局
 */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {useHistory} from 'react-router-dom';
import {useBus} from '@/hooks/use_bus';
import {USER_LOGIN} from '@/redux/user/types';
import {loginout} from '@/redux/user/actions';
import {Menu, Dropdown} from 'antd';
import {DownOutlined} from '@ant-design/icons';
import {getHomeRoute} from '@/routes/web'
import styles from './styles.scss';

const AdminHeader = props => {
    //获取dispatch
    const dispatch = useDispatch();

    //获取登陆用户信息
    const user = useSelector(state => state.user);

    //获取history
    const history = useHistory();

    //使用bus
    const bus = useBus();

    //跳转
    const jumpTo = route => {
        history.push(route);
    };

    //菜单
    const menuOverLay = (
        <Menu>
            <Menu.Item>
                <span onClick={() => jumpTo(getHomeRoute())}>返回主页</span>
            </Menu.Item>
            <Menu.Item>
                <span onClick={() => user.isLogin ? dispatch(loginout()):
                    bus.emit('openSignModal', USER_LOGIN)}
                >{user.isLogin && '退出'}登录</span>
            </Menu.Item>
        </Menu>
    );

    return (
        <div className={styles.header}>
            <div className={styles.title}>博客管理</div>
            <Dropdown overlay={menuOverLay} className={styles.dropdown}>
                {/*eslint-disable-next-line*/}
                <a>{user.isLogin ? user.username : '未登录'}<DownOutlined style={{marginLeft: '5px'}}/></a>
            </Dropdown>
        </div>
    )
}

export default AdminHeader;