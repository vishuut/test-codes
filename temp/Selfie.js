let selfieObj = {

    width: 320,
    height: 0,

    streaming: false,
    videoStream: null,

    video: null,
    canvas: null,
    photo: null,
    startbutton: null,

    captured: false
}

clearphoto: function() {
    let context = selfieObj.canvas.getContext('2d');
    context.fillStyle = "#AAA";
    context.fillRect(0, 0, selfieObj.canvas.width, selfieObj.canvas.height);

    let data = selfieObj.canvas.toDataURL('image/png');
    photo.setAttribute('src', data);
}

takepicture: function() {
    let context = selfieObj.canvas.getContext('2d');
    if (selfieObj.width && selfieObj.height) {
        selfieObj.canvas.width = width;
        selfieObj.canvas.height = height;
        context.drawImage(selfieObj.video, 0, 0, selfieObj.width, selfieObj.height);

        let data = selfieObj.canvas.toDataURL('image/png');
        selfieObj.photo.setAttribute('src', data);
        stopCamera();
    } else {
        clearphoto();
    }
}

stopcamera: function() {
    if (selfieObj.videoStream.active) {
        selfieObj.video.pause();
        selfieObj.video.srcObject = null;
        selfieObj.videoStream.getTracks()[0].stop();
        selfieObj.streaming = false;
    }
}

startup: function() {
    selfieObj.video = document.getElementById('video');
    selfieObj.canvas = document.getElementById('canvas');
    selfieObj.photo = document.getElementById('photo');
    selfieObj.startbutton = document.getElementById('startbutton');

    navigator.mediaDevices.getUserMedia({
            video: true,
            audio: false
        })
        .then(function(stream) {
            selfieObj.videoStream = stream;
            selfieObj.video.srcObject = stream;
            selfieObj.video.play();
        })
        .catch(function(err) {
            console.log("An error occurred: " + err);
        });

    selfieObj.video.addEventListener('canplay', function(ev) {
        if (!selfieObj.streaming) {
            selfieObj.height = selfieObj.video.videoHeight / (selfieObj.video.videoWidth / selfieObj.width);

            if (isNaN(selfieObj.height)) {
                selfieObj.height = selfieObj.width / (4 / 3);
            }

            selfieObj.video.setAttribute('width', selfieObj.width);
            selfieObj.video.setAttribute('height', selfieObj.height);
            selfieObj.canvas.setAttribute('width', selfieObj.width);
            selfieObj.canvas.setAttribute('height', selfieObj.height);
            selfieObj.streaming = true;
        }
    }, false);

    startbutton.addEventListener('click', function(ev) {
        takepicture();
        ev.preventDefault();
    }, false);

    clearphoto();
}