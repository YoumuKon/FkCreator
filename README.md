# FkCreator

0.5.7版本大改了拓展格式后，拓展制作器的开发思路也明朗起来，故提出FreeKill拓展制作器（中文名暂定）。该工具性质是纯前端的拓展代码生成器，基于Vue3和vite。其基本功能就是支持用户在网页中创建自己的拓展，并生成一个zip包对应新月杀拓展，将zip包解压到packages下即可运行。

需要做的事情：

- [x] 最简单的配置项与生成代码相关模块
- [ ] 生成时对关键字段判空与报错等
- [ ] internal*name字段要限制正则（只能包含0-9a-zA-z*并且只能字母开头）且必须不空
- [ ] 完善各个生成单元的信息填充
- [ ] （！）支持将正在编辑的工程文件暂存在浏览器的什么地方
- [ ] 待基本内容准备停当后引入blockly库以实现addEffect这样的东西
- [ ] 还有很多很多...

## 运行起来

推荐使用[VSCode](https://code.visualstudio.com/) + [Volar](https://marketplace.visualstudio.com/items?itemName=Vue.volar)
插件。

运行以下命令可初始化项目：

```sh
$ yarn
```

在开发环境下运行，支持实时预览以及代码热更新：

```sh
$ yarn dev
```

编译成网页：

```sh
$ yarn build
```

使用 [ESLint](https://eslint.org/) 检查代码整洁性：

```sh
$ yarn lint
```
