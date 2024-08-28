import axios from "axios"; //引入axios
//创建实例
const http=axios.create({
      baseURL:'http://whhpweb.cn:3006'
})

//请求拦截器
http.interceptors.request.use(req=>{
    return req
})

//响应拦截器
http.interceptors.response.use(res=>{
    return res.data
},e=>{

})

export default http