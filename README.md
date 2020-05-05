###笔记
day01

day02
1.搭建应用一级路由
   /admin
   /login

day02
day03
1. redux环境搭建 （集中式管理多个状态）
2. 组件中应用redux 
   1) 插件库使用： redux , react-redux , 
               redux-devtools-extension , 
               redux-thunk , 中间件
               dayjs / momentjs:  时间插件。
               screenfull : 
   2) 搭建redux环境
      1. Provider的使用：只要把需要使用store的组件（通常是App根组件）包裹起来就可以。       Provider组件有一个属性store，其接收一个用户定义的js对象作为store，给所有子组件提state；
      2. 创建 store-核心的状态储存容器 （同时包含 reducer）
      3. 创建 reducers
      4. 汇总 reducer 
      5. 创建 action
      6. 创建 容器 组件 