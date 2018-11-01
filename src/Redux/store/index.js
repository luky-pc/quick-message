import {createStore} from 'redux'
import reducer from '../reducer'
import {initStore} from "../initData";
const store=createStore(reducer,initStore);
export {store};