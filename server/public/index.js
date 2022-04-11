const changeLight = document.getElementById('changeLight');
let lightRN = null;

const socket = io('ws://10.1.1.53:8080');

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});

socket.on('lightStart', (light) => {
    lightRN = light
    if (light === 0) {
        document.querySelector('#box').classList.add('lightOff')
    } else if (light === 1 ) {
        document.querySelector('#box').classList.add('lightOn')
    }
})


document.querySelector('#button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}

changeLight.addEventListener('click', () => {
    if(lightRn === 0) {
        socket.emit("lightClicked", 1)
    } else if (lightRn === 1) {
        socket.emit("lightClicked", 0)

    }

})


socket.on('lightChanged', (light) => {
    lightRN = light
    if (light === 0) { 
        document.querySelector('#box').classList.add('lightOff')

    } else if (light === 1) {
        document.querySelector('#box').classList.add('lightOn')

    }
console.log('light has been pressed')

})