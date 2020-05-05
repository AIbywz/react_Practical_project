//统一管理 发送 Ajax 请求
import ajax from './ajax'

//发送登录请求  携带{username: admin,password: admin}
export const reqLogin = (loginObj) => ajax.post('/login',loginObj)