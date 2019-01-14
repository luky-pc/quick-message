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
class RegisterForm extends React.Component {
    constructor(props) {
        super(props);
    }

    register=()=>{
        this.props.form.validateFields((err,values)=>{
            if(!err){
                this.props.register({phoneNumber:values.phoneNumber,password:values.password});
            }
        });
    };
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
            <Form className="register-form">
                <Form.Item label={"昵称"} {...layout}>
                    {
                        getFieldDecorator("nickName",{
                            rules:[
                                {required:true,message:"请设置昵称。"}
                            ]
                        })(
                            <Input prefix={<Icon type="user" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
                        )
                    }
                </Form.Item>
                <Form.Item label={"手机号"} {...layout}>
                    {
                        getFieldDecorator("phoneNumber",{
                            rules:[
                                {required:true,message:"手机号为必填项。"}
                            ]
                        })(
                            <Input prefix={<Icon type="phone" style={{ color: 'rgba(0,0,0,.25)' }}/>}/>
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
                <Form.Item label={"确认密码"} {...layout}>
                    {
                        getFieldDecorator("confirmPassword",{
                            rules:[
                                {required:true,message:"请确认密码。"},
                                {
                                    validator:(rule,value,callback)=>{
                                        let password=getFieldValue("password");
                                        if(value!==password){
                                            callback("两次输入密码不一致。");
                                        }
                                        callback();
                                    }
                                }
                            ]
                        })(
                            <Input prefix={<Icon type="lock" style={{ color: 'rgba(0,0,0,.25)' }} />} type="password" placeholder="Password" />
                        )
                    }
                </Form.Item>
                <Form.Item>
                    <Row><Col offset={3} span={18}>
                    <Button onClick={this.register} type="primary" className="register-from-btn">
                        注册
                    </Button>
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
            register: (userInfo) => {
                dispatch({type: actionTypes.REGISTER_USER, userInfo})
            }
        }
    };
RegisterForm=connect(mapStateToProps,mapDispatchToProps)(RegisterForm);
let Register=Form.create()(RegisterForm);
export default Register;