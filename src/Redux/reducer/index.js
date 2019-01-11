import {initStore} from "../initData";
import {actionTypes} from "../action/actionTypes";
import {ws} from "../../socket-connect/connect";

ws.onmessage=(e)=>{//初始化websocket 监听后台回传信息
    let message=JSON.parse(e.data);
    this.props.receiveMessage(message);
};

export default (state=initStore,action)=>{
    const {message,userInfo}=action;
    let messageList= [],contact;
    switch (action.type){
        case actionTypes.SEND_MESSAGE:
            messageList.push(...state.messageList);
            contact = messageList.find((contact) => {
                return contact.id == message.to;
            });
            /*TODO:当前聊天记录中没有该联系人的处理情况，新建contact 对象*/
            message.actionType=actionTypes.SEND_MESSAGE;
            ws.send(JSON.stringify(message));
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
            return {...state,userInfo};
        case actionTypes.GET_CONTACT_LIST:
            return {...state,};/**TODO:更新联系人列表（登录时初始化调用）**/
        case actionTypes.GET_MESSAGE_LIST:
            return {...state};/**TODO:更新未读信息（登录时初始化调用）**/
        case actionTypes.REGISTER_USER:
            ws.send(JSON.stringify(userInfo));
            return {...state};/**TODO:处理用户注册**/
        case actionTypes.RECEIVE_REGISTER_RESULT:
            ws.send(JSON.stringify());
            return {...state};/**TODO:用户首次注册成功相关操作**/
        case actionTypes.LOGIN:
            return {...state};/**TODO:处理登录**/
        default:
            return state
    }
}