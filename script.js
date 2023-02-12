const text = "./init";

let intervalId, terminalInitIntervalId, terminalCursorIntervalId;

let count = 0

function display(){

    const element = document.getElementById("terminalRowOne")
    const elementTextLength = element.innerText.length

    element.innerText += text.charAt(elementTextLength)

    if ((elementTextLength + 1) === text.length){
        clearInterval(intervalId)

        setTimeout(() => {
            changeVisibility("loadAfterInitialAnimation", "inline")
            document.getElementById("terminalRowTwo").innerText = " "
        }, 300)

        setTimeout(() => {
            terminalInitIntervalId = setInterval(() => terminalInitOutput(), 10)
        }, 500)
    }
}

function terminalInitOutput(){

    count ++
    document.getElementById("terminalRowTwo").innerText = "[" + count + "%]"

    if (count >= 100){
        clearInterval(terminalInitIntervalId)

        setTimeout(() => {

            let link = document.createElement("a")
            link.href = "https://github.com/jokoziol"
            link.innerHTML = link.href

            document.getElementById("terminalRowTwo").innerText += "\n\n=> GitHub: "
            document.getElementById("terminalRowTwo").appendChild(link)
        }, 200)

        setTimeout(() => {
            document.getElementById("terminalCursor").style.display = "inline"
            changeVisibility("loadAfterInitCommand", "inline")

            addKeydownEventListener()
            terminalCursorIntervalId = setInterval(() => toggleTerminalCursor(), 150)
        }, 200)
    }
}

function toggleTerminalCursor(){
    const element = document.getElementById("terminalCursor")

    if (element.style.display === "none"){
        element.style.display = "inline"
        return
    }

    element.style.display = "none"
}

function changeVisibility(className, display){
    let elements = document.getElementsByClassName(className)
    for(let i = 0; i < elements.length; i++){
        elements[i].style.display = display
    }
}

function init(){
    intervalId = setInterval(() => display(), 150)
}