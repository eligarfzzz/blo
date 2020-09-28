# `electron html `页面引入 `javascript `文件探索

如果在项目中有一个`js`文件`javascript/renderer.js`，文件中有以下代码

```javascript
function getCurrentWidnow() {
  return require("electron").remote.getCurrentWindow();
}
```

现在要在`index.html`中引入js文件，并使用js函数，有两种方法

### 方法1

```html
<script src="./javascript/renderer.js"></script>
```

这是一种常规的html引入js文件方法，引入后，可以直接使用`renderer.js`的函数。

但是，如果要对`renderer.js`做单元测试，测试使用node框架，是无法直接使用js函数的，必须在`renderer.js`中将需要使用的函数作为模块导出，才能进行测试。

如果对函数进行导出，比如使用了`exports.xxx = xxx`，这种方法就会报错：`Uncaught ReferenceError: exports is not defined` 。 作为node api 的一部分，require不报错，exports却会报错，很奇怪。

加了`exports`报错，不加没法单元测试，怎么办？导出时

```javascript
try {
  exports.xxx = xxx;
} catch (error) {
  console.warn("Model exports skipped.");
}
```

这样既能用` <script>`标签，又能做单元测试。

### 方法2

```html
  <script>
    require("./javascript/renderer");
  </script>
```

这样引入的js就跟node引入js模块一样，js文件中的函数必须导出，否则无法使用。



两种方法，如何选择，就根据实际来吧。

不同功能分文件写。

有些文件需要单元测试的，就`require`后导出函数。

有些不用什么单元测试的，比如electron窗口放大缩小这些，就直接` <script>`标签。

作为js特别是node渣渣，对于`node modules`模块，还需要更深入的学习。

<h1 title="干啥啥不行，这活整的还行吧？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>