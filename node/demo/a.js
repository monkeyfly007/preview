/*
 * @Author: monkeyfly
 * @Date: 2021-05-24 22:07:25
 * @Description:
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-05-25 00:35:59
 * @FilePath: /interview/node/demo/a.js
 */
let num = 1;
let info = { name: "zs", age: 10 };
const add = () => {
  return num++;
};
const changeAge = () => {
    info.age = 12345678
}
console.log('a.js is loaded')
setTimeout(() => {
  console.log("--- a.js is executed after 1s ---");
  console.log("num:", num, "info:", info)
  console.log("--- a.js is executed after 1s ---");
}, 1000);
module.exports = {
  num,
  add,
  info,
  changeAge
};
