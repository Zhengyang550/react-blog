/**
 * @author zy
 * @date 2020/4/16
 * @Description: 标签相关接口请求
 */
import service from './service';

export const getTagList = () => {
    return service.get('/tag/list', {params: null});
}
