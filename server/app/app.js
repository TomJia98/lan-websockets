const connectCamButton = document.getElementById('connectCamera');
const webcamVideo = document.getElementById('webcamVideo');
const callButton = document.getElementById('callButton');
const callInput = document.getElementById('callInput');
const answerButton = document.getElementById('answerButton');
const remoteVideo = document.getElementById('remoteVideo');
const hangupButton = document.getElementById('hangupButton');

const socket = io('ws://10.1.1.198:80');

socket.on('message', text => {

    const el = document.createElement('li');
    el.innerHTML = text;
    document.querySelector('ul').appendChild(el)

});

document.querySelector('#button').onclick = () => {

    const text = document.querySelector('input').value;
    socket.emit('message', text)
    
}












const alice = new RTCPeerConnection();
const bob = new RTCPeerConnection();

 async function aliceInit() {

   const aliceOffer =  await alice.createOffer();


   alice.setLocalDescription(new RTCSessionDescription(aliceOffer));

   bob.setRemoteDescription(alice.localDescription);

   const bobAnswer = await bob.createAnswer();

   bob.setLocalDescription(new RTCSessionDescription(bobAnswer))

   alice.setRemoteDescription(bob.localDescription)
 }


// const pc = new RTCPeerConnection()
let localStream = null;
let remoteStream = null;
connectCamButton.addEventListener('click' , async () => {
    if ('mediaDevices' in navigator && 'getUserMedia' in navigator.mediaDevices) {
        console.log("Let's get this party started")
      }

    console.log('camera connected');
    try {
        localStream = await navigator.mediaDevices.getUserMedia({ video: true});
    }
    catch (err) {
        console.log(err)
    }
    remoteStream = new MediaStream();

    localStream.getTracks().forEach((track) => {

        alice.addTrack(track, localStream)
    });

    alice.ontrack = (e) => {

        e.streams[0].getTracks().forEach((track) => {
            remoteStream.addTrack(track);
        })
    }

    webcamVideo.srcObject = localStream;
    remoteVideo.srcObject = remoteStream;

//     callButton.disabled = false;
//     answerButton.disabled = false;
//     connectCamButton.disabled = true;

});

// callButton.addEventListener('click', async () => {


//     const offerDescription = await pc.createOffer();
//     await pc.setLocalDescription(offerDescription);
  
  
//     // Listen for remote answer
//     callDoc.onSnapshot((snapshot) => {
//       const data = snapshot.data();
//       if (!pc.currentRemoteDescription && data?.answer) {
//         const answerDescription = new RTCSessionDescription(data.answer);
//         pc.setRemoteDescription(answerDescription);
//       }
//     });
  
//     // When answered, add candidate to peer connection
//     answerCandidates.onSnapshot((snapshot) => {
//       snapshot.docChanges().forEach((change) => {
//         if (change.type === 'added') {
//           const candidate = new RTCIceCandidate(change.doc.data());
//           pc.addIceCandidate(candidate);
//         }
//       });
//     });
  
//     hangupButton.disabled = false;

// })














//working RTC peer connections, but nothing is being transferred

 