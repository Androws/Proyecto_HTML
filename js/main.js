var selectedSong;
var currentSong;

//Función para seleccionar una canción
function selectPlay(clickedId) {
  //se almacena la canción seleccionada anteriormente
  var prevSong = selectedSong;
  selectedSong = clickedId;

  var divs = document.querySelectorAll(".song");

  //Una vez seleccionada una canción se deselecciona el resto
  for (var i = 0; i < divs.length; i++) {
    divs[i].style.backgroundColor = "";
  }
  //Se aplica un color a la canción seleccionada
  selectedSong.parentElement.style.backgroundColor = "#817e7e";

  /*Si la canción seleccionada es la misma que estaba seleccionada antes
  se reproduce directamente la canción seleccionada (doble click)*/
  if (selectedSong == prevSong)
    playorpause(true);
}

//Función para iniciar o pausar la reproducción
function playorpause(cambio) {
  //Se resetea el aviso de canción no cargada.
  document.getElementById("aviso").innerHTML = "";
  //Si se está reproduciendo una canción cuando se pulsa el botón, se pausa.
  if (currentSong && !currentSong.paused) {
    currentSong.pause();
    /*Si se ha seleccionado otra canción, también se pone
    el tiempo de la canción anterior a 0 (stop)*/
    if (selectedSong != currentSong)
      currentSong.currentTime = 0;
    document.getElementById("playpause").className = "boton fa fa-play fa-2x";
    /*Cuando se pausa la canción actual salimos de la función, pero si se
    cambia de canción, continuamos*/
    if (!cambio)
      return;
  }
  //Se comprueba que la canción seleccionada esté pausada y que se haya cargado
  if (selectedSong.paused && selectedSong.readyState > 3) {
    selectedSong.play();
    currentSong = selectedSong;
    //La canción que se reproduce tiene un fondo verde
    currentSong.parentElement.style.backgroundColor = "lightgreen";
    //Se cambia el botón al botón de pausa.
    document.getElementById("playpause").className = "boton fa fa-pause fa-2x";
  } else if (selectedSong.readyState <= 3) {
    //Si la canción no ha cargado, se muestra un aviso
    document.getElementById("aviso").innerHTML = "La canción a reproducir no ha cargado.";
  } else {
    //Si la canción seleccionada no estaba pausada, se pausa.
    selectedSong.pause();
    selectedSong.parentElement.style.backgroundColor = "#817e7e";
    document.getElementById("playpause").className = "boton fa fa-play fa-2x";
  }
  //Cuando se carga la canción, se establece el valor máximo de la barra de progreso
  currentSong.onloadeddata = function() {
    document.getElementById('meter').max = currentSong.duration; // Al cargar sonido
  }
  /*Cada vez que se avanza en la canción, se cambia el valor de la barra de progreso,
  y se actualizan los contadores de tiempo*/
  currentSong.ontimeupdate = function() {
    document.getElementById('meter').value = (currentSong.currentTime / currentSong.duration).toFixed(3);
    document.getElementById('actual').textContent = formatSecondsAsTime(currentSong.currentTime.toFixed(1));
    document.getElementById('duracion').textContent = formatSecondsAsTime(currentSong.duration.toFixed(1));
  }
  //El volumen de la canción es indicado por el "range" de volumen
  currentSong.volume = document.getElementById("volume").value;
}

/*Función que se llama cada vez que se mueve el "range" y que cambia
el volumen de la canción que se está reproduciendo*/
function setVolume() {
  if (currentSong)
    currentSong.volume = document.getElementById("volume").value;
}
//Función para formatear el tiempo de las canciones.
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
