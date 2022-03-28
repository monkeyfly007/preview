/*
 * @Author: monkeyfly
 * @Date: 2020-11-25 22:34:52
 * @Description: 找出字符串中连续出现最多的字符和个数
 * @LastEditors: monkeyfly
 * @LastEditTime: 2020-11-27 01:01:07
 * @FilePath: /interview/js/js/calcStrRepeatTime.js
 */

//  Test Case:
//  'abcaakjbb' => { a: '2', b: '2' }
//  'abbkejsbcccwqaa' => { c: '3 }

// aaacd
// abcdd

function calcStrRepeatTime(str) {
    let p1=0, p2=1, count=0, obj={}
    if(str.length < 2) return null
    for(let i = 0; i <= str.length-1; ){
        if(str[p1] === str[p2]){
            if(p2 === str.length-1){
                count = p2-p1+1
                if(!obj.hasOwnProperty(count)){
                    obj[count] = []
                }
                obj[count].push(str[p1])
                p2=p2+1
            }else{
                p2 = p2 +1
            }
        }else{
            if(str[p1]===str[p2] || p2-p1 >1){
                count = p2-p1
                if(!obj.hasOwnProperty(count)){
                    obj[count] = []
                }
                obj[count].push(str[p1])
            }
            if(p2+1 <= str.length-1){
                p1 = p2
                p2 = p2+1
            }else{
                p2 = p2+1
            }
        }
        i = p2
    }
    if(!Object.keys(obj).length) return null
    const max = Math.max(...Object.keys(obj))
    let res = {}, maxArr = obj[max]
    maxArr.forEach(item => {
        res[item] = max
    })
    return res
}
// str='aaacd'
strList = ['a','ab','abcaakjbb', 'aaacd', 'abc', 'abbkejsbcccwqaa', 'aabbbccdd', 'aabbccss']
strList.forEach((str, index)=> {
    const obj = calcStrRepeatTime(str)
    console.log(`${index}:${str}----`, obj)
});

// 问题: 找出字符串中连续出现次数最多的字符和个数
// 思路：双指针遍历
function calcStrRepeatTime1(str) {
    let p1=0, p2=1, obj={}, res={}
    for(let i = 0, len = str.length; i < len; ){
        if(p2 < len){// 字符长度大于 2 个字符
            if(str[p1] === str[p2]){//相等 aab aabc
                obj[str[p2]] = p2 - p1 + 1
                p2 = p2 + 1
            }else{// 不相等 abc abcd
                p1 = p2
                p2 = p2 + 1
            }
        }else if(p2 === len-1){//字符长度等于 2 个字符
            if(str[p1] === str[p2]){
                obj[str[p1]] = len
            }
        }
        i = p2
    }
    if(Object.keys(obj).length){
       const max = Math.max(...Object.values(obj))
       for(key in obj){
        if(obj[key] === max){
            res[key] = max
        }
       }
    }else{
        res = '未找到符合条件的字符'
    }
    return res
}
strTestList = ['a','ab','abcaakjbb', 'aaacd', 'abc', 'abbkejsbcccwqaa', 'aabbbccdd', 'aabbccss']
strTestList.forEach((str, index)=> {
    const obj = calcStrRepeatTime1(str)
    console.log(`${index}:${str} ----`, obj)
});