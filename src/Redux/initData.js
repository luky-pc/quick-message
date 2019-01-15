import {fakeMsgs} from "../static/testData";
let userInfo=JSON.parse(sessionStorage.getItem("currentUser")||"{}");
let initStore={
    userInfo,//{}
    contactList:[],
    messageList:fakeMsgs//[]
};

export {initStore};