# C#事件示例

### 声明自定义事件

```c#
            public delegate void ValueChangeHandler(object sender, EventArgs e);
            public  ValueChangeHandler OnValueChange;
```

首先声明一个委托`ValueChangeHandler`这是订阅事件时要求的类型。参数`(object sender, EventArgs e)`是推荐的签名。

然后用委托声明事件，注意添加`event`关键字。

注意委托和事件都是`public`。

### 在合适的时候触发

```c#
            private int _v;
            public int Value
            {
                get
                {
                    return _v;
                }
                set
                {
                    _v = value;
                    OnValueChange?.Invoke(this, new EventArgs());
                }
            }
```

希望事件在调用属性setter是触发，`?.Invoke()`是一个判空。

完整代码：

```c#
        class Test
        {
            public delegate void ValueChangeHandler(object sender, EventArgs e);
            public event ValueChangeHandler OnValueChange;
            private int _v;
            public int Value
            {
                get
                {
                    return _v;
                }
                set
                {
                    _v = value;
                    OnValueChange?.Invoke(this, new EventArgs());
                }
            }
        }
```

### 订阅

```c#
        static void Main(string[] args)
        {
            Test test = new Test();
            test.OnValueChange += (sender, e) => { Console.WriteLine("111"); };
            test.Value = 9;
        }
```

在给`value`赋值时，便触发了事件。

注意订阅时使用的`+=`

### `event`关键字

既然事件也是用了委托声明，为什么还要加`event`关键字？把`event`去掉，整个代码也能正确运行，没有任何问题。

但是，如果去掉`event`关键字，以下操作也不会报错

```c#
    static void Main(string[] args)
    {
        Test test = new Test();
        //注意这里直接用 = 赋值
        test.OnValueChange = (sender, e) => { Console.WriteLine("111"); };
        //注意这里直接调用委托
        test.OnValueChange(test, new EventArgs());
    }
```
首先时`=`赋值，使用`event`只允许在声明的类中使用`=`，其他地方必须用`+=`订阅。

而外界甚至能直接调用这个委托。这显然容易产生Bug，事件在不希望触发的地方被触发了。

而添加了`event`关键字能很好的避免这些麻烦。

当然加了`event`，`CTest`的内部类依然能进行`=`操作和触发

```c#
       class Test
        {
            public delegate void ValueChangeHandler(object sender, EventArgs e);
            public event ValueChangeHandler OnValueChange;
            //.....
            //.....
            class CTIn 
            {
                public CTIn(Test test) 
                {
                    //允许
                    test.OnValueChange = (sender, e) => { Console.WriteLine("111"); };
                    //允许
                    test.OnValueChange?.Invoke(this, new EventArgs());
                }
            }
        }
```



最后，忍不住想说

~~不知道提前说的，又不是急事突发，当天在跟我说外出，出去又是一整天，那我也有理由说的，充电宝又没准备，差点口罩也没带，要是去不了怎么办？东西重又重的要死，坐地铁单程两个多小时，来回五个小时在路上，公司待一待一个小时，剩下两个小时干的玩伐？（结果近晚上11点回到家）真的是在搬砖，进度又拖了，再跟我说加班？他都能当领导了，他能当吗？他没这个能力知道吧。他自己数据线都不知道带，他不跟我说那他自己也不知道的？他现在连计划都搞不清，代码代码看不懂，屁大点事叫我做，自己没手没脚的，再接下去扣绩效了，真不知道他在想什么啊。务实一点，能不能先把技术搞好，公司找领导找的都什么人啊，你告诉我怎么解释？脸都不要了~~

~~关键啊，我要参与的事太多。代码要我写，设备要我调试，要我组装，搬运实验文档采购样样要参与，要么多招点人，要我让我月入百万。这已经不是全栈，这一个人一个公司好了。钱又少屁事又多，再突然让我加个班。怎么办，消极怠工，不然真对不起自己。又不敢直接跟他说。这家公司是绝不会待一辈子。正在持续观望，就等公司或我，看谁先提出分手。以前的激情早已磨灭干净，后来渐渐平淡，再到这个月突然加几次班，累到变形😩，已经对工作产生了厌恶。目前来看，需要我下定决心离开。应该招聘软件看起来了~~

说多了，一加班就牢骚多

<h1 title="吐槽比正文多，为了吐槽和写正文" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>

