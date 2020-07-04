/**
 * @author zy
 * @date 2020/4/16
 * @Description: 用户相关接口请求
 */
import service from './service';

//新增用户
export const insertUser = user => {
    return service.post('/user/add', user);
}

//删除用户
export const deleteUser = id => {
    return service.get(`/user/delete?id=${id}`, null);
}

//更新用户
export const updateUser = user => {
    return service.post('/user/update', user);
}

//获取用户列表信息
export const getUserList = params => {
    return service.get('/user/list', {params: params});
}

