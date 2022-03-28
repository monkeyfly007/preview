/*
 * @Author: monkeyfly
 * @Date: 2021-06-01 22:53:10
 * @Description: 快速排序
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-06-01 23:51:18
 * @FilePath: /interview/js/algorithm/quickSort.js
 */

const arr = [5, 3, 4, 1, 2, 6];

Array.prototype.quickSort = function () {
  const rec = (arr) => {
    if (!arr.length) return [];
    if (arr.length === 1) return arr;
    const left = [],
      right = [];
    const mid = Math.floor(arr.length / 2);
    console.log(mid, "mid");
    for (let i = 0; i < arr.length; i++) {
      if (i !== mid) {
        if (arr[i] > arr[mid]) {
          right.push(arr[i]);
        } else {
          left.push(arr[i]);
        }
      }
    }
    return [...rec(left), arr[mid], ...rec(right)];
    // console.log(left, arr[mid], right, '...');
    // [ 3, 1, 2 ] 4 [ 5 ]
  };
  const res = rec(this);
  //   console.log(res);Í
  res.forEach((n, i) => (this[i] = n));
};

arr.quickSort();
console.log(arr, 'after');
