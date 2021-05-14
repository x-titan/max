const remote = require("electron").remote
const { $, search } = require("./js/css.js")
const { create, save, open } = require("./js/file.js")
const { startTab, createTab, reset_tab_data } = require("./js/tab.js")

$("#min-btn").on("click", e => {
    e.preventDefault()
    let window = remote.getCurrentWindow()
    reset_tab_data()
    window.minimize()
})

// TODO: Add button // // //
// $("max-btn").on("click", (e) => {
//     let window = remote.getCurrentWindow()
//     if (!window.isMaximized()) {
//         window.maximize()
//     } else {
//         window.unmaximize()
//     }
// })

$("#close-btn").on("click", e => {
    e.preventDefault()
    reset_tab_data()
    let window = remote.getCurrentWindow()
    setTimeout(() => window.close(), 200)
})

// begin
$('#save_file').on('click', e => {
    e.preventDefault()
    let x = $(".tab.active"),
        data = x.attr("data").value(),
        name = x.attr("name").value(),
        text = search(".textarea.active").value;
    save(data, name, text)
    reset_tab_data()
    console.log("save")
})

$("#create_file").on('click', e => {
    e.preventDefault()
    create(params => {
        createTab(params)
        search(".textarea").value = ""
    })
})

$("#open_file").on('click', () => open(params => createTab(params)))

startTab(search(".textarea"))
    .then((tab_list) => {
        console.log("tab_list",tab_list)
        let x = search("#Tabs")
        x.innerHTML = ""
        for (i = 0; i < tab_list.length; i++) x.appendChild(tab_list[i])
    })

window.addEventListener("keypress",e=>{
    console.log(e)
})