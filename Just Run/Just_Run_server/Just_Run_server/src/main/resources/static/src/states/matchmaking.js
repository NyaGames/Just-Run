JustRun.matchmakingState = function(game){

	JustRun.userID = -1;
}
var connection = new WebSocket('ws://'+window.location.host+'/echo');
var listo = false;
var listo1 = false;

var object = {"id": "join", "userID": -1, "cambio": "", "listo": "", "listo1": ""};
JustRun.matchmakingState.prototype = {
		//carga la imagen de busqueda
		preload: function(){		
			//carga de lo qu se usara en el menú principal
			game.load.image('buscando','assets/fondos/Buscando.png')
		},

		create: function(){
			//crea un jugador al conectarse, y dice que jugador es cada cliente mediante un ID	
			var buscando = game.add.sprite(0,0,'buscando');

			//animacion pantalla carga
		    var pantallacarga = game.add.sprite(660, 238, 'carga');
		    pantallacarga.scale.setTo(0.2,0.2);
			var loading = pantallacarga.animations.add('load');
			pantallacarga.animations.play('load', 26, true);
		},
		update: function(){
			//hace la comprobación de si los dos jugadores estan conectados, en ese caso, carga el nivel
			connection.send(JSON.stringify(object));
			connection.onmessage = function(event){
				console.log(event.data);
				var message = JSON.parse(event.data);
				if(message.userID == 1 && JustRun.userID != 1){
					JustRun.userID = 1;
				}else if(message.userID == 2 && JustRun.userID != 1){
					JustRun.userID = 2;
				}
				object.cambio = message.cambio;
			}
			if(JustRun.userID == 1){
				if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
					object.listo = true;
				}
			}	
			if(JustRun.userID == 2){
				if(game.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR)){
					object.listo1 = true;
				}
			}	
			if(object.cambio == "cambio"){
				game.state.start("loadcarga_nieve");
			}
			console.log(JustRun.userID);
		}	
}