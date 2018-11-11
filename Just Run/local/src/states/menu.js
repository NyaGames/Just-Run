var menuState = function(Just_Run) {		
		this.estado = 1;
	menuState.prototype.create = function(){
		//muestra el menu hasta que se pulse espacio sobre jugar
		this.background = game.add.sprite(0,0,'menu');
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jugar = game.add.sprite(320, 300, 'jugarg');
		this.salir = game.add.sprite(320, 400, 'salirp');
		this.opciones = game.add.sprite(960, 500, 'opcionesp');		
	},
	menuState.prototype.update = function(){
		if(this.estado === 1){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarg');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.spaceKey.onDown.addOnce(this.start, this);
		}else if(this.estado === 2){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirg');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.spaceKey.onDown.addOnce(this.closeCurrentWindow, this);
		}else if(this.estado === 3){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesg');
			this.spaceKey.onDown.addOnce(this.options, this);
		}
		if(this.downInputIsActive(5)){
			this.estado++;
			if(this.estado > 3){
				this.estado = 1;	
			}
		}
		if(this.upInputIsActive(5)){
			this.estado--;
			if(this.estado < 1){
				this.estado = 3;	
			}
		}
	}
	menuState.prototype.start = function(){
		game.state.start('tutorial');
	},
	menuState.prototype.options = function(){
		alert();
	},
	menuState.prototype.closeCurrentWindow = function(){
	  window.close();
	},
	//control de las teclas
	menuState.prototype.upInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	    return isActive;
	};
	menuState.prototype.upInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	    return released;
	};
	menuState.prototype.downInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.DOWN, duration);
	    return isActive;
	};
	menuState.prototype.downInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.DOWN);
	    return released;
	};
}