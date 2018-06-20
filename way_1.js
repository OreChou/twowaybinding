// Manual trigger
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

// ViewModel 更新函数
function ViewModelSet(key, value) {
  data[key] = value
  scan()
}

// View 绑定监听
elems[1].addEventListener('keyup', function(e) {
  ViewModelSet('value', e.target.value)
}, false)


// -------- 程序执行 -------
scan()
setTimeout(() => {
  ViewModelSet('value', 'hello world')
}, 1000);