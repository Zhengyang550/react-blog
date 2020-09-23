import service from "./service";
import cookie from 'react-cookies';

/**
 * @author zy
 * @date 2020/4/16
 * @Description: 授权相关
 */

//获取登录用户信息
export const getAuthInfo = () => {
    return cookie.load('auth_info');;
}

//获取登录用户token信息
export const getToken = () => {
    const user = getAuthInfo();
    if(user){
        return user.token;
    }
    return null;
}

//保存登录用户信息
export const saveAuthInfo = user => {
    removeAuthInfo();
    return cookie.save('auth_info',user);
}

//移除登录用户信息
export const removeAuthInfo = () => {
    cookie.save('auth_info',{})
}

//登录
export const login = ({username, password}) => {
    return service.get(`/auth/login?username=${username}&password=${password}`, null);
}

//github登录
export const githubLogin = code => {
    return service.get(`/auth/github?code=${code}`, null);
}

//登出
export const logout = () => {
    return service.get(`/auth/logout`);
}