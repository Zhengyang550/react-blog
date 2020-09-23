/**
 * @author zy
 * @date 2020/4/5
 * @Description: 用户无权限
 */
import React from 'react';
import {Result, Button} from 'antd';
import {useHistory} from 'react-router-dom';


/**
 * 用户无权限
 * @author zy
 * @date 2020/4/5
 */
const PageNotPermit = () => {
    //获取history
    const history = useHistory();

    return (
        <Result
            status='403'
            title='403'
            subTitle='Sorry, the page you visited does not permit.'
            extra={
                <Button
                    type='primary'
                    onClick={() => {
                        history.push('/')
                    }}>
                    Back Home
                </Button>
            }
        />
    )
}

export default PageNotPermit;
