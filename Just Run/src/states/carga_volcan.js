var loadcarga_volcanState = function(Just_Run) {
	loadcarga_volcanState.prototype.preload = function(){		
		//carga de los sprites del nivel del volcan
		game.load.image('snowfield', 'assets/fondos/volcan.png');
		game.load.image('ground', 'assets/tiles/volcan/arena.png');	
		game.load.image('lava', 'assets/tiles/volcan/lava.png');
		game.load.image('ledge', 'assets/tiles/volcan/ledge.png');
		game.load.image('ledges', 'assets/tiles/volcan/ledges.png');
		game.load.spritesheet('chaser', 'assets/sprites/rojo/Rojo64pxl.png', 48, 48, 178);
		game.load.spritesheet('escapist', 'assets/sprites/verde/verde64pxl.png', 48, 48, 155);
		game.load.image('snowball', 'assets/sprites/volcan/ola.png');
		game.load.image('chuzo', 'assets/sprites/volcan/meteorito.png');
		game.load.image('pinguino', 'assets/sprites/volcan/lavacube.png');
		game.load.image('bebola', 'assets/sprites/volcan/olaON.png');
		game.load.image('babola', 'assets/sprites/volcan/olaOFF.png');
		game.load.image('bestalactita', 'assets/sprites/volcan/meteoritoON.png');
		game.load.image('baestalactita', 'assets/sprites/volcan/meteoritoOFF.png');
		game.load.image('bepinguino', 'assets/sprites/volcan/lavacubeON.png');
		game.load.image('bapinguino', 'assets/sprites/volcan/lavacubeOFF.png');		
	},
	loadcarga_volcanState.prototype.create = function(){	
		//ejecucíon de la pantalla de carga y del siguiente estado
		var pantallacarga = game.add.sprite(350, 150, 'carga');
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
		game.state.start('playvolcan');
	}
}