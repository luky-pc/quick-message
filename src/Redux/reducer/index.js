import {initStore} from "../initData";
import {actionTypes} from "../action/actionTypes";
import {ws} from "../../socket-connect/connect";
export default (state=initStore,action)=>{
    const {message}=action;
    let messageList= [],contact;
    switch (action.type){
        case actionTypes.SEND_MESSAGE:
            messageList.push(...state.messageList);
            contact = messageList.find((contact) => {
                return contact.id == message.to;
            });
            /*TODO:当前聊天记录中没有该联系人的处理情况，新建contact 对象*/
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
        default:
            return state
    }
}