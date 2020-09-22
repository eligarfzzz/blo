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
    },
    {
      title: "node、electron调用C++、打包",
      brief: "node、electron调用C++、打包、ffi等",
      href: "./articles/electron_start_arl_frm.html",
    },
  ],
};
