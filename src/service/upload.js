/**
 * @author zy
 * @date 2020/9/22
 * @Description: 上传下载相关
 */
import service from './service';

//获取上传url
export const getUploadUrl = () => {
    return service.defaults.baseURL + '/attachment/upload';
};

//获取下载url
export const getDownloadUrl = (filename) => {
    return service.defaults.baseURL + `/attachment/download/${filename}`;
};

//文件上传
export const uploadFile = (formData) => service.post('/attachment/upload',formData );
