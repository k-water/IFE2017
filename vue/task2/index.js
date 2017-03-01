function Event() {
  this.events = {}
}

Event.prototype.on = function (attr, callback) {
  if (this.events[attr]) {
    this.events[attr].push(callback)
      // console.log(this.events[attr])
  } else {
    this.events[attr] = [callback]
      // console.log(this.events[attr])
  }
}


Event.prototype.off = function (attr) {
    for (let key of this.events) {
      if (this.events.hasOwnProperty(key) && key === attr) {
        delete this.events[key]
      }
    }
  }
  // ????
Event.prototype.emit = function (attr, ...args) {
  this.events[attr] && this.events[attr].forEach(item => {
    item(...args)
  })
}


function Observer(data) {
  this.data = data
  this.walk(data)
  this.eventsBus = new Event()
}

Observer.prototype.convert = function (key, val) {
  let _this = this
  Object.defineProperty(this.data, key, {
    enumerable: true,
    configurable: true,
    get: function () {
      console.log('您访问了' + key)
      return val
    },
    set: function (newVal) {
      console.log('您设置了' + key)
      console.log('新的' + key + '=' + newVal);

      // 触发$watch
      _this.eventsBus.emit(key, val, newVal);
      val = newVal

      if (typeof newVal === 'Object') {
        new Observer(Val)
      }
    }
  })
}

Observer.prototype.walk = function (obj) {
  let val
  for (let key in obj) {
    if (obj.hasOwnProperty(key)) {
      val = obj[key]

      if (typeof val === 'Object') {
        new Observer(val)
      }
    }
    this.convert(key, val)
  }
}

Observer.prototype.$watch = function (attr, callback) {
  this.eventsBus.on(attr, callback)
}


let app = new Observer({
  name: 'water',
  age: 20,
  address: 'Guangdong, Guangzhou'
})

app.$watch('age', function (oldVal, newVal) {
  console.log(`我的年龄变了，原来是: ${oldVal}岁，现在是：${newVal}岁了`)
})

app.$watch('age', function (oldVal, newVal) {
  console.log(`我的年龄真的变了诶，竟然年轻了${oldVal - newVal}岁`)
})

app.data.age = 18;
