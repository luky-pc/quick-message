import {userInfo} from "../static/testData";
let currentUser;
class UserService {
    constructor(){
        currentUser=JSON.parse(sessionStorage.getItem("currentUser"));
        if(!currentUser) {
            currentUser = userInfo;
            /**后台获取userInfo**/
        }
    }
    getUserInfo=()=>{
        return currentUser;
    }
}

let userService=new UserService();
export default userService;
