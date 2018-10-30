var loadcarga_castilloState = function(Just_Run) {
	loadcarga_castilloState.prototype.preload = function(){		
		//carga de los sprites que se usaran en el mapa del castillo
		game.load.image('castle', 'assets/fondos/castillo.png');
		game.load.image('ground', 'assets/tiles/castillo/tierra.png');
		game.load.image('grass', 'assets/tiles/castillo/hierba.png');	
		game.load.image('carpet', 'assets/tiles/castillo/alfombra.png');	
		game.load.image('ledge', 'assets/tiles/castillo/wood.png');
		game.load.image('pared', 'assets/tiles/castillo/ladrillos.png');
		game.load.image('water', 'assets/tiles/castillo/agua.png');
		game.load.image('coco', 'assets/sprites/Castillo/Cocodrilo.png');
		game.load.spritesheet('chaser', 'assets/sprites/rojo/Rojo64pxl.png', 48, 48, 178);
		game.load.spritesheet('escapist', 'assets/sprites/verde/verde64pxl.png', 48, 48, 155);
		game.load.spritesheet('horse', 'assets/sprites/Castillo/caballo96x78.png', 96, 78, 10);
		game.load.image('aceite', 'assets/sprites/Castillo/Aceite.png');
		game.load.image('flecha', 'assets/sprites/Castillo/Arrow.png');
		game.load.image('puerta', 'assets/sprites/Castillo/animacionPuerta.png');
		game.load.image('becaballero', 'assets/sprites/Castillo/CaballeroON.png');
		game.load.image('bacaballero', 'assets/sprites/Castillo/CaballeroOFF.png');
		game.load.image('beaceite', 'assets/sprites/Castillo/AceiteON.png');
		game.load.image('baestalactita', 'assets/sprites/Castillo/AceiteOFF.png');
		game.load.image('bepinguino', 'assets/sprites/Castillo/ElfoON.png');
		game.load.image('bapinguino', 'assets/sprites/Castillo/ElfoOFF.png');	
		game.load.image('pinchos', 'assets/sprites/Castillo/TrampaPinchos.png');		
	},
	loadcarga_castilloState.prototype.create = function(){
		//ejecucion de la pantalla de carga durante la carga y del siguientes estado
		var pantallacarga = game.add.sprite(350, 150, 'carga');
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
		game.state.start('playcastillo');
	}
}