const fs = require("promise-fs")
const { dialog } = require("electron").remote

/**
 * Split to path. In resultining fs modules path "\".
 * @param {{
 *     allPath: string
 * }} params allPath: File path + file name.
 * @param {string} split splitting element
 * @returns {{
 *     src: string,
 *     name: string,
 * }}
 */
/**
 * Split to path. In resultining fs modules path "\".
 * @param {{
 *     allPath: string
 * }} params allPath: File path + file name.
 * @param {string} split splitting element
 * @returns {{
 *     src: string,
 *     name: string,
 *     content: string
 * }}
 */
function splitter(params, split) {
    var allPath = params.filePath.split(split)
    var result = {}
    result.name = allPath[allPath.length - 1]
    allPath.length--
    result.src = allPath.join('/') + '/'

    if(params.content!= undefined){
        result.content = params.content
    }

    return result
}
/**
 * Create or Write file.
 * @param {{
 *     src: String,
 *     name: String,
 *     text: String
 * }} params src: A path to a file. name: A title to a file. text: The data to write.
 */
async function write(params) {
    fs.writeFile(params.src + params.name, params.text)
        .then((a, b) => {
            console.log(`File ${params.name} writed`)
        })
}
/**
 * Save document
 * @param {String} src  URL address
 * @param {String} name document name
 * @param {String} text document text
 */
async function save(src, name, text) {
    fs.writeFile(src + name, text)
        .then((a, b) => {
            if (a) console.log(a)
            if (b) console.log(b)
        })
}
/**
 * Renamed file name.
 * @param {{
 *     data: String,
 *     oldName: String,
 *     newName: String
 * }} params data: A path to a file. oldName: Before name to a file. newName: After name to a file.
 */
async function rename(params) {
    fs.rename(params.data + params.oldName, params.data + params.newName)
        .then((a, b) => {
            console.log(`File ${params.oldName} renamed to ${params.newName} succefility`)
        })
}
/**
 * Opened dialog in config to file type:
 * 
 * ANY
 * 
 * Text : default
 * 
 * JavaScript
 * 
 * JSON
 * @param {(params : {
 *     allPath : String
 * }) => void} callback calling is function Succefility.
 */
function create(callback) {
    dialog.showSaveDialog({
        filters: [
            { name: 'Any', extensions: ['*'] },
            { name: 'Text', extensions: ['txt'] },
            { name: 'JavaScript', extensions: ['js', 'ts'] },
            { name: 'JSON', extensions: ['json'] }
        ]
    }).then((params) => {
            fs.writeFile(params.filePath, '')
                .then((a, b) => {
                    console.log(`File ${params.filePath} created`)

                    callback({ filePath: params.filePath })
                })
        })
}

/**
 * Opened dialog. Return code: 
 * 
 *     callback(params: { src: string, name: string, content: string }) : void
 * @param {{
 *     src: string,
 *     name: string
 * }} params src: A path to a file. name: File name.
 */
async function open(callback) {
    console.log("open: ")
    dialog.showOpenDialog({
        filters: [
            { name: 'Any', extensions: ['*'] },
            { name: 'Text', extensions: ['txt'] },
            { name: 'JavaScript', extensions: ['js', 'ts'] },
            { name: 'JSON', extensions: ['json'] }
        ]
    }).then((params) => {
        console.log(params)
        fs.readFile(params.filePaths[0], { encoding: "utf8" }).then((content) => {
            console.log(content)
            var filePath = splitter({filePath: params.filePaths[0]},"\\")

            callback(filePath)
        })
    })
}
/**
 * Return fs module in path "data.json".
 * If params !undefined to "fs.writeFile" else  "fs.readFile"
 * @param {string | JSON} [json] writing data to "data.json".
 */
async function data(json) {
    // var link = "resources/app/src/files/data/data.json"
    var link = "src/files/data/data.json"

    if (json){
        return await fs.writeFile(link, json)
    }
    return await fs.readFile(link)
}


// Export functions
exports.splitter = splitter
exports.create = create
exports.rename = rename
exports.save = save
exports.write = write
exports.open = open
exports.data = data

// BUGS

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
exports.reset_tab_data = reset_tab_data