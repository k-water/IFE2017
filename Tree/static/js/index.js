var nodes = [{
    "name": "父节点1",
    "children": [{
        "name": "子节点1"
      },
      {
        "name": "子节点2"
      }
    ]
  },
  {
    "name": "父节点2",
    "children": [{
        "name": "子节点3"
      },
      {
        "name": "子节点4",
        "children": [{
          "name": "子节点5"
        }, {
          "name": "子节点6",
          "children": [{
            "name": "子节点11"
          }, {
            "name": "子节点22"
          }]
        }]
      }
    ]
  }
]

const nodeType = function () {

}

nodeType.prototype = {
  // 创建节点
  // 参数 type className innerHTML
  createNode: function (type) {
    let node = document.createElement(type)
    node.className = arguments[1] ? arguments[1] : ''
    node.innerHTML = arguments[2] ? arguments[2] : ''
    return node
  },

  // 切换 点击显示隐藏
  toggleShow(obj, cls) {
    const regStr = '(\\s|^)' + cls + '(\\s|$)'
    const hasObj = obj.className.match(new RegExp(regStr))

    if (!hasObj) {
      obj.className += ' ' + cls
    } else {
      let reg = new RegExp(regStr)
      obj.className = obj.className.replace(reg, '')
    }
  }
}

const nodeTree = function (data) {
  this.data = data
  this.elem = new nodeType()

  document.querySelector('.container').appendChild(this.convertData(data))
  this.addEvent()
}

nodeTree.prototype = {
  convertData: function (data) {
    let parentNode = this.elem.createNode('ul', 'node')

    for (let item in data) {
      let liNode = this.elem.createNode('li')
      let txtNode = this.elem.createNode('div', 'tree', data[item].name)

      // 图标样式
      txtNode.className = data[item].children ? 'tree' : 'tree children'
      liNode.appendChild(txtNode)

      // 若有子节点 则递归
      if (data[item].children) {
        liNode.appendChild(this.convertData(data[item].children))
      }
      parentNode.appendChild(liNode)
    }
    return parentNode
  },

  addEvent: function () {
    const nodeList = document.querySelectorAll('.tree')
    const _this = this

    Array.from(nodeList).map(function (item) {
      item.addEventListener('click', function () {
        // 获取子节点列表
        let cList = this.parentNode.childNodes[1]

        // console.log(cList)

        if (cList) {
          _this.elem.toggleShow(this, 'open')
          _this.elem.toggleShow(cList, 'open')
        }
      })
    })
  }
}
const newTree = new nodeTree(nodes)
