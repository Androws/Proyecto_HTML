var selectedSong;

function selectPlay(clickedId) {
  selectedSong = clickedId;

  var divs = document.querySelectorAll(".song");

  for (var i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = "";
  }

  selectedSong.parentElement.style.backgroundColor = "#817e7e";
  selectedSong.onloadeddata = function() {
    document.getElementById('meter').max = selectedSong.duration; // Al cargar sonido
  }
  selectedSong.ontimeupdate = function(d) {
    document.getElementById('meter').value = (selectedSong.currentTime / selectedSong.duration).toFixed(3);
    document.getElementById('actual').textContent = formatSecondsAsTime(selectedSong.currentTime.toFixed(1));
    document.getElementById('duracion').textContent = formatSecondsAsTime(selectedSong.duration.toFixed(1));
  }

  selectedSong.onprogress = function() {
    //document.getElementById('aviso').innerHTML = "La canción seleccionada se está cargando.";
  }
  selectedSong.volume = document.getElementById("volume").value;
}

function playorpause() {
  var songs = document.querySelectorAll("#lista audio");
  for (var i = 0; i < songs.length; i++) {
    if (songs[i] != selectedSong) {
      console.log("Selected: " + selectedSong.getAttribute("id") + " Pausar: " + songs[i].getAttribute("id"));
      songs[i].pause();
      songs[i].currentTime = 0;
      document.getElementById("playpause").className = "boton fa fa-play fa-2x";
    }
  }
  if (selectedSong.paused && selectedSong.readyState > 3) {
    console.log(selectedSong.readyState);
    //console.log("Reproduciendo: " + console.log(selectedSong));
    selectedSong.play();
    selectedSong.parentElement.style.backgroundColor = "lightgreen";
    document.getElementById("playpause").className = "boton fa fa-pause fa-2x";
  } else if (selectedSong.readyState <= 3) {
    document.getElementById("aviso").innerHTML = "La canción a reproducir no ha cargado."
  } else {
    selectedSong.pause();
    selectedSong.parentElement.style.backgroundColor = "#817e7e";
    document.getElementById("playpause").className = "boton fa fa-play fa-2x";
  }
}

function setVolume() {
  if (selectedSong)
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
