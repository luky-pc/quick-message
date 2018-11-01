import { Row, Col, Icon, Badge } from 'antd';
import React from "react";
import userService from "../../service/userService";
import {getArrayItemField,formatDate} from "../../util/common";
import defaultPortrait from "../../static/img/defaultPortrait.jpg";
import {actionTypes} from "../../Redux/action/actionTypes";
import connect from "react-redux/es/connect/connect";

class MessageBox extends React.Component {
    constructor(props) {
        super(props);
        let user = userService.getUserInfo();

        this.state = {
            user
        }
    }
    getMsgFrom=(msg)=>{/*后续补充群组内逻辑*/
        const {contact}=this.props,
            {user}=this.state;
        if (msg.from == contact.id) {
            return contact
        } else {
            return user;
        }
    };
    isMyselfMsg = (msg) => {
        let {user} = this.state;
        return this.getMsgFrom(msg).id == user.id;
    };
    render() {
        const {contact}=this.props,
            {user}=this.state;
        return (
            <div className="message-container">
                {
                    contact.message.reverse().map((msg,index,arr)=>{
                        return <div key={msg.time} className={this.isMyselfMsg(msg)?"text-r":""}>
                            {!index||(arr[index-1].time-msg.time)>180000?<Row className="text-c">{formatDate(msg.time, "hh:mm")}</Row>:""}
                            <img className={"portrait "+(this.isMyselfMsg(msg)?"float-r":"")} alt="" src={(this.isMyselfMsg(msg)?user.portrait:contact.portrait) || defaultPortrait}/>
                            <ul className="info">
                                <li><span className="nick">{(this.isMyselfMsg(msg)?user.nick:contact.nick)}</span></li>
                                <li className="msg">{msg.content}</li>
                            </ul>
                        </div>
                    })
                }
            </div>
        );
    }
}
const mapStateToProps = (state) => {
        return {
            messageList: state.messageList
        }
    },
    mapDispatchToProps = (dispatch) => {
        return {
            sendMessage: (message) => {
                dispatch({type: actionTypes.SEND_MESSAGE, message})
            }
        }
    };
MessageBox=connect(mapStateToProps,mapDispatchToProps)(MessageBox);
export default MessageBox;