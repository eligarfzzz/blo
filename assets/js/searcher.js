"use strict";
var Searcher = /** @class */ (function () {
    function Searcher() {
        this._compareCallBack = undefined;
        this._searchEndCallBack = undefined;
        this._dataSource = [];
        this._input = undefined;
    }
    /**
     * @brief 设置搜索的数据源
     * @param dataSource 数据源
     */
    Searcher.prototype.addSearchDataSource = function (dataSource) {
        this._dataSource = this._dataSource.concat(dataSource);
        return this;
    };
    /**
     * @brief 搜索文字的input
     * @param dom 搜索文字的input
     */
    Searcher.prototype.setSearchTextDomElement = function (dom) {
        this._input = dom;
        return this;
    };
    /**
     * @brief 搜索完毕后执行的回调。执行时传入搜索结果
     * @param callBack 回调
     */
    Searcher.prototype.setSearchEndCallBack = function (callBack) {
        this._searchEndCallBack = callBack;
        return this;
    };
    /**
     * @brief 对比数据的回调
     * @param callback 回调
     */
    Searcher.prototype.setComperaCallBack = function (callback) {
        this._compareCallBack = callback;
        return this;
    };
    Searcher.prototype.start = function () {
        var _this = this;
        if (this._input != undefined) {
            this._input.oninput = function () {
                var text = _this._input.value;
                //输入为空
                if (text.length == 0) {
                    if (_this._searchEndCallBack != undefined) {
                        _this._searchEndCallBack([]);
                    }
                    return;
                }
                //空格风格的关键词
                var targets = text.split(' ');
                var SearchResult = [];
                //遍历数据源
                for (var i = 0; i < _this._dataSource.length; i++) {
                    var isNotCompare = false;
                    //遍历关键词
                    for (var j in targets) {
                        if (_this._compareCallBack != undefined) {
                            if (!_this._compareCallBack(targets[j], _this._dataSource[i])) {
                                isNotCompare = true;
                                break;
                            }
                        }
                        else {
                            if (targets[j] != _this._dataSource[i]) {
                                isNotCompare = true;
                                break;
                            }
                        }
                    }
                    if (!isNotCompare) {
                        //结果正确
                        SearchResult.push(_this._dataSource[i]);
                    }
                }
                if (_this._searchEndCallBack != undefined) {
                    _this._searchEndCallBack(SearchResult);
                }
            };
        }
    };
    ;
    return Searcher;
}());
