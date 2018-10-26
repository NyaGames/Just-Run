var loadcarga_oceanoState = function(Just_Run) {
	loadcarga_oceanoState.prototype.preload = function(){		
		game.load.image('snowfield', 'assets/fondos/oceano.png');
		game.load.image('ground', 'assets/tiles/oceano/arena.png');
		game.load.image('bubble', 'assets/sprites/Oceano/Burbuja.png');
		game.load.image('piedra', 'assets/tiles/oceano/piedra.png');
		game.load.spritesheet('chaser', 'assets/sprites/rojo/Rojo64pxl.png', 48, 48, 178);
		game.load.spritesheet('escapist', 'assets/sprites/verde/verde64pxl.png', 48, 48, 155);
		game.load.spritesheet('snowball', 'assets/sprites/nieve/bola de nieve/BolaNieve.png', 106, 106, 12);
		game.load.image('ancla', 'assets/sprites/Oceano/Ancla.png');
		game.load.image('pinguino', 'assets/sprites/nieve/pinguino.png');
		game.load.image('bebola', 'assets/sprites/nieve/bbola.png');
		game.load.image('babola', 'assets/sprites/nieve/bolaapagado.png');
		game.load.image('bestalactita', 'assets/sprites/nieve/bestalactita.png');
		game.load.image('baestalactita', 'assets/sprites/nieve/estalactitaapagado.png');
		game.load.image('bepinguino', 'assets/sprites/nieve/bpinguino.png');
		game.load.image('bapinguino', 'assets/sprites/nieve/pinguinoapagado.png');		
	},
	loadcarga_oceanoState.prototype.create = function(){	
		var pantallacarga = game.add.sprite(350, 150, 'carga');
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
		game.state.start('playoceano');
	}
}