import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import MessageList from '../pages/message/messageList'
import NotFound from '../pages/notFound/NotFound'
import {actionTypes} from "../Redux/action/actionTypes";
import connect from "react-redux/es/connect/connect";
import {ws} from "../socket-connect/connect";

class RouterMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }

    constructor(props) {
        super(props);
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={MessageList} />
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
            }
        }
    };
RouterMap=connect(mapStateToProps,mapDispatchToProps)(RouterMap);
export default RouterMap