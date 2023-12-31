## 项目简介

一个项目从技术选型到承载着大量的业务上线是一个复杂的过程，从项目生命周期管理、页面生命周期管理到 api 和组件的封装以及 css 的规划，随着业务复杂度和页面的增多对应复杂度会成几何倍数增加，如果没有合理的规划，项目越来越难以开发和维护，此项目适用于 PC 端，是基于业务开发过程中总结得出，在技术框架基础上做了业务框架的规划，技术栈采用 `react` `react-router` `mobx` `axios` `webpack`，项目分为配置文件、媒体资源以及源码存放，源码中又有公共页面以及组件、业务代码编写以及业务框架抽成以及封装。如果后期项目过大需要做分项目和分模块，则可以把业务框架单独放置一个仓库，各个项目引用该仓库进行多个项目公用公司内部框架。

## 中台建设

关于中台建设技术设计想法浅谈；\
中台的建设一直是一个比较容易忽视但是又比较重要的项目；比较容易忽视则是没有直接的产出，大部分公司则是能买则买，能凑合则凑合，因为即便没有中台，app 和小程序等 toC 的项目
照样能运行。但随着业务越来越多，对 toC 的灵活程度要求越来越高，对于中台才慢慢重视起来，但中台涉及业务繁杂，没有统一的业务设计则很容易失控，从技术角度触发尽量避免一些麻烦是很必要的,
对于中台常见的问题，比如业务模块多，项目使用技术栈不统一、公用逻辑各个业务项目各自为政，重复逻辑不统一，一旦调整容易遗漏等等问题，做了以下设计，让中台即便是面临大的重构也不会无从下手

整体设计思路如下：
![avatar](./doc/zero.png)

## 详情

本项目是采用webpack进行项目微前端话的的一个项目，加载的项目为 plugin 项目，其中env.com.js 配置文件中的plugins为共享模块的相关配置，请勿删除，合理进行配置

    - @szero/plugin-remote 根据路由信息动态加载子应用模块的组件，使用规则项目中有详细介绍

#### 快速开始

```shell
yarn install
yarn start
```

#### 本地访问

```js
http://localhost:8000/
```

#### 打包

```shell
yarn build
yarn build:test
yarn build:uat
yarn build:prod
```

#### 目录说明

zero-react-pc  
| - dest // 打包后代码目录  
| - env // 项目业务参数配置  
| - | - env.com.js // 各个环境公共参数  
| - | - env.local.js // 本地  
| - | - env.pre.js // 预发布  
| - | - env.prod.js // 生产  
| - | - env.test.js // 测试  
| - node_modules  
| - public  
| - | - assets // 媒体资源存放  
| - | - index.html // html 模板  
| - | - manifest.json  
| - src  
| - | - common // 公共组件&页面  
| - | - pages // 业务页面  
| - | - app.tsx // 入口  
| - | - app.less // 全局样式  
| - | - app.store.ts // 全局 store 配置  
| - | - index.tsx  
| - tsconfig.json
| - package.json

新增页面目录结构示例：

index // 页面目录名  
│ - components // 页面组件目录，固定名称  
│ - │ - DivTest.tsx // 组件文件，大驼峰  
│ - index.less // 页面样式，固定名称  
│ - index.store.ts // 页面 model，固定名称  
│ - index.tsx // 页面入口，固定名称
| - hooks 业务逻辑抽取  
| - service 接口请求以及 ts 接口和类型的编写

---

## 接口使用规则

1、接口请求使用的是 Axios，请求拦截可以做在 initHttpClient 中  
2、接口契约和 mock 都采用 rapper，做需求拿到契约第一步首先配置 rapper，并运行对应更新接口契约命令

更新契约命令：`yarn rapper`

## 配置文件【env】

**打包完，所有配置信息在变量 process.env.productConfig|useEnv 中获取到；如环境配置文件中的配置会覆盖env.com.js中的配置**

1.  项目环境
    配置文件可自行添加，格式为：env.\*.js，此处\*部分需要和package中命令传参保持一致\
    以下是给的环境例子，如不需要则可直接删除，如有需要添加的环境也可以根据上述格式自行添加\

    - com 公共配置
    - local 本地环境
    - test 测试环境，用于测试人员进行测试
    - pre 堡垒环境，一般是从生产集群服务器抽样发布进行功能或回归测试
    - prod 生产环境，正式生产环境

2.  参数介绍
    - 项目公共配置
      - appId 项目唯一id，如有埋点时多项目区分用
      - appName 项目模块名称，前端项目多模块部署时的模块名，与路由和打包有关
      - cachePrefix 缓存前缀
    - layout 透传antDesign的porLayout组件参数
    - IconFontUrls 如果接了iconFont则可以配置对应地址，组件ZeroIcon会自动引入
    - route 路由相关配置\
      type Browser | Hash 默认：Browser\
      路由类型，传统和哈希两种模式；\
      showRoutesTab 默认：否\
      是否展示历史路由标签；\
      routesHistoryLength 默认：0；\
      路由历史存储记录条数；- layout
    - routes 静态路由列表，项目启动时放入app.store中，会动态注入
    - REQUEST 接口请求部分配置，在initHttpClient中使用，只做参考，可自行设计\
      BASE 接口请求配置：\
      baseURL 接口请求地址；\
      successCode 接口请求成功码；
    - webpackConfig\
      publicUrlOrPath\
      publicPath配置，建议和appName保持一致\
      devServer\
      webpack-dev-server 相关配置\
      privateConfig 包含以下两个plugin\
      1、headScripts 需引入的外部资源\
      2、copyOptions 复制到打包脚本中的外部资源

```js
{
  headScripts: [
    {
      src: 'https://code.jquery.com/jquery-3.7.0.min.js',
    },
  ],
  copyOptions: {
    patterns: [
      {
        from: 'public/font_3998592_hdp3xzsj2x7.js',
        to: 'lib/font_3998592_hdp3xzsj2x7.js',
      },
    ],
  }
}
```

    其他：
    剩余配置通过 webpack-merge 合并至webpack配置中；

### 参考官网

> [webpack](https://webpack.docschina.org/concepts/)  
> [babel](https://www.babeljs.cn/docs/options)  
> [ES6](http://es6.ruanyifeng.com/)  
> [react](https://react.docschina.org/docs/getting-started.html)  
> [redux](http://cn.redux.js.org/)  
> [redux-saga](https://redux-saga-in-chinese.js.org/)  
> [React Router](https://react-guide.github.io/react-router-cn/docs/Introduction.html)

### 社区好文推荐

> [redux 系列总结](https://juejin.cn/post/6880011662926364679)  
> [分布式事务：Saga 模式](https://www.jianshu.com/p/e4b662407c66?from=timeline&isappinstalled=0)  
> [深入理解 React 高阶组件](https://www.jianshu.com/p/0aae7d4d9bc1)  
> [React 从渲染原理到性能优化](https://www.cnblogs.com/chaoyuehedy/p/9638848.html)
