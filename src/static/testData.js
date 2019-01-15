let fakeMsgs = [{
    isGroup: false,
    nickName: "eleven",
    portrait: undefined,
    id: "17298566362",
    message: [{from: "17298566362", to: "666546", isRead: true, content: "吃饭 吃饭", time: 1540305920000}]
},
    {
        isGroup: false,
        nickName: "超酷",
        portrait: undefined,
        id: "17298566363",
        message: [{from: "17298566363", to: "666546", isRead: false, content: "在吗?", time: 1540305820000}]
    },
    {
        isGroup: false,
        nickName: "熊二",
        portrait: undefined,
        id: "17298566364",
        message: [{from: "666546", to: "17298566364", isRead: false, content: "干啥子?", time: new Date()}, {
            from: "17298566364",
            isRead: false,
            content: "在吗?",
            time: 1540305520000
        }, {from: "17298566364", to: "666546", isRead: false, content: "出去耍不?", time: 1540305720000}, {
            from: "666546",
            isRead: false,
            content: "在",
            time: 1540305620000
        }]
    }];
let userList=[{isGroup:false,nickName:"eleven",portrait:undefined,id:"17298566362"},
    {isGroup:false,nickName:"超酷",portrait:undefined,id:"17298566363"},
    {isGroup:false,nickName:"熊二",portrait:undefined,id:"17298566364"}];
let userInfo = {nickName:"全世界最帅",portrait:undefined,id:"666546"};
export {fakeMsgs,userInfo};