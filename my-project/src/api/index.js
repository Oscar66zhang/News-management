//集中管理接口
import http from "@/utils/request"

//**
 /* 
 * @param {*} params 
 * @returns 
 */
export const Login=params=>{
    return http.post("/login",params)
}

export const Seluser=params=>http.get("seluser",params) //查询用户

export const Saveuser=params=>http.post("saveuser",params) //修改用户

export const Deluser=params=>http.get("deluser",{params}) //删除用户

export const Adduser=params=>http.post("adduser",params) //添加用户

export const Selnews=params=>http.get("selnews",{params}) //查询类型

export const Seltype=params=>http.get("seltype",params) //查询类型

export const Addnews=params=>http.post("addnews",params) //添加新闻

export const Savenews=(params)=>http.post("savenews",params) //修改新闻

export const Delnews=params=>http.get("delnews",params) //删除用户