const fs = require("promise-fs"),
    { data, splitter } = require("./file.js"),
    { context, modal } = require("./context.js"),
    { $, search, add, remove, contains } = require("./css.js"),
    { dialog } = require("electron")

/**
 * Write JSON file "data.json".
 * Reading all Tabs and writing "data.json" file.
 */
function reset_tab_data() {
    let tabs = search("#Tabs").children, d = data.format()

    for (let i = 0; i < tabs.length; i++) {
        let x = tabs[i].attributes

        d.all[i] = {
            src: x.data.value,
            name: x.name.value,
            type: "txt",
            opened: contains(tabs[i], "active") ? true : false
        }
    }

    data(JSON.stringify(d))
}
/**
 * Read tab data.
 */
async function tab_data() {
    console.log("tab_data")
    let txt = new Array(),
        result = data()
            .then(z => {
                try {
                    return JSON.parse(z)
                } catch {
                    data(JSON.stringify(data.format()))
                    return { all: [] }
                }
            })
            .then(z => z.all.forEach(y => {
                fs.readFile(y.src + y.name, "utf-8")
                    .then(x => {
                        y.content = y.opened ? x : ""
                        txt.push(y)
                    })
                    .catch(x => { console.log("Fail open file", x) })

                txt.push(y)
            }))
            .then(() => { return txt })
    return result
}
/**
 * 
 * @param {{
 *     src: string,
 *     name: string,
 *     opened?: boolean,
 *     content?: string
 * }} params src: A path to a file. name: A name to a file. opened: Boolean, document is opened in text redactor. content: A file text 
 * @param {HTMLTextAreaElement | HTMLObjectElement} [textarea] HTML textarea element 
 */
function div(params, textarea) {
    let result = document.createElement("div")

    result.setAttribute("data", params.src)
    result.setAttribute("name", params.name)
    result.innerText = params.name

    if (params.opened != undefined && params.opened == true) {
        textarea.value = params.content
        add(result, ["tab", "active"])
    } else add(result, "tab")

    result.onclick = e => {
        e.preventDefault()
        let z = result.attributes
        fs.readFile(z.data.value + z.name.value)
            .then(content => search(".textarea").value = content)
            .catch(error => {
                console.error(error)
                modal({
                    object: result,
                    data: "File is not defined"
                })
            })

        let tabs = search("#Tabs").children
        for (let i = 0; i < tabs.length; i++) {
            if (contains(tabs[i], 'active')) {
                remove(tabs[i], 'active')
            }
        }
        reset_tab_data()
        add(result, 'active')
    }

    result.oncontextmenu = e => {
        e.preventDefault()
        context({ type: "tab", object: result }).popup({ window: remote.getCurrentWindow() })
    }

    return result
}
/**
 * Starting code in tab data
 * @param {HTMLTextAreaElement | HTMLObjectElement} textarea HTML textarea element.
 */
async function startTab(textarea) {
    let all = new Array(), result = tab_data()
        .then(z => {
            for (let i = 0; i < z.length; i++) all.push(div(z[i], textarea))
            return all
        })
    return result
}
/**
 * Create tab in work
 * @param {{
 *     src: string,
 *     name: string
 * }} params scr: A path to a file. name: A title to a file
 */
function createTab(params) {
    let filePath
    if (params.filePath) filePath = splitter(params, "\\")
    else filePath = params
    search("#Tabs").appendChild(div(filePath))
    reset_tab_data()
}

exports.reset_tab_data = reset_tab_data
exports.createTab = createTab
exports.startTab = startTab