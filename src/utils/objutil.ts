//比较两个对象的所有值是否相同
export function areObjectsEqual(obj1: any, obj2: any): boolean {
    // 获取两个对象的属性名数组
    const keys1 = Object.keys(obj1);
    const keys2 = Object.keys(obj2);
  
    // 如果属性数量不同，直接返回 false
    if (keys1.length !== keys2.length) {
      return false;
    }
  
    // 遍历属性名数组，逐个比较属性值
    for (let key of keys1) {
      // 如果属性值是对象，则递归调用 areObjectsEqual 进行深度比较
      if (typeof obj1[key] === 'object' && typeof obj2[key] === 'object') {
        if (!areObjectsEqual(obj1[key], obj2[key])) {
          return false;
        }
      } else {
        // 否则直接比较属性值
        if (obj1[key] !== obj2[key]) {
          return false;
        }
      }
    }
  
    // 所有属性值都相同，返回 true
    return true;
  }
