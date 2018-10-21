import React from 'react'
import {BrowserRouter as Router, Switch, Route} from 'react-router-dom'

import Header from '../pages/main/Header'
import NotFound from '../pages/notFound/NotFound'

class RouterMap extends React.Component {
    updateHandle() {
        console.log('每次router变化之后都会触发')
    }

    render() {
        return (
            <Router>
                <div>
                    <Header/>
                    <Switch>
                        <Route exact path="/" component={""} />
                        <Route path="*" component={NotFound}/>
                    </Switch>
                </div>
            </Router>
        )
    }
}

export default RouterMap