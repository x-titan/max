let $$ = document,
  each = (arr, fn) => { for (let i = 0; i < arr.length; i++) fn(arr[i], i) },
  contains = (x, y) => x.classList.contains(y),
  add = (x, y) => {
    if (Array.isArray(y)) x.classList.add(...y)
    else x.classList.add(y)
  },
  remove = (x, y) => {
    if (Array.isArray(y)) x.classList.remove(...y)
    else x.classList.remove(y)
  },
  toggle = (x, css) => { contains(x, css) ? remove(x, css) : add(x, css) }
/**
 * @param { "div" | string } query
 * @returns { HTMLDivElement | Element }
 */
function search(query) { return $$.querySelector(query) }

function $(query) {
  if (this == globalThis || this == undefined || this == null) return new $(query)
  this.x = search(query)

  EXTEND(this, {
    attr: (name = "") => {
      let z = this.x.getAttributeNode(name)
      return {
        get: () => z,
        value: (str) => {
          if (str == null | str == undefined) return z.value
          else z.value = str
        }
      }
    }
  })
}
let h = "prototype"
$[h].constructor = $

function EXTEND(target, proto) { for (let x in proto) if (Object.hasOwnProperty.call(proto, x)) target[x] = proto[x] }
EXTEND.pro = (x, y) => { for (let z in y) if (Object.hasOwnProperty.call(y, z)) x[x] = ("function" == typeof y[z] ? y[z].bind(x) : y[z]) }

$[h].on = function (ev, fn, opt) { this.x.addEventListener(ev, fn, opt); return this }
$[h].add = function (css) { add(this.x, css); return this }
$[h].remove = function (css) { remove(this.x, css); return this }
$[h].toggle = function (css) { toggle(this.x, css); return this }
$[h].search = function (query) { return this.x.querySelector(query) }
$[h].searchAll = function (query) { return this.x.querySelectorAll(query) }

exports.$ = $
exports.each = each
exports.add = add
exports.remove = remove
exports.contains = contains
exports.search = search
exports.toggle = toggle
