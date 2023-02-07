const text = "./init";

let intervalId, terminalInitIntervalId;

let count = 0

function display(){

    const element = document.getElementById("terminalRowOne")
    const elementTextLength = element.innerText.length

    element.innerText += text.charAt(elementTextLength)

    if ((elementTextLength + 1) === text.length){
        clearInterval(intervalId)

        setTimeout(() => {
            let elements = document.getElementsByClassName("loadAfterInitialAnimation")
            for(let i = 0; i < elements.length; i++){
                elements[i].style.display = "inline"
            }

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
            document.getElementById("terminalEndText").style.display = "inline"

            setInterval(() => terminalCursor(), 150)
        }, 200)
    }
}

function terminalCursor(){
    const element = document.getElementById("terminalEndText")
    if (element.hasAttribute("underscore")){
        element.removeAttribute("underscore")
        element.innerText = "root@localhost:~$"
    }else{
        element.setAttribute("underscore", true)
        element.innerText = "root@localhost:~$ _"
    }
}

function init(){
    intervalId = setInterval(() => display(), 150)
}