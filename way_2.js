// Dirty detection
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

// 脏数据循环检测
function digest(elems) {
  for (let elem of elems) {
    if (elem.directive === undefined) {
      elem.directive = {}
    }
    for (let attr of elem.attributes) {
      if (attr.nodeName.indexOf('q-event') >= 0) {
        let dataKey = elem.getAttribute('q-bind') || undefined
        // 进行脏数据检测，如果数据改变，则重新执行命令
        if (elem.directive[attr.nodeValue] !== data[dataKey]) {
          directive[attr.nodeValue].call(elem, data[dataKey])
          elem.directive[attr.nodeValue] = data[dataKey]
        }
      }
    }
  }
}

// 数据监听
function $digest(value) {
  let list = document.querySelectorAll('[q-bind=' + value + ']')
  digest(list)
}

// View 绑定监听
elems[1].addEventListener('keyup', function(e) {
  data.value = e.target.value
  $digest(e.target.getAttribute('q-bind'))
}, false)

// -------- 程序执行 -------
$digest('value')
setTimeout(() => {
  data.value = "Hello world"
  $digest('value')
}, 1000);