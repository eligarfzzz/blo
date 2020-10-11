# C++拷贝构造和赋值构造探索

### 参数为什么要用引用

加`const`是为了安全，毕竟没人希望拷贝的时候把源数据给改了吧。当然不加也可以，不加也是拷贝构造/赋值构造。

加引用是为了防止拷贝构造无限调用。传参时也会调用拷贝构造，不加引用就会无限递归。

```c++
class CTest
{
public:
	int i = 9;

	 CTest& operator=(const CTest& ct)// 这里加了const
	{
		i = ct.i;
		return *this;
	}
	CTest(CTest& ct)// 这里没加const
	{
		i = ct.i;
	}
	CTest() {};
};
```



### 复制构造函数

首先是`operator=`，注意和`operator&=`区分，后者和`+=`类似，相当于`i = i & j`。

返回类型也很重要，必须返回**类引用**。像上面示例中的`CTest`类，如果返回了一个奇怪的类型，那也没意义了。而且必须返回`CTest &`，不加引用的话，返回时会调用一次拷贝构造，浪费效率。

参数`const`引用已经说了

```c++
	CTest s;
	CTest u;
	u = s;//调用赋值构造，注意和下面区分
	CTest z = u;//这里时拷贝构造，不是赋值构造

```



### 拷贝构造函数

参数`const`引用也已经说了。

就是一个参数为`const`引用的构造函数，会在函数传参、返回、声名时赋值、显式调用四种情况调用，

```C++
CTest foo(CTest ct/*传参时调用拷贝构造*/) 
{
	CTest w(ct);/*调用拷贝构造*/
	CTest y = ct;/*调用拷贝构造*/
	CTest x;
	return x;/*返回时调用拷贝构造*/
}
```

此外，手动声明拷贝构造，默认构造函数也需要手动声明，不会自动生成。

### 删除或禁用

由于资源回收管理，或其他原因，可能需要禁用拷贝构造和赋值构造。

`C++ 11`前声明为`private`即可，但声明了还得实现。

`C++ 11`提供了`= delete`，十分方便

```c++
class CTest 
{
public:
	CTest& operator=(const CTest& ct) = delete;// 禁用
	CTest(CTest& ct) = delete;// 禁用
	CTest() {};
};
```



### `virtual`的赋值构造下次更



<h1 title="干啥啥不行，这活整的还行吧？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">To Be Continued</h1>

-----------------------------

## 更...

### 继承中的赋值函数

例子：

```c++
class CTest
{
public:
    // 虽然有virtual关键字，实际时没必要加的
	virtual CTest& operator=(const CTest& ct) 
	{
        // do something
		return *this;
	}
	virtual ~CTest() {}
};

class CTestSub :public CTest 
{

public:
	CTestSub& operator=(const CTestSub& cts) // 无法使用override
	{
        // 显式调用基类赋值函数
        this->CTest::operator=(cts);
        // do something
		return *this;
	}
    // 这样虽然重写了，但也没什么用
	/*CTest& operator=(const CTest& cts)override
	{
		return *this;
	}*/
};
```



子类中的`operator=(const CTestSub& cts)`无法使用`override`关键字。因为参数列表都不一样。`CTest& operator=(const CTest& cts)`倒是能加`override`成功重写，但是子类里的参数为`CTest& `的赋值函数基本不会被调用，也没啥意义。所以`virtual`没必要加，也不会被重写。

正确的写法：

**必须显式地在子类中调用基类的`operator=()`函数**，否则基类赋值函数不会被执行。

另一点注意，即使**基类没有重载**`operator=`赋值构造，子类**也必须显式调用**`CTest::operator=`，否则基类一样不会执行

同样，拷贝构造也是类似，在**初始化列表**中显示调用基类拷贝构造函数

```c++
class CTest
{
public:
	CTest(const CTest& ct)
	{
        // do something
	}
	CTest() {}
	virtual ~CTest() {}
};

class CTestSub :public CTest
{

public:
	CTestSub(const CTestSub& ct)
		:CTest(ct) // 必须显式调用
	{
		// do something
	}
	CTestSub() {}
};
```

如果不在初始化列表中，而在函数中调用，是**错误**的写法

```c++
	CTestSub(const CTestSub& ct)
	{
        CTest(ct) // 错误的写法
		// do something
	}
```

`CTest(ct)`返回了一个`CTest`对象，然后由于没接收者，就被遗弃了。`this`的基类部分不会被拷贝构造。这样写基类部分会按默认构造函数初始化。

如果我们将基类默认构造函数删除，然后仅在函数内调用错误写法

```C++
class CTest
{
public:
	CTest(const CTest& ct) {}
	/* CTest() {} */ // 删掉默认
	virtual ~CTest() {}
};

class CTestSub :public CTest
{
public:
	CTestSub(const CTestSub& ct)
	{ // VS2019 报错：不存在默认的构造函数
		CTest(ct);// 错误的写法
	}
};
```

这样是无法编译通过的，`错误	C2512	“CTest”: 没有合适的默认构造函数可用`，证明基类确实不会正确调用拷贝构造。



<h1 title="干啥啥不行，这活整的还行吧？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>