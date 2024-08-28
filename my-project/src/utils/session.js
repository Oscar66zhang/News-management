// 存
export const set=(key,val)=>{
    window.sessionStorage.setItem(key,JSON.stringify(val))
}
// 取
export const get=key=>{
   return JSON.parse(window.sessionStorage.getItem(key))
}
// 清
export const clear=()=>{
    window.sessionStorage.clear()
}