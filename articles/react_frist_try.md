# `React` 初体验

## 环境安装

这里使用了`CDN`的方式

```html
	<script crossorigin src="https://unpkg.com/react@17/umd/react.development.js"></script>
    <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.development.js"></script>
    <script src="https://cdn.staticfile.org/babel-standalone/6.26.0/babel.min.js"></script>
    <!-- 生产环境 -->
    <!-- <script crossorigin src="https://unpkg.com/react@17/umd/react.production.min.js"></script> -->
    <!-- <script crossorigin src="https://unpkg.com/react-dom@17/umd/react-dom.production.min.js"></script> -->
```

`react`的脚本

```html
<div id="example">    
<script type="text/babel" >
	//...
</script>
```

注意如果外部引入的`js`文件，最好建一个服务器，可以使用`iis`。如果直接打开本地文件，会报跨域错误

此外，由于`React`会使用`jsx`语法，如果引入`js`脚本文件，最好使用`jsx`后缀名

测试一下环境

```jsx
ReactDOM.render(
    <p>hello</p>,
    document.getElementById('example')
);
```

## 组件

组件有两种方式声明，第一种是函数式

```jsx
const El = (props) => {
    return <div>
        <h1>{props.text}</h1>
    </div>;
}
```

注意`El`首字母大写

参数列表中的`props`，是在使用组件时传入的属性

例如

```jsx
ReactDOM.render(
    <El text={'hello'} />,
    document.getElementById('example')
);
```

注意`jsx`的语法，使用`{}`代替引号`""`

也可以用`class`的方式声明，继承`React.Component`，重写`render`函数

```jsx
class Welcome extends React.Component {
    viewState = null;
    constructor(props) {
        super(props);

        this.state = { num: props.value };
    }
    render() {
        return <button onClick={() => {
            this.state.num += 1;
            console.log(this.state.num);
            this.setState(this.state);
        }}>
            value:{this.state.num}
        </button>;
    }
}
```

在`constructor`中传入`props`，使用`{}`可以显示一个表达式。注意`this.state`的使用，在`onClick`时`setState`，可以通知组件更新视图。不同于`vue`，必须手动调用`setState`更新视图，且视图必须与`state`绑定。

此外，自定义组件可以嵌套，但必须包含在一个单独的元素中

```jsx
const El = (props) => {
    return <div>
        <h1>{props.text}</h1>
        <Welcome value={10} />
    </div>;
}
```

几个注意点

- 组件名称必须首字母大写
- 属性是表达式时使用`{}`赋值
- `onClick`驼峰命名，而不是全小写
- 注意示例`onClick`赋值了一个`lambda`函数，而不是一个表达式，也可以仅`{函数名}`

以下代码

```jsx
//注意大写
//属性使用花括号{}
class Welcome extends React.Component {
    viewState = null;
    constructor(props) {
        super(props);

        this.state = { num: props.value };
    }
    render() {
        return <button onClick={() => {
            this.state.num += 1;
            console.log(this.state.num);
            this.setState(this.state);
        }}>
            value:{this.state.num}
        </button>;
    }
}

//注意大写
//也能使用一个函数定义
//而且能嵌套
const El = (props) => {
    return <div>
        <h1>{props.text}</h1>
        <Welcome value={10} />
    </div>;
}
ReactDOM.render(
    <El text={'hello'} />,
    document.getElementById('example')
);
```

可以将

```html
<div id="example"></div>
```

渲染成

```html
<div id="example">
    <div>
        <h1>hello</h1>
        <button>value:10</button>
    </div>
</div>
```

## 列表

下面封装了一个简单的列表组件

```jsx
class List extends React.Component {
    render() {
        return <ul>
            {this.props.arrys.map((item) => <li>{item}</li>)}
        </ul>
    }
}
ReactDOM.render(
    <List arrys={[1, 2, 3, 4, 50]}></List>,
    document.getElementById('list')
);
```

`map()`函数会返回一个对源数组处理后的数组。参数是一个处理函数的回调

使用`{}`可以自动将一个`jsx`数组循环渲染

现在直接显示会报一个警告`Each child in a list should have a unique "key" prop.`列表元素需要包含一个不重复的key属性。

修改`render()`函数

```jsx
    render() {
        return <ul>
            {this.props.arrys.map((item, index) => <li key={index}>{item}</li>)}
        </ul>
    }
```

为每个`<li>`元素添加不重复的`key`

<h1 title="完蛋喽" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>