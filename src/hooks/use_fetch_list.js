/**
 * @author zy
 * @date 2020/4/20
 * @description: 获取列表数据
 */
import {useEffect, useState, useCallback} from 'react';


/**
 * @author zy
 * @date 2020/4/20
 * @description: 获取列表数据 如果请求参数不指定页数：默认current: 1, pageSize:10
 * @param {Function} requestService: 请求服务
 * @param {Object} queryParams: 获取列表默认查询参数
 * @param {bool} withLoading: 是否携带 loading
 * @param {Array} fetchDependence: 依赖
 */
export default function useFetchList({
        requestService,
        queryParams = null,
        withLoading = true,
        fetchDependence = []
    }) {
    //数据列表
    const [dataList, setDataList] = useState([]);
    //加载缓冲
    const [loading, setLoading] = useState(false);
    //分页
    const [pagination, setPagination] = useState({current: 1, pageSize: 10, total: 0})

    //第一次挂载 或者依赖发生变化
    useEffect(() => {
        //如果有依赖 将地址栏参数也解析为查询参数  情景：对于分页查询页面，
        fetchDataList();
        // eslint-disable-next-line
    }, fetchDependence);


    /**
     * 获取数据
     * @param {Function} params：获取列表附加的请求参数 可以覆盖默认请求参数requestParams
     */
    const fetchDataList = (params) => {
        const requestParams = {
            current: pagination.current,
            pageSize: pagination.pageSize,
            all:false,
            ...queryParams,
            ...params,
        };

        withLoading && setLoading(true);

        //调用后端接口 获取数据
        requestService(requestParams)
            .then(res => {
                const data = res.data;

                //例如 删除了列表里只有一项且删除，则需要跳转回前一页 也即最后一页
                const totalPage = Math.max(Math.ceil(data.total / data.pageSize),1);
                if (totalPage < data.current){
                    return fetchDataList({ current: totalPage });
                }

                pagination.total = data.total;
                pagination.current = data.current;
                pagination.pageSize = data.pageSize;
                setPagination({...pagination});
                setDataList(data.list);
                withLoading && setLoading(false)
            }).catch(e =>
            withLoading && setLoading(false)
        )
    };

    //同useEffect一样，useCallback的第二个参数是用于比较上下文中对应值是否变化，如果有变化则会重新声明回调函数。如果这个参数为空数组，则只会在component挂载时运行。如果不存在这个参数，则会在每次渲染时运行。
    // eslint-disable-next-line react-hooks/exhaustive-deps
    const handlePageChange = useCallback(current => {
        fetchDataList({current:current});
    });

    //返回参数
    return {
        dataList,
        setDataList,
        loading,
        setLoading,
        fetchDataList,
        pagination: {
            ...pagination,
            onChange: handlePageChange
        },
        setPagination
    };
}