import instance from "../http/index.js"

export const uploadfile = (formData) => {
    return instance({
        url: `/api/upload`,
        method: "POST",
        data: formData,
        headers: {
            "Content-Type": "multipart/form-data" // 设置请求头为 multipart/form-data
        }
    });
};

export const sendEmail = (emailData) => {
    const { data } = emailData;
    return instance({
        url: `/api/email`,
        method: "POST",
        data: { data },
    });
};

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

export const downloadfile = (exportFormData) => {
    const {
        exportDataType,
        exportFileName
    } = exportFormData
    return instance({
        url: `/api/download`,
        method: "POST",
        data: {
            exportDataType,
            exportFileName
        }
    });
}

// 获取用户数据
export const getWaterQualitys = () => {
    return instance({
        url: "/api/waterQualitys",
        method: "GET"
    })
}