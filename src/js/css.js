let $$ = document,
  each = (arr, fn) => { for (let i = 0; i < arr.length; i++)     fn(arr[i], i) },
  contains = (x, y) => x.classList.contains(y),
  add = (x, y) => x.classList.add(y),
  remove = (x, y) => x.classList.remove(y)


function search(query) { return $$.querySelector(query) }



function $(query) {
  if (this == globalThis || this == undefined || this == null) return new $(query)
  this.x = search(query)
}
$.prototype.constructor = $

function EXTEND(target, proto) { for (let x in proto) if (Object.hasOwnProperty.call(proto, x)) target[x] = proto[x] }
EXTEND.pro = (x, y) => { for (let z in y) if (Object.hasOwnProperty.call(y, z)) x.prototype[x] = ("function" == typeof y[z] ? y[z].bind(x) : y[z]) }


$.prototype.on = function (ev, fn, opt) { this.x.addEventListener(ev, fn, opt) }
$.prototype.toggle = function (css) { contains(this.x, css) ? remove(this.x, y) : add(this.x, y) }

exports.$ = $
exports.search = search
exports.$toggle = () => { }
