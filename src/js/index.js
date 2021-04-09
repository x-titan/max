const remote = require("electron").remote
const { $, search, $toggle } = require("./js/css.js")
const { create, save, open } = require("./js/file.js")
const { startTab, createTab, reset_tab_data } = require("./js/tab.js")


console.log($)
$("#min-btn").on("click", (e) => {
    e.preventDefault()
    let window = remote.getCurrentWindow()
    reset_tab_data()
    window.minimize()
})

// Add button // // //
// $("max-btn").on("click", (e) => {
//     let window = remote.getCurrentWindow()
//     if (!window.isMaximized()) {
//         window.maximize()
//     } else {
//         window.unmaximize()
//     }
// })

$("#close-btn").on("click", (e) => {
    e.preventDefault()
    reset_tab_data()
    let window = remote.getCurrentWindow()
    setTimeout(() => {
        window.close()
    }, 200)
})

// begin
$('#save_file').on('click', (e) => {
    e.preventDefault()
    var data = search(".tab.active").getAttribute("data")
    var name = search(".tab.active").getAttribute("name")
    var text = search(".textarea.active").value
    save(data, name, text)
    reset_tab_data()
    console.log("save")
})

$("#create_file").on('click', (e) => {
    e.preventDefault()
    create((params) => {
        createTab(params)
        search(".textarea").value = ""
    })
})

$("#open_file").on('click', () => {
    open((params) => {
        createTab(params)
    })
})


startTab(search(".textarea"))
    .then((tab_list) => {
        search("#Tabs").innerHTML = ""
        for (i = 0; i < tab_list.length; i++) {
            search("#Tabs").appendChild(tab_list[i])
        }

    })