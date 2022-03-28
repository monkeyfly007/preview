
 const obj = {
     name: 'zs',
     age: 20
 }
 function fn(a, b){
    console.log('this', this)
    console.log(a, b)
    return a + b
 }
 fn1 = fn.bind(obj, 2, 3)
 const res = fn1()
 console.log(res, 'res')

/**
 * @description: 手写 bind 方法，返回一个新的函数。
    在 mybind 方法被调用时，新函数的 this 被指定为该方法的第一个参数，而其余的参数作为新函数的参数供调用时使用。
 * @param {Object, [param1, param2, ...]} 
 * @return {Function} 
 */

//  arguments 是一个对应于传递给函数的参数的类数组对象(Array-like Object)。
//  Array-like 意味着参数有一个 length 属性 和 从 0 开始索引的属性，但它没有数组的内置方法
//  arguments 对象是所有（非箭头）函数中都可用的局部变量。
//  可以使用 arguments 对象在函数中引用函数的参数。此对象包含传递给函数的每个参数，第一个参数在索引0处。
//  arguments 对象类似于 Array，但除了 length 属性和索引元素之外没有任何 Array 属性。
//  实际应用中，常见的类似数组的对象是 DOM 操作返回的 NodeList 集合，以及函数内部的 arguments 对象。

 Function.prototype.mybind = function() {
     console.log(arguments)
     // ES5 的写法: slice 方法并不会修改数组，而是返回一个子数组
    //  const params = [].slice.call(arguments)
     // ES6 的写法：Array.from 方法用于将两类对象转为真正的数组：类数组对象（array-like object）和 可遍历的对象（iterable）
     const params = Array.from(arguments)
     const that = params.shift()
     const self = this
     return function () {
       return  self.apply(that, params)
     }
 }

 const newFn = fn.mybind({x: 100}, 1,2,3)
console.log(newFn(), 'newFn')


// ES6 引入 rest 参数（形式为...变量名），用于获取函数的多余参数，这样就不需要使用arguments对象了。
// rest 参数搭配的变量是一个数组，该变量将多余的参数放入数组中。
// arguments对象不是数组，而是一个类似数组的对象。所以为了使用数组的方法，必须使用 Array.prototype.slice.call 先将其转为数组。
// 而 rest 参数就不存在这个问题，它就是一个真正的数组，数组特有的方法都可以使用。
Function.prototype.mybind1 = function(that, ...rest) {
    const self = this
    return function () {
      return  self.apply(that, rest)
    }
}
const newFn1 = fn.mybind1({x: 200}, 11,22,)
console.log(newFn1(), 'newFn1')

//  Array.of方法用于将一组值，转换为数组。这个方法的主要目的，是弥补数组构造函数Array()的不足。因为参数个数的不同，会导致Array()的行为有差异。
//  fill方法使用给定值，填充一个数组。fill方法用于空数组的初始化非常方便。数组中已有的元素，会被全部抹去。

//  function createArray(start, end){
//    try{
//         if(end < start) throw Error('End must be greater than start')
//         if(end - start > 10) throw Error('the maximum range length is 10')
//         const len = end - start + 1
//         const res = new Array(len).fill().map((item, i) => item = start + i)
//         return res
//    }catch(err){
//         console.error(err)
//    }
// }
// createArray(2009, 0)
// createArray(2009, 2019)
// createArray(0, 9)
// createArray(0, 19)


