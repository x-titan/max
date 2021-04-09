const fs = require("promise-fs")
const { Menu, MenuItem } = require("electron").remote
const { rename, reset_tab_data } = require("./file.js")
const { $, search, $toggle } = require("./css.js")
const { step } = require("./promise.js")

/**
 * Method in calling to context menu
 * @param {{
 *     type: string,
 *     object: HTMLDivElement
 * }} params type: context calling type. object: HTML div or other element.
 */
function context(params) {
    var popup = new Menu()
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
    if (params) {
        switch (params.type) {
            case "rename":
                $(".modal").toggle("close")
                $(".rename").toggle("x")
                search("#rename").value = params.name
                search(".rename_close").onclick = () => {
                    $(".modal").toggle("close")
                    $(".rename").toggle("x")
                }
                search(".rename_button").onclick = () => {

                    var result = search("#rename").value

                    step().then(() => {
                        rename({
                            data: params.data,
                            oldName: params.name,
                            newName: result
                        })
                    }).then(() => {
                        params.object.innerHTML = result
                        params.object.setAttribute("name", result)
                        $(".modal").toggle("close")
                        $(".rename").toggle("x")
                    })
                }
                break
            default:
                break
        }
    }
    reset_tab_data()
}

exports.context = context