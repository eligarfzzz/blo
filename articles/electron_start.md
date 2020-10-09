# node、electron调用C++、打包

## 环境安装

```shell
npm install @saleae/ffi
```
注意不一定是@saleae/ffi（nodejs -v 10+），可有可能是ffi（nodejs -v -9)或ffi-napi（nodejs -v 12+,electron)，根据实际选择,同样require时也要修改对应模块
## 准备dll
```C++
std::string wstirng_to_string(std::wstring in) 
{
	return std::string(in.begin(), in.end());
}

extern "C" WIN32PROJECT3_API  char* test(const wchar_t * input, int type, bool flg, wchar_t* out)
{

	std::string str (wstirng_to_string(input));
	char *res = new char[str.size() + 1];// 以后delete[]
	strcpy_s(res, str.size() + 1 , str.c_str());
	return res;
}
```
## nodejs调用

```javascript
const ffi = require("@saleae/ffi");
const lib = new ffi.Library("./Win32Project3.dll", {
    "test": ["string",
        ["string", "int32", "bool","string"]
    ]
})

function TEXT(text) {
    return Buffer.from(text+'\0','ucs2')
}
let out='';
console.log(lib.test(TEXT("nifoa"), 1, 0,out));
```
**如果dll有依赖其他dll，还需要在主进程中添加环境路径**

```javascript
process.env.PATH = `${process.env.PATH}${path.delimiter}${pathToAdd}`;
```



## 回调

js

```javascript
function cbdf(s){
    console.log(s);
}

const lib = new ffi.Library("K:/iii/Win32Project3/x64/Debug/Win32Project3.dll", {
    "setdebug": ['void', [
        ffi.Function('string', ['string'])//一个函数指针参数
    ]],
})
lib.setCB(cbf);
```
C++接口，调用
```C++
using Debug_t = void(*)( char *);
extern "C" WIN32PROJECT3_API void setdebug(Debug_t cb)
{
	debug_f = cb;
}
//.....
debug_f("something");
//......

```

## 几个重要的注意点
- node版本10以上，不能使用npm install ffi， 用@saleae/ffi代替。包括requirer时
- 字符串从C++向js传递时用`char *`，js向C++时使用`wchar_t *`,包括回调时
- 返回的字符串必须注意声明周期，可以使用new 出的char*
- 字符串交互较复杂，而js总是字符串用的较多
- 注意安装npm模块时使用管理员模式使用命令行   

如果遇到abi node_module_version不匹配的情况，请检查以下几项
- 如果再electron中调用，需使用ffi-napi，并注意node、electron、ffi-napi版本
- ***node -v12，electron@6.0.10 ，ffi-napi@2.4.5是一个可用的组合***


## 打包
安装electron-builder
```shell
npm install electron-builder
```
package.json的scripts中添加
```json
  "build":"electron-builder"
```
根元素添加
```json
  "build": {
    "appId": "ele",
    "directories": {
      "output": "build"
    },
    "win": {
        // icon
      "icon": "icon.ico"
    },
      // 安装包选项
    "nsis": {
        //快速安装
      "oneClick": false,
        //用户选择目录
      "allowToChangeInstallationDirectory": true,
        // 安装包的icon
      "installerIcon": "icon.ico"
    }
  }
```
然后运行
```shell
npm run build
```
如果网络较慢，可能会出错，但会自动重连，需要耐心等待。如果有其它静态资源，build元素中添加

```json

"extraResources": [
    {
        from:"./libs",
        to:"../libs"
    }
]
```

实际`html`使用的`js`、`css`等资源，会随着开发目录中所有文件打进`resources/app`中，无需放进`extraResources`，一般是一些`dll`文件，需要相对`.exe`文件加载，这时放进`resources/app/libs`目录是无法读取的。而`to`的`./libs`会放到`resources/libs`中，依然读不到，如果要放到相对exe文件目录下，应该用`../libs`，这样才能读到。

## asar

另外`electron-builder` 打出的包默认就是`asar`压缩。是否使用`asar`压缩可以这样写。

```js
"build":{
     "asar": true
}
```





[源码在这，可直接clone使用](https://github.com/eligarfzzz/electron_lite)

有点难但也很重要。  

<h1 title="干啥啥不行，这活整的还行吧？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>