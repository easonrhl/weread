## 前言

学习Vue过程中，想做个小项目练练手，思考许久决定做个仿微信读书的，主要是数据比较简单也比较好获取（用node 和 cheerio 写了个简单爬虫爬取数据）

由于时间有限，项目或多或少有些不够完善，就当作一次小练习，加深一下对Vue的学习。

## 技术栈

vue2 + vue-router + vuex + axios + vant

## 运行项目

1. 通过 git 克隆到本地，这样速度比较快

   ```
   git clone https://github.com/easonrhl/weread.git
   ```

2. 安装依赖

   ```
   npm install
   ```

3. 运行项目

   ```
   npm run serve
   ```

## 后端接口数据

数据是爬取的，没有后台管理，数据库用的是mysql，接口是用 node 的 express 框架写的，详情在我的另一个 [仓库](https://github.com/easonrhl/weread_server)

## 项目部分截图

* 主页

  ![](https://github.com/easonrhl/img/blob/master/home1.png)	![](https://github.com/easonrhl/img/blob/master/home2.png) 
  
  ---

* 分类榜 

  ![](https://github.com/easonrhl/img/blob/master/category1.png)

  ---

* 搜索页

  ![](https://github.com/easonrhl/img/blob/master/search1.png)	![](https://github.com/easonrhl/img/blob/master/search2.png)
  
  ![](https://github.com/easonrhl/img/blob/master/search3.png)
  
  ---

* 用户登录

  ![](https://github.com/easonrhl/img/blob/master/login1.png)	![](https://github.com/easonrhl/img/blob/master/login2.png)

  ---

* 书架

![](https://github.com/easonrhl/img/blob/master/bookcase1.png)

