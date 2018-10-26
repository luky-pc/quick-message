import React from "react";

React.Component.prototype.updateState=function(object,callback) {//使用updateState 方法替换setState 方法，添加对setState 值改变时监听
    !this.oldState&&(this.oldState=JSON.parse(JSON.stringify(this.state)));
    this.setState(object,()=>{
        for(let key in this.watch){
            if((key in object)&&this.state[key]!==this.oldState[key]){
                this.oldState[key]=this.state[key];//state[key]的值已更新到最新状态,避免同一事务中多次触发watch事件
                this.watch[key]();
            }
        }
        callback&&callback();
    });
};