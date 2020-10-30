# `Vue`中的属性绑定

```html
<div id='vue_ele'>
    <a  href="#">{{v_text}}</a>
</div>
```

```javascript
        let app = new Vue({
            el: "#vue_ele",
            data: {
                v_text: "text"
            }
        });
```

这样的绑定已经很熟悉了，`{{}}`内加一个`data`的元素，就能绑定到文本上。

最后渲染效果：

```html
<a  href="#">text</a>
```



实际可以是个表达式

```html
<a  href="#">{{v_text + 'zzz'}}</a>
```

最后渲染效果：

```html
<a  href="#">textzzz</a>
```

这是位于文本中的，属性中也类似

```html
<a v-bind:title="v_title" href="#">{{v_text + 'zzz'}}</a>
```

```javascript
        let app = new Vue({
            el: "#vue_ele",
            data: {
                v_title: "title",
                v_text: "text"
            }
        });
```

最后渲染效果：

```html
<a title="title" href="#">textzzz</a>
```

`v-bind`也可以写入一个表达式

```html
 <a v-bind:title="{text:'title'}.text + ' more title'" href="#">{{v_text + 'zzz'}}</a>
```

效果

```html
<a title="title more title" href="#">textzzz</a>
```



实际多用于class绑定

```html
 	<a v-bind:class="v_class" href="#">{{v_text + 'zzz'}}</a>
    <style>
        .textcolor_black {
            color: black;
        }

        .font_italic {
            font-style: italic;
        }
    </style>
```

```javascript
        let app = new Vue({
            el: "#vue_ele",
            data: {
                v_text: "text",
                v_class: {
                    textcolor_black: true,
                    font_italic: true
                }
            }
        });
```

使用表达式

```html
<a v-bind:class="{textcolor_black: true, font_italic: true,}" v-bind:title="{text:v_title}.text"
            href="#">{{v_text + 'zzz'}}</a>
```

就是将`v_class`替换成了`{textcolor_black: true, font_italic: true,}`

最后的效果都是

```html
 <a class="textcolor_black font_italic" href="#">{{v_text + 'zzz'}}</a>
```

## 附：组件

通过这样的方式创建一个组件

```javascript
        Vue.component('my_a', {
            data: () => {
                return {
                    component_text: "c_text"
                };
            },
            template: `<a class="font_italic">{{component_text}}</a>`
        })
```

注意：“

- 组件的注册位置必须在`new Vue()`之前

- 此外，组件的`data`内容相对与父`Vue_ele`的`data`是独立存在的

```html
    <div id='vue_ele'>
        <my_a></my_a>
    </div>
```

```javascript
        let app = new Vue({
            el: "#vue_ele",
            data: {
                v_title: "title",
                v_text: "text",
                v_class: {
                    textcolor_black: true,
                    font_italic: true
                }
            }
        });
```

`<my_a>`组件无法读取`#vue_ele`中的数据

- 而且`data`必须作为一个函数返回对象，这样每个组件之间的数据也独立存在

最后渲染为

```html
<div id='vue_ele'>
    <a class="font_italic">c_text</a>
</div>
```
<h1 title="完蛋喽" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>

