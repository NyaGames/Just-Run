var JustRun = {}
JustRun.bootState = function(game){
	
}

JustRun.bootState.prototype = {
		preload: function(){
	    	game.stage.disableVisibilityChange = true;
			//carga de los sprites que se van a usar a lo largo de todo el juego, los que seran generales como la pantalla de carga
			game.load.spritesheet('carga', 'assets/sprites/pantalla de carga/CargaBien2.png', 350, 350, 26);
			game.load.image('tutorial', 'assets/fondos/Tutorial.png');
			game.load.image('fondoayuda', 'assets/sprites/botones_menu/Niveles.png');
			game.load.image('infonieve', 'assets/fondos/Tutorial/InfoNieve.png');
			game.load.image('infocastillo', 'assets/fondos/Tutorial/InfoCastillo.png');
			game.load.image('infodesierto', 'assets/fondos/Tutorial/InfoDesierto.png');
			game.load.image('infooceano', 'assets/fondos/Tutorial/InfoOceano.png');
			game.load.image('infovolcan', 'assets/fondos/Tutorial/InfoVolcan.png');
			game.load.image('catched', 'assets/sprites/Animacion Entre Niveles/Cazado.png');
			game.load.image('libre', 'assets/sprites/Animacion Entre Niveles/Libre.png');
			game.load.image('victoriac', 'assets/fondos/Victoria.png');
			game.load.image('victoriae', 'assets/fondos/VictoriaEscapist.png');
		},
		create: function(){
			game.physics.startSystem(Phaser.Physics.ARCADE);
			game.stage.backgroundColor = 0xffc966;
			game.state.start('loadcarga_menu');
		}
}