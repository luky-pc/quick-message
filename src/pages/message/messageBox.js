import { Row, Col, Icon, Badge } from 'antd';
import React from "react";
import userService from "../../service/userService";
import {getArrayItemField,formatDate} from "../../util/common";
import defaultPortrait from "../../static/img/defaultPortrait.jpg";

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
                    contact.message.map((msg)=>{
                        return <div key={msg.time} className={this.isMyselfMsg(msg)?"text-r":""}>
                            <img className={"portrait "+(this.isMyselfMsg(msg)?"float-r":"")} alt="" src={(this.isMyselfMsg(msg)?user.portrait:contact.portrait) || defaultPortrait}/>
                            <ul className="info">
                                <li><span className="nick">{(this.isMyselfMsg(msg)?user.nick:contact.nick)}</span><span className="float-r time">{formatDate(msg.time, "hh:mm")}</span></li>
                                <li className="msg">{msg.content}</li>
                            </ul>
                        </div>
                    })
                }
            </div>
        );
    }
}

export default MessageBox;