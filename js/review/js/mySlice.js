let arr = [2, 4, 5];

// // if(start && !end)
// const arr1 = arr.slice(0); // [2, 4, 5]
// const arr2 = arr.slice(1); // [4, 5]
// const arr3 = arr.slice(2); // [5]

// // (1)start > 0 && end > 0
// const arr4 = arr.slice(); // [2, 4, 5]
// const arr5 = arr.slice(1); // [4, 5]
// const arr6 = arr.slice(1, 2); // [4]

// // if start >= end return []
// const arr7 = arr.slice(2, 1); // []
// const arr2 = arr.slice(3, 1); // []

// // (2)start < 0 && end < 0
// // 如果是 start 是负数，那么它规定从数组尾部开始算起的位置。即 -1 指最后一个元素，-2 指倒数第二个元素，以此类推
// // 如果没有指定 end，那么切分的数组包含从 start 到数组结束的所有元素。如果 end 是负数，那么它规定的是从数组尾部开始算起的元素

// // if (Math.abs(start) >= arr.length) start = 0
// const arr1 = arr.slice(-99, -1); // [2, 4]
// const arr2 = arr.slice(-2, -1); // [4]
// const arr3 = arr.slice(-3, -1); // [2, 4]
// const arr4 = arr.slice(-4, -1); // [2, 4]

// // if start >= end return []
// const arr1 = arr.slice(-3, -4); // []
// const arr2 = arr.slice(-1, -3); // []

// // (3)一正一负
// //  if(start > 0 && end < 0)
// const arr1 = arr.slice(-3, 1); // [2]
// const arr2 = arr.slice(-3, 2); // [2, 4]
// const arr3 = arr.slice(-3, 3); // [2, 4, 5]
// const arr4 = arr.slice(-1, 3); // [5]

// // if (start < 0 && end > 0) return []
// const arr1 = arr.slice(3, -1); // []

// // (4) if(end === 0) return []
// const arr1 = arr.slice(3, 0); // []
// const arr2 = arr.slice(-3, 0); // []
// const arr3 = arr.slice(0, 0); // []

Array.prototype.myslice = function () {
  try {
    const self = this;
    const params = Array.from(arguments),
      len = self.length;
    let res = [];
    let start = Number(params[0]),
      end = Number(params[1]);
    // console.log(arguments.length, 'arguments')
    if (!arguments.length) return self;
    if (isNaN(Number(start))) {
      // 如果 start 是非数字
      start = 0;
    }
    if (end && isNaN(Number(end))) {
      // 如果 end 是非数字
      end = len;
    }
    if (params.length === 1) {
      // 如果只有 start 存在
      if (start < 0) start = Math.abs(start) > len ? 0 : len + start;
      end = len;
      for (let i = start; i < end; i++) {
        res.push(self[i]);
      }
      return res;
    } else if (params.length === 2) {
      // 如果 start 和 end 都存在
      if (start >= end || end === 0) return (res = []);
      if (start > 0 && end < 0) return (res = []);
      if (start < 0 && end > 0) {
        start = len + start;
      } else if (start < 0 && end < 0) {
        start = len + start <= 0 ? 0 : len + start;
        end = len + end;
      }
      if (end > len) end = len;
      for (let i = start; i < end; i++) {
        res.push(self[i]);
      }
      return res;
    }
  } catch (e) {
    console.error(e);
  }
};

// slice 对于小数部分，直接向下取整。
// arr
// (3) [2, 4, 5]
// arr.slice(1.6, 3)
// (2) [4, 5]
// arr.slice(1, 3)
// (2) [4, 5]
// arr.slice(2, 3)
// [5]
// arr.slice(-1.5, 3)
// [5]
// arr.slice(-1, 3)
// [5]
// arr.slice(-2, 3)
// (2) [4, 5]

// 如果 isNaN 函数的参数不是 Number 类型， isNaN 函数会首先尝试将这个参数转换为数值，然后才会对转换后的结果是否是 NaN 进行判断。


Array.prototype.mySlice = function (start, end) {
  const arr = this,
    len = arr.length;
  let res = [];
  if (isNaN(start)) { // 如果 start 是一个非数字的值
    start = 0;
  } else if (start < 0) {
    // start = Math.abs(start) > len ? 0 : len + start; // 只考虑整数，不考虑小数，只需要一行即可
    start = (Math.abs(start) > len) ? 0 : (Math.abs(start) < 1 ? 0 : len + Math.ceil(Number(start))); //考虑小数情况(负)
  }else{
    start = (start > len) ? len : Math.floor(Number(start)) //考虑小数情况(正)，只考虑整数不需要此 else 代码
  }
  if (isNaN(end)) { // 如果 end 是一个非数字的值
    end = len;
  } else if (end < 0) {
    // end = Math.abs(end) > len ? len : len + end; // 只考虑整数，不考虑小数，只需要一行即可
    end = (Math.abs(end) > len) ? 0 : (Math.abs(end) < 1 ? 0 :len + Math.ceil(Number(end))); //考虑小数情况(负)
  }else{// 只考虑整数不需要此 else 代码
    end = (end > len) ? len : Math.floor(Number(end)) //考虑小数情况(正)，只考虑整数不需要此 else 代码
  }
  console.log('start:',start, 'end:',end)
  if (start > end) return [];
  for (let i = start; i < end; i++) {
    res.push(arr[i]);
  }
  return res;
};
