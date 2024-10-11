import React from "react";
import axios, { Method } from "axios";

import { API_BASE_URL } from "../constants/urlConstants";

class RequestService {
    get = (url: string, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("GET", url, null, isAuthRequired, contentType);
    };

    post = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("POST", url, body, isAuthRequired, contentType);
    };

    put = (url: string, body: any, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("PUT", url, body, isAuthRequired, contentType);
    };

    delete = (url: string, isAuthRequired: boolean = false, contentType: string = "application/json") => {
        return createRequest("DELETE", url, null, isAuthRequired, contentType);
    };
}

const createRequest = (method: Method, url: string, body: any, isAuthRequired: boolean, contentType: string) => {
    return axios({
        method: method,
        url: API_BASE_URL + url,
        data: body,
        headers: setHeader(isAuthRequired, contentType)  // 调用 setHeader 函数并返回 headers
    });
};


const setHeader = (isAuthRequired: boolean, contentType: string) => {
    const headers: Record<string, string> = {
        'Content-Type': contentType,
    };

    if (isAuthRequired) {
        const token = localStorage.getItem("token");
        if (token) {
            headers['Authorization'] = `Bearer ${token}`;  // 添加 Authorization 头
        }
    }

    return headers;  // 返回构造的 headers 对象
};


export default new RequestService();
