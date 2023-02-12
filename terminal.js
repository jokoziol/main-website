function addKeydownEventListener(){
    document.addEventListener("keydown", keyPressed)
}

function removeKeydownEventListener(){
    document.removeEventListener("keydown", keyPressed)
}

function keyPressed(event){

    if(event.defaultPrevented){
        return
    }

    const element = document.getElementById("commandInput")

    if (event.key.match(/(^\w{1}$)|\s{1}/)){
        element.innerText += event.key
    }else if (event.key === "Backspace"){
        element.innerText = element.innerText.slice(0, -1)
    }else if (event.key === "Enter"){
        executeCommand(element.innerText)
    }

    event.preventDefault()
}

function executeCommand(command){

    if (command.length === 0){
        return
    }

    removeKeydownEventListener()
    clearInterval(terminalCursorIntervalId)
    document.getElementById("terminalCursor").remove()
    document.getElementById("commandInput").removeAttribute("id")

    const parentElement = document.getElementById("terminalWindow")
    const div = document.createElement("div")

    const terminalText = document.createElement("p")
    terminalText.classList.add("terminalText")
    terminalText.innerText = "The command \"" + command + "\" could not be found"

    div.appendChild(terminalText)
    parentElement.appendChild(div)

    const secondDiv = document.createElement("div")
    const emptyElement = document.createElement("p")
    const terminalLeadingElement = document.createElement("p")
    terminalLeadingElement.classList.add("terminalLeadingText")
    terminalLeadingElement.innerText = "root@localhost:~$ "

    const commandInputElement = document.createElement("p")
    commandInputElement.classList.add("terminalText")
    commandInputElement.id = "commandInput"

    const terminalCursor = document.createElement("p")
    terminalCursor.classList.add("terminalLeadingText")
    terminalCursor.id = "terminalCursor"
    terminalCursor.style.display = "inline"
    terminalCursor.innerText = "_"

    secondDiv.appendChild(emptyElement)
    secondDiv.appendChild(terminalLeadingElement)
    secondDiv.appendChild(commandInputElement)
    secondDiv.appendChild(terminalCursor)
    parentElement.appendChild(secondDiv)

    addKeydownEventListener()
    terminalCursorIntervalId = setInterval(() => toggleTerminalCursor(), 150)

    window.scrollTo(0, document.body.scrollHeight)
}