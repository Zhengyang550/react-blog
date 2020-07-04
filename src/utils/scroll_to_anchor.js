/**
  * 跳转到指定位置
  * @author zy
  * @date 2020/4/8
  * @param {String} anchorName：id选择器
  */
const scrollToAnchor = anchorName => {
  let anchorElement = document.getElementById(anchorName);
  if(anchorElement) {
     anchorElement.scrollIntoView();
  }
};

export default scrollToAnchor;


