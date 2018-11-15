var menuState = function(Just_Run) {		
		this.estado = 1;
	menuState.prototype.create = function(){
		//muestra el menu hasta que se pulse espacio sobre jugar
		song = game.add.audio('song');
		song.play();
		this.background = game.add.sprite(0,0,'menu');
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jugar = game.add.sprite(320, 300, 'jugarg');
		this.salir = game.add.sprite(320, 400, 'salirp');
		this.opciones = game.add.sprite(960, 500, 'opcionesp');	
		this.ayuda = game.add.sprite(50, 520, 'ayudap');	
	},
	menuState.prototype.update = function(){
		if(this.estado === 1){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.ayuda.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarg');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.ayuda = game.add.sprite(50, 520, 'ayudap');	
			this.spaceKey.onDown.addOnce(this.start, this);
		}else if(this.estado === 2){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.ayuda.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirg');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.ayuda = game.add.sprite(50, 520, 'ayudap');	
			this.spaceKey.onDown.addOnce(this.closeCurrentWindow, this);
		}else if(this.estado === 3){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.ayuda.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesg');
			this.ayuda = game.add.sprite(50, 520, 'ayudap');	
			this.spaceKey.onDown.addOnce(this.options, this);
		}else if(this.estado === 4){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.ayuda.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesg');
			this.ayuda = game.add.sprite(50, 520, 'ayudag');	
			this.spaceKey.onDown.addOnce(this.help, this);
		}
		if(this.downInputIsActive(5)){
			this.estado++;
			if(this.estado > 4){
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
		game.sound.stopAll();
		game.state.start('tutorial');
	},
	menuState.prototype.options = function(){
		alert("opciones");
	},
	menuState.prototype.closeCurrentWindow = function(){
	  window.close();
	},
	menuState.prototype.help = function(){
		game.sound.stopAll();
		alert("ayuda")	  
	}
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