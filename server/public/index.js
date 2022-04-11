const changeLight = document.getElementById('changeLight');


const socket = io('ws://10.1.1.198:80');

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});
socket.on('lightStart', (light) => {
    if (light === 0) {
        
    }

})


document.querySelector('#button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}

changeLight.addEventListener('click', () => {

    socket.emit("light", 1)
})


socket.on('light', () => {
console.log('light has been pressed')

})