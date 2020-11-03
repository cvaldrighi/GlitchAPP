function hasGetUserMedia() {
    return !!(navigator.mediaDevices && navigator.mediaDevices.getUserMedia);
}

if (hasGetUserMedia()) {
    const btnCam = document.getElementById("btnCam");
    const btnSS = document.getElementById("btnSS");
    const btnReturn = document.getElementById("btnReturn");
    const displayImgBg = document.getElementById("displayImgBg");
    const displayVideo = document.getElementById("displayVideo");
    const canvas = document.createElement("canvas");
    const constraints = {video: {width:600, height:400}};
    const btnSave = document.getElementById("btnSave");
    const btnUpload = document.getElementById("btnUpload");
    const btnShare = document.getElementById("btnShare");

    btnCam.onclick = function() {
        navigator.mediaDevices.getUserMedia(constraints).then(handleSuccess).catch(handleError);
    };

    function handleError(error) {
        alert("Please allow your camera or upload some IMG.");
    };

    function handleSuccess(stream) {
        displayVideo.classList.remove("hidden"); 
        displayImgBg.classList.add("hidden");
        btnSS.classList.remove("hidden");
        displayVideo.srcObject = stream;
    };

    btnSS.onclick = displayVideo.onclick = function() {
        displayVideo.classList.add("hidden");
        btnReturn.classList.remove("hidden");
        canvas.width = displayVideo.videoWidth;
        canvas.height = displayVideo.videoHeight;
        displayImgBg.classList.remove("hidden");
        canvas.getContext("2d").drawImage(displayVideo, 0, 0);
        displayImgBg.src = canvas.toDataURL("image/webp");
        btnSave.href = canvas.toDataURL("image/png");
        btnSave.classList.remove("disabled");
        btnShare.classList.remove("disabled");
    };

    btnReturn.onclick = function() {
        displayVideo.classList.remove("hidden");
        displayImgBg.classList.add("hidden");
        btnReturn.classList.add("hidden");

    }

    btnUpload.onchange = function() {
        displayImgBg.src = this.value;

    }

} else {
    alert("Sorry, your browser don't allow this function.");
}

