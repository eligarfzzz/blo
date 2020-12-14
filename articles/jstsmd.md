# 再看Js 和Ts模块

## ES6

先看ES6的JS模块

```js
//md.js
export class Md{
    
}
```

```js
//index.js
import{ Md } from 'md'
const md = new Md();

```

这种方式时ES6才有的，只要出现了`import`关键字，模块就会被导入

对应TS

```typescript
//md.ts
export class Mdts{
}

```

```typescript
//indexts.ts
import { Mdts } from './d'
const md = new Mdts();
```

模块的声明与js一样，导入也非常类似，似乎自定义模块的导入必须使用路径的形式

## NodeJS 中的模块

不同于ES6，node有自己的模块定义方法

```javascript
//mod.js
class Md{
}
exports.Md = Md;
```

```javascript
//index.js
const { Md } =require('./mod')
const md = new Md();
```

node的模块不是关键字，而是以函数的形式进行导出和导入，除非被执行，否则文件不会导入

再看typescript

```typescript
//d.ts
export class Mdts {
}
```



```typescript
import  Md = require('./d')
const md = new Md.Mdts()
```

导出依然完全一样，导入时使用import关键字

编译出

```javascript
exports.__esModule = true;
var Md = require("./d");
var md = new Md.Mdts();
```



此外，`npm install @types/node`后，也能使用`require`函数

```typescript
const { foo } = require('foo');
const f = foo();
```

编译出的js

```javascript
var foo = require('foo').foo;
var f = new foo();
```





<h1 title="雨过天晴却" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>

