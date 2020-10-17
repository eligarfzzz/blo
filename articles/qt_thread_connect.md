# QT 多线程与信号槽传递对象

几天没更

~~都是因为🙃🙃加班🙃🙃那么点工资还要求加班🙃🙃加班还没加班费🙃🙃项目进展慢又不是我的问题🙃🙃不知道多招几个人🙃🙃国庆长假加班我忍了🤮🤮整麻瓜需求就算了🙃🙃改前人狗屎代码没关系（据说还是某总写的，这弱智水平还公司管理层🤮真🤮没🤮救🤮了🤮，有梦想的就赶紧跳槽）🙃🙃想办法一天撸完一周的代码就是为了早点走，结果完了还得加班改文档🙃🙃以后就得拖🙃🙃就得硬拖🙃🙃两小时拖成两天🙃🙃给多少钱就干多少活🙃🙃不然真对不起自己🙃🙃以前还调侃别人加班🙃🙃现在遭报应了😖😖对不起我错了。。😔现在心态也不行了😔😔写代码是唯一喜欢又稍微擅长的事😔真不希望失去这个爱好~~

> *Big Brother is watching you*！——《1984》

反正也只有*Big Brother*看得到。牢骚发完了看看今天又整了什么活

### 简单的多线程信号槽

从另一个线程中发射一个信号，GUI线程中接受。

信号槽：

```C++
//信号：
class QTest : public QThread
{
    Q_OBJECT
public:
    explicit QTest(QObject *parent = 0);
private:
    void shotSignal();

signals:
    void shot();

    // QThread interface
protected:
    void run();

};
//槽：
class MainWindow : public QMainWindow
{
    Q_OBJECT

public:
    explicit MainWindow(QWidget *parent = 0);

private:
    Ui::MainWindow ui;

private slots:
    void recv();
};

```

实现：

```c++
//信号
void QTest::shotSignal()
{
   
    QThread::sleep(2);

    qDebug()<<QThread::currentThreadId();

    emit shot();

}

//槽


void MainWindow::recv()
{
   
}
```

发射信号，多线程`start()`之后发射信号：

```c++
MainWindow::MainWindow(QWidget *parent) :
    QMainWindow(parent)
{
    ui.setupUi(this);

    QTest *t=new QTest(this);

    connect(t, SIGNAL(shot()), this, SLOT(recv()));


    t->start();

    qDebug() << QThread::currentThreadId();

}

void QTest::run()
{
    shotSignal();
}
```

简单的信号槽，没有问题

### 加入自定义结构体

另一个线程发射一个信号，转递一个自定义结构体，再GUI中接受：

```C++
struct CustomSt
{
    QVector<int> values;
};
```

信号：

```C++
signals:
    void shot(CustomSt);
```

槽：

```C++
private slots:
    void recv(CustomSt);
```

出现了运行时错误：`QObject::connect: Cannot queue arguments of type 'CustomSt' (Make sure 'CustomSt' is registered using qRegisterMetaType().)`

跨线程传递结构体时，需要`qRegisterMetaType()`注册结构体。

### 附：更简单的多线程方法

上面的多线程，是继承了`QThread`,`override run()`方法，并使用`start()`开始多线程。如果需要一个对象执行多个多线程函数，又不希望使用循环，达成类似C#异步函数的效果，则可以使用`moveToThread()`，注意继承了`QObject`才有这个函数。

```C++
    QTest *t = new QTest();
    QThread *thread = new QThread(this);

    t->moveToThread(thread);
    thread->start();

	//注意使用信号槽才能多线程运行
    connect(this, SIGNAL(threadShot()), t, SLOT(shotSignal()));
    
    threadShot();
```

注意要使用信号槽方式调用`shotSignal()`,`shotSignal()`便会在多线程运行。

直接调用是不行的

<h1 title="干啥啥不行，这活整的还行吧？" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>