# 网页跨域访问的正确处理方式

被跨域访问的服务器端需要设置`response header` `Access-Control-Allow-Origin:url`

`url`根据实际修改，可以为`*`，通常需要设置为`requst`的`origin`

`express`示例:

```javascript
import express from 'express';
const app = express();
app.post("/", (requst, response) => {
    response.set('Access-Control-Allow-Origin', "*");
    response.set('Access-Control-Request-Method', "POST");//可选
    response.send(`{"status":"success"}`);
    console.log('resquest');
})
app.listen(8092, () => {
    console.log('start')
});
```

记住这个就对了` response.set('Access-Control-Allow-Origin', "*");`

<h1 title="又完蛋咯" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>

