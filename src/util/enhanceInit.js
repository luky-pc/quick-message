import React from "react";

React.Component.prototype.updateState=function(object,callback) {//使用updateState 方法替换setState 方法，添加对setState 值改变时监听
    this.setState(object,()=>{
        for(let key in this.watch){
            if(key in object){
                this.watch[key]();
            }
        }
        callback&&callback();
    });
};
