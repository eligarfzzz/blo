const webData = {
  site_articles_author: "Luw Beow",
  site_title: "Luw Beow's site",

  /**
   * 写完之后的blog添加步骤
   * - markdown导出到html
   * - 建一个新的html作为iframe容器，如复制first_try_git_arl_frm.html，尽量以markdown的文件名 + arl_frm结尾
   * - 修改iframe的src
   * - 在json数组中添加
   */
  articles: [
    {
      title: "Git 基本常用命令",
      brief: "从自己的Github下载并更新代码的常用命令行收录",
      href: "./articles/first_try_git_arl_frm.html",
      dataTime: "Sep.20 2020",
    },
    {
      title: "node、electron调用C++、打包",
      brief: "node、electron调用C++、打包、ffi等",
      href: "./articles/electron_start_arl_frm.html",
      dataTime: "Sep.19 2020",
    },
  ],
  repos: [
    {
      title: "electron_lite",
      brief:
        "基于electron-quick-start，加入必要依赖和修改，方便作为调取C++接口的electron引用模板",
      href: "https://github.com/eligarfzzz/electron_lite",
    },
    {
      title: "html_part",
      brief: "一些html ui组件，用于构建electron引用",
      href: "https://github.com/eligarfzzz/html_part",
    },
    {
      title: "ColorConsole",
      brief: "C++控制台输出彩色字符。对win32API的简单封装，方便使用",
      href: "https://github.com/eligarfzzz/ColorConsole",
    },
    {
      title: "HK_Control",
      brief:
        "海康威视相机SDk的简单封装。海康SDK采用C接口，使用并不方便，封装后简化了代码",
      href: "https://github.com/eligarfzzz/HK_Control",
    },
  ],
};
