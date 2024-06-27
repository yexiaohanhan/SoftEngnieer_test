import instance from "../http/index.js"

// 获取用户数据
export const getwaterdata = () => {
    return instance({
        url: "/api/waterdata",
        method: "GET"
    })
}