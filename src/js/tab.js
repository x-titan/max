const fs = require("promise-fs")
const { data, splitter } = require("./file.js")
const { context } = require("./context.js")
const { $, search, $toggle } = require("./css.js")

/**
 * Write JSON file "data.json".
 * Reading all Tabs and writing "data.json" file.
 */
function reset_tab_data() {
    var tabs = search("#Tabs").children
    var json
    var d = {
        name: "data",
        format: {
            src: "string",
            name: "string",
            type: "string",
            opened: "boolean"
        },
        all: []
    }
    for (let i = 0; i < tabs.length; i++) {
        const x = tabs[i]

        d.all[i] = {
            src: x.attributes.data.value,
            name: x.attributes.name.value,
            type: "txt",
            opened: x.classList.contains("active") ? true : false
        }
    }
    json = JSON.stringify(d)

    data(json)
}
/**
 * Read tab data.
 */
async function tab_data() {
    var x = {}
    const txt = new Array()
    var result = data()
        .then(z => {
            x = JSON.parse(z)
            for (let i = 0; i < x.all.length; i++) {
                fs.readFile(x.all[i].src + x.all[i].name, "utf-8").then((content)=>{
                    txt.push({
                        src: x.all[i].src,
                        name: x.all[i].name,
                        opened: x.all[i].opened,
                        content: x.all[i].opened ? content : "none"
                    })
                })
            }
            return txt
        })
    reset_tab_data()
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
    var result = document.createElement("div")

    result.setAttribute("data", params.src)
    result.setAttribute("name", params.name)
    result.innerText = params.name

    if (params.opened != undefined && params.opened == true) {
        params.content.then((content)=>{
            textarea.value = content
        })
        
        result.setAttribute("class", "tab active")
    }else{
        result.setAttribute("class", "tab")
    }

    result.onclick = (e) => {
        e.preventDefault()

        fs.readFile(result.attributes.data.value + result.attributes.name.value)
            .then((content) => {
                search(".textarea").value = content
            }).catch((error) => {
                console.error(error)
            })

        var tabs = search("#Tabs").children
        for (let i = 0; i < tabs.length; i++) {
            if (tabs[i].classList.contains('active')) {
                tabs[i].classList.remove('active')
            }
        }
        reset_tab_data()
        result.classList.add('active')
    }

    result.oncontextmenu = (e) => {
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
    const all = new Array()
    var result = tab_data()
        .then((z) => {
            for (let i = 0; i < z.length; i++) {
                var x = z[i]
                all.push(div(x, textarea))
            }
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
    var filePath
    if(params.filePath){
        filePath = splitter(params,"\\")
    }else{
        filePath = params
    }
    search("#Tabs").appendChild(div(filePath))
    reset_tab_data()
}

exports.reset_tab_data = reset_tab_data
exports.createTab = createTab
exports.startTab = startTab