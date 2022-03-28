/*
 * @Author: monkeyfly
 * @Date: 2020-11-19 22:56:25
 * @Description: 简单的链表
 * @LastEditors: monkeyfly
 * @LastEditTime: 2020-11-19 23:08:19
 * @FilePath: /interview/js/review/js/index.js
 */
const a = { val : 'a' }
const b = { val : 'b' }
const c = { val : 'c' }
const d = { val : 'd' }


a.next = b
b.next = c
c.next = d

console.log(a)