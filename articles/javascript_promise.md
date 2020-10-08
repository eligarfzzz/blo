# JavaScript异步与C#对比，Promise的作用

首先要明确，JavaScript里无法“自定义”一个异步函数（可能是我没找到）。这里的自定义对比C#

```c#
// C#
private static async Task<int> TestAsync()
{
    return await Task.Run(() =>
    {
        // 模拟耗时操作
        Thread.Sleep(1000);
        Console.WriteLine("Async Task Running");
        return 0;
    }).ContinueWith((value) =>
    {
        Console.WriteLine("Async Task Done");
        return 1;
    });
}
```

在某处调用

```C#
// C#
static void Main(string[] args)
{
    var result = TestAsync();
    Console.WriteLine("Async Task Call");
    Thread.Sleep(4000);
}
```

可以使用`Task`将某些耗时操作与主线程操作一起执行。

可能是JavaScript只能运行于单线程，所有的“异步函数”，比如`setTimeout`，http请求，都是环境API提供的异步函数，只能自定义一个回调，用于处理异步结束之后的操作。

所以，`Promise`对象也只是方便处理异步函数。

```javascript
// js
function wait(ms) {
    return new Promise((resolve) => {
        setTimeout(resolve, ms);
    });
}
```

像这样，加不加`Promise`都是异步执行的。加了`Promise`，就可以确保`resolve`后执行`then`的回调

```javascript
// js
wait(2000).then(() => {
    console.log("done");
});
```

如果要将异步转化为同步？对比C#

```c#
// C#
TestAsync().Wait();
```

或方法前加`async`，执行时加`await`，`await`必须加在“可等待”的`Task`前

```c#
// C#
static async void Main(string[] args)
{
    var result = await TestAsync();
    Console.WriteLine("Async Task Call");
    Thread.Sleep(4000);
}
```

JavaScript也类似，函数前加`async`，执行时加`await`，`await`必须加载`Promise`前

```javascript
// js
async function test() {
    await wait(2000).then(() => {
        console.log("done");
    });
    console.log('test');
}
test();
```

`Promise`只是方便处理异步，方便异步执行后的`resolve`、`reject`异常，将异步转化为同步。

还有一个作用，将原本

```javascript
// js
wait(2000).then(()=>{
    // do something
}).then(()=>{
    // do something more
}).catch(e=>{
    // error
});
```



这样一长串回调重写成更清晰的亚子

```javascript
// js
async function better(){
        try {
        await wait(200);
        // do something
        // do something more
    } catch (e) {
        // error
    }
}
```

总价一下

- `Promise` 配合`resolve`、`reject`方便处理执行完毕和异常后的处理，C#提供了`ContinueWith`，与`then`类似，而对`reject`没有类似功能。
- `Promise`配合`await`、 `async`关键字方便将异步转化为同步，与 C# 类似



<h1 title="干啥啥不行，这活整的还行吧？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>