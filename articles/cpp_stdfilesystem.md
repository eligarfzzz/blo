# ` C++ std::filesystem`体验

`std::filesystem`需要`C++ 17`支持。

## `path`对象

`path`对象可以用于判断一个路径是文件、获取父路径、替换文件名等作用

但是要注意，`has_filename() filename()`等函数只是根据字符串判断，不会根据真实的文件情况进行判断。

例如`filesystem::path p("K:\\1\\2\\")`实际电脑中并不存在这个路径，如果以`"\\"`结尾，`has_filename()`返回`false`。反之返回`true`，需要特别注意。

如果需要根据实际文件判断，请使用`directory_entry`

## `directory_entry`

常用函数

| `is_directory()` | 检查 directory_entry 是否代表目录（准确） |
| ---------------- | ----------------------------------------- |
| `file_size()`    | 文件大小，目录时为0                       |
| `path()`         | 返回路径                                  |

## 一些常用库函数

| `void copy(const path& from, const path& to) `  | 目录复制                                     |
| ----------------------------------------------- | -------------------------------------------- |
| `bool create_directory(const path& pval)`       | 当目录不存在时创建目录                       |
| `bool create_directories(const path& pval)`     | 当多级目录不存在时创建目录                   |
| `bool exists(const path& pval)`                 | 是否存在                                     |
| `uintmax_t file_size(const path& pval)`         | 文件大小(字节)，目录不行                     |
| `bool remove(const path& pval)`                 | 删除目录，必须为空                           |
| `uintmax_t remove_all(const path& pval)`        | 删除目录下所有文件，返回被成功删除的文件个数 |
| `void rename(const path& from, const path& to)` | 移动文件或者重命名                           |

## 遍历文件夹寻找文件

```C++
using fs_itor = filesystem::recursive_directory_iterator;
for(fs_itor it(p);it!= fs_itor();it++)
{
	cout << (*it).path().string() << endl;
}
```
使用`recursive_directory_iterator`遍历，所有的文件，和文件夹都会遍历到

好用是好用，可惜`C++ 17`才有

唉

<h1 title="...深渊吞没了你😭😭😭" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>



