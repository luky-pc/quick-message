import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import FriendList from '../pages/main/friendList'
import NotFound from '../pages/notFound/NotFound'

class RouterMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }

    render() {
        return (
            <Router>
                <div>
                    <Switch>
                        <Route exact path="/" component={FriendList} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default RouterMap