/*
 * @Author: monkeyfly
 * @Date: 2021-05-24 22:07:34
 * @Description:
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-05-24 22:38:29
 * @FilePath: /interview/node/demo/c.js
 */
let { num, info, add } = require("./a");
console.log("c.js is loaded");
info.name = "c改了a的name属性";
console.log("num:", num, "info:", info);
