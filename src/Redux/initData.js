import {fakeMsgs} from "../static/testData";
let userInfo=JSON.parse(sessionStorage.getItem("currentUser")||"{}");
let initStore={
    userInfo,//{Object} 当前用户信息
    contactList:[],//联系人信息
    searchUserResult:[{
        nickName: "eleven",
        portrait: undefined,
        phoneNumber:"18180874439",
        id: "17298566362"
    }],//用户查找联系人返回结果
    messageList:fakeMsgs//用户和联系人等对象的消息列表
};

export {initStore};