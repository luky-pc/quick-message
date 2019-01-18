import { Row, Col, Input, Icon, Badge } from 'antd';
import React from "react";
import {getArrayItemField,formatDate} from "../../util/common";
import MessageBox from "./messageBox";
import defaultPortrait from "../../static/img/defaultPortrait.jpg";
import {emptyContact} from "./defaultData/defaultData";
import {connect} from "react-redux";
import {actionTypes} from "../../Redux/action/actionTypes";
import {ws} from "../../socket-connect/connect";
class MessageList extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultPortrait,
            test:10,
            inputPhoneNumber:"",
            selectedFriend: emptyContact,
            showSearchResult:false
        }
    }

    /**
     * 选中好友，进入聊天界面
     * @param selectedFriend
     */
    selectFriend=(selectedFriend)=>{
        selectedFriend.message.map((msg)=>{msg.isRead=true;});
        this.setState({selectedFriend});
    };
    updateinputPhoneNumber=(value)=>{
        this.setState({inputPhoneNumber:value});
    };
    /**
     * 通过电话号码查询用户列表
     * @param phoneNumber
     */
    searchContact=()=>{
        this.props.searchContact(this.state.inputPhoneNumber);
        this.setState({showSearchResult:true});
    };
    /**
     * 发起添加联系人请求
     * @param contact
     */
    addContact=(contact)=>{
        this.props.addContact(contact.phoneNumber);
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
        const {defaultPortrait,selectedFriend,showSearchResult,inputPhoneNumber}=this.state,
            {messageList:msgs,searchUserResult} = this.props;
        return (
            <Row className="contact-main">
                <Col className="contact-list" offset={6} span={4}>
                    {showSearchResult&&<Icon onClick={()=>{this.setState({showSearchResult:false})}} type="arrow-left" style={{fontSize:"16px",color:"#FFF",cursor:"pointer"}}/>}
                    <div className="contact-search-input">
                        <Input value={inputPhoneNumber} onChange={(e)=>{this.updateinputPhoneNumber(e.target.value);}} prefix={<Icon type="search" onClick={this.searchContact} style={{color: 'rgba(0,0,0,.25)',cursor:'pointer'}}/>} placeholder="搜索联系人"/>
                    </div>
                    {showSearchResult ? searchUserResult.map((item)=>{
                            return <div key={item.id} className={"search-contact"}>
                                <img className="portrait" alt="" src={item.portrait || defaultPortrait}/>
                                <ul className="info">
                                    <li>
                                        <span className="nickName">{item.nickName}</span>
                                    </li>
                                    <li className="msg">{item.phoneNumber}</li>
                                </ul>
                                <Icon type="user-add" onClick={()=>{this.addContact(item);}} className="add-contact-icon"/>
                            </div>
                        }) :
                        msgs.map((item) => {
                            return <div key={item.id} onClick={() => {
                                this.selectFriend(item)
                            }} className={"friend " + (selectedFriend.id === item.id ? "current" : "")}>
                                <img className="portrait" alt="" src={item.portrait || defaultPortrait}/>
                                <ul className="info">
                                    <li>
                                        <span className="nickName">{item.nickName}</span>
                                        {
                                            item.message.find((msg) => {
                                                return msg.isRead == false;
                                            }) ? <Badge className="float-r" dot={this.unReadCount(item.message) > 3}
                                                        count={this.unReadCount(item.message)}><span
                                                    className="time">{formatDate(getArrayItemField(item.message, 0, "time"), "hh:mm")}</span></Badge> :
                                                <span
                                                    className="float-r time">{formatDate(getArrayItemField(item.message.length - 1, 0, "time"), "hh:mm")}</span>
                                        }</li>
                                    <li className="msg">{getArrayItemField(item.message, item.message.length - 1, "content")}</li>
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

const mapStateToProps = (state) => {
        return {
            messageList: state.messageList,
            searchUserResult: state.searchUserResult
        }
    },
    mapDispatchToProps = (dispatch) => {
        return {
            sendMessage: (message) => {
                dispatch({type: actionTypes.SEND_MESSAGE, message})
            },
            searchContact:(phoneNumber)=>{
                dispatch({type:actionTypes.SEARCH_USER, phoneNumber});
            },
            addContact: (contactPhoneNumber) => {
                dispatch({type: actionTypes.ADD_CONTACT, phoneNumber:contactPhoneNumber})
            }
        }
    };
MessageList=connect(mapStateToProps,mapDispatchToProps)(MessageList);
export default MessageList;