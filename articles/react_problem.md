# React遇到的坑

```tsx
ReactDOM.render(
    <List data={
            {
                name:xxx,
                id:0
                // ...
            }
        }></List>,
    document.getElementById('list')
);
```

加入有这样一个组件

传入`props`后，如果使用`props.data={...}`的方式修改，会报错`Uncaught TypeError: Cannot assign to read only property...`

因为传入组件后这个属性是只读的。网上有说直接修改整个对象，显然没用。也有说与`js`严格模式有关，也不是

正确的做法应该是再封装一层

```tsx
 <List data={
        {
             listData:{
                name:xxx,
                id:0
              // ...
            }
        }
   }></List>
```

修改时`props.data.listData=xxx`这样既可

如果对`props.xxx`直接修改，还是会报错

<h1 title="完蛋喽
天坑" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>

