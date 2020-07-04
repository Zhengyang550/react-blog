import _ from 'lodash';

/**
 * 对数组进行分组
 * @param {Array} arr:  数组 每一个元素都是一个对象
 * @param {Function} f: 分组条件
 * @return 数组分组后的新数组
 */
const groupBy = (arr, f) => {
  const groups = {}
  _.forEach(arr,item => {
    const group = JSON.stringify(f(item));
    groups[group] = groups[group] || [];
    groups[group].push(item);
  })
  return Object.keys(groups).map(group => groups[group])
}

export default groupBy;
