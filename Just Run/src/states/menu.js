var menuState = function(Just_Run) {	
	menuState.prototype.create = function(){
		this.background = game.add.sprite(0,0,'menu');
		var jugar = game.add.sprite(320, 300, 'jugarg');
		var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		spaceKey.onDown.addOnce(this.start, this);
	},
	menuState.prototype.start = function(){
		game.state.start('load1');
	}
}