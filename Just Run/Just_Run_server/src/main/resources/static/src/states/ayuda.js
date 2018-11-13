var ayudaState = function(Just_Run) {
	this.estado = 0;
	ayudaState.prototype.create = function(){
		//muestra la pantalla del tutorial hasta que se pulse el espacio
		this.background = game.add.sprite(0,0,'fondoayuda');
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.escape = game.input.keyboard.addKey(Phaser.Keyboard.ESC);
		this.infonieve = game.add.sprite(-2000,0,'infonieve');
		this.infocastillo = game.add.sprite(-2000,0,'infocastillo');
		this.infodesierto = game.add.sprite(-2000,0,'infodesierto');
		this.infooceano = game.add.sprite(-2000,0,'infooceano');
		this.infovolcan = game.add.sprite(-2000,0,'infovolcan');
	},
	ayudaState.prototype.update = function(){
		if(this.spaceKey.isDown){
			game.state.start('loadcarga_nieve');
		}
		if(this.escape.isDown){
			game.state.start('loadcarga_menu');
		}
		if(this.downInputIsActive(5)){
			this.estado++;
			console.log(this.estado);
			if(this.estado > 5){
				this.estado = 0;	
			}
		}
		if(this.upInputIsActive(5)){
			this.estado--;
			console.log(this.estado)
			if(this.estado < 0){
				this.estado = 5;
			}
		}
	},
	//control de las teclas
	ayudaState.prototype.upInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	    return isActive;
	};
	ayudaState.prototype.upInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	    return released;
	};
	ayudaState.prototype.downInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.DOWN, duration);
	    return isActive;
	};
	ayudaState.prototype.downInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.DOWN);
	    return released;
	};
}