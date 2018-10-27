var tutorialState = function(Just_Run) {	
	tutorialState.prototype.create = function(){
		this.background = game.add.sprite(0,0,'tutorial');
		game.time.events.add(Phaser.Timer.SECOND * 5, this.start, this);
	},
	tutorialState.prototype.start = function(){
		game.state.start('loadcarga_desierto');
	}
}