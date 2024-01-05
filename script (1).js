/*
		Designed by: Guillaume Kurkdjian 
		Original image: https://electronicitems.tumblr.com/page/2
*/



const main = document.querySelector("#main");
const base = document.querySelector("#base");

const button = document.querySelector("#button");
const key = document.querySelectorAll(".key")
const mt = document.querySelector("#mt");
const sc = document.querySelector("#screen");
const scs = document.querySelector("#screen-s");
const lef = document.querySelector("#led");

let con = 0;
let state= true;



let addKey = (e) => {
    let kc = event.keyCode;
    let kp = event.key;

    if( (kc >= 65 && kc <= 90) ) {
        console.log("valid")
        let current = document.querySelector(`#${kp}`);

        current.classList.add("is-key-pressed");
        sc.innerHTML += kp;
        con++;
    }

    if (kc == 32) {
        sc.innerHTML += "&nbsp;";
        document.querySelector('#espace').classList.add("is-key-pressed");
    }
    if (kc == 8) {
        sc.innerHTML = "";
        document.querySelector('#Backspace').classList.add("is-key-pressed");
    }
    if (con > 40) { sc.innerHTML = ""; con = 0; }
}

let removeKey = (e) => {
    let kp = event.key;
    let kc = event.keyCode;

    if( (kc >= 65 && kc <= 90) ) {
        let current = document.querySelector(`#${kp}`);
        current.classList.remove("is-key-pressed");
    }
    if (kc == 8)
        document.querySelector('#Backspace').classList.remove("is-key-pressed");

    if (kc == 32)
        document.querySelector('#espace').classList.remove("is-key-pressed");
}


let kb = (e) => {
    mt.classList.toggle("mt-is-open");
    scs.classList.toggle("is-shadow-big");
    led.classList.toggle("is-led-on");

    if ( state ) {
        window.addEventListener("keydown", addKey);
        window.addEventListener("keyup", removeKey);
        state = false;
    }
    else if ( !state ) {
        window.removeEventListener("keydown", addKey);
        window.removeEventListener("keyup", removeKey);
        state = true;
    }
}

let rtBase = (e) => {
    var x = e.pageX / window.innerWidth - 0.5;
    var y = e.pageY / window.innerHeight - 0.5;
    base.style.transform = `
        perspective(10000px)
        rotateX(${ y * 10  + 52}deg)
        rotateZ(${ - x * 30  - 46}deg)
        scale(.8)
        translateZ(-10vmax)

    `;
}


main.addEventListener("mousemove", rtBase);
button.addEventListener("click", kb);