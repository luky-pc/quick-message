/***
 * 提供websocket服务
 */
import {WSERVER} from "../config/config";
 import objectCheck from "../util/objectCheck";
import userService from "../service/userService";
let ws,logInfo={},tempSend;
if(window.WebSocket){
    ws = new WebSocket(WSERVER);

    ws.onopen = function(e){
        console.log("连接服务器成功");
        // ws.send("game1");
    }
    ws.onclose = function(e){
        console.log("服务器关闭");
    }
    ws.onerror = function(){
        console.log("连接出错");
    }

    ws.onmessage = function(e){
        console.log(e.data);
    }
    ws.sendMessage=function(msg){
        let userInfo=userService.getUserInfo();
        if(objectCheck.isObject(msg)){
            msg.currentUserPhoneNumber=userInfo.phoneNumber;
        }else{
            msg=JSON.parse(msg);
            msg.currentUserPhoneNumber=userInfo.phoneNumber;
        }
        ws.send(JSON.stringify(msg));
    }
}
window.setInterval(function(){ //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
    var ping = {"actionType":"ping"};
    ws.send(JSON.stringify(ping));
},30000);

export {ws};