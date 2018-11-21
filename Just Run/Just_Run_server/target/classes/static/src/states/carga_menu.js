JustRun.loadcarga_menuState = function(game) {
	
}

JustRun.loadcarga_menuState.prototype = {
		preload: function(){		
			//carga de lo qu se usara en el menú principal
			game.load.image('menu','assets/fondos/MenuPrincipal.png');
			game.load.image('jugarp', 'assets/sprites/botones_menu/Jugar.png');
			game.load.image('jugarg', 'assets/sprites/botones_menu/JugarBrillo2.png');
			game.load.image('opcionesp', 'assets/sprites/botones_menu/Opciones.png');
			game.load.image('opcionesg', 'assets/sprites/botones_menu/OpcionesBrillo.png');
			game.load.image('salirp', 'assets/sprites/botones_menu/Salir.png');
			game.load.image('salirg', 'assets/sprites/botones_menu/SalirBrillo2.png');
			game.load.image('ayudap', 'assets/sprites/botones_menu/Ayuda.png');
			game.load.image('ayudag', 'assets/sprites/botones_menu/AyudaBrillo.png')
			game.load.audio('song', 'assets/music/menu.mp3');
		},	
		create: function(){
			//ejecucion de la pantalla de carga e inicialización del siguiente estado
			var pantallacarga = game.add.sprite(350, 150, 'carga');
			var loading = pantallacarga.animations.add('load');
			pantallacarga.animations.play('load', 26, true);
			game.state.start('menu');
		}
}