/**
 * @author zy
 * @date 2020/4/4
 * @Description: redux状态管理器配置
 * 不懂原理的可以参考：https://github.com/brickspert/blog/issues/22#middleware
 */
import thunk from 'redux-thunk';
import {createStore, applyMiddleware} from 'redux';
import rootReducers from './root_reducers';
//redux的可视化工具，谷歌的应用商城工具
import {composeWithDevTools} from 'redux-devtools-extension';
// 调用日志打印方法 collapsed是让action折叠，看着舒服点
import { createLogger } from 'redux-logger';


//这里判断项目环境，正式的话打印的，和可视化的中间件可以去掉
const storeEnhancers = process.env.NODE_ENV === 'production' ? applyMiddleware(thunk) :
   composeWithDevTools(applyMiddleware(thunk,createLogger()));

/**
 * 创建store
 * @author zy
 * @date 2020/4/5
 */
const configureStore = () => {
    //创建store对象
    const store = createStore(rootReducers, storeEnhancers);

    //保存store
    window.store = store;

    //reducer热加载
    if (process.env.NODE_ENV !== 'production') {
        if (module.hot) {
            module.hot.accept('./root_reducers', () => {
                store.replaceReducer(rootReducers)
            })
        }
    }

    return store;
}

export default configureStore();

