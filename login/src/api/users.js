import instance from "../http/index.js"

// 获取用户数据
export const getUsers = () => {
    return instance({
        url: "/api/users",
        method: "GET"
    })
}

// 添加用户数据
export const addUser = (userData) => {
    const {
        account,
        password,
        identity
    } = userData
    return instance({
        url: "/api/users",
        method: "POST",
        data:{
            account,
            password,
            identity
        }
    });
}

export const updateUser = (userData) => {
    const {
        account,
        password,
        identity
    } = userData
    return instance({
        url: `/api/users`,
        method: "PUT",
        data: {
            account,
            password,
            identity
        }
    });
};

export const deleteUser = (account) => {
    return instance({
        url: `/api/users/${account}`,
        method: "DELETE",
    });
};

export const searchusers = (account) => {
    return instance({
        url: `/api/search/${account}`,
        method: "GET",
    });
};