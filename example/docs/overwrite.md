## 使用方法
#### 安装

``` sh
 npm install bm-vue-component --save
```

#### 入口 Main.js

```javascript
import 'bm-vue-component/dist/style.css'
import BMComponent from 'bm-vue-component'
Vue.use(BMComponent)
```

#### 用法示例

```vue
<template>
  <!--使用星期选择控件-->
  <BMWeek></BMWeek>
</template>
```

### 运行命令
```sh
npm run dev //运行开发调试
```
```sh
npm run build //打包项目，输出dist
```
```
npm run doc //打包文档和示例，输入demo
```

## 目录说明
``` sh
  dist 运行npm run build生成的发布文件
  demo 运行npm run doc生成的最终文档
  example 调试目录
    docs  开发文档存放目录
    pages 示例demo存放目录
  src 源码存放
    components 组件目录
      calendar 日历组件
      week     星期组件
      ...
```

## 组件开发规范
#### 命名规范
- components目录下的子目录以驼峰命名，例如 pageSlider
- 组件目录下的文件文件，以驼峰命命，例如 eventCalendar.vue
- 组件的name以bm开头，例如，week控件，name设置为bm-week

## 开发自定义组件步骤
- 在src/components目录下创建组件目录，例如：week
- 在week目录下创建week.vue文件，这里可以按实际业务需要，可以对组件进行拆分，例如，a.vue b.vue index.vue
- 在src/index.js 文件，引入组件 例如：Vue.component(Week.name, Week)
- 在example/pages目录开发调试
- 在example/docs 创建week.md，编写开发文档
- 最后执行npm run build和npm run doc生成文档和发布更新