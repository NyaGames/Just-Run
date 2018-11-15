var menuState = function(Just_Run) {		
		this.estado = 1;
	menuState.prototype.preload = function(){
		game.load.spritesheet('chaser', 'assets/sprites/rojo/Rojo64pxl.png', 48, 48, 178);
		game.load.spritesheet('escapist', 'assets/sprites/verde/verde64pxl.png', 48, 48, 155);
	},
	menuState.prototype.create = function(){
		JustRun.chaser;
		JustRun.escapist;
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
			if(this.spaceKey.isDown){
				game.sound.stopAll();
				game.state.start('matchmaking');
			}
		}else if(this.estado === 2){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.ayuda.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirg');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.ayuda = game.add.sprite(50, 520, 'ayudap');	
			if(this.spaceKey.isDown){
				window.close();
			}
		}else if(this.estado === 3){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.ayuda.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesg');
			this.ayuda = game.add.sprite(50, 520, 'ayudap');	
			if(this.spaceKey.isDown){
				alert("opciones");
			}
		}else if(this.estado === 4){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.ayuda.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.ayuda = game.add.sprite(50, 520, 'ayudag');	
			if(this.spaceKey.isDown){
				game.state.start('ayuda');  
			}
		}
		if(this.downInputIsActive(5)){
			this.estado++;
			console.log(this.estado);
			if(this.estado > 4){
				this.estado = 1;	
			}
		}
		if(this.upInputIsActive(5)){
			this.estado--;
			console.log(this.estado)
			if(this.estado < 1){
				this.estado = 4;
			}
		}
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