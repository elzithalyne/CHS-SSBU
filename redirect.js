function redirect() { 
    window.open ("http://localhost:3000/prizes.html")
    console.log("Prizes Window Opened")
}

let maintenance = document.getElementById('maint')

function redirectMSB() {

    maintenance.style.display = "block";
    maintenance.style.color = "red";
    maintenance.style.border = "2px solid red";
    maintenance.textContent = "MSB is not yet connected. See Mr. Richman in room R2 for entry purchase."

}

function formGGL() {

    window.open('https://forms.gle/fPmTsKVdAtbpwbTJA')

}
