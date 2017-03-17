# bm-vue-component

> 蓝月亮内部业务组件

## 依赖
- vue: ^2.0.0

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
  <div id="app">
    <BMWeek></BMWeek>
  </div>
</template>
```