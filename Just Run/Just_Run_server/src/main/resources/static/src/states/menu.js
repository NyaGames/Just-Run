var menuState = function(Just_Run) {		
		this.estado = 1;

		var num;
	menuState.prototype.create = function(){
		//muestra el menu hasta que se pulse espacio sobre jugar
		song = game.add.audio('song');
		song.play();
		this.background = game.add.sprite(0,0,'menu');
		this.spaceKey = game.input.keyboard.addKey(Phaser.Keyboard.SPACEBAR);
		this.jugar = game.add.sprite(320, 300, 'jugarg');
		this.salir = game.add.sprite(320, 400, 'salirp');
		this.islas = game.add.sprite(0,0,'islas');
		this.opciones = game.add.sprite(960, 500, 'opcionesp');	
		this.ayuda = game.add.sprite(50, 520, 'ayudap');

		//creacion animaciones menu
		this.chaser = this.game.add.sprite(360, this.game.height - 245, 'chaser');
		this.chaser.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36], 33, true);
		this.chaser.animations.play('run');
		this.chaser.scale.setTo(1.5,1.5);
		this.escapist = this.game.add.sprite(680, this.game.height - 245, 'escapist');
		this.escapist.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36], 33, true);	
		this.escapist.animations.play('run');
		this.escapist.scale.setTo(1.5,1.5);

		
	},


	menuState.prototype.update = function(){
		

		if(this.estado === 1){
			//animaciones menu
			this.chaser.position.y = this.game.height - 245;  
			this.escapist.position.y = this.game.height - 245;  
			this.chaser.position.x = 360;  
			this.escapist.position.x = 680;  


			//Botones
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
				game.state.start('tutorial');
			}
		}else if(this.estado === 2){
			//animaciones
			this.chaser.position.y = this.game.height - 140;  
			this.escapist.position.y = this.game.height - 140;  
			this.chaser.position.x = 375;  
			this.escapist.position.x = 665;  
			



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
			this.chaser.position.y = this.game.height +20;  
			this.escapist.position.y = this.game.height +20;  
			this.chaser.position.x = 375;  
			this.escapist.position.x = 665;  
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
			this.chaser.position.y = this.game.height +20;  
			this.escapist.position.y = this.game.height +20; 
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