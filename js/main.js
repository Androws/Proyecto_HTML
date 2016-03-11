var selectedSong;

function selectPlay(clickedId) {
  selectedSong = clickedId;

  var divs = document.querySelectorAll(".song");

  for (var i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = "";
  }

  selectedSong.parentElement.style.backgroundColor = "lightblue";
  selectedSong.onloadeddata = function() {
    document.getElementById('meter').max = selectedSong.duration; // Al cargar sonido
  }
  selectedSong.ontimeupdate = function(d) {
    document.getElementById('meter').value = d.path[0].currentTime.toFixed(2);
    document.getElementById('actual').textContent = formatSecondsAsTime(d.path[0].currentTime.toFixed(2));
    document.getElementById('duracion').textContent = formatSecondsAsTime(d.path[0].duration.toFixed(2));
  }

  selectedSong.onprogress = function () {
    document.getElementById('aviso').textContent = "La canción seleccionada se está cargando."
  }
  selectedSong.volume = document.getElementById("volume").value;
}

function playorpause() {
  var songs = document.querySelectorAll("#lista audio");
  for (var i = 0; i < songs.length; i++) {
    if (!songs[i].paused && songs[i] != selectedSong) {
      console.log("Selected: " + selectedSong.getAttribute("id") + " Pausar: " + songs[i].getAttribute("id"));
      songs[i].pause();
      songs[i].currentTime = 0;
      document.getElementById("playpause").className = "boton fa fa-play fa-2x";
    }
  }
  if (selectedSong.paused && selectedSong.readyState >= 4) {
    console.log(selectedSong.readyState);
    //console.log("Reproduciendo: " + console.log(selectedSong));
    selectedSong.play();
    selectedSong.parentElement.style.backgroundColor = "lightgreen";
    document.getElementById("playpause").className = "boton fa fa-pause fa-2x";
  } else {
    selectedSong.pause();
    selectedSong.parentElement.style.backgroundColor = "lightblue";
    document.getElementById("playpause").className = "boton fa fa-play fa-2x";
  }
}

function setVolume() {
  selectedSong.volume = document.getElementById("volume").value;
}

function formatSecondsAsTime(secs) {
  var hr = Math.floor(secs / 3600);
  var min = Math.floor((secs - (hr * 3600)) / 60);
  var sec = Math.floor(secs - (hr * 3600) - (min * 60));

  if (min < 10) {
    min = "0" + min;
  }
  if (sec < 10) {
    sec = "0" + sec;
  }

  return min + ':' + sec;
}
