import { Row, Col, Icon, Badge, Input, Button } from 'antd';
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
            user,
            inputMessage:""
        }
    }
    enterMessage=(e)=>{
        console.log(this.props.contact.message)
        let inputMessage=e.target.value;
        this.setState({inputMessage});
    }
    sendMessageClick=()=>{
        let {userInfo,contact}=this.props,
            {id:from}=userInfo,
            {id:to}=contact,
            {inputMessage:content}=this.state,
            time=(new Date()).getTime();
        this.props.sendMessage({from, to, isRead: true, content, time});
        this.setState({inputMessage:""});
    }
    getMsgFrom=(msg)=>{/*后续补充群组内逻辑*/
        const {contact,userInfo}=this.props;
        if (msg.from == contact.id) {
            return contact
        } else {
            return userInfo;
        }
    };
    isMyselfMsg = (msg) => {
        let {userInfo} = this.props;
        return this.getMsgFrom(msg).id == userInfo.id;
    };
    render() {
        const {contact,userInfo:user}=this.props;
        return (
            <div>
            <div className="message-container">
                {
                    contact.message.map((msg,index,arr)=>{
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
                <Row className="btn-container">
                    <Col span={19}><Input value={this.state.inputMessage} onPressEnter={this.sendMessageClick} onChange ={this.enterMessage}/></Col>
                    <Col span={5}><Button onClick={this.sendMessageClick}>发送</Button></Col>
                </Row>
            </div>
        );
    }
}
const mapStateToProps = (state) => {
        return {
            messageList: state.messageList,
            userInfo: state.userInfo
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