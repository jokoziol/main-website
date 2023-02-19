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

    removeKeydownEventListener()
    clearInterval(terminalCursorIntervalId)
    document.getElementById("terminalCursor").remove()
    document.getElementById("commandInput").removeAttribute("id")

    const parentElement = document.getElementById("terminalWindow")

    if (command !== "clear"){
        const div = document.createElement("div")
        const terminalText = document.createElement("p")

        terminalText.classList.add("terminalText")
        terminalText.innerText = getOutput(command.split(" ")[0], command.substring(command.indexOf(" ") + 1))

        div.appendChild(terminalText)
        parentElement.appendChild(div)
    }else{
        parentElement.replaceChildren()
    }

    const secondDiv = document.createElement("div")
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

    if(command !== "clear"){
        const emptyElement = document.createElement("p")
        secondDiv.appendChild(emptyElement)
    }

    secondDiv.appendChild(terminalLeadingElement)
    secondDiv.appendChild(commandInputElement)
    secondDiv.appendChild(terminalCursor)
    parentElement.appendChild(secondDiv)

    addKeydownEventListener()
    terminalCursorIntervalId = setInterval(() => toggleTerminalCursor(), 150)

    window.scrollTo(0, document.body.scrollHeight)
}

function getOutput(command, args){

    const allCommands = getAllCommands(args)

    for (const [key, value] of Object.entries(allCommands)){

        if(command === allCommands[key].key){
            return value.value
        }
    }

    return "The command \"" + command + "\" could not be found"
}

function getAllCommands(args){

    let argsArray = args.length === 0 ? [] : args.split(" ")

    return [{
        key: "clear",
        value: "",
        description: "Clears the output"
    },{
        key: "echo",
        value: args,
        description: "Outputs a text",
        argsDescription: "[text]"
    },{
        key: "",
        value: "",
    }]
}