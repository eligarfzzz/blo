# Ubuntu cmake 编译qt

环境

`gcc g++ make cmake  mesa-common-dev libglu1-mesa-dev`

以上环境缺一不可，可以通过`apt install`，

qt5可以[下载安装包](https://download.qt.io/archive/qt/)

然后运行

```shell
chmod +x qt-opensource-linux-x64-5.7.0.run 
./qt-opensource-linux-x64-5.7.0.run
```

或apt

```shell
 sudo apt-get install qt5-default
```

环境就安装完成了

然后创建一个cmake工程，尝试编译，可能出现以下错误

```shell
-- The CXX compiler identification is GNU 9.3.0
-- Detecting CXX compiler ABI info
-- Detecting CXX compiler ABI info - done
-- Check for working CXX compiler: /usr/bin/c++ - skipped
-- Detecting CXX compile features
-- Detecting CXX compile features - done
CMake Error at CMakeLists.txt:14 (find_package):
  By not providing "FindQt5.cmake" in CMAKE_MODULE_PATH this project has
  asked CMake to find a package configuration file provided by "Qt5", but
  CMake did not find one.

  Could not find a package configuration file provided by "Qt5" with any of
  the following names:

    Qt5Config.cmake
    qt5-config.cmake

  Add the installation prefix of "Qt5" to CMAKE_PREFIX_PATH or set "Qt5_DIR"
  to a directory containing one of the above files.  If "Qt5" provides a
  separate development package or SDK, be sure it has been installed.

```

提示qt5环境没找到，可以在cmake文件中添加

```cmake
set(CMAKE_PREFIX_PATH ${CMAKE_PREFIX_PATH} "/home/lb/Qt5.13.2/5.13.2/gcc_64/lib/cmake")

```

或在环境变量中设置Qt5_DIR

```shell
export Qt5_DIR=/home/xxx
```





这样应该就能完成编译

## 编译出的可执行文件修改mime

默认的编译出的文件mime类型为`shared library (application/x-sharedlib)` ，需要终端中运行，如果想修改为可双击运行的可执行文件，`executable (application/x-executable)`，

在cmake中添加以下变量

```cmake
set(CMAKE_EXE_LINKER_FLAGS  ${CMAKE_EXE_LINKER_FLAGS} "-no-pie ")
```

或qmake

```makefile
QMAKE_LFLAGS += -no-pie
```



zzzz