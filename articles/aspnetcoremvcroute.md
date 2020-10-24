# ASP.NET Core MVC中的路由总结

环境：.net Core 3.1

## 默认路由

默认路由的规则定义在`StartUp`中

```c#
    public class Startup
    {
		//....
        //....
        
        // This method gets called by the runtime. Use this method to configure the HTTP request pipeline.
        public void Configure(IApplicationBuilder app, IWebHostEnvironment env)
        {
 			//....
			//....
            app.UseEndpoints(endpoints =>
            {
                endpoints.MapControllerRoute(
                    name: "default",
                    pattern: "{controller=Home}/{action=Index}/{id?}");
            });
        }
    }
```

实例中，一个url分为三部分，`controller`,`action` 和`id`，其中id可选，`controller`和`action`则有默认值。

`controller`对应`controller`的类名，如`HomeController`，对应`Home`，

`action`类似，`HomeController.Index()`方法对应`index`,url为`home/index`

但是这种方法只适用于带`View`的`Controller`，`ApiController`用的则是另一套规则

## api路由

先来看`ApiController`

```c#
  	public class Jedi
    {
        public string name { get; set; }
        public string swordColor { get; set; }
    }
    [Route("api/[controller]")]
    [ApiController]
    public class ValuesApiController : ControllerBase
    {
        [Route("Jedi")]
        [HttpGet]
        public List<Jedi> Jedi()
        {

            return new List<Jedi>()
            {
                new Jedi() {name="Skywalker",swordColor="blue" },
                new Jedi() {name="Yoda",swordColor="blue" },
            };
        }
    }
```

 `[ApiController]`是必须的，否则无法使用`[FromBody]`特性定义参数，`[FromBody]`可以大大简化获取`Post Body`数据的过程，此外还有`[FromHeader]`、`[FromQuery]`等。

由于 `[ApiController]`，` [Route("api/[controller]")]`也是必须的，如果不定义这个特性，使用默认的`/valuesapi/...`也不会路由到这个`Controller`。

` [Route("Jedi")]`不是必须的。如果方法名是`Get()`、`Post()`等，也能路由到正确的方法上。这里方法名为`Jedi()`，所以加了` [Route("Jedi")]`。

`ValuesApiController.Jedi()`完整的路由为`api/valuesapi/jedi`。

## `[FromBody]`等特性

### `[FromBody]`

```c#
        //https://localhost:44324/api/valuesapi/post
		[Route("Post")]
        [HttpPost]
        public List<Jedi> Jedi([FromBody]Jedi jedi)
        {

            return new List<Jedi>()
            {
                new Jedi() {name="Skywalker",swordColor="blue" },
                new Jedi() {name="Yoda",swordColor="blue" },
                jedi
            };
        }
```

如果`RequstBody`内有 `Json`

```json
{

	"name": "Skywalker",
	
	"swordColor": "blue"

}
```

可以自动将其转化为`Jedi`对象。`body`里如果缺字段，转完会是`null`

### `[FromQuery]`

```C#
   [Route("Post")]
   [HttpPost]
   public List<Jedi> Jedi([FromQuery] Jedi jedi)
   {
        return new List<Jedi>()
        {
            new Jedi() {name="Skywalker",swordColor="blue" },
            new Jedi() {name="Yoda",swordColor="blue" },
            jedi,
        };
    }
```
如果url为`/api/valuesapi/post?name=Skywalker&swordColor=blue2`同样会自动转为`Jedi`对象，缺的字段依然是`null`

这样的也可以

```c#
public List<Jedi> Jedi([FromQuery] string swordColor, [FromQuery] string name)
```



别的`from`特性不说了，大差不差，看文档即可

## View的Controller路由

带有View的Controller更简单，没那么多特性，根据`MapControllerRoute`的规则来即可。

`/home/index`

```c#
    public class HomeController : Controller
    {
		//...
        //...

        public IActionResult Index()
        {
            return View();
        }
    }
```



下面试试手动加上`[Route]`特性

```c#
    [Route("notapi/homeless")]
    public class HomeController : Controller
    {
		// ...	
        [Route("ii")]
        public IActionResult Index()
        {
            return View();
        }
        //...
    }
```

访问默认的`https://localhost:44324/`直接404了，而`/notapi/homeless/ii`则可以正常访问



以后看看https。

<h1 title="干啥啥不行，这活整的还行吧？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>



