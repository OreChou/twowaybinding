// Hijacking
let elems = [document.getElementById('el'), document.getElementById('input')]

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

// 设置对象的代理
let data = new Proxy({}, {
  get: function(target, key, receiver) {
    return target.value
  },
  set: function (target, key, value, receiver) { 
    target.value = value
    scan()
    return target.value
  }
})

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
data['value'] = 'Hello'
scan()
setTimeout(() => {
  data.value = 'Hello world'
}, 1000);