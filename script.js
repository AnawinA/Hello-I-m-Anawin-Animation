"use strict";

const percentScroll = document.getElementById("percentScroll")

window.addEventListener('scroll', function() {
    var scrollPosition = window.scrollY
    var windowHeight = window.innerHeight
    var documentHeight = document.documentElement.scrollHeight

    var percentageScrolled = (scrollPosition / (documentHeight - windowHeight)) * 100

    console.log(scrollPosition, windowHeight, documentHeight)
    //console.log('PercentageScrolled: ' + percentageScrolled.toFixed(1) + '%')
    percentScroll.value = percentageScrolled.toFixed(1)
})

const closeMenu = document.getElementById("closeMenu")

closeMenu.addEventListener('click', function() {
    alert('Close Menu')
})

const moveText = document.getElementsByClassName("tweenMoveText")[0]
moveText.addEventListener('click', function() {
    moveText.classList.remove('tweenMoveText')
    void moveText.offsetWidth
    moveText.classList.add('tweenMoveText')
    // alert('dhi')
})


const inputName = document.getElementById("inputName")
const underlineInput = document.getElementById("underlineInput")
underlineInput.innerHTML = '<i>your name</i>'

if (typeof(Storage) !== 'undefined') {
    if (localStorage.getItem('yourName') !== null) {
        underlineInput.innerHTML = localStorage.getItem('yourName')
    } else {
        underlineInput.innerHTML = '<i>your name</i>'
    }
} else {
    underlineInput.innerHTML = '<i>your name</i>'
}

inputName.onchange = (e) => {
    //alert(inputName.value)
    if (inputName.value.length > 0) {
        underlineInput.innerHTML = inputName.value
        if (typeof(Storage) !== 'undefined') {
            localStorage.setItem('yourName', inputName.value)
        }

    } else {
        underlineInput.innerHTML = '<i>your name</i>'
    }
}

const batteryGame = document.getElementsByClassName('batteryGame')[0]
const batteryLvl = document.getElementsByClassName('batteryLvl')[0]
const chargeBtn = document.getElementById('chargeBtn')
const easyMode = document.getElementById('ezMode')
const chargeText = document.getElementsByClassName('chargeText')[0]

let powerClick = 5


let clickBtnSound = new Audio('audios/mixkit-mouse-click-close-1113.wav')

easyMode.onclick = (e) => {
    if (easyMode.checked) {
        powerClick = 20
        chargeBtn.innerText = 'Click to Charge +20%'
    } else {
        powerClick = 5
        chargeBtn.innerText = 'Click to Charge +5%'
    }
}

let battery = 50;

let batteryDown = setInterval(() => {
    if (battery >= 100) {
        batteryGame.classList.remove('high')
        batteryGame.classList.add('low')
    } else if (battery >= 80) {
        setBattery(-4.5)
        batteryGame.classList.add('high')
        batteryGame.classList.remove('low')
    } else if (battery >= 50) {
        setBattery(-3)
        batteryGame.classList.remove('high')
        batteryGame.classList.add('low')
    } else if (battery >= 0) {
        setBattery(-2)
    }

    if (battery >= 100) {
        changeChargeText("You did it! XD⚡")
    } else if (battery > 90) {
        changeChargeText("Almost there!!! :D")
    } else if (battery > 80) {
        changeChargeText("You can do it! :)")
    } else if (battery > 50) {
        changeChargeText("Keep it up! :q")
    } else if (battery > 10) {
        changeChargeText("Go go :|")
    } else if (battery > 0) {
        changeChargeText("Oh :O ")
    } else {
        changeChargeText("I'm sad :'(")
    }
}, 100)

function changeChargeText(text) {
    chargeText.innerText = text
}


function setBattery(lvl) {
        battery += lvl;
        batteryLvl.style.height = `${battery}%`
        batteryLvl.innerText = `${Math.round(battery)}%`
}


chargeBtn.addEventListener('click', () => {
    
    if (battery >= 100) {
        clearInterval(batteryDown)
        battery = 100
    } else {
        setBattery(powerClick)
    }
    
    clickBtnSound.cloneNode(true).play()
})

const heart = document.getElementsByClassName("heart")[0]
const heartLeft = document.getElementById("HPL")

function drag(ev) {
    var data = ev.dataTransfer.setData("heart", ev.target.id)
}

function drop(ev) {
    var data = ev.dataTransfer.getData("heart")
    let heartL = document.getElementById(data)
    heartL.classList.remove("HPhover")
    heartL.setAttribute("draggable", false)
    ev.target.appendChild(heartL)
    ev.target.classList.remove("getDragOver"); ev.target.classList.remove("wink")
    ev.target.removeAttribute('ondragover'); ev.target.removeAttribute('ondragleave'); 
    if (ev.target.querySelector("#HPL") !== null) {
        let HPR = document.getElementById("HPR")
        let heartEmit = document.getElementsByClassName("heartEmit")[0]
        ev.target.classList.add("startBlendLeft")
        HPR.classList.add("startBlendRight")
        heartEmit.classList.add("emitKaboom")
        setTimeout(flashScreen, 4900)
        
    }
}

const thankyouText = document.getElementById("thx")
const flashWhite = document.getElementsByClassName("flashWhite")[0]
function flashScreen() {
    flashWhite.classList.add("fadeOut")
    thankyouText.style.visibility = "visible"
    document.querySelector(".flashWarn").style.display = "none"
    heart.classList.add("floating")
}

function allowDrop(ev) {
    ev.preventDefault()
    ev.target.classList.add("getDragOver")
    ev.target.classList.remove("wink")
}

function noDrop(ev) {
    ev.target.classList.remove("getDragOver")
    ev.target.classList.add("wink")
}

