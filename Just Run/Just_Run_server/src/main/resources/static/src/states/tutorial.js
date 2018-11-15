var tutorialState = function(Just_Run) {	
	tutorialState.prototype.create = function(){
		//muestra la pantalla del tutorial hasta que se pulse el espacio
		this.background = game.add.sprite(0,0,'tutorial');
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);
	},
	tutorialState.prototype.start = function(){
		game.state.start('loadcarga_nieve');
	}
}