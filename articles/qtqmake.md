# Qt qmake 项目配置、动态库配置

未来可能有项目与linux gui相关，未卜先知，再熟悉一下QT

## pri

手动在项目目录中创建`/subpro`，并创建文件`/subpro/subpro.pri`，创建`.h .cpp`文件

`pri`中

```makefile
SOURCES +=  \
    $$PWD/myclass.cpp \

HEADERS += \
    $$PWD/myclass.h

```

注意`$$pwd`，如果使用`./`相对路径，需要写成`./subpro/myclass.h`，`$$pwd`表示`pri`的相对目录

`pro`中

```makefile
include(subpro/subpro.pri)
```

构建菜单，执行`qmake`即可



pri是较简单的子项目风格

## subdirs子项目

使用subdirs子项目方式可以将工程拆分成多个`lib`和主程序，只需在父节点pro中，将`TEMPLATE = subdirs`即可将功能修改为一个`subdirs`项目，然后

```makefile
TEMPLATE = subdirs
# SUBDIRS顺序并没有什么关系
SUBDIRS += \
    untitled_dll\
    untitled \

```

剩下的就是常规操作，先看`dll`项目

```makefile
QT -= gui

TEMPLATE = lib
DESTDIR =../bin

DEFINES += UNTITLED_DLL_LIBRARY

CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    untitled_dll.cpp

HEADERS += \
    untitled_dll_global.h \
    untitled_dll.h

# Default rules for deployment.
unix {
    target.path = /usr/lib
}
!isEmpty(target.path): INSTALLS += target

```

两个关键点

```makefile
TEMPLATE = lib
DESTDIR =../bin
```

TEMPLATE将项目定义为动态库项目，destdir定义了输出文件，方便主程序引用链接库

然后是主程序

```makefile
QT       += core gui

greaterThan(QT_MAJOR_VERSION, 4): QT += widgets

CONFIG += c++11

# The following define makes your compiler emit warnings if you use
# any Qt feature that has been marked deprecated (the exact warnings
# depend on your compiler). Please consult the documentation of the
# deprecated API in order to know how to port your code away from it.
DEFINES += QT_DEPRECATED_WARNINGS

# You can also make your code fail to compile if it uses deprecated APIs.
# In order to do so, uncomment the following line.
# You can also select to disable deprecated APIs only up to a certain version of Qt.
#DEFINES += QT_DISABLE_DEPRECATED_BEFORE=0x060000    # disables all the APIs deprecated before Qt 6.0.0

SOURCES += \
    main.cpp \
    mainwindow.cpp

HEADERS += \
    mainwindow.h

FORMS += \
    mainwindow.ui

INCLUDEPATH+= ../untitled_dll
DEPENDPATH += ../untitled_dll

DESTDIR =../bin
LIBS += -L../bin -luntitled_dll

# Default rules for deployment.
qnx: target.path = /tmp/$${TARGET}/bin
else: unix:!android: target.path = /opt/$${TARGET}/bin
!isEmpty(target.path): INSTALLS += target
```

主程序TEMPLATE默认是app，这里没有再显式定义

然后是四个关键定义

```makefile
INCLUDEPATH+= ../untitled_dll
DEPENDPATH += ../untitled_dll

DESTDIR =../bin
LIBS += -L../bin -luntitled_dll
```

INCLUDEPATH 定义了主程序的包含目录路径，不写也可以使用`#include"../xxx/xxx"`

DEPENDPATH定义了一个路径，当目录中的文件发生变化时，工程会被重新编译

DESTDIR 定义了输出目录，方便exe调用dll

LIBS为工程添加了lib依赖-L添加路径，-l添加文件，注意文件的完整名为`libuntitled_dll.a`，这里省去了`lib`和`.a`，只添加了工程名



此外，如果工程由复杂依赖关系，可以在父工程内添加

```makefile
SUBDIRS += AAA BBB CCC DDD 

AAA.depends = BBB
CCC.depends = BBB
BBB.depends = DDD
```

以DDD->BBB CCC->AAA方式编译

完