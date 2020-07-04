/**
 * 获取面包屑
 * @author zy
 * @date 2020/4/22
 * @param {Array} menus：菜单列表 如：[{},{},{}]
 * @param {String} path：menu_config中的path 如：user
 */
 const getBreadcrumb = (menus,path) => {
    let breadcrumb = [];
    function find(menus, stack) {
        for (let menu of menus) {
            if (menu.path === path) {
                stack.push(menu.title);
                breadcrumb.push(...stack);
                return;
            } else if(menu.subMenus && menu.subMenus.length)  {
                stack.push(menu.title);
                find(menu.subMenus, stack);
                stack.pop()
            }
        }
    }
    find(menus, []);
    return breadcrumb;
}

export default getBreadcrumb