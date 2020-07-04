import _ from 'lodash';
import {COLOR_LIST} from './config';

/**
 * 给数组每个元素新增颜色字段
 * @author zy
 * @date 2020/4/22
 * @param {Array} list：如[{},{},{}]
 */
 const generateColor = (list, colors = COLOR_LIST) => {
    _.forEach(list, (item, index) => {
        const num = Math.floor(Math.random() * colors.length);
        _.assign(item, {color: colors[index] || colors[num]});
    })
    return list;
}

export default generateColor;