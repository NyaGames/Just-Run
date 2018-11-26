JustRun.victoriaCState = function(game){
	
}

JustRun.victoriaCState.prototype = {
		//muestra la pantalla de victoria, y nos devuelve al menu al pulsar escape
		create: function(){
			this.escape = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
			this.background = game.add.sprite(0,0,'victoriac');
		},
		update: function(){
			if(this.escape.isDown){
				game.state.start('loadcarga_menu');
			}
		}
}