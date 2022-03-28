/*
 * @Author: monkeyfly
 * @Date: 2020-11-28 22:42:40
 * @Description: 实现 lodash 的 get 方法
 * @LastEditors: monkeyfly
 * @LastEditTime: 2020-11-30 00:45:33
 * @FilePath: /interview/js/js/lodash_get.js
 */

// _.get(object, path, [defaultValue])
// 根据 object对象的path路径获取值。 如果解析 value 是 undefined 会以 defaultValue 取代。

// 参数
// object (Object): 要检索的对象。
// path (Array|string): 要获取属性的路径。
// [defaultValue] (*): 如果解析值是 undefined ，这值会被返回。

// var object = { 'a': [{ 'b': { 'c': 3 } }] };

// _.get(object, 'a[0].b.c');
// => 3

// _.get(object, ['a', '0', 'b', 'c']);
// => 3

// _.get(object, 'a.b.c', 'default');
// => 'default'

function myget(obj, path, defaultValue = undefined) {
    if (typeof path !== "string" || path === "") {
        return defaultValue;
    }
    const pathArr = path.split("."); // ['a','b','c'] || ['a[0]','b','c']
    if (pathArr.length === 1) {
        const res = path.match(/^(\w+)\[(\d+)\]$/);
        if (res) {
            const arrKey = res[1],
                index = res[2];
            return obj[arrKey][index];
        } else {
            return obj[path];
        }
    } else {
        let o = obj;
        for (let i = 0; i < pathArr.length; i++) {
            let res = myget(o, pathArr[i]);
            if (!res) {
                return defaultValue;
            }
            o = res;
        }
        return o;
    }
}

const obj1 = { a: [{ b: { c: 3 } }] };
const obj2 = {
    a: {
        b: {
            c: 3,
        },
    },
}
const res1 = myget(obj1, "a[0].b.c", "haha1");
const res2 = myget(obj1, "a.b.c", "haha2");
const res3 = myget(obj2, "a[0].b.c", "haha3");
const res4 = myget(obj2, "a.b.c", "haha4");
console.log(res1 + '\n');
console.log(res2 + '\n');
console.log(res3 + '\n');
console.log(res4 + '\n');

