var loadcarga_oceanoState = function(Just_Run) {
	loadcarga_oceanoState.prototype.preload = function(){	
	//carga de los sprites del mundo de oceano	
		game.load.image('sea', 'assets/fondos/oceano.png');
		game.load.image('ground', 'assets/tiles/oceano/arena.png');
		game.load.image('bubble', 'assets/sprites/Oceano/Burbuja.png');
		game.load.image('piedra', 'assets/tiles/oceano/piedra.png');
		game.load.spritesheet('chaser', 'assets/sprites/rojo/Rojo64pxl.png', 48, 48, 178);
		game.load.spritesheet('escapist', 'assets/sprites/verde/verde64pxl.png', 48, 48, 155);
		game.load.spritesheet('shark', 'assets/sprites/Oceano/Tiburon.png', 104, 42, 4);
		game.load.image('ancla', 'assets/sprites/Oceano/Ancla.png');
		game.load.image('erizo', 'assets/sprites/Oceano/ErizoCerrado.png');
		game.load.image('erizoa', 'assets/sprites/Oceano/ErizoAbierto.png');
		game.load.image('betiburon', 'assets/sprites/Oceano/TiburonON.png');
		game.load.image('batiburon', 'assets/sprites/Oceano/TiburonOFF.png');
		game.load.image('beancla', 'assets/sprites/Oceano/AnclaON.png');
		game.load.image('baestalactita', 'assets/sprites/Oceano/AnclaOFF.png');
		game.load.image('beerizo', 'assets/sprites/Oceano/ErizoON.png');
		game.load.image('baerizo', 'assets/sprites/Oceano/ErizoOFF.png');
		game.load.audio('song', 'assets/music/oceano.mp3');		
	},
	loadcarga_oceanoState.prototype.create = function(){	
		//ejecución de la pantalla de carga y ejecución del siguiente estado
		var pantallacarga = game.add.sprite(350, 150, 'carga');
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
		game.state.start('playoceano');
	}
}