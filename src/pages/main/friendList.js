import { Row, Col, Icon, Badge } from 'antd';
import React from "react";
import {friendList} from "../../static/testData";
import {getArrayItemField,formatDate} from "../../util/common";
import defaultPortrait from "../../static/img/defaultPortrait.jpg";
class FriendList extends React.Component {
    constructor(props){
        super(props);
        this.state = {
            defaultPortrait,
            friendList,
            selectedFriend: {}
        }
    }

    selectFriend=(selectedFriend)=>{
        selectedFriend.message.map((msg)=>{msg.isRead=true;});
        this.setState({selectedFriend});
    };
    unReadCount = (msgList) => {
        return msgList.filter((msg) => {
            return msg.isRead == false;
        }).length
    }
    render() {
        const {defaultPortrait,friendList,selectedFriend}=this.state;
        return (
            <Row>
                <Col className="contact-list" offset={6} span={6}>
                    {
                        friendList.map((item) => {
                            return <div key={item.id} onClick={()=>{this.selectFriend(item)}} className={"friend "+(selectedFriend.id===item.id?"current":"")}>
                                <img className="portrait" alt="" src={item.portrait || defaultPortrait}/>
                                <ul className="info">
                                    <li>
                                        <span className="nick">{item.nick}</span>
                                        {
                                            item.message.find((msg) => {
                                                return msg.isRead == false;
                                            }) ? <Badge className="float-r" dot={this.unReadCount(item.message)>3} count={this.unReadCount(item.message)}><span className="time">{formatDate(getArrayItemField(item.message, 0, "time"), "hh:mm")}</span></Badge> :
                                                <span className="float-r">{formatDate(getArrayItemField(item.message, 0, "time"), "hh:mm")}</span>
                                        }</li>
                                    <li className="msg">{getArrayItemField(item.message, 0, "content")}</li>
                                </ul>
                            </div>
                        })
                    }
                </Col>
            </Row>
        );
    }
}

export default FriendList;