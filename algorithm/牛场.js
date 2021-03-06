/*
 * @Author: monkeyfly
 * @Date: 2021-06-12 11:18:03
 * @Description:
 * @LastEditors: monkeyfly
 * @LastEditTime: 2021-06-12 19:55:35
 * @FilePath: /interview/algorithm/牛场.js
 */

// 算法题：
// 假设在农场中有一头母牛，它在第2年底会生一头母牛和一头公牛，第3年年底只会生一头母牛，
// 但是母牛在第5年就会死去，而公牛也只能存活4年。
// 假设一家农场一开始只有一头母牛，请问：N年后农场里一共有多少头牛？请定义一个方法实现。

// 1、bull：公牛（用于配种的公牛）。
// 2、cattle：黄牛（牛这种哺乳动物的总称）。
// 3、cow：奶牛，母牛（以挤奶为目的的奶牛）。
// 4、ox：经过阉割后的公牛。

class Cattle {
  constructor(gender, age, alive) {
    this.gender = gender;
    this.age = age || 1;
    this.alive = alive || true;
  }
  static groups = [];
  growUp() {
    this.age++;
  }
}

// 公牛：只能存活4年，
class Bull extends Cattle {
  constructor() {
    super();
    this.gender = "male";
  }
  growUp() {
    this.age++;
    if (this.age === 4) {
      this.alive = false;
    }
  }
}

// 母牛：能存活5年，并且可以生育--第2年生一头母牛和公牛，第3年生一头母牛。
class Cow extends Cattle {
  constructor() {
    super();
    this.gender = "female";
  }
  growUp() {
    this.age++;
    if (this.age === 2) {
      // 第2年生一头母牛和公牛
      Cattle.groups.push(new Cow(), new Bull());
    }
    if (this.age === 3) {
      // 第3年生一头母牛
      Cattle.groups.push(new Cow());
    }
    if (this.age === 5) {
      this.alive = false;
    }
  }
}

function getCattleTotal(n) {
  for (let i = 1; i <= n; i++) {
    // 循环每一年
    if (i === 1) {
      Cattle.groups.push(new Cow());
    } else {
      const len = Cattle.groups.length;
      for (let j = 0; j < len; j++) {
        // 循环数组中的每一头牛
        Cattle.groups[j].growUp();
      }
    }
    Cattle.groups = Cattle.groups.filter((c) => c.alive);
  }
  return Cattle.groups.length;
}

const total = getCattleTotal(7);

console.log(total);
