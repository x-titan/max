const fs = require("promise-fs")
const { Menu, MenuItem } = require("electron").remote
const { rename, reset_tab_data } = require("./file.js")
const { $, search, add } = require("./css.js")
const { step } = require("./promise.js")

/**
 * Method in calling to context menu
 * @param {{
 *     type: string,
 *     object: HTMLDivElement
 * }} params type: context calling type. object: HTML div or other element.
 */
function context(params) {
    let popup = new Menu()
    switch (params.type) {
        case "tab":
            popup.append(new MenuItem({
                label: "Rename", click() {
                    modal({
                        type: "rename",
                        data: params.object.getAttribute("data"),
                        object: params.object,
                        name: params.object.getAttribute("name")
                    })
                }
            }))
            popup.append(new MenuItem({
                label: "Close", click() {
                    search(".textarea").value = params.object.outerHTML = ''
                    reset_tab_data()
                }
            }))
            popup.append(new MenuItem({
                label: "Delete", click() {
                    params.object.outerHTML = ''
                    fs.unlink(params.object.getAttribute("data") + params.object.getAttribute("name")).then(() => {
                        console.log("File " + params.object.getAttribute("name") + " deleted.")
                    })
                    reset_tab_data()
                }
            }))
            break
        case "this":
            popup.append(new MenuItem({
                label: "Rename", click() {
                    modal({
                        type: "rename",
                        data: params.object.getAttribute("data"),
                        object: params.object,
                        name: params.object.getAttribute("name")
                    })
                }
            }))
            break

        default:
            console.log("error context function")
            break
    }
    return popup
}
/**
 * Opened functions Modal window in program
 * @param {{
 *     type: String,
 *     name: String,
 *     data: String,
 *     object: Element | SVGElementTagNameMap | HTMLElementTagNameMap
 * }} params type: Modal window type. name, data, object: having params in function "rename".
 */
function modal(params) {
    let m = $("#modal"), close = () => {
        m.add("close")
        m.searchAll("block").forEach(x => add(x, "x"))
    }

    m.searchAll("close").forEach(x => x.onclick = () => close())
    if (params) {
        switch (params.type) {
            case "rename":
                let r = $("#modal_rename"), ri = search("#rename_input")
                m.remove("close")
                r.remove("x")
                ri.value = params.name
                r.search(".rename_close").onclick = () => {
                    close()
                    r.add("x")
                }
                r.search(".rename_button").onclick = () => {

                    let result = ri.value

                    step().then(() => {
                        rename({
                            data: params.data,
                            oldName: params.name,
                            newName: result
                        })
                    }).then(() => {
                        params.object.innerHTML = result
                        params.object.setAttribute("name", result)
                        m.toggle("close")
                        r.toggle("x")
                    })
                }
                break
            default:
                let n = $("#message")
                m.remove("close")
                n.remove("x")
                n.search(".text").innerHTML = params.data
                n.search(".cancel").onclick = () => {
                    close()
                    if (params.object) params.object.outerHTML = ''
                }
                break
        }
    }
    reset_tab_data()
}

exports.context = context
exports.modal = modal