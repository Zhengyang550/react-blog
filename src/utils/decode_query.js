/**
 * 解析 url query 参数
 * @author zy
 * @date 2020/4/6
 * @param param：url参数 如:?a=1&b=2&c=3
 * @return object：如：{a:1,b:2...}
 */
const decodeQuery = param => {
    const params = {}
    //替换url参数中的?
    const paramsStr = param.replace(/\.*\?/, '');
    paramsStr.split('&').forEach(v => {
        const d = v.split('=');
        if (d[1] && d[0]) {
            params[d[0]] = d[1];
        }
    })
    return params;
}

export default decodeQuery;