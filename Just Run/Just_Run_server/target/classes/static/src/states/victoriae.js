JustRun.victoriaEState = function(game){
	
}

JustRun.victoriaEState.prototype = {
		//muestra la pantalla, y nos devuelve al menu al pulsar escape
		create: function(){
			this.escape = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
			this.background = game.add.sprite(0,0,'victoriae');
		},
		update: function(){
			if(this.escape.isDown){
				game.state.start('loadcarga_menu');
			}
		}	
}