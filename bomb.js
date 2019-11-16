
let time, interval

const cutWire = e => {
    console.log('buzz',e.target)

    //change to the cute wire image
    e.target.src = `./img/cut-${e.target.id}-wire.png`

    //remove event listener for wire click 
    e.target.removeEventListener('click', cutWire)

    //check whether the wire was good or bad to cut
    if (e.target.getAttribute('data-cut')==='true'){
        //GOOD , play buzz sound
        document.getElementById('buzz').play()
    //change data-cut to false
    e.target.setAttribute('data-cut','false')

    //check win condition
    if (checkWin()){
    
        //I won 
        winGame()
    }
    }
    else{
        //BAD
        loseGame()
    }
}

const addWireListeners = () => {
    console.log("Add wire listeners")
    //grab all the wire images from the DOM
let wireImages = document.querySelectorAll('#box img')
// loop through each image
 for (let i = 0; i<wireImages.length; i++){
     //image is the uncut version

     wireImages[i].src=`./img/uncut-${wireImages[i].id}-wire.png`
     //decide whether wire should be cut
     let shouldBeCut= (Math.random() > 0.5).toString()
     wireImages[i].setAttribute('data-cut', shouldBeCut)

     //add an event listener for click on each wire
     wireImages[i].addEventListener('click', cutWire)
     console.log(wireImages[i])
 }
}


const tick = () =>{
    time -= 1
    console.log('tick',time)
    document.getElementById('timer').textContent = time

    if(time === 19){
        document.getElementById('timer').style.color = 'goldenrod'
    }
    else if ( time ===9){
        document.getElementById('timer').style.orange = 'orange'
    }
    else if ( time ===3){
        document.getElementById('timer').style.orange = 'red'
    }
    else if ( time <= 0){
        //we run out of time, lose the game
        loseGame()
    }
}


const checkWin =() => {

    //grab all the wire images from the DOM
    let wireImages = document.querySelectorAll('#box img')

    // loop through each image
     for (let i = 0; i<wireImages.length; i++){

         //if any wires are true then i have no won the game yet
    if (wireImages[i].getAttribute('data-cut') === 'true'){
        return false
    }
  }
  //i went though the for loop and nothing made it exit with a return false;
  //now i know it must be true
  return true
}





const removeWireListeners = () =>{
    //grab all the wire images from the DOM
    let wireImages = document.querySelectorAll ('#box img')
    
    //loop through 
    for (let i=0; i<wireImages.length; i++){
        wireImages[i].removeEventListener('click',cutWire)
    }
}


const endGame = message => {
    //stop the timer from ticking
    
    clearInterval(interval)

    //make sure wires can't be clicked anymore
    removeWireListeners()

    //stop the siren, play the explosion sound
    document.getElementById('siren').pause()


    //set the message to tell the person they won/lost
    document.getElementById('message').textContent =message
    
}

const winGame = () => {
    //do the stuff that win and loseGame function have in common
    endGame('the city is saved... FOR NOW! Until next time!')
    
    let cheer = document.getElementById('cheer')
    cheer.addEventListener('ended',() => {
        document.getElementById('theme').play()
    })
    cheer.play()
}

const loseGame = () => {
    
    endGame('you have fail-')

    //stop the timer from ticking
    clearInterval(interval)

    //make sure wires can't be clicked anymore
    removeWireListeners()

    //stop the siren, play the explosion sound
    document.getElementById('siren').pause()
    document.getElementById('explode').play()

    //set the message to tell the person they won/lost
    document.getElementById('message').textContent =" you have fail-"
    
    //change to explosion background
    document.getElementsByTagName('body')[0].classList.remove('unexploded')
    document.getElementsByTagName('body')[0].classList.add('exploded')
}

const start = () =>{
    console.log("started")
    //timer starts- set initial time + start the interval + update display
    time=30
    clearInterval(interval)
    interval = setInterval(tick, 250)
    document.getElementById('timer').style.color = "chartreuse"
    document.getElementById('timer').textContent = time

    //set the background to unexploded

    document.getElementsByTagName('body')[0].classList.remove('exploded')
    document.getElementsByTagName('body')[0].classList.add('unexploded')
    // start the siren sound
    document.getElementById('siren').play()

    //change button to say"Restart name"
    document.getElementById('start').textContent = "Restart Game"

    // set up hurry up message
    document.getElementById('message').textContent = "HURRY! 🛩"
    // set up wires event listeners
    removeWireListeners()
    addWireListeners()
}

document.addEventListener('DOMContentLoaded',() => {
    document.getElementById('start').addEventListener('click',start)
})


