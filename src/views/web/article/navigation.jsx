/**
 * @author zy
 * @date 2020/4/30
 * @Description: 文章导航栏
 */
import React from 'react';
import {Anchor} from 'antd';
import {scrollToAnchor} from '@/utils';
import _ from 'lodash';

const {Link} = Anchor;

//根据 article content来生成锚点列表
const getAnchorList = (content) => {
    //匹配文章标题<hx id="xx">... 到下一个</hx>之前的内容     \1表示重复正则第一个圆括号内匹配到的内容
    const pattern = /<(h[1-6])[\s\S]+?(?=<\/\1>)/g;
    const list = [];

    const pushItem = (arr, item) => {
        const len = arr.length;
        const matchItem = arr[len - 1];
        if (matchItem && matchItem.tag !== item.tag) {
            pushItem(matchItem.children, item);
        } else {
            arr.push(item);
        }
    };

    //$0:<hx id='xx'>xx  $1:hx
    _.replace(content, pattern, ($0, $1) => {
        //获取标题 <hx id="xx">
        const title = _.replace($0, /.*?>/, '');
        //获取id起始索引
        const startIndex = $0.indexOf('"');
        //获取id结束索引
        const endIndex = $0.indexOf('">');
        //#id
        const href = `#${$0.slice(startIndex + 1, endIndex)}`;
        const currentItem = {
            tag: $1,       // 标签类型
            title,
            href,
            children: []
        };
        pushItem(list, currentItem);
    })
    return list;
}

const Navigation = ({content}) => {
    //根据 article content来生成锚点列表
    const list = getAnchorList(content);

    //跳转
    const handleAnchorClick = (e, link) => {
        if (link.href[0] === '#') {
            link.href = link.href.slice(1);
        }
        scrollToAnchor(link.href);
        e.preventDefault();
    };

    //Anchor锚点
    const renderLink = ({href, title, children}) => {
        return (
            <Link key={href} href={href} title={title}>
                {children.length > 0 && _.map(children, sub => renderLink(sub))}
            </Link>
        )
    }

    return <Anchor affix={false} onClick={handleAnchorClick}>{_.map(list, renderLink)}</Anchor>
}

export default Navigation;
