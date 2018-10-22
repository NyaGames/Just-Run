var loadcarga_castilloState = function(Just_Run) {
	loadcarga_castilloState.prototype.preload = function(){		
		game.load.image('castle', 'assets/fondos/castillo.png');
		game.load.image('ground', 'assets/tiles/castillo/tierra.png');
		game.load.image('grass', 'assets/tiles/castillo/hierba.png');	
		game.load.image('carpet', 'assets/tiles/castillo/alfombra.png');	
		game.load.image('ledge', 'assets/tiles/castillo/wood.png');
		game.load.spritesheet('chaser', 'assets/sprites/rojo/Rojo64pxl.png', 48, 48, 178);
		game.load.spritesheet('escapist', 'assets/sprites/verde/verde64pxl.png', 48, 48, 155);
		game.load.spritesheet('horse', 'assets/sprites/Castillo/caballo96x78.png', 96, 78, 10);
		game.load.image('aceite', 'assets/sprites/Castillo/Aceite.png');
		game.load.image('pinguino', 'assets/sprites/nieve/pinguino.png');
		game.load.image('bebola', 'assets/sprites/nieve/bbola.png');
		game.load.image('babola', 'assets/sprites/nieve/bolaapagado.png');
		game.load.image('bestalactita', 'assets/sprites/nieve/bestalactita.png');
		game.load.image('baestalactita', 'assets/sprites/nieve/estalactitaapagado.png');
		game.load.image('bepinguino', 'assets/sprites/nieve/bpinguino.png');
		game.load.image('bapinguino', 'assets/sprites/nieve/pinguinoapagado.png');		
	},
	loadcarga_castilloState.prototype.create = function(){	
		var pantallacarga = game.add.sprite(350, 150, 'carga');
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
		game.state.start('playcastillo');
	}
}