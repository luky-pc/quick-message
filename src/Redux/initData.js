import {fakeMsgs} from "../static/testData";
let userInfo=JSON.parse(sessionStorage.getItem("currentUser")||"{}");
let initStore={
    userInfo,//{Object} 当前用户信息
    contactList:[],//联系人信息
    searchUserResult:[],//用户查找联系人返回结果
    messageList:[]//用户和联系人等对象的消息列表
};

export {initStore};