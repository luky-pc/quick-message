/**
 * @author: create by eleven
 * @version: v1.0
 * @description:
 * @date:2019/1/11
 **/
import React from "react";
import { Form, Icon, Input, Button,Row,Col } from 'antd';
import {connect} from "react-redux";
import {actionTypes} from "../../Redux/action/actionTypes";
class LoginForm extends React.Component {
    constructor(props) {
        super(props);
    }
     login=()=>{
         this.props.form.validateFields((err,values)=>{
             if(!err){
                 this.props.login({phoneNumber:values.phoneNumber,password:values.password});
             }
         });
     }
    render() {
        let {getFieldDecorator,getFieldValue}=this.props.form,
            layout={
                labelCol: {
                    xs: { span: 24 },
                    sm: { span: 8 },
                },
                wrapperCol: {
                    xs: { span: 24 },
                    sm: { span: 13 },
                }
            };
        return (
            <Form className="login-form">
                <Form.Item label={"手机号"} {...layout}>
                    {
                        getFieldDecorator("phoneNumber",{
                            rules:[
                                {required:true,message:"手机号为必填项。"}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
                        )
                    }
                </Form.Item>
                <Form.Item label={"密码"} {...layout}>
                    {
                        getFieldDecorator("password",{
                            rules:[
                                {required:true,message:"密码为必填项。"}
                            ]
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Row><Col offset={3} span={18}>
                        <Button onClick={this.login} type="primary" className="login-form-btn">
                            登录
                        </Button>
                        或者 <a href="./register">注册新用户</a>
                    </Col>
                    </Row>
                </Form.Item>
            </Form>
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
            login: (userInfo) => {
                dispatch({type: actionTypes.LOGIN, userInfo})
            }
        }
    };
LoginForm=connect(mapStateToProps,mapDispatchToProps)(LoginForm);
let Login=Form.create()(LoginForm);
export default Login;