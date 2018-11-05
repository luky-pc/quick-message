import { Row, Col, Icon, Badge } from 'antd';
import React from "react";
import {fakeMsgs} from "../../static/testData";
import defaultPortrait from "../../static/img/defaultPortrait.jpg";
import {emptyContact} from "../message/defaultData/defaultData";
import {userList} from "./defaultData";
import {connect} from "react-redux";
import {actionTypes} from "../../Redux/action/actionTypes";
class Login extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            defaultPortrait,
            test:10,
            selectedUser: emptyContact
        }
    }

    selectUser=(selectedUser)=>{
        this.props.setUser(selectedUser);
        this.props.history.push("main");
    };
    render() {
        const {defaultPortrait,msgs,selectedFriend}=this.state;
        return (
            <Row className="contact-main">
                <Col className="contact-list" offset={6} span={4}>
                    {
                        userList.map((item) => {
                            return <div key={item.id} onClick={()=>{this.selectUser(item)}}>{item.nick}</div>
                        })
                    }
                </Col>
            </Row>
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
            setUser: (userInfo) => {
                dispatch({type: actionTypes.SET_USER, userInfo})
            }
        }
    };
Login=connect(mapStateToProps,mapDispatchToProps)(Login);
export default Login;