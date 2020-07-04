/**
 * @author zy
 * @date 2020/4/12
 * @Description:  Public 公共组件，挂在在 APP.jsx 中，用于存放初始化的组件/方法 或者公用的 modal 等
 */
import React from 'react';
import useMount from '@/hooks/use_mount';
import {useDispatch} from 'react-redux';
import SignModal from '@/components/public/sign_modal';
import {getTagList, getArticleListByViewCountDesc} from '@/redux/article/actions';
import {loadUser} from '@/redux/user/actions';
import * as authService from '@/service/auth';

/**
 * 公共组件 挂在在 APP.jsx 中，用于存放初始化的组件/方法 或者公用的 modal 等
 * @author zy
 * @date 2020/4/12
 */
function PublicComponent(props) {
    //获取dispatch
    const dispatch = useDispatch();

    //初始化加载
    useMount(() => {
        //获取登录信息
        const user = authService.getAuthInfo();
        user && dispatch(loadUser(user));
        dispatch(getTagList());
        dispatch(getArticleListByViewCountDesc());
    });


    return (
        <div>
            <SignModal/>
        </div>
    )
}

export default PublicComponent;
