/*
 * @Author: monkeyfly
 * @Date: 2021-07-02 00:42:55
 * @Description: iterator 遍历器
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-07-02 02:01:31
 * @FilePath: /interview/js/es6/iterator.js
 */

// 下面是通过遍历器实现指针结构的例子

function Obj(val) {
  this.value = val;
  this.next = null;
}

// Symbol.iterator 属性对应一个遍历器生成函数，执行后返回当前对象的遍历器对象
Obj.prototype[Symbol.iterator] = function () {
  // 遍历器生成函数返回一个遍历器对象 iterator
  // 调用遍历器(指针)对象的 next 方法，就可以遍历事先给定的数据结构
  const iterator = { next: next };
  let current = this;
  console.log(current, "current");
  /*   
    {
        value: 1,
        next: { value: 2, next: { value: 3, next: null } }
    } 
    */
  function next() {
    if (current) {
      const value = current.value;
      current = current.next;
      return { value, done: false };
    }
    return { value: undefined, done: true };
    // next 方法返回一个对象，表示当前数据成员的信息，这个对象具有两个属性：value 和 done
  }
  return iterator; // 遍历器对象，包含一个 next 方法，用来移动指针
};

const a = new Obj(1);
// Obj {value: 1, next: null}
const b = new Obj(2);
// Obj {value: 2, next: null}
const c = new Obj(3);
// Obj {value: 3, next: null}
a.next = b;
b.next = c;

// TypeError: Obj is not iterable
for (let o of a) {
  console.log(o);
}

// 1,首先在构造函数的原型链上部署 Symbol.iterator 方法 - 它是一个遍历器生成函数
// 2,调用该方法会返回遍历器对象iterator
// 3,调用该对象的 next 方法，在返回一个值的同时，自动将内部指针移到下一个实例。

// 下面是另一个为对象添加 Iterator 接口的例子。
let obj = {
  data: ["hello", "world"],
  [Symbol.iterator]() {
    // Symbol.iterator 属性是一个方法，对应的是遍历器生成函数
    const self = this;
    let index = 0;
    return {
      // 该方法执行后返回一个遍历器对象（或称指针对象，iterator）
      // iterator: { next: fn }
      next() {
        // 指针对象是指向当前数据结构的起始位置。
        // 指针对象的根本特征是具有 next 方法，用于遍历事先给定的数据结构（或者说用来移动指针）
        // 每次调用 next 方法都会返回一个代表当前数据成员的信息对象，具有 value 和 done 两个属性。
        if (index < self.data.length) {
          return {
            value: self.data[index++],
            done: false,
          };
        }
        return {
          value: undefined,
          done: true,
        };
      },
    };
  },
};
// 对象是可遍历的，itarable，是因为具有 Symbol.iterator 属性。
for (let v of obj) {
  console.log(v, "vc");
}

// 对于类似数组的对象（存在数值键名和 length 属性），
// 部署 Iterator 接口，有一个简便方法：
// Symbol.iterator 方法直接引用数组的 Iterator 接口。

// NodeList.prototype[Symbol.iterator] = Array.p rototype[Symbol.iterator]
// or
// NodeList.prototype[Symbol.iterator] = [][Symbol.iterator]
// [...document.querySelectorAll('div')] // 可以执行了

// console.log(typeof NodeList) // "function"
// console.log(NodeList) // ƒ NodeList() { [native code] }
// console.log(NodeList.prototype)
/*
 NodeList {
    entries: ƒ entries(),
    forEach: ƒ forEach(),
    item: ƒ item(),
    keys: ƒ keys(),
    length: (...),
    values: ƒ values(),
    constructor: ƒ NodeList(),
    Symbol(Symbol.iterator): ƒ values(),
    Symbol(Symbol.toStringTag): "NodeList",
    get length: ƒ length(),
    __proto__: Object, 
}
*/
// console.log(NodeList.prototype[Symbol.iterator]) // ƒ values() { [native code] }
// console.log(NodeList.prototype[Symbol.toStringTag]) // "NodeList"

// NodeList 对象是类似数组的对象，本来就具有遍历接口，可以直接遍历。

// 类数组对象调用数组的 Symbol.iterator 方法的例子
let iterable = {
  0: "a",
  1: "b",
  2: "c",
  length: 3,
  [Symbol.iterator]: Array.prototype[Symbol.iterator],
};

for (let item of iterable) {
  console.log(item, "before"); // 'a', 'b', 'c'
}
// 注意：普通对象部署数组的 Symbol.iterator 方法并无效果。
iterable = {
  a: "a",
  b: "b",
  c: "c",
  length: 3,
  [Symbol.iterator]: [][Symbol.iterator],
};
for (let item of iterable) {
  console.log(item, "after"); // undefined, undefined, undefined
}

// 如果 Symbol.iterator 方法对应的不是遍历器生成函数（对应的方法返回的不是一个遍历器对象），解释引擎将会报错
// var obj1 = {};
// obj1[Symbol.iterator] = () => 1;
// [...obj1];
// TypeError: Result of the Symbol.iterator method is not an object

var obj2 = {};
obj2[Symbol.iterator] = function () {
  // obj2[Symbol.iterator] = () => {
  const iterator = { next };
  let index = 0;
  const _this = this;
  this.data = [];
  function next() {
    if (_this.data.length < 3) {
      //   function getData() {
      //     _this.data.push(index);
      //     return index++;
      //   }
      return {
        // value: _this.data.push(index++),
        // value: getData(),
        value: (function () {
          _this.data.push(index);
          return index++;
        })(),
        done: false,
      };
    }
    console.log(this, "this");
    console.log(_this, "_this");
    return {
      value: undefined,
      done: true,
    };
  }
  return iterator;
};
console.log([...obj2], "[...obj2]");

// 有了遍历器接口，数据结构就可以用 for...of 循环遍历，也可以使用 while 循环遍历。
// ITERABLE 指某种可遍历的数据结构。
// Iterator 是它的遍历器对象。
var $Iterator = ITERABLE[Symbol.iterator]();
// 遍历器每次移动指针（调用 next 方法），都检查一下返回值的 done 属性
var $result = $Iterator.next();
while (!$result.done) {
  var x = $result.value;
  // ...
  // done 值为 false，说明遍历还没结束，就移动遍历器对象的指针到下一步（调用 next 方法），不断循环
  $result = $Iterator.next();
}
