// // Set constraints for the video stream
// var constraints = { video: { facingMode: "user" }, audio: false };
// // Define constants
// const cameraView = document.querySelector("#camera--view"),
//     cameraOutput = document.querySelector("#camera--output"),
//     cameraSensor = document.querySelector("#camera--sensor"),
//     cameraTrigger = document.querySelector("#camera--trigger")
// // Access the device camera and stream to cameraView
// function cameraStart() {
//     navigator.mediaDevices
//         .getUserMedia(constraints)
//         .then(function(stream) {
//         track = stream.getTracks()[0];
//         cameraView.srcObject = stream;
//     })
//     .catch(function(error) {
//         console.error("Oops. Something is broken.", error);
//     });
// }
// // Take a picture when cameraTrigger is tapped
// cameraTrigger.onclick = function() {
//     cameraSensor.width = cameraView.videoWidth;
//     cameraSensor.height = cameraView.videoHeight;
//     cameraSensor.getContext("2d").drawImage(cameraView, 0, 0);
//     cameraOutput.src = cameraSensor.toDataURL("image/webp");
//     cameraOutput.classList.add("taken");
// };
// // Start the video stream when the window loads
// window.addEventListener("load", cameraStart, false);

if ('WebSocket' in window) {
  (function () {
    function refreshCSS() {
      var sheets = [].slice.call(document.getElementsByTagName("link"));
      var head = document.getElementsByTagName("head")[0];
      for (var i = 0; i < sheets.length; ++i) {
        var elem = sheets[i];
        var parent = elem.parentElement || head;
        parent.removeChild(elem);
        var rel = elem.rel;
        if (elem.href && typeof rel != "string" || rel.length == 0 || rel.toLowerCase() == "stylesheet") {
          var url = elem.href.replace(/(&|\?)_cacheOverride=\d+/, '');
          elem.href = url + (url.indexOf('?') >= 0 ? '&' : '?') + '_cacheOverride=' + (new Date().valueOf());
        }
        parent.appendChild(elem);
      }
    }
    var protocol = window.location.protocol === 'http:' ? 'ws://' : 'wss://';
    var address = protocol + window.location.host + window.location.pathname + '/ws';
    var socket = new WebSocket(address);
    socket.onmessage = function (msg) {
      if (msg.data == 'reload') window.location.reload();
      else if (msg.data == 'refreshcss') refreshCSS();
    };
    if (sessionStorage && !sessionStorage.getItem('IsThisFirstTime_Log_From_LiveServer')) {
      console.log('Live reload enabled.');
      sessionStorage.setItem('IsThisFirstTime_Log_From_LiveServer', true);
    }
  })();
}
else {
  console.error('Upgrade your browser. This Browser is NOT supported WebSocket for Live-Reloading.');
}
