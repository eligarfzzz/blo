# package.json package-lock.json 版本关系探索

`npm install`时，安装哪个版本，由package.json package-lock.json两个文件共同决定。以下测试在npm @6.14.6 node@12.18.4下进行

测试`npm install jquery@3.2.0`

## 1

package.json

```json
"dependencies": {
    "jquery": "^3.2.0"
  }
```

删除 package-lock.json node_modules后`npm install`，安装了 3.5.1（最新版）

## 2

package.json

```json

"dependencies": {
    "jquery": "^3.2.0"
  }
```

手动修改package-lock.json 删除 node_modules后`npm install`

```json
  "dependencies": {
    "jquery": {
      "version": "3.1.0",
      "resolved": "https://registry.npm.taobao.org/jquery/download/jquery-3.5.1.tgz",
      "integrity": "sha1-17TQjhv9uGrS8aPQOeoXMEcXq7U="
    }
  }

```

安装了 3.5.1（最新版）

若两文件冲突，package.json 高于package-lock.json，会根据package.json 安装

## 3

手动修改package.json 删除 node_modules后`npm install`

```json
"dependencies": {
    "jquery": "^2.2.0"
  }

```

安装了 2.2.4

若两文件冲突，package.json 低于package-lock.json，会根据package.json 安装



反正如果冲突一定会根据package.json安装

不冲突就按lock安装



没啥营养的一更

<h1 title="说的好像以前有营养似的😔" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>