import _ from 'lodash';

/**
 * 解析menu_config 将配置路径由相对路径转为绝对路径 扁平结构
 * @author zy
 * @date 2020/4/8
 * @param {Array} menus：menu_config配置
 * @param {String} contextPath：设置根路径  如：/
 */
const getMenuMap = (menus, contextPath) => {
    const map = {};

    const decodeMenus = (menus, menuContextPath) => {
        _.forEach(menus, item => {
            //获取当前菜单路径
            let path = item.path ? `${menuContextPath}/${item.path}` : menuContextPath;
            map[item.path] = path.replace(/\/+/g, '/');
            if (item.subMenus) {
                decodeMenus(item.subMenus, path);
            }
        })
    }

    decodeMenus(menus, contextPath);
    return map;
}

export default getMenuMap;