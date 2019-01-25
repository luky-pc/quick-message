import {initStore} from "../initData";
import {actionTypes} from "../action/actionTypes";
import {ws} from "../../socket-connect/connect";

let Reducer = (state=initStore,action)=>{
    const {message,userInfo,phoneNumber,searchUserResult,newContact,contactList}=action;
    let messageList=[],contact;
    switch (action.type){
        case actionTypes.SEND_MESSAGE:
            messageList.push(...state.messageList);
            contact = messageList.find((contact) => {
                return contact.id === message.to;
            });
            /*TODO:当前聊天记录中没有该联系人的处理情况，新建contact 对象*/
            message.actionType=actionTypes.SEND_MESSAGE;
            ws.sendMessage(JSON.stringify(message));
            contact.message.push(message);
            return {...state, messageList};
        case actionTypes.RECEIVE_MESSAGE:
            messageList.push(...state.messageList);
            contact = messageList.find((contact) => {
                return contact.id == message.from;
            });
            /*TODO:当前聊天记录中没有该联系人的处理情况，新建contact 对象*/
            contact.message.push(message);
            return {...state,messageList};
        case actionTypes.SET_USER:
            sessionStorage.setItem("currentUser",JSON.stringify(userInfo));
            return {...state,userInfo};
        case actionTypes.GET_CONTACT_LIST:
            return {...state,};/**TODO:更新联系人列表（登录时初始化调用）**/
        case actionTypes.GET_MESSAGE_LIST:
            return {...state};/**TODO:更新未读信息（登录时初始化调用）**/
        case actionTypes.REGISTER_USER:
            userInfo.actionType=actionTypes.REGISTER_USER;
            ws.sendMessage(JSON.stringify(userInfo));
            return {...state};/**TODO:处理用户注册**/
        case actionTypes.RECEIVE_REGISTER_RESULT:
            ws.sendMessage(JSON.stringify());
            return {...state};/**TODO:用户首次注册成功相关操作**/
        case actionTypes.LOGIN:
            userInfo.actionType=actionTypes.LOGIN;
            ws.sendMessage(JSON.stringify(userInfo));
            return {...state};/**TODO:处理登录**/
        case actionTypes.SEARCH_USER:
            ws.sendMessage(JSON.stringify({actionType:actionTypes.SEARCH_USER,phoneNumber}));
            return {...state};
        case actionTypes.RECEIVE_SEARCH_USER:
            return {...state,searchUserResult};
        case actionTypes.ADD_CONTACT:
            ws.sendMessage(JSON.stringify({actionType:actionTypes.ADD_CONTACT,userPhoneNumber:state.userInfo.phoneNumber,phoneNumber}));
            return {...state};
        case actionTypes.RECEIVE_ADD_CONTACT://接收后台返回添加联系人结果
            let {messageList:msg}=state;
            !newContact.message&&(newContact.message=[]);
            msg.push(newContact);
            return {...state,messageList:msg};
        case actionTypes.REQUEST_CONTACT_LIST://请求后台返回联系人列表
            ws.sendMessage({actionType:actionTypes.REQUEST_CONTACT_LIST});
            return {...state};
        case actionTypes.RECEIVE_CONTACT_LIST://请求后台返回联系人列表
            return {...state,contactList,messageList:contactList.map((item)=>{item.message=[];return item;})};
        default:
            return state
    }
};
export default Reducer;