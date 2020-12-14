# C#托管内存地址获取与转化



很久不更

没啥好更的

再不更都要忘了

就随便更点吧

-----------------------------------------------



## 两种获取托管内存地址方式

通过获取C#托管内存地址，可以进行C++ Dll数据交互、进程间数据传递等

先来看两种获取地址的方式

### C++ Dll

第一种方式是借助C++ Dll

```c++
extern "C" PROJECT1_API INT64 Test(INT64 v) {
	return v;
}
```

注意参数直接接受了`Int64`并返回，指针和64位整形没有本质区别，所以可以这么写。

```C#
        struct TClass 
        {
            public int i;
        }
        static void Main(string[] args)
        {
            var tc= new TClass();
            tc.i = 3;

            var v = Test(ref tc);
        }
        [DllImport("Project1.dll")]
        static private extern Int64 Test( ref TClass tC);
```

C#中调用，注意传递的是一个`ref TClass`类型，用于获取一个`TClass`对象地址。`ref out`对非托管Dll没有太大区别。返回的便是地址。

注意C#和C++的内存布局不同，虽然获取了地址，C++中也**不能直接操作C#对象**（除了string，应该C#对string有特殊处理）。这也是为什么C++的参数中用了INT64而不是void*或某种特定的指针。

### unsafe

C#本身就支持指针，但需要unsafe，还是第一种更方便

```c#
        static private unsafe Int64 GetPointer(TClass* tc) 
        {
            return (Int64)tc;
        }
        unsafe static void Main(string[] args)
        {
            var tc= new TClass();
            tc.i = 3;

            var v1 = Test(ref tc);

            Int64 v2 = GetPointer(&tc);
        }
```

查看v1和v2，值是一样的。

## 指针向对象的转化

`Marsha`提供了`PtrToStructure`函数，被转化的结构体必须有`StructLayout`特性

```C#
        [StructLayout(LayoutKind.Sequential)]
        struct TClass 
        {
            public int i;
        }
        unsafe static void Main(string[] args)
        {
            var tc= new TClass();
            tc.i = 3;

            var v = Test(ref tc);
            var tc2 = Marshal.PtrToStructure<TClass>((IntPtr)v);

        }
```



能获取到正确的`tc2.i`值。

### GC带来的问题

由于C#的GC特性，对象析构不受控制，可能无法确保指针传递后访问的指针依然有效，这点还需探索。

<h1 title="唉" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>

