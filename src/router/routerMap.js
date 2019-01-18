import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'
import {message} from "antd";
import MessageList from '../pages/message/messageList'
import NotFound from '../pages/notFound/NotFound'
import {actionTypes} from "../Redux/action/actionTypes";
import connect from "react-redux/es/connect/connect";
import Login from "../pages/login";
import Register from "../pages/register";
import {ws} from "../socket-connect/connect";

class RouterMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }

    constructor(props) {
        super(props);
        ws.onmessage=(e)=>{//初始化websocket 监听后台回传信息
            let msg=JSON.parse(e.data);
            if(msg.success) {
                switch (msg.actionType) {
                    case actionTypes.REGISTER_USER:
                    case actionTypes.LOGIN:
                        this.props.setCurrentUser(msg.user);
                        window.location.href = "./message";
                        break;
                    case actionTypes.SEARCH_USER:
                        this.props.receiveSearchResult(msg.userList);
                        break;
                    case actionTypes.ADD_CONTACT:
                        message.success(msg.message);
                        this.props.receiveAddContact(msg.contact);
                        break;
                }
            }else{
                message.warning(msg.message);
            }
        };
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/login" component={Login} />
                        <Route exact path="/register" component={Register} />
                        <Route exact path="/message" component={MessageList} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}
const mapStateToProps = (state) => {
        return {
            messageList: state.messageList
        }
    },
    mapDispatchToProps = (dispatch) => {
        return {
            receiveMessage: (message) => {
                dispatch({type: actionTypes.RECEIVE_MESSAGE, message})
            },
            setCurrentUser: (userInfo) => {
                dispatch({type: actionTypes.SET_USER, userInfo});
            },
            receiveSearchResult: (searchUserResult)=>{
                dispatch({type:actionTypes.RECEIVE_SEARCH_USER,searchUserResult});
            },
            receiveAddContact: (contact)=>{
                dispatch({type:actionTypes.RECEIVE_ADD_CONTACT,newContact:contact});
            }
        }
    };
RouterMap=connect(mapStateToProps,mapDispatchToProps)(RouterMap);
export default RouterMap