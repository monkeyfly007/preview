/*
 * @Author: monkeyfly
 * @Date: 2021-05-24 22:07:30
 * @Description:
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-05-25 23:31:25
 * @FilePath: /interview/node/demo/b.js
 */
let { num, info, add, changeAge } = require("./a");
console.log("b.js is loaded");
add()
changeAge()
// num = 6666
// 对象赋值修改==》重新开辟内存空间
// info={
//     "age":122,
//     "name":"hshsb"
// }
// 地址引用===对象直接修改属性
// info.age = 9999;
console.log("b.js output---", "num:", num, "info:", info);
