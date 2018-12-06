JustRun.loadcarga_nieveState = function(game){
	
}
JustRun.loadcarga_nieveState.prototype = {
		preload: function(){
		//carga de los sprites usados en el mundo de la nieve		
			game.load.image('snowfield', 'assets/fondos/nieveoscuro.png');
			game.load.image('ground', 'assets/tiles/nieve/tierra.png');
			game.load.image('snow', 'assets/tiles/nieve/nieve.png');		
			game.load.image('water', 'assets/tiles/nieve/agua.png');
			game.load.image('waters', 'assets/tiles/nieve/agua_sin nieve.png');
			game.load.image('ledge', 'assets/tiles/nieve/ledge.png');
			game.load.image('particulas', 'assets/tiles/nieve/particulasnieve.png');
			game.load.image('ledges', 'assets/tiles/nieve/hielo_sin.png');
			game.load.spritesheet('snowball', 'assets/sprites/nieve/bola de nieve/BolaNieve.png', 106, 106, 12);
			game.load.image('chuzo', 'assets/sprites/nieve/Estalactita.png');
			game.load.image('pinguino', 'assets/sprites/nieve/pinguino.png');
			game.load.image('bebola', 'assets/sprites/nieve/bbola.png');
			game.load.image('babola', 'assets/sprites/nieve/bolaapagado.png');
			game.load.image('bestalactita', 'assets/sprites/nieve/bestalactita.png');
			game.load.image('baestalactita', 'assets/sprites/nieve/estalactitaapagado.png');
			game.load.image('bepinguino', 'assets/sprites/nieve/bpinguino.png');
			game.load.image('bapinguino', 'assets/sprites/nieve/pinguinoapagado.png');	
			game.load.audio('song', 'assets/music/nieve.mp3');	
		},
		create: function(){	
			//ejecución de la pantalla de carga y del siguiente estado
			var pantallacarga = game.add.sprite(350, 150, 'carga');
			var loading = pantallacarga.animations.add('load');
			var object;
			pantallacarga.animations.play('load', 26, true);	
			//creacion del chaser, escapist, trampas y animaciones en el servidor
				object = {"id":"Chaser", "x":60,"y":300, "puntuacion":0};
				connection.send(JSON.stringify(object));
				object = {"id":"Escapist", "x":1000,"y":300, "puntuacion":0, "cazado":false};
				connection.send(JSON.stringify(object));
				object = {"id":"Traps", "I":false, "O":false, "P":false};
				connection.send(JSON.stringify(object));
				object = {"id":"Animations", "ChaserIdle":true, "ChaserRunL":false, "ChaserRunR":false, "ChaserJump":false, "EscapistIdle": true, "EscapistRunL": false, "EscapistRunR": false, "EscapistJump": false};
				connection.send(JSON.stringify(object));
			game.state.start('playnieve');
		}
}