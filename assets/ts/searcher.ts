type CAMPARE_CALLBACK = (inputText: string, dataSouceItem: any) => boolean;
type SEARCHEND_CALLBACK = (searchResult: any[]) => void;
class Searcher {
    public constructor() {

    }

    /**
     * @brief 设置搜索的数据源
     * @param dataSource 数据源
     */
    public addSearchDataSource(dataSource: any[]) {
        this._dataSource = this._dataSource.concat(dataSource);
        return this;
    }

    /**
     * @brief 搜索文字的input
     * @param dom 搜索文字的input
     */
    public setSearchTextDomElement(dom: HTMLElement) {
        this._input = dom;
        return this;
    }
    /**
     * @brief 搜索完毕后执行的回调。执行时传入搜索结果
     * @param callBack 回调
     */
    public setSearchEndCallBack(callBack: SEARCHEND_CALLBACK) {
        this._searchEndCallBack = callBack;
        return this;
    }
    /**
     * @brief 对比数据的回调
     * @param callback 回调
     */
    public setComperaCallBack(callback: CAMPARE_CALLBACK) {
        this._compareCallBack = callback;
        return this;
    }
    public start() {
        if (this._input != undefined) {
            this._input.oninput = () => {
                const text: string = (<HTMLInputElement>this._input).value;
                //输入为空
                if (text.length == 0) {
                    if (this._searchEndCallBack != undefined) {
                        this._searchEndCallBack([]);
                    }
                    return;
                }
                //空格风格的关键词
                const targets: string[] = text.split(' ');
                let SearchResult: any[] = [];
                //遍历数据源
                for (let i = 0; i < this._dataSource.length; i++) {
                    let isNotCompare: boolean = false;
                    //遍历关键词
                    for (const j in targets) {
                        if (this._compareCallBack != undefined) {
                            if (!this._compareCallBack(targets[j], this._dataSource[i])) {
                                isNotCompare = true;
                                break;
                            }
                        } else {
                            if (targets[j] != this._dataSource[i]) {
                                isNotCompare = true;
                                break;
                            }
                        }
                    }
                    if (!isNotCompare) {
                        //结果正确
                        SearchResult.push(this._dataSource[i]);
                    }
                }
                if (this._searchEndCallBack != undefined) {
                    this._searchEndCallBack(SearchResult);
                }
            }
        }
    }
    private _compareCallBack?: CAMPARE_CALLBACK = undefined;
    private _searchEndCallBack?: SEARCHEND_CALLBACK = undefined;
    private _dataSource: any[] = [];
    private _input?: HTMLElement = undefined;
    ;
}