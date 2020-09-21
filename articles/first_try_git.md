## 从自己的Github下载并更新代码的常用命令行收录

Github上新建仓库的方法就不说了

本地新建一个文件夹并cd

```powershell
cd xxx
```

将远程内容Clone到本地

```powershell
git clone https://github.com/xxx/xxx
```

这样远程内容就下载到本地了

如果修改后要提交，需要add（暂存）、commit（提交），这两步都是在本地，最后再push到远程仓库。
如果没登陆过，还需要登录一下账号

```powershell
git add . #这是添加所有文件到暂存区
git commit -m "some comment" #提交到本地
git push origin master#push到Github
```

然后Github刷新下应该就有了

## 将本地已有的代码关联并上传到远程Git

本地代码所在的文件夹要做一些初始化工作

```powershell
git init
git add .
git commit
```

这样创建了一个本地仓储

然后push到远程

```powershell
git remote add origin https://github.com/xxx/xxx.git #关联到远程
git push -u origin master #push
```

