/**
 * @author zy
 * @date 2020/4/5
 * @Description: 合并reducer
 */
import {combineReducers} from 'redux';
import user from './user/reducer';
import article from './article/reducer';

export default combineReducers({user, article})