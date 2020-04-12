/**
 * @author zy
 * @date 2020/4/12
 * @Description:  Public 公共组件，挂在在 APP.jsx 中，用于存放初始化的组件/方法 或者公用的 modal 等
 */
import React from 'react';
import useMount from '@/hooks/use_mount'
import SignModal from '@/components/public/sign_modal';

/**
 * 公共组件
 * @author zy
 * @date 2020/4/12
 */
function PublicComponent(props) {
    useMount(() => {
    })

    return (
        <div>
            <SignModal/>
        </div>
    )
}

export default PublicComponent;
