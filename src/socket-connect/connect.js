/***
 * 提供websocket服务
 */
import {WSERVER} from "../config/config";
import objectCheck from "../util/objectCheck";
import userService from "../service/userService";
let ws, lastWs, failCount=0,st;
function initHeartbeat() {//生成心跳
    st = setInterval(function () { //每隔5秒钟发送一次心跳，避免websocket连接因超时而自动断开
        var ping = {"actionType": "ping"};
        ws.sendMessage(JSON.stringify(ping));
    }, 30000);
}
function clearHeartbeat(){//关闭心跳
    clearInterval(st);
}
function createWS() {
    let unsentMsgs=[];
    if (window.WebSocket) {
        ws = new WebSocket(WSERVER);

        ws.onopen = function (e) {
            console.log("连接服务器成功");
            unsentMsgs.forEach((msg)=>{
                ws.sendMessage(msg);
            });
        };
        ws.onclose = function (e) {
            console.log("服务器关闭");
        };
        ws.onerror = function () {
            console.log("连接出错");
        };
        ws.onmessage = function (e) {
            console.log(e.data);
        };
        if(lastWs){
            ws.onmessage=lastWs.onmessage;
        }
        ws.sendMessage = function (msg) {
            let userInfo = userService.getUserInfo();
            if (objectCheck.isObject(msg)) {
                msg.currentUserPhoneNumber = userInfo.phoneNumber;
            } else {
                msg = JSON.parse(msg);
                msg.currentUserPhoneNumber = userInfo.phoneNumber;
            }
            console.log("ws.readyState: "+ws.readyState);
            if (ws.readyState === 0) {
                unsentMsgs.push(msg);
            } else if (ws.readyState === 1) {
                ws.send(JSON.stringify(msg));
            } else {
                failCount++;
                if(failCount%2!==0) {
                    lastWs=ws;
                    clearHeartbeat();
                    createWS();
                    ws.sendMessage(JSON.stringify(msg));
                }
            }
        };
        if(ws.readyState===1) {
            initHeartbeat();
        }
    }
    return ws;
}
createWS();

export {ws};