// Hijacking
let elems = [document.getElementById('el'), document.getElementById('input')]
let data = {
  value: 'hello'
}

// 定义 Directive
let directive = {
  text: function(text) {
    this.innerHTML = text
  },
  value: function(value) {
    this.setAttribute('value', value)
    this.value = value
  }
}

// 定义对象属性设置劫持
function defineGetAndSet(obj, propName) {
  let bValue
  Object.defineProperty(obj, propName, {
    get: function() {
      return bValue
    },
    set: function(value) {
      bValue = value
      // 在 vue 中，这里不会去扫描所有的元素，而是通过订阅发布模式，通知那些订阅了该数据的 view 进行更新
      scan()
    },
    enumerable: true,
    configurable: true
  })
}

// View 绑定监听
elems[1].addEventListener('keyup', function(e) {
  data.value = e.target.value
}, false)

// 扫描所有的元素
function scan() {
  // 扫描带指令的节点属性
  for (let elem of elems) {
    elem.directive = []
    for (let attr of elem.attributes) {
      if (attr.nodeName.indexOf('q-') >= 0) {
        directive[attr.nodeName.slice(2)].call(elem, data[attr.nodeValue])
        elem.directive.push(attr.nodeName.slice(2))
      }
    }
  }
}

// -------- 程序执行 -------
scan()
defineGetAndSet(data, 'value')
setTimeout(() => {
  data.value = 'Hello world'
}, 1000);