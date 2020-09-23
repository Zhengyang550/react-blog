/**
 * @author zy
 * @date 2020/5/7
 * @Description: web路由
 * 不懂的可以参考：https://segmentfault.com/a/1190000020812860
 * https://reacttraining.com/react-router/web/api/Route
 */
import Layout from '@/layout/admin';
import menus from '@/views/admin/menu_config';
import { getMenuTree, getMenuMap } from '@/utils';
import { ADMIN_ROOT_PATH } from '@/config';
import adminConfig from '@/views/admin/home/menu_config';
import articleEditConfig from '@/views/admin/article/edit/menu_config';

/**
 * admin路由配置项
 * @author zy
 * @date 2020/5/7
 */
//admin 菜单配置
export const adminMenuTree = getMenuTree(menus, ADMIN_ROOT_PATH);
export const adminMenuMap = getMenuMap(menus, ADMIN_ROOT_PATH);

//admin route配置   
export const adminRouteConfig = {
    title: '布局',
    path: ADMIN_ROOT_PATH,
    component: Layout,                      //根路径下配置admin统一布局样式
    subMenus: adminMenuTree
}

//获取admin路由
export const getAdminRoute = () => {
    return adminMenuMap[adminConfig.path];
}

//获取文章编辑页面路由
export const getArticleEditRoute = id => {
    return adminMenuMap[articleEditConfig.path].replace(/:.*$/g, id);
}