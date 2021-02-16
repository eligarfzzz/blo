# WPF资源使用

## 在app或窗口xaml中直接定义

如定义一些`background`属性需要的颜色，直接在直接在`window`或`app`下

```xaml
<Window.Resources>
	<SolidColorBrush  x:Key="nor">#fcc</SolidColorBrush>
	<SolidColorBrush  x:Key="pressed">#faa</SolidColorBrush>
	<SolidColorBrush  x:Key="hover">#e99</SolidColorBrush>
</Window.Resources>
```

使用

```xaml
    <ControlTemplate TargetType="Button">
        

        <Border  
                Background="{StaticResource nor}" 
                CornerRadius="20" 
                x:Name="border">

            <ContentPresenter 
                    x:Name="contentPresenter" 
                    Focusable="False" 
                    HorizontalAlignment="{TemplateBinding HorizontalContentAlignment}" 
                    Margin="{TemplateBinding Padding}" 
                    RecognizesAccessKey="True" 
                    SnapsToDevicePixels="{TemplateBinding SnapsToDevicePixels}"
                    VerticalAlignment="{TemplateBinding VerticalContentAlignment}"  />

        </Border>
        <ControlTemplate.Triggers>
            <Trigger Property="IsMouseOver"  Value="True">
                <Setter TargetName="border" 
                        Property="Background" 
                        Value="{StaticResource hover}"></Setter>
            </Trigger>
            <Trigger Property="IsPressed"  Value="True">
                <Setter 
                        TargetName="border" 
                        Property="Background" 
                        Value="{StaticResource pressed}"></Setter>
            </Trigger>
        </ControlTemplate.Triggers>

    </ControlTemplate>
```

## 定义在资源文件中

更常见的是添加到资源文件中

`Dictionary.xaml`

```xaml
<ResourceDictionary>
    <ControlTemplate  x:Key="mytemplate">
    ...
    </ControlTemplate>
</ResourceDictionary>
```

然后在app或window中使用

```xaml
<Window.Resources>
    <ResourceDictionary Source="Dictionary.xaml">
    </ResourceDictionary>
</Window.Resources>
```
如果有多个文件

```xaml
<Window.Resources>
    <ResourceDictionary >
            <ResourceDictionary.MergedDictionaries  >
                <ResourceDictionary  Source="Mybutton.xaml">
                </ResourceDictionary>
                <ResourceDictionary  Source="Dictionary.xaml">
                </ResourceDictionary>
            </ResourceDictionary.MergedDictionaries>
     </ResourceDictionary>
</Window.Resources>
```

如果资源文件互相之间有依赖关系，如`Mybutton.xaml`中有对`Dictionary.xaml`的`StaticResource`引用，可以在app.xaml中添加`Dictionary.xaml`，再到`window.xmal`中添加`Mybutton.xaml`即可

<h1 title="" style="font-family: 'Kunstler Script','Palace Script MT','Brush Script MT';font-size: 4em;font-weight: bolder;">The End</h1>

