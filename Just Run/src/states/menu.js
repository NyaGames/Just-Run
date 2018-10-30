var menuState = function(Just_Run) {	
	menuState.prototype.create = function(){
		//muestra el menu hasta que se pulse espacio sobre jugar
		this.background = game.add.sprite(0,0,'menu');
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jugar = game.add.sprite(320, 300, 'jugarg');
		this.salir = game.add.sprite(320, 400, 'salirp');
		this.opciones = game.add.sprite(960, 500, 'opcionesp');		
	},
	menuState.prototype.update = function(){
		var estado = 1;
		if(estado === 1){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarg');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.spaceKey.onDown.addOnce(this.start, this);
		}else if(estado === 2){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirg');
			this.opciones = game.add.sprite(960, 500, 'opcionesp');
			this.spaceKey.onDown.addOnce(this.closeCurrentWindow, this);
		}else if(estado === 3){
			this.jugar.destroy();
			this.salir.destroy();
			this.opciones.destroy();
			this.jugar = game.add.sprite(320, 300, 'jugarp');
			this.salir = game.add.sprite(320, 400, 'salirp');
			this.opciones = game.add.sprite(960, 500, 'opcionesg');
			this.spaceKey.onDown.addOnce(this.options, this);
		}
		if(this.input.keyboard.isDown(Phaser.Keyboard.DOWN) === true){
			estado++;
			if(estado > 3){
				estado = 1;	
			}
		}
		if(this.input.keyboard.isDown(Phaser.Keyboard.UP) === true){
			estado--;
			if(estado < 1){
				estado = 3;	
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
	}
}