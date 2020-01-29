function addJS (){
    var script = arguments
    script.forEach((src),()=>{
        var result = document.createElement('script')
        var attr = {
            type: document.createAttribute('type'),
            src: document.createAttribute('src'),
            defer: document.createAttribute('defer')
        }
        attr.type.value = 'text/javascript'
        attr.src.value = src + '.js'
        result.setAttributeNode(attr.type)
        result.setAttributeNode(attr.src)
        result.setAttributeNode(attr.defer)
        document.head.appendChild(result)
    })
    
}

// Create new object in game
var game = new Game()
var display = new Display($('canvas'))
var controller = new Controller(true)
var engine = new Engine(1000/60)

// Re setup
function resize(e) {
    display.resize({
        width: document.documentElement.clientWidth,
        height: document.documentElement.clientHeight,
        ratio: 9 / 21
    })
}

// Initilation
function render() {
    
}
function update() {
    
}

// Event
document.addEventListener('resize', resize)
document.display = display