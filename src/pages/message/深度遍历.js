//评测题目: //笔试时间为一个小时，请尽快作答


//评测题目:
// 实现一个深度优先搜索算法（非递归）

function dfs(tree, name){
    if(tree&&name){
        let stack=[];
        stack.push(tree);
        while(stack.length !=0){
            let item=stack.pop(),
                children=item.children||[];

            if(item.name==name){
                return item;
            }
            for(let index=children.length-1; index>=0;index--){
                stack.push(children[index]);
            }
        }
    }
    return undefined;
}

var tree = {
    name : '中国',
    children : [
        {
            name : '北京',
            children : [
                {
                    name : '朝阳群众'
                },
                {
                    name : '海淀区'
                },
                {
                    name : '昌平区'
                }
            ]
        },
        {
            name : '浙江省',
            children : [
                {
                    name : '杭州市',
                    code : 0571,
                },
                {
                    name : '嘉兴市'
                },
                {
                    name : '绍兴市'
                },
                {
                    name : '宁波市'
                }
            ]
        }
    ]
};