# ASP.NET Core MVC中的 依赖注入方法

几天没更，累死👴了

## 依赖注入的好处

如果`Controller`中需要依赖一些服务，比如连接数据库等，可以直接在`Controller`中直接`new`出需要的服务类。但这样的高耦合，以后修改服务，就可能要修改大量代码，特别是`Controller`数量较多时。

`ASP.Net` 提供了方便的依赖注入方法。

## 示例

服务：

```c#
    public interface IMyServer 
    {
        void RunServer();
    }
    public class MyServer : IMyServer
    {
        public void RunServer()
        {
        }
    }
```

`Controller`：

```c#
    public class HomeController : Controller
    {
        // 这样是不好的
        // private readonly IMyServer server = new MyServer();


        public HomeController(IMyServer server) 
        {
            server.RunServer();
        }
        // ...
    }

```

## 注册依赖

直接执行必然会报错，必须注册后才能在`Controller`创建时使用。

找到`Startup.ConfigureServices()`方法，有几种不同的注入模式

`AddScoped`：

如果使用了接口

```c#
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IMyServer, MyServer>();
            services.AddControllersWithViews();
        }
```

如果没有接口

``` c#
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<MyServer>();
            services.AddControllersWithViews();
        }
		// Controller中
		public HomeController(MyServer server) 
        {
            server.RunServer();
        }
```

`AddSingleton`与`AddScoped`十分类似，是单例模式，服务只被实例化一次，每次请求获取的都是同一个实例。

        public void ConfigureServices(IServiceCollection services)
        {
            services.AddSingleton<IMyServer, MyServer>();
            services.AddControllersWithViews();
        }
另外还有`AddTransient ` 暂时生存期服务，对比` AddScoped()`作用域生存期服务

> ### 暂时
>
> 暂时生存期服务是每次从服务容器进行请求时创建的。 这种生存期适合轻量级、 无状态的服务。 向 [AddTransient](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.dependencyinjection.servicecollectionserviceextensions.addtransient) 注册暂时性服务。
>
> 在处理请求的应用中，在请求结束时会释放暂时服务。
>
> ### 作用域
>
> 作用域生存期服务针对每个客户端请求（连接）创建一次。 向 [AddScoped](https://docs.microsoft.com/zh-cn/dotnet/api/microsoft.extensions.dependencyinjection.servicecollectionserviceextensions.addscoped) 注册范围内服务。

啥意思呢我也看不懂，难道`AddTransient`一次请求创建不只一个实例？

## 依赖多个服务

如果`Controller`里依赖了多个服务

``` c#
        public HomeController(IMyServer server, IMyServer2 server2) 
        {
            server.RunServer();
            server2.RunServer();
        }
```

```c#
   public interface IMyServer 
    {
        void RunServer();
    }
    public interface IMyServer2
    {
        void RunServer();
    }
    public class MyServer : IMyServer
    {
        public void RunServer()
        {
        }
    }
    public class MyServer2 : IMyServer2
    {
        public void RunServer()
        {
        }
    }
```

也只需多次注册

```c#
        public void ConfigureServices(IServiceCollection services)
        {
            services.AddScoped<IMyServer, MyServer>();
            services.AddSingleton<IMyServer2, MyServer2>();
            services.AddControllersWithViews();
        }
```

实例`Controller`时，就会找到对应注册过的服务。大概会用反射之类的。



简单。

什么时候看一下WPF。考完驾照把，啧啧啧啧 烦



<h1 title="干啥啥不行，这活整的也越来越不行，但还得整啊" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>