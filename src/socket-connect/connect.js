/***
 * 提供websocket服务
 */
import {WSERVER} from "../config/config";
let ws,logInfo={};
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
}

export {ws};