/*
 * @Author: monkeyfly
 * @Date: 2021-06-21 22:29:51
 * @Description:
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-06-22 00:46:41
 * @FilePath: /interview/js/myPromise.js
 */

// const p1 = new Promise(executor);
// function executor(resolve, reject) {
//   resolve();
// }
// p1.then(onResolved, onRejected);
// function onResolved(res) {
//   console.log(res);
//   return res;
// }
// function onRejected(err) {
//   console.log(err);
//   return err;
// }

// const p = new Promise((resolve, reject) => {
//     resolve('success')
//     reject('failure')
// })
// p.then(value => {
//     console.log('resolve', value)
// }, reason => {
//     console.log('reject', reason)
// })

class MyPromise {
  constructor(executor) {
    try {
      if (!executor && typeof executor !== "function") {
        throw new Error(
          `Uncaught TypeError: Promise resolver ${executor} is not a function`
        );
      }
      // 状态：promise 有三种状态，初始状态为 pending
      // 特点：状态只能从待定到成功或者失败；并且状态一旦发生改变就不能再变，之后任何时候得到的都是这个值。
      this.STATUS = {
        PENDING: "pending",
        FULFILLED: "fulfilled",
        REJECTED: "rejected",
      };
      this.status = this.STATUS.PENDING; // 当前的状态
      this.value = undefined; // 成功后的值
      this.reason = null; // 失败的原因，被拒绝的理由
      //   this.onResolvedCallback = null;
      //   this.onRejectedCallback = null;
      this.onResolvedCallbackQueue = []; // 用队列来存储成功的回调，then 方法可能会被调用多次
      this.onRejectedCallbackQueue = []; // 用队列来存储失败的回调
      //  实例初始化时，执行器方法会立即执行，其接收两个参数：
      executor(this.resolve, this.reject);
    } catch (e) {
      console.error(e);
    }
  }

  //  对象状态的改变由执行器的两个参数决定
  resolve = (value) => {
    if (this.status === this.STATUS.PENDING) {
      // 只有状态是待定才能更改状态为成功；pending => fulfilled
      this.status = "fulfilled";
      this.value = value;
      console.log("resolve value:", value);
      //  this.onResolvedCallback && this.onResolvedCallback(value);
      // 从队列中取出来依次执行
      while (this.onResolvedCallbackQueue.length) {
        const onResolvedCallback = this.onResolvedCallbackQueue.shift();
        onResolvedCallback(value);
      }
    }
  };

  reject = (reason) => {
    // 只有状态是待定才能更改状态为失败；pending => rejected
    if (this.status === this.STATUS.PENDING) {
      this.status = "rejected";
      this.reason = reason;
      console.log("reject reason:", reason);
      //   this.onRejectedCallback && this.onRejectedCallback(reason);
      while (this.onRejectedCallbackQueue.length) {
        const onRejectedCallback = this.onRejectedCallbackQueue.shift();
        onRejectedCallback(value);
      }
    }
  };

  //  then 方法用于给对象添加状态的处理程序，可以接收两个参数：成功的回调和失败的回调
  //   then 方法的简单实现：判断状态调用对应的回调函数
  then = (onResolved, onRejected) => {
    return new MyPromise((resolve, rejected) => {
      // 实现 then 的链式调用
      // then 方法调用时，对象的状态可能还是 pending，可能会在延时后变更对应的状态
      if (this.status === this.STATUS.PENDING) {
        // 缓存成功和失败的回调函数
        // 成功的回调
        //   this.onResolvedCallback = onResolved;
        this.onResolvedCallbackQueue.push(onResolved);
        // 失败的回调
        // this.onRejectedCallback = onRejected;
        this.onRejectedCallbackQueue.push(onRejected);
      }
      if (this.status === this.STATUS.FULFILLED) {
        // 调用成功的回调，返回成功的值
        // onResolved && onResolved(this.value);

        // 获取成功回调函数的执行结果
        const x = onResolved(this.value);
        // 统一处理返回的值
        resolvePromise(x, resolve, this.reject);
      }
      if (this.status === this.STATUS.REJECTED) {
        // 调用失败的回调，返回失败的理由
        onRejected && onRejected(this.reason);
      }
    });
  };
}

function resolvePromise(x, resolve, reject) {
  if (x instanceof MyPromise) {
    x.then(resolve, reject); // 实例，目的是为了改变其状态，简化写法
    x.then(
      (value) => resolve(value),
      (reason) => reject(reason)
    ); // 等价于
  } else {
    resolve(x); // 普通值
  }
}

module.exports = MyPromise;

// ceshi:

// const p1 = new MyPromise((resolve, reject) => {
//   //   resolve("success");
//   reject("failure");
// });
// p1.then(
//   (res) => {
//     console.log("then resolved value:", res);
//   },
//   (err) => {
//     console.error("then rejected reason:", err);
//   }
// );

// then 方法的异步调用
// const p2 = new MyPromise((resolve, reject) => {
//   setTimeout(() => {
//     resolve("st success");
//   }, 1000);
// });
// p2.then(
//   (res) => {
//     console.log("then resolved value:", res);
//   },
//   (err) => {
//     console.error("then rejected reason:", err);
//   }
// );

// then 方法的多次调用
// const p3 = new MyPromise((resolve) => {
//   setTimeout(() => {
//     resolve("p3 st success");
//   }, 1000);
// });
// p3.then((value) => {
//   console.log("p3 then1 resolve :", value);
// });
// p3.then((value) => {
//   console.log("p3 then2 resolve :", value);
// });
// p3.then((value) => {
//   console.log("p3 then3 resolve :", value);
// });

// 实现 then 方法的链式调用
const p4 = new MyPromise((resolve) => {
  // setTimeout(() => {
  resolve("p4 st success");
  // }, 1000);
});
p4.then((value) => {
  console.log("p4 then-chain1 resolve :", value);
  return new MyPromise((resolve, reject) => {
    resolve('other')
  })
})
  .then((value) => {
    console.log("p4 then-chain2 resolve :", value);
  })
  .then((value) => {
    console.log("p4 then-chain3 resolve :", value);
  });
