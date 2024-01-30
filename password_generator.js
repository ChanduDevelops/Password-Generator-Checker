const maxLength = 36
const minLength = 8
var allSelected = false

var passwordDiv = document.getElementById("password")
passwordDiv.setAttribute('data-text', 'Password appears here')

var symbol = document.getElementById("symbol")
var digit = document.getElementById("digit")
var upperCase = document.getElementById("uppercase")
var lowerCase = document.getElementById("lowercase")
var all = document.getElementById("all")
var generateBtn = document.getElementById("generate")
var selectedMethods = []
var length
var passwordLengthInput
var password
var passwordLength

passwordLengthInput = document.getElementById("password-length")
passwordLengthInput.onkeyup = function () {
    if (this.value.length > 2) {
        this.value = this.value.substring(0, 2)
    }
    if (this.value > maxLength) {
        this.value = maxLength
    }
    if (this.value < minLength) {
        this.value = minLength
    }
}

window.onload = () => {
    upperCase.checked = false
    lowerCase.checked = false
    symbol.checked = false
    digit.checked = false
}

function selectOption(e) {
    passwordLengthInput = document.getElementById("password-length")

    if (passwordLengthInput.value.length < 1) {
        alert("Must enter input length!")
        return
    }

    e.preventDefault()
    const optionDiv = e.target.parentNode
    const checkBox = optionDiv.querySelector("span")
    const optionInputNode = optionDiv.querySelector("input")

    if (checkBox.classList.contains("active")) {
        optionInputNode.checked = false
        checkBox.classList.remove("active")
        checkBox.style.background = "#fff"

        all.checked = allSelected = false
        let selectAllNode = all.parentNode.querySelector("span")
        selectAllNode.classList.remove("active")
        selectAllNode.style.background = "#fff"
        Method.remove(optionInputNode.id)
        passwordDiv.textContent = ""
        passwordDiv.setAttribute('data-text', "")
    } else {
        optionInputNode.checked = true
        checkBox.classList.add("active")
        checkBox.style.background = "green"
        Method.add(optionInputNode.id)
    }

    must[optionInputNode.id][0] = optionInputNode.checked;
    generatePassword(passwordLengthInput)
}
const selectAll = () => {
    selectedMethods = [getRandomSymbol, getRandomNumber, getRandomUpperCase, getRandomLowerCase]
    options.forEach(option => {
        const checkBox = option.querySelector("span")
        const optionInputNode = option.querySelector("input")

        optionInputNode.checked = true
        checkBox.classList.add("active")
        checkBox.style.background = "green"
    })
    for (let option in must) {
        must[option][0] = true
    }
    allSelected = true
}
const deselectAll = () => {
    options.forEach(option => {
        const checkBox = option.querySelector("span")
        const optionInputNode = option.querySelector("input")

        optionInputNode.checked = true
        checkBox.classList.remove("active")
        checkBox.style.background = "#fff"
    })
    for (let option in must) {
        must[option][0] = false
    }
    allSelected = false
    selectedMethods = []
    passwordDiv.textContent = ""
    passwordDiv.setAttribute('data-text', "Password appears here")
}
function selectAllOptions(e) {
    e.preventDefault()
    if (allSelected) {
        deselectAll()
    } else {
        selectAll()
        generatePassword()
    }
}

const options = document.querySelectorAll(".box")
options.forEach(option => {
    if (option.classList.contains("all-box")) {
        option.onclick = selectAllOptions
    } else {
        option.addEventListener("click", selectOption)
    }
})

const symbols = "!@#$%^&*-_=+.?~`"
const numbers = "0123456789"

const getRandomSymbol = () => symbols[Math.floor(Math.random() * symbols.length)]

const getRandomNumber = () => numbers[Math.floor(Math.random() * numbers.length)]

const getRandomUpperCase = () => String.fromCharCode(Math.floor(Math.random() * (26) + 65))

const getRandomLowerCase = () => String.fromCharCode(Math.floor(Math.random() * (26) + 97))

var Method = {
    add: (id) => {
        switch (id) {
            case "symbol":
                selectedMethods.push(getRandomSymbol)
                break
            case "digit":
                selectedMethods.push(getRandomNumber)
                break
            case "uppercase":
                selectedMethods.push(getRandomUpperCase)
                break
            case "lowercase":
                selectedMethods.push(getRandomLowerCase)
                break
            case "all":
                selectedMethods
                    .push(getRandomSymbol)
                    .push(getRandomNumber)
                    .push(getRandomUpperCase)
                    .push(getRandomLowerCase)
                break
        }
    },
    remove: (id) => {
        switch (id) {
            case "symbol":
                selectedMethods.splice(selectedMethods.indexOf(getRandomSymbol), 1)
                break
            case "digit":
                selectedMethods.splice(selectedMethods.indexOf(getRandomNumber), 1)
                break
            case "uppercase":
                selectedMethods.splice(selectedMethods.indexOf(getRandomUpperCase), 1)
                break
            case "lowercase":
                selectedMethods.splice(selectedMethods.indexOf(getRandomLowerCase), 1)
                break
            case "all":
                selectedMethods = []
                break
        }
    }
}

const must = {
    symbol: [false, getRandomSymbol],
    digit: [false, getRandomNumber],
    uppercase: [false, getRandomUpperCase],
    lowercase: [false, getRandomLowerCase],
}

const generatePassword = (passpasswordLengthInput) => {
    passwordDiv.setAttribute('data-text', "")

    password = ""

    passwordLength = passwordLengthInput.value

    if (passwordLength < minLength) {
        length = minLength
    }
    else if (passwordLength > maxLength) {
        length = maxLength
    }
    else {
        length = passwordLength
    }

    for (let option in must) {
        let method = must[option][1]
        if (must[option][0]) {
            password += method()
            length--
        }
    }

    for (let i = 0; i < length; i++) {

        if (selectedMethods.length < 1) {
            return
        } else {
            password += selectedMethods[Math.floor(Math.random() * selectedMethods.length)]()
        }
    }

    passwordDiv = document.getElementById("password")
    passwordDiv.innerHTML = password
}
passwordDiv.addEventListener("click", async () => {
    if (passwordLength < 1) {
        return
    } else {
        try {
            const type = "text/plain"
            const blob = new Blob([password], { type })
            const clipBoardItem = [new ClipboardItem({ [type]: blob })]
            await window.navigator.clipboard.write(clipBoardItem)

            checkCopied()
        } catch (e) {
            console.log(e);
        }
    }
})
const checkCopied = () => {
    document.onclick = (e) => {
        if (e.target.id === passwordDiv.id && password.length > 0) {
            console.log("copying");
            document.querySelector(".main-bubble").classList.add("copied")
            document.querySelector(".copy").textContent = "Copied..!"
        } else {
            document.querySelector(".main-bubble").classList.remove("copied")
            document.querySelector(".copy").textContent = "Click on password to copy"
        }
    }
}; checkCopied()