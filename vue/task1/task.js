/**
 * @author water
 * @version 1.0
 * @date 2017/02/28
 */



function Observer(data) {
  this.data = data
  this.walk(data)
}

let pattern = {
  get() {
    console.log('你访问了' + key)
    return val
  },
  set(newVal) {
    console.log('你设置了' + key);
    console.log('新的' + key + ' = ' + newVal)
    if (newVal === val) return;
    val = newVal
  }
}

Observer.prototype.walk = function (obj) {
  let val
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key]
      if (typeof val === 'Object') {
        new Observer(val)
      }
      this.convert(key, val)
    }
  }
}


Observer.prototype.convert = function (key, val) {
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('你访问了' + key);
      return val
    },
    set: function (newVal) {
      console.log('你设置了' + key);
      console.log('新的' + key + ' = ' + newVal)
      if (newVal === val) return;
      val = newVal
    }
  })
}

let app1 = new Observer({
  name: 'youngwind',
  age: 25
});

let app2 = new Observer({
  university: 'bupt',
  major: 'computer'
});
