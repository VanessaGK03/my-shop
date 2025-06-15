export function getToken(){
    return JSON.parse(localStorage.getItem("user"))?.token || ""
}

export function logOutUser(){
    localStorage.removeItem("user");
}

export function getUserId(){
    return JSON.parse(localStorage.getItem("user")).id;
}

export function isModerator(){
    return JSON.parse(localStorage.getItem("user")).isModerator;
}