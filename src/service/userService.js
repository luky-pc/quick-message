import {userInfo} from "../static/testData";
let currentUser;
class UserService {
    constructor(){
    }
    getUserInfo=()=>{
        currentUser=JSON.parse(sessionStorage.getItem("currentUser"));
        if(!currentUser) {
            currentUser = userInfo;
            /**后台获取userInfo**/
        }
        return currentUser;
    }
}

let userService=new UserService();
export default userService;
