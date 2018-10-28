var winState = function(Just_Run){

	winState.prototype.preload = function(){
		game.load.image('chaserwin','assets/fondos/Victoria.png');

	},
	winState.prototype.create = function(){

		
		var winchaser = game.add.sprite(1060, 600, 'chaserwin');

	}
}