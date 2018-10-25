var loadcarga_desiertoState = function(Just_Run) {
	loadcarga_desiertoState.prototype.preload = function(){		
		game.load.image('snowfield', 'assets/fondos/FondoDesierto.png');
		game.load.image('ground', 'assets/tiles/desierto/arena.png');
		game.load.image('arena', 'assets/tiles/desierto/arenaSombra.png');
		game.load.image('ledge', 'assets/tiles/desierto/SandStone.png');
		game.load.spritesheet('chaser', 'assets/sprites/rojo/Rojo64pxl.png', 48, 48, 178);
		game.load.spritesheet('escapist', 'assets/sprites/verde/verde64pxl.png', 48, 48, 155);
		game.load.spritesheet('tweed', 'assets/sprites/Desierto/TumbleWeed128x192.png', 128, 192, 8);
		game.load.spritesheet('buitre', 'assets/sprites/Desierto/buitre200x70.png', 200, 70, 4);
		game.load.image('cactus', 'assets/sprites/Desierto/Cactus.png');
		game.load.image('vaquero', 'assets/sprites/Desierto/vaquero.png');
		game.load.image('beTW', 'assets/sprites/Desierto/TWON.png');
		game.load.image('baTW', 'assets/sprites/Desierto/TWOFF.png');
		game.load.image('bebuitre', 'assets/sprites/Desierto/BuitreON.png');
		game.load.image('babuitre', 'assets/sprites/Desierto/BuitreOFF.png');
		game.load.image('bevaquero', 'assets/sprites/Desierto/VaqueroON.png');
		game.load.image('bavaquero', 'assets/sprites/Desierto/VaqueroOFF.png');		
	},
	loadcarga_desiertoState.prototype.create = function(){	
		var pantallacarga = game.add.sprite(350, 150, 'carga');
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
		game.state.start('playdesierto');
	}
}