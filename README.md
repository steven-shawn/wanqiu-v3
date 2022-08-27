# 环境
- windows 10
- nodejs [14.10.0]
- npm [6.14.8]

# 创建项目
- 初始化
```
npm create vite@latest
```

# 项目结构
```
├─public
├─src
├─  ├─assets
├─  │  ├─fonts      // 字体
├─  │  ├─imgs       // 公共图片,icon等
├─  │  └─style      // 公共样式,全局样式
├─  ├─components    // 放组件 文件家以-分隔， 组件大驼峰
├─  ├─directive     // 指令
├─  ├─filters       // 过滤器
├─  ├─router        // 路由
├─  ├─service       // 数据层，_开头
├─  ├─store         // vuex
├─  ├─utils         // 工具函数$_开头
├─  └─views         // 界面
├─App.vue
├─env.d.ts
├─main.ts
├─.gitignore
├─index.html
├─package.json
├─README.md
├─tsconfig.json
├─vite.config.ts

```

# sass
```
npm add -D sass
```

# pug
```
npm install vite-plugin-pug --save-dev
```

# vant
```
npm i vant -D
npm i vite-plugin-style-import@1.4.1 -D

- vite.config.js
import styleImport, { VantResolve } from 'vite-plugin-style-import';
export default {
  plugins: [
    styleImport({
      resolves: [VantResolve()],
    }),
  ],
}
```

# vue-router
```
npm i vue-router -D
```

# axios
```
npm i aixos -D
```

# vuex
```
npm i vuex -D
```

# tailwindcss
```
npm install -D tailwindcss postcss autoprefixer
npx tailwindcss init -p
```
