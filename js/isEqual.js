/*
 * @Author: monkeyfly
 * @Date: 2021-05-25 23:33:20
 * @Description: 深比较判断
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-05-26 00:24:32
 * @FilePath: /interview/js/isEqual.js
 */

const obj1 = {
  name: "zs",
  age: 20,
  province: {
    city: "sh",
    district: "pd",
  },
  hobbies: ["html", "css", "js"],
};
const obj2 = obj1;
const obj3 = {
  name: "zs",
  age: 20,
  province: {
    city: "sh",
    district: "pd",
  },
  hobbies: ["react", "css", "js"],
};
const obj4 = "123";
const obj5 = {
  name: "zs",
  age: 20,
  province: {
    city: "sh",
    district: "pd",
  },
};
const obj6 = {
  name: "zs",
  age: 20,
  province: {
    city: "sh",
    district: "pd",
  },
};

function isObject(val) {
  if (typeof val === "object" && typeof val !== null) {
    return true;
  }
  return false;
}

function isEqual(obj1, obj2) {
  // 类型不相同直接返回 false
  if (
    (isObject(obj1) && !isObject(obj2)) ||
    (!isObject(obj1) && isObject(obj2))
  ) {
    return false;
  }
  //  类型相同且是基本数据类型，相同返回 true，不相同返回false
  if (!isObject(obj1) && !isObject(obj2)) {
    return obj1 !== obj2 ? false : true;
  }
  //  类型相同且是复杂数据类型
  const len1 = Object.keys(obj1).length;
  const len2 = Object.keys(obj2).length;
  if (len1 !== len2) {
    return false;
  }
  for (let k1 in obj1) {
    const res = isEqual(obj1[k1], obj2[k1]);
    if (!res) {
      return false;
    }
  }
  return true;
}

this.obj1 = obj1
this.obj2 = obj2
this.obj3 = obj3
this.obj4 = obj4
this.obj5 = obj5
this.obj6 = obj6
const len = 6
for (let i = 1; i < len; i++) {
    va = this[`obj${i}`]
    vb = this[`obj${i + 1}`] 
    // console.log(a)
  const res = isEqual(va, vb);
  console.log(`obj${i} vs obj${i + 1} is equal: ${res}`);
}
