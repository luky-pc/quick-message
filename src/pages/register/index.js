/**
 * @author: create by eleven
 * @version: v1.0
 * @description:
 * @date:2019/1/11
 **/
import { Row, Col, Icon, Badge } from 'antd';
import React from "react";
import {connect} from "react-redux";
import {actionTypes} from "../../Redux/action/actionTypes";
class Register extends React.Component {
    constructor(props) {
        super(props);
    }

    render() {
        const {defaultPortrait,msgs,selectedFriend}=this.state;
        return (
            <Row className="contact-main">
                <Col className="contact-list" offset={6} span={4}>
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
            register: (userInfo) => {
                dispatch({type: actionTypes.REGISTER_USER, userInfo})
            }
        }
    };
Register=connect(mapStateToProps,mapDispatchToProps)(Register);
export default Register;