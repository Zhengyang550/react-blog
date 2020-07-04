import marked from 'marked';
import xss from 'xss';

/**
 * 转化 md 语法为 html  cnpm install xss highlight marked --save
 * @author zy
 * @date 2020/4/6
 * @param {String} plainText：文本
 * @param {Bool} isGuardXss： 阻止xss攻击
 * @return
 */
const translateMarkdown = (plainText, isGuardXss = false) => {
    return marked(isGuardXss ? xss(plainText) : plainText, {
        renderer: new marked.Renderer(),
        gfm: true,
        pedantic: false,
        sanitize: false,
        tables: true,
        breaks: true,
        smartLists: true,
        smartypants: true,
        highlight: function (code) {
            /*eslint no-undef: "off"*/
            return hljs.highlightAuto(code).value
        }
    })
}

export default translateMarkdown;