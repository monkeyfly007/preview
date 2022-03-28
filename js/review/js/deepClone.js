const obj = {
    name: 'zs',
    age: 20,
    hobby: ['eat', 'drink', 'game', 'sport'],
    address: {
        province: 'sh',
        city: 'sh',
        district: 'pudong',
    }
}
const obj1 = deepClone(obj)
obj1.hobby.shift()
obj1.address.city = 'xxxxxxxxx'
console.log(obj, 'obj')
console.log(obj1, 'obj1')

// typeof null  "object"
// typeof Array "function"
// typeof undefined "undefined"

function deepClone(obj = {}) {
    // 1, 判断 obj 是否为引用类型，且 不为 null
    if(typeof obj !== 'object' || obj == null){
        return obj
    }
    // 2, 判断 obj 是否为数组
    let res 
    if(obj instanceof Array){
        res = []
    }else{
        res = {}
    }

    // 3, 递归遍历对象的每一个自身属性
    for(let key in obj){
        if(obj.hasOwnProperty(key)){
            res[key] = deepClone(obj[key])
        }
    }
    return res
}