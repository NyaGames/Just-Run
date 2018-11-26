JustRun.ayudaState = function(game){
	
}
var pantalla = 0;
JustRun.ayudaState.prototype = {
		//crea todas las pantalla de ayuda fuera de la cámara
		create: function(){
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
		//actualiza la posición de las pantallas en función de cual se muestra, se controla con las teclas
		update: function(){
			if(pantalla === 0){
				this.infonieve.position.x = -2000;
				this.infocastillo.position.x = -2000;
				this.infodesierto.position.x = -2000;
				this.infooceano.position.x = -2000;
				this.infovolcan.position.x = -2000;
			}else if(pantalla === 1){
				this.infonieve.position.x = 0;
				this.infocastillo.position.x = -2000;
				this.infodesierto.position.x = -2000;
				this.infooceano.position.x = -2000;
				this.infovolcan.position.x = -2000;
			}else if(pantalla === 2){
				this.infonieve.position.x = -2000;
				this.infocastillo.position.x = 0;
				this.infodesierto.position.x = -2000;
				this.infooceano.position.x = -2000;
				this.infovolcan.position.x = -2000;
				
			}else if(pantalla === 3){
				this.infonieve.position.x = -2000;
				this.infocastillo.position.x = -2000;
				this.infodesierto.position.x = 0;
				this.infooceano.position.x = -2000;
				this.infovolcan.position.x = -2000;			
			}else if(pantalla === 4){
				this.infonieve.position.x = -2000;
				this.infocastillo.position.x = -2000;
				this.infodesierto.position.x = -2000;
				this.infooceano.position.x = 0;
				this.infovolcan.position.x = -2000;
			}else if(pantalla === 5){
				this.infonieve.position.x = -2000;
				this.infocastillo.position.x = -2000;
				this.infodesierto.position.x = -2000;
				this.infooceano.position.x = -2000;
				this.infovolcan.position.x = 0;
			}
			if(this.escape.isDown){
				game.state.start('loadcarga_menu');
			}
			if(this.downInputIsActive(5)){
				pantalla++;
				console.log(pantalla);
				if(pantalla > 5){
					pantalla = 0;	
				}
			}
			if(this.upInputIsActive(5)){
				pantalla--;
				console.log(pantalla)
				if(pantalla < 0){
					pantalla = 5;
				}
			}
		},
		//control de las teclas
		upInputIsActive: function(duration) {
		    var isActive = false;
		    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
		    return isActive;
		},
		upInputReleased: function() {
		    var released = false;
		    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
		    return released;
		},
		downInputIsActive: function(duration) {
		    var isActive = false;
		    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.DOWN, duration);
		    return isActive;
		},
		downInputReleased: function() {
		    var released = false;
		    released = this.input.keyboard.upDuration(Phaser.Keyboard.DOWN);
		    return released;
		}
}