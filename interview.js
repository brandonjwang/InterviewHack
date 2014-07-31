
// Interview Questions
function newQuestion() {
  document.getElementById("question").innerHTML = questions[Math.floor(Math.random()*questions.length)];
}

// Audio/Video Recording
var isRecording = false;

function handleError(error) {
  alert("Something went wrong: "+error);
}

function stopRecord() {
  if (!isRecording) {
    return;
  }
  document.getElementById("recordButton").innerHTML = "Record";
  isRecording = false;
  recordVideo.stopRecording(function(videoUrl) {
    document.getElementById("selfVideo").src = videoUrl;
  });
  recordAudio.stopRecording(function(audioUrl) {
    document.getElementById("selfAudio").src = audioUrl;
  });

  return;
}

function startRecord() {
  if (isRecording) {
    return;
  }
  document.getElementById("recordButton").innerHTML="Stop Recording";
  isRecording = true;
  navigator.getUserMedia = navigator.getUserMedia ||
                           navigator.webkitGetUserMedia ||
                           navigator.mozGetUserMedia ||
                           navigator.msGetUserMedia;

  if (!navigator.getUserMedia) {
    alert("Your browser doesn't support user media");
  }

  navigator.getUserMedia({audio: true, video: true}, function(mediaStream) {
    window.recordVideo = RecordRTC(mediaStream, {
      type: 'video'
    });
    window.recordAudio = RecordRTC(mediaStream, {
      onAudioProcessStarted: function() {
        recordVideo.startRecording();
      }
    });

    recordAudio.startRecording();
  }, handleError);
}


function togRecord() {
  if (isRecording) {
    stopRecord();
    return;
  }
  startRecord();
}

function play() {
  stopRecord();
  document.getElementById("selfVideo").play();
  document.getElementById("selfAudio").play();
}
