/**
 * @author zy
 * @date 2020/4/6
 * @Description: 项目配置文件
 */
import React from 'react';
import {GithubOutlined, IeOutlined} from '@ant-design/icons';

//web 根路径
export const WEB_ROOT_PATH = '/';

//admin根路径
export const ADMIN_ROOT_PATH = '/admin';

//顶部导航栏博客名称
export const HEADER_BLOG_NAME = '我的博客';

//侧边导航栏信息
export const SIDEBAR = {
    avatar: require('@/assets/images/avatar.jpeg'),  // 侧边导航栏头像
    title: '郑大大',                                  // 标题
    subTitle: '前端打杂人员，略微代码洁癖',             // 子标题
    // 个人主页
    homepages: {
        github: {
            link: 'https://github.com/Zhengyang550',
            icon: GithubOutlined
        },
        cnblogs: {
            link: 'https://www.cnblogs.com/zyly/',
            icon: IeOutlined
        }
    }
}

//公告
export const ANNOUNCEMENT = {
    enable: false,              // 是否开启
    content: (
        <div>
            由于服务器期限将至 / ssl 证书过期 / 域名过期，请访问
            <a target="_blank" rel="noopener noreferrer" href="https://www.cnblogs.com/zyly/">最新的博客地址</a>
        </div>
    )
}

//github config
export const GITHUB = {
    enable: true,                                   // github 第三方授权开关
    app_id: 64410,
    client_id: 'Iv1.055b9abbe18d4600',              // github上申请：Setting > Developer setting > OAuth applications => client_id
    client_secret: 'f1b9ac6c8fba2da9088f70c38a381acd3281f40a',
    url: 'https://github.com/login/oauth/authorize' // 跳转的登录的地址
}