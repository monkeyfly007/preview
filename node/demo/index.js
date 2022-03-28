/*
 * @Author: monkeyfly
 * @data_ate: 2021-05-24 22:09:12
 * @Description:
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-05-25 00:36:12
 * @FilePath: /interview/node/demo/index.js
 */
let data_a = require("./a");
let data_b = require("./b");
let data_c = require("./c");

console.log("data_a.num before add:", data_a.num);
data_a.add();
console.log("data_a.num after add:", data_a.num);
data_a.num = 2;
console.log("data_a.num 重新赋值:", data_a.num);

console.log("data_a.info before change:", data_a.info);
data_a.info.name = "ls";
data_a.info = { name: "", age: 0 };
console.log("data_a.info after change", data_a.info);
