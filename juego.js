var juego = {};											// Crear objeto juego

juego.filas = [[],[],[]];								// Array Bidimensional
juego.espacioVacio = {									// Determina posición de espacio vacío
		fila: 2,
		columna: 2
};


// Método para Iniciar
juego.iniciar = function(juego) {
	this.instalarPiezas(juego);
	this.mezclarFichas(4);
	this.capturarTeclas();
};


// Método para crear pieza
juego.crearPieza = function(numero, fila, columna) {
	var	objetoPieza = $("<div id='" + numero + "'>");
	objetoPieza.addClass('pieza');
	objetoPieza.css({
		background: "url(img/" + numero + ".jpg)",
		top: fila * 200,
		left: columna * 200
	});
	return {objetoPieza:objetoPieza, numero:numero, filaInicial:fila, columnaInicial:columna};
};


// Método instalar piezas
juego.instalarPiezas = function(elemento) {
	var contador = 1;
	for (var fila = 0; fila < 3; fila++) {
		for (var columna = 0; columna < 3; columna++) {
			if (fila == this.espacioVacio.fila && columna == this.espacioVacio.columna) {
				this.filas[fila][columna] = null;
			} 
			else {
				var pieza = this.crearPieza(contador++, fila, columna);
				elemento.append(pieza.objetoPieza);
				this.filas[fila][columna] = pieza;
			}
		}
	}
};

// Movimientos
juego.moverHaciaAbajo = function() {
	console.log("Hacia abajo");
	var filaOrigen = this.espacioVacio.fila - 1;
	var columnaOrigen = this.espacioVacio.columna;
	this.intercambiarEspacioVacio(filaOrigen, columnaOrigen);
	console.log();

};

juego.moverHaciaArriba = function() {
	console.log("Hacia arriba");
	var filaOrigen = this.espacioVacio.fila + 1;
	var columnaOrigen = this.espacioVacio.columna;
	this.intercambiarEspacioVacio(filaOrigen, columnaOrigen);
	console.log();
};

juego.moverHaciaLaDerecha = function() {
	console.log("Hacia la derecha");
	var	filaOrigen = this.espacioVacio.fila;
	var	columnaOrigen = this.espacioVacio.columna - 1;
	this.intercambiarEspacioVacio(filaOrigen, columnaOrigen);
	console.log();
};

juego.moverHaciaLaIzquierda = function() {
	console.log("Hacia la izquierda");
	var	filaOrigen = this.espacioVacio.fila;
	var	columnaOrigen = this.espacioVacio.columna + 1;
	this.intercambiarEspacioVacio(filaOrigen, columnaOrigen);
	console.log();
};



juego.capturarTeclas = function() {
	var	selfct = this;
	$(document).keydown(function(event) {
		switch(event.which){
			case 40:
				selfct.moverHaciaAbajo();
			break;

			case 38:
				selfct.moverHaciaArriba();
			break;

			case 39:
				selfct.moverHaciaLaDerecha();
			break;

			case 37:
				selfct.moverHaciaLaIzquierda();

			break;

			default: return;

		};
		
		
		event.preventDefault();
		selfct.chequearSiGano(selfct.contadorMovimientos-1);
		//selfct.aumentarContador(selfct.contadorMovimientos);
	});

};



// Mover la ficha de fila o columna
// Contador de movimientos

juego.contadorMovimientos = 0;

juego.moverFichaColumna = function(fichaAMover, fila, columna) {
	fichaAMover.objetoPieza.animate({			// Cambio .css por .animate 
		top: fila * 200,
		left: columna * 200
	}, this.duration);

	var self = this;
	if (!(this.estaMezclando)) {
		self.chequearSiGano(self.contadorMovimientos++);      // <<= No funciona por el animate
		self.aumentarContador(self.contadorMovimientos);
		//self.cambiarImagen();
	};
		

};

// Muestra el contador aumentado

juego.aumentarContador = function(numeroIntentos) {
	var contadorintentos = document.getElementById("contadorintentos");
	contadorintentos.innerHTML = numeroIntentos;
};

// Intercambia espacio vacio

juego.guardarEspacioVacio = function(fila, columna) {
	this.espacioVacio.fila = fila;
	this.espacioVacio.columna = columna;
	this.filas[fila][columna] = null;
};

juego.intercambiarEspacioVacio = function(fila, columna) {
	var fichaAMover = this.filas[fila] && this.filas[fila][columna];
	if(fichaAMover) {
		this.filas[this.espacioVacio.fila][this.espacioVacio.columna] = fichaAMover;
		this.moverFichaColumna(fichaAMover, this.espacioVacio.fila, this.espacioVacio.columna);
		this.guardarEspacioVacio(fila, columna);
	}; 
};


juego.chequearSiGano = function(numerointentos) {
	for (var f = 0; f < this.filas.length; f++) {
		for (var c = 0; c < this.filas.length; c++) {
			var ficha = this.filas[f][c];
			if (ficha && !(ficha.filaInicial == f && ficha.columnaInicial == c)) {
				return false;
				console.log("No");
			};
		};
	};
	console.log("AA");
	return alert('Ganaste! Intentos: ' + numerointentos);
};



// Mezclar fichas
juego.estaMezclando = true;								// Utilizado para saber si está o no mezclando

juego.mezclarFichas = function(veces) {
	if (veces <= 0) {
		this.duration = 500;
		this.estaMezclando = false;
		return;
	};

	var alal = this;

	var funciones = ['moverHaciaAbajo','moverHaciaArriba','moverHaciaLaIzquierda','moverHaciaLaDerecha'];
	var numeroRandom = Math.floor(Math.random() * 4);
	var nomDeFuncion = funciones[numeroRandom];

	this[nomDeFuncion]();

	setTimeout(function() {
		alal.mezclarFichas(veces -0.15);
		},10);
	

};

/*juego.cambiaFoto = function() {
	this.piezaDivs.forEach(function() {
		document.getElementById(juego.pieza)
	})
};
*/
juego.contadorCambios = 0;
// Cambia la imagen de la ficha movida si tiene el mismo if de chequearSiGano.
juego.cambiarImagen = function() {
	for (var f = 0; f < this.filas.length; f++) {
		for (var c = 0; c < this.filas.length; c++) {
			var ficha = this.filas[f][c];
			if (ficha /*&& !(ficha.filaInicial == f && ficha.columnaInicial == c)*/) {
				ficha.objetoPieza.css({
					background: "url(img" + this.contadorCambios + "/" + ficha.numero + ".jpg)"
				});

			};
		};
		
	};
	this.contadorCambios++;
	var selfcont = this;
	if (this.contadorCambios > 5) {
		selfcont.contadorCambios = 0;
	};
};


$(document).ready(function(){
	var juegovar = $("#juego");
	//juego.iniciar(juegovar);   No inicio para probar
	var selfjuego = this;

	$("#instrucciones").fadeIn(1000);
	$("h2").hide();
	$("img").hide();

	$("button").click(function() {
		$("#instrucciones").hide();
		$("h2").show();
		$("img").show();
		$("button").css("display", "none");
		$("h6").css("display", "block");
		$("#instrucciones").css("float", "left");
		juego.iniciar(juegovar);
		$("#juego").slideDown(500);
		$("#instrucciones").fadeIn(1000);
	});
	

});
$(document).ready(function(){
	var cancion = $(".audio").get(0);
	cancion.volume=0.35;
	//control del volumen del juego
});

