import { Row, Col, Icon, Badge } from 'antd';
import React from "react";
import {fakeMsgs} from "../../static/testData";
import {getArrayItemField,formatDate} from "../../util/common";
import MessageBox from "./messageBox";
import defaultPortrait from "../../static/img/defaultPortrait.jpg";
import {emptyContact} from "./defaultData/defaultData";
class MessageList extends React.Component {
    constructor(props) {
        super(props);
        super(props);
        let msgs = JSON.parse(sessionStorage.getItem("msgs"));
        if(!msgs){
            /**TODO:请求服务器初始化msgs**/
            msgs=fakeMsgs;
        }
        this.state = {
            defaultPortrait,
            msgs,
            selectedFriend: emptyContact
        }
    }

    selectFriend=(selectedFriend)=>{
        selectedFriend.message.map((msg)=>{msg.isRead=true;});
        this.setState({selectedFriend});
    };
    /**
     * 获取单个好友未读信息数量
     * @param msgList 好友信息列表
     * @returns {*}
     */
    unReadCount = (msgList) => {
        return msgList.filter((msg) => {
            return msg.isRead == false;
        }).length
    };
    render() {
        const {defaultPortrait,msgs,selectedFriend}=this.state;
        return (
            <Row className="contact-main">
                <Col className="contact-list" offset={6} span={4}>
                    {
                        msgs.map((item) => {
                            return <div key={item.id} onClick={()=>{this.selectFriend(item)}} className={"friend "+(selectedFriend.id===item.id?"current":"")}>
                                <img className="portrait" alt="" src={item.portrait || defaultPortrait}/>
                                <ul className="info">
                                    <li>
                                        <span className="nick">{item.nick}</span>
                                        {
                                            item.message.find((msg) => {
                                                return msg.isRead == false;
                                            }) ? <Badge className="float-r" dot={this.unReadCount(item.message)>3} count={this.unReadCount(item.message)}><span className="time">{formatDate(getArrayItemField(item.message, 0, "time"), "hh:mm")}</span></Badge> :
                                                <span className="float-r time">{formatDate(getArrayItemField(item.message, 0, "time"), "hh:mm")}</span>
                                        }</li>
                                    <li className="msg">{getArrayItemField(item.message, 0, "content")}</li>
                                </ul>
                            </div>
                        })
                    }
                </Col>
                <Col span={10} className="message-box">
                    <MessageBox contact={selectedFriend}/>
                </Col>
            </Row>
        );
    }
}

export default MessageList;