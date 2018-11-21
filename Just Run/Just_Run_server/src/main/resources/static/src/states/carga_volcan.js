var loadcarga_volcanState = function(Just_Run) {
	loadcarga_volcanState.prototype.preload = function(){		
		//carga de los sprites del nivel del volcan
		game.load.image('volcano', 'assets/fondos/volcan.png');
		game.load.image('ground', 'assets/tiles/volcan/arena.png');	
		game.load.image('lava', 'assets/tiles/volcan/lava.png');
		game.load.image('ledge', 'assets/tiles/volcan/ledge.png');
		game.load.image('ola', 'assets/sprites/volcan/ola.png');
		game.load.image('meteor', 'assets/sprites/volcan/meteorito.png');
		game.load.image('magma', 'assets/sprites/volcan/lavacube.png');
		game.load.image('beola', 'assets/sprites/volcan/olaON.png');
		game.load.image('baola', 'assets/sprites/volcan/olaOFF.png');
		game.load.image('bmeteorito', 'assets/sprites/volcan/meteoritoON.png');
		game.load.image('bameteorito', 'assets/sprites/volcan/meteoritoOFF.png');
		game.load.image('bemagma', 'assets/sprites/volcan/lavacubeON.png');
		game.load.image('bamagma', 'assets/sprites/volcan/lavacubeOFF.png');		
		game.load.audio('song', 'assets/music/volcan.mp3');
	},
	loadcarga_volcanState.prototype.create = function(){	
		//ejecucíon de la pantalla de carga y del siguiente estado
		var pantallacarga = game.add.sprite(350, 150, 'carga');
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
		game.state.start('playvolcan');
	}
}