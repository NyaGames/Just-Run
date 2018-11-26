JustRun.tutorialState = function(game){
	
}
JustRun.tutorialState.prototype = {
		//crea la pantalla que se muestra y el control para inciiar con la barra espaciadora
		create: function(){
			//muestra la pantalla del tutorial hasta que se pulse el espacio
			this.background = game.add.sprite(0,0,'tutorial');
			var spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
			spaceKey.onDown.addOnce(this.start, this);
		},
		start: function(){
			game.state.start('matchmaking');
		}	
}