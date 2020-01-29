const fs = require('fs')
const { $, search, $toogle } = require("c:/Users/telma/OneDrive/Рабочий стол/My Work/fast_code/index.js")

setTimeout(() => {
    var header = search('header')
    var startPage = search('#startPage')
    $toogle(header, 'hide')
    let name = search('#name').value

    fs.readFile('./src/examples/' + name + '.txt', "utf-8", (error, data) => {
        if (error) {
            console.log(error)
            return
        }
        console.log(data)
        search(".textarea").value = data
    })

    setTimeout(() => {
        $toogle(startPage, 'hide')
    }, 800)
}, 1200)

// begin
$('#save').on('click', () => {
    var name = search('#name').value ? search('#name').value : 'name'
    var text = search('.textarea').value ? search('.textarea').value : 'text'
    create(name, text)
})
function create(name, text) {
    fs.writeFile('./src/examples/' + name + '.txt', text, (error) => {
        if (error) {
            return console.error(err);
        }
    })
}