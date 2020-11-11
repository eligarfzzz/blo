# 一种跨站cookie方法

跨站cookie可用于单点登录，除了cookie，只要能跨站获取服务器返回的token，就能实现单点登录。

这里使用`iframe`方法进行跨站cookie

```html
<iframe src="https://127.0.0.1:8908/api" title="get"></iframe>
```

## 准备跨域站点

两个`iis`站点作为跨站测试，绑定不同的`ip`和端口，访问的页面中插入

```html
<iframe src="https://127.0.0.1:8908/api" title="get"></iframe>
```

## https证书和可跨域的登录服务器

 [下载并安装`openssl`](http://slproweb.com/products/Win32OpenSSL.html)，配置Path路径，使用以下命令生成证书

```shell
openssl genrsa 1024 > pathway/private.pem
openssl req -new -key pathway/private.pem -out csr.pem
openssl x509 -req -days 365 -in csr.pem -signkey pathway/private.pem -out pathway/file.crt
```

创建`https`的`express`服务器

```js
const express = require("express");
const cookie_parser = require("cookie-parser");
const path = require("path");
const fs = require("fs");

const app = express();

const https = require("https");

const credentials = {
  key: fs.readFileSync(
    path.join(__dirname, "./certificate/private.pem"),
    "utf8"
  ),
  cert: fs.readFileSync(path.join(__dirname, "./certificate/file.crt"), "utf8"),
};

const httpsServer = https.createServer(credentials, app);
httpsServer.listen(8908, () => console.log("server start"));
// 跨域
app.use((req, res, next) => {
  res.header("Access-Control-Allow-Origin", "*");
  res.header(
    "Access-Control-Allow-Headers",
    "Authorization,X-API-KEY, Origin, X-Requested-With, Content-Type, Accept, Access-Control-Request-Method"
  );
  res.header(
    "Access-Control-Allow-Methods",
    "GET, POST, OPTIONS, PATCH, PUT, DELETE"
  );
  res.header("Allow", "GET, POST, PATCH, OPTIONS, PUT, DELETE");
  next();
});
app.use(cookie_parser());
// 静态文件
app.use(express.static("assets"));

// web api路由
app.get("/api/setcookie", (req, rsp) => {
});
app.get("/api/readcookie", (req, rsp) => {
});

```

## 设置cookie

通过`iframe`在`api`路由中设置`cookie`，重点来了，cookie的`sameSite`设置为`None`，`secure`为true，即可实现跨域，这些都需要https支持

```js
app.get("/api/setcookie", (req, rsp) => {
  rsp.cookie("acao_coockie_8908", "s", {
    maxAge: 1000 * 60 * 60,
    sameSite: "None",
    httpOnly: true,
    secure: true,
  });
  rsp.send({
    status: "success",
  });
  console.log("response  success");
});
```

接下来就能跨域`sso`了，访问不同`ip`的服务器页面，加载同一个登录`api`的`iframe`，均能发送同一个`cookie`。



<h1 title="光棍节快了？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>