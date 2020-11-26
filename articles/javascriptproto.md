# `javascript` 原型链

久久不更

看看`js`的原型链吧

`ES6`中已经有`class`关键字。在此之前，`js`的类需要通过`new 构造函数`的方式创建实例

```js
function Fc(){
    this.prop = 'prop'
}
let fc = new Fc()
// > Fc {prop: "prop"}
```

如果需要添加一个成员方法

```
function Fc(){
    this.prop = 'prop'
}
Fc.prototype.func=function(){
	return 1
}
```

`new`出的对象便会包含这个方法

```js
let fc = new Fc()
fc
/*
> Fc {prop: "prop"}
prop: "prop"
__proto__:
	func: ƒ ()
	constructor: ƒ Fc()
	__proto__: Object
*/
fc.func()
// > 1
```

且所有`Fc`创建的对象共享同一个`func`函数，`func`函数只有一份。如果是`this.func`方式创建函数，每个Fc对象都会有一个`func`副本

可以认为，`prototype`中的内容类似实例的`static`区，也许这是为什么方法中操作实例属性时必须加`this`指针的原因。

且`fc.__proto__ == Fc.prototype`

所有`js`变量，包括构造函数`Fc`，甚至是`let i = 1`的`Number i`，都有一个`__proto__`属性，`i.__proto__ == Number.prototype`。

还有`Fc.prototype.__proto__==Object.prototype`

即`fc.__proto__.__proto__==Object.prototype`

总结一下

- `js`中的构造函数和函数没有实质区别，都有一个`prototype`属性，`prototype`是一个包含`constructor`和`__proto__`属性的对象
- 通过向构造函数的`prototype`添加函数，可以实现添加成员函数

- `js`中所有对象、函数，包括`Number, string`，都有一个`__proto__`
- 实例的`__proto__`指向构造函数的`prototype`属性
- 同一个构造函数（同一个类）的实例共享`__proto__`，类似一个`static`属性
- 对象通过`__proto__.__proto__`嵌套，最终指向`Object`（`Object.prototype`），这便是原型链
- 查找属性时，如果本身不存在，会沿着`__proto__`查找，便可实现继承的效果



<h1 title="咸鱼就安心当咸鱼，出淤泥而不染的，就不是咸鱼了😥" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>