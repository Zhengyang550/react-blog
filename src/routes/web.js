/**
 * @author zy
 * @date 2020/4/5
 * @Description: web路由
 * 不懂的可以参考：https://segmentfault.com/a/1190000020812860
 * https://reacttraining.com/react-router/web/api/Route
 */
import Layout from '@/layout/web';
import menus from '@/views/web/menu_config';
import { getMenuTree, getMenuMap } from '@/utils';
import { WEB_ROOT_PATH } from '@/config';
import articleConfig from '@/views/web/article/menu_config';
import tagConfig from '@/views/web/tag/menu_config';
import homeConfig from '@/views/web/home/menu_config';

/**
 * web路由配置项
 * @author zy
 * @date 2020/4/5
 */

//web 菜单配置
export const webMenuTree = getMenuTree(menus, WEB_ROOT_PATH);
export const webMenuMap = getMenuMap(menus, WEB_ROOT_PATH);

//web route配置   
export const webRouteConfig = {
    title: '布局',
    path: WEB_ROOT_PATH,
    component: Layout,                      //根路径下配置web统一布局样式
    subMenus: webMenuTree
}

//获取首页路由
export const getHomeRoute = () => {
    return webMenuMap[homeConfig.path];
}

//获取文章页面路由
export const getArticleRoute = id => {
    return webMenuMap[articleConfig.path].replace(/:.*$/g, id);
}

//获取标签页面路由
export const getTagRoute = name => {
    return webMenuMap[tagConfig.path].replace(/:.*$/g, name);
}
