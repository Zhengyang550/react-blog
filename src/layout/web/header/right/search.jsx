/**
 * @author zy
 * @date 2020/4/6
 * @Description: 文章搜索
 */
import React from 'react';
import {useSelector, useDispatch} from 'react-redux';
import {Input} from 'antd';
import {SearchOutlined} from '@ant-design/icons';
import styles from './styles.scss';
import {setKeyword} from '@/redux/article/actions';


const SearchButton = props => {
    //dispatch
    const dispatch = useDispatch()

    //将store状态article映射到组件
    const article = useSelector(state => state.article);

    //获取文章信息
    const {keyword} = article;

    //搜索关键字发生变化
    const handleChange = e => {
        dispatch(setKeyword(e.target.value));
    }

    return (
        <div className={styles.searchBox}>
            <SearchOutlined className={styles.searchIcon}/>
            <Input
                type='text'
                value={keyword}
                onChange={handleChange}
                className={styles.searchInput}
                placeholder='搜索文章'
                style={{width: 200}}
            />
        </div>
    )
}

export default SearchButton;