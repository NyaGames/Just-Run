var playdesiertoState = function(Just_run){
	const URLe="/puntuacionescapist"
	const URLc="/puntuacioneschaser"
	playdesiertoState.prototype.create = function() {        	
		//inicializacion de los sprites
	    this.background = game.add.sprite(0,0,'fondo');
	    song = game.add.audio('song');
		song.play();

	    //llama al metodo para iniciar los jugadores, el mundo, las trampas, el cronometro y lo que recibe de los mapas anteriores
	    this.crearJugadores();
	    this.initTraps();
	    this.crearmundo();    
	    this.initTimer();
	    this.init();

	    //control de las teclas, para evitar los usos por defecto, que pueden dar problemas
	    this.game.input.keyboard.addKeyCapture([
	        Phaser.Keyboard.LEFT,
	        Phaser.Keyboard.RIGHT,
	        Phaser.Keyboard.UP,
	        Phaser.Keyboard.DOWN,
	        Phaser.Keyboard.A,
	        Phaser.Keyboard.D,
	        Phaser.Keyboard.W,
	        Phaser.Keyboard.S,
	        Phaser.Keyboard.I,
	        Phaser.Keyboard.O,
	        Phaser.Keyboard.P,
	    ]);
	};
	playdesiertoState.prototype.update = function() {
		//crea las colisiones que los diversos elementos del mapa, asi como las variables de control usadas durante el nivel
	    this.initCollisions();
	    //comprueba que el tiempo no se ha acabado y que el escapist no ha sido cazado
	    if(this.timer.running){
	    if(!this.catched){
	    		//en caso de que se caigan fuera los limites hacen respawn
	     if(this.chaser.body.position.y > this.game.height - 64){
	    	this.chaser.body.position.x = 60;
	    	this.chaser.body.position.y = this.game.height - 300;
	    }
	    if(this.escapist.body.position.y > this.game.height - 64){
	    	this.escapist.body.position.x = 60;
	    	this.escapist.body.position.y = this.game.height - 300;
	    }
	    //control de movimiento y de las animaciones
	    if (this.AInputIsActive()) {
	    	this.chaser.scale.setTo(-1, 1);
	    	if(this.onTheGround|| this.onTheLedge || this.onTheLedge2 || this.onTheLedge4){
	    		this.chaser.animations.play('run');
	    	}
	        	this.chaser.body.acceleration.x = -this.aceleracion;

	    } else if (this.DInputIsActive()) {
	    	this.chaser.scale.setTo(1, 1);
	    	if(this.onTheGround || this.onTheLedge || this.onTheLedge2 || this.onTheLedge4){
	    		this.chaser.animations.play('run');
	    	}
	        	this.chaser.body.acceleration.x = this.aceleracion;
	    	
	    	
	    } else {
	    	this.chaser.animations.play('idle');
	        this.chaser.body.acceleration.x = 0;
	    }

	    if (this.leftInputIsActive()) {
	    	if(this.onTheGround1 || this.onTheLedge1 || this.onTheLedge3 ||this.onTheLedge5){
	    		this.escapist.scale.setTo(-1,1);
	    		this.escapist.animations.play('run');
	    	}
	        	this.escapist.body.acceleration.x = -this.aceleracion;
	    	
	    } else if (this.rightInputIsActive()) {
	    	if(this.onTheGround1 || this.onTheLedge1 || this.onTheLedge3 || this.onTheLedge5){
	    		this.escapist.scale.setTo(1,1);
	    		this.escapist.animations.play('run');
	    	}
	    		this.escapist.body.acceleration.x = this.aceleracion;
	           	
	    } else {
	    	this.escapist.animations.play('idle');
	        this.escapist.body.acceleration.x = 0;
	    }
	    //control del doble salto que se resetea si detecta colisiona con una plataforma o con el suelo
	     if (this.onTheGround || this.onTheLedge || this.onTheLedge2 || this.onTheLedge4) {
	    	this.jumps = 2;
	        this.jumping = false;     
	    }
	    if (this.jumps > 0 && this.WInputIsActive(5)) {
	    	this.chaser.animations.play('doblejump');
	    		this.chaser.body.velocity.y = this.salto;
	        	this.jumping = true;        
	    }
	    if (this.jumping && this.WInputReleased()) {
	        this.jumps--;
	        this.jumping = false;
	    }
	    
	    if (this.onTheGround1 || this.onTheLedge1 || this.onTheLedge3 || this.onTheLedge5) {
	    	this.jumps1 = 2;
	        this.jumping1 = false;	       
	    }
	    if (this.jumps1 > 0 && this.upInputIsActive(5)) {
	    		this.escapist.animations.play('doblejump');
	    		this.escapist.body.velocity.y = this.salto;
	        	this.jumping1 = true;    
	    }
	    if (this.jumping1 && this.upInputReleased()) {
	        this.jumps1--;
	        this.jumping1 = false;
	    }
	    //detecta si se han pulsado las teclas que activan las trampas
	    if (this.IinputIsActive() && !this.activatedb){
	    		this.activatedb = true;	    		
		    	this.balltrap();	
	    }
	    if (this.OInputIsActive() && !this.activatedc){
	    		this.activatedc = true;
	    		this.strap();
	    }
	    if (this.PInputIsActive() && !this.activatedgp){
	    		this.activatedgp = true;
		    	this.ptrap();
	    }
	    }else{	
	    	//se ha pillado al escapista se muestra la pantalla de cazado y se empieza el cambio de escenas
			this.game.add.sprite(0,0,"catched");
	    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
	}
	}
	};
	//controles con las flechas y devuelven un bool en caso de que este activo	
	playdesiertoState.prototype.leftInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
	    return isActive;
	};
	playdesiertoState.prototype.rightInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playdesiertoState.prototype.upInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	    return isActive;
	};
	playdesiertoState.prototype.upInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	    return released;
	};
	//control con WASD
	playdesiertoState.prototype.AInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.A);
	    return isActive;
	};
	playdesiertoState.prototype.DInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playdesiertoState.prototype.WInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
	    return isActive;
	};
	playdesiertoState.prototype.WInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
	    return released;
	};
	//control de las trampas
	playdesiertoState.prototype.spaceInputIsAcive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
	    return isActive;
	};
	playdesiertoState.prototype.IinputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.I);
	    return isActive;
	};
	playdesiertoState.prototype.OInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.O);
	    return isActive;
	};
	playdesiertoState.prototype.PInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.P);
	    return isActive;
	};
	//metodos de las trampas
	//funcion que ejecuta el movimiento de la bola a ras de suelo, modificando la velocidad, cambiando el boton y llamando al metodo que resetea la trampa tras x tiempo
	playdesiertoState.prototype.balltrap = function(){	
		this.bola.scale.setTo(0.5,0.5);		
	    this.bola.animations.play('rodar', 12, true);
		this.bola.body.velocity.x = -200;
		this.botonbola = this.game.add.sprite(1040, 360, 'baTW');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
	};
	//reseta la trampa de la bola
	playdesiertoState.prototype.ballrelease = function(){
		this.bola.destroy();
		this.bola = this.game.add.sprite(1100, 380, 'tweed');
	    var rodar = this.bola.animations.add('rodar');
	    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
	    this.bola.body.immovable = true;
	    this.bola.body.allowGravity = false;	
	    this.botonbola = this.game.add.sprite(1040, 360, 'beTW');
	    this.activatedb = false;
	};	
	//activa la velocidad de la bala para que vaya a la posicion del chaser
	playdesiertoState.prototype.strap = function(){
		this.bala.body.velocity.x = (-this.bala.body.position.x + this.chaser.body.position.x)*2;
		this.bala.body.velocity.y = (-this.bala.body.position.y + this.chaser.body.position.y)*2;
	    this.botonbala = this.game.add.sprite(1040, 330, 'bavaquero');
	    game.time.events.add(Phaser.Timer.SECOND * 5, this.srelease, this);
	};
	//resetea la posicion y velocidad de la bala
	playdesiertoState.prototype.srelease = function(){
		this.bala.destroy();
		this.bala = this.game.add.sprite(-50, this.game.height-220, 'bala');
	    this.game.physics.enable(this.bala, Phaser.Physics.ARCADE);
	    this.bala.body.immovable = true;
	    this.bala.body.allowGravity = false;
	   
	    this.botonbala = this.game.add.sprite(1040, 330, 'bevaquero');
	    this.activatedc = false;
	};
	//activa la velocidad de los buitres
	playdesiertoState.prototype.ptrap = function(){
		this.buitre1.scale.setTo(0.5,0.5);	
		this.buitre2.scale.setTo(0.5,0.5);	
		this.buitre3.scale.setTo(0.5,0.5);	
		this.buitre1.animations.play('rodar', 4, true);
		this.buitre2.animations.play('rodar', 4, true);
		this.buitre3.animations.play('rodar', 4, true);
		this.buitre1.body.velocity.x = 300;
		this.buitre2.body.velocity.x = 300;
		this.buitre3.body.velocity.x = 300;
		this.botonbuitre = this.game.add.sprite(1040, 300, 'babuitre');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.prelease, this);
	};
	//resetea los buitres en posicion y velocidad
	playdesiertoState.prototype.prelease = function(){
		this.buitre1.destroy();
		this.buitre2.destroy();
		this.buitre3.destroy();
		this.buitre1 = this.game.add.sprite(-200,48, 'buitre');
	    var rodar = this.buitre1.animations.add('rodar');
	    this.game.physics.enable(this.buitre1, Phaser.Physics.ARCADE);
	    this.buitre1.body.immovable = true;
	    this.buitre1.body.allowGravity = false;
	    this.buitre2 = this.game.add.sprite(-200,300, 'buitre');
	    var rodar = this.buitre2.animations.add('rodar');
	    this.game.physics.enable(this.buitre2, Phaser.Physics.ARCADE);
	    this.buitre2.body.immovable = true;
	    this.buitre2.body.allowGravity = false;
	    this.buitre3 = this.game.add.sprite(-200,200, 'buitre');
	    var rodar = this.buitre3.animations.add('rodar');
	    this.game.physics.enable(this.buitre3, Phaser.Physics.ARCADE);
	    this.buitre3.body.immovable = true;
	    this.buitre3.body.allowGravity = false;	
	    this.botonbuitre = this.game.add.sprite(1040, 300, 'bebuitre');
	    this.activatedgp = false;
	};
	//crea todo el mundo, los diversos grupos de colisiones de cara a definir las interacciones
	playdesiertoState.prototype.crearmundo = function(){
		this.ground = this.game.add.group();
		this.cactus = this.game.add.group();
	    this.ice = this.game.add.group();
	    this.ice2 = this.game.add.group();


	    var block;
	    for(var i = 0; i <34; i++){
	    	block = this.game.add.sprite(32*i, this.game.height - 32, 'ground');
	    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ground.add(block);
		    block = this.game.add.sprite(i*32, this.game.height - 64, 'ground');
	    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ground.add(block);
		    block = this.game.add.sprite(i*32, this.game.height - 96, 'ground');
	    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ground.add(block);

		    block = this.game.add.sprite(i*32, this.game.height - 128, 'arena');
		    this.game.physics.enable(block, Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.allowGravity = false;
			this.ground.add(block);	
		    
	    }
	    //crear cactus
	    block= this.game.add.sprite(400, 381,'cactus');
		this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    block.scale.setTo(0.40,0.40);
	    this.cactus.add(block);

	    block= this.game.add.sprite(635, 381,'cactus');
		this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    block.scale.setTo(0.40,0.40);
	    this.cactus.add(block);
	    
	    //plataformas
	    block = this.game.add.sprite(120, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(152, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(184, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(216, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(248, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(280, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);

	    block = this.game.add.sprite(700+64, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(732+64, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(764+64, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(796+64, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(828+64, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(860+64, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);



	    block = this.game.add.sprite(760+64, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(728+64, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(792+64, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(824+64, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(856+64, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);

	    block = this.game.add.sprite(180, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(212, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(244, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(148, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(116, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	};
	//crea los jugadores y todas las variables relacionadas	
	playdesiertoState.prototype.crearJugadores = function(){
		//variables del movimiento
	    this.velocidadmaxima = 300;
	    this.aceleracion = 500;
	    this.frenada = 3600;
	    this.gravedad = 1500; 
	    this.salto = -600; 

		// crear jugadores
	    this.chaser = this.game.add.sprite(60, this.game.height - 300, 'chaser');
	    this.game.physics.enable(this.chaser, Phaser.Physics.ARCADE);
	    this.chaser.body.collideWorldBounds = true;
	    this.chaser.body.maxVelocity.setTo(this.velocidadmaxima, this.velocidadmaxima * 10);
	    this.chaser.body.drag.setTo(this.frenada, 0);
	    game.physics.arcade.gravity.y = this.gravedad;

		this.escapist = this.game.add.sprite(1000, this.game.height - 300, 'escapist');
	    this.game.physics.enable(this.escapist, Phaser.Physics.ARCADE);
	    this.escapist.body.collideWorldBounds = true;
	    this.escapist.body.maxVelocity.setTo(this.velocidadmaxima, this.velocidadmaxima * 10);
	    this.escapist.body.drag.setTo(this.frenada, 0);
	    game.physics.arcade.gravity.y = this.gravedad;

	    //animaciones escapist
	  	this.escapist.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36], 33, true);
	    this.escapist.animations.add('dash', [37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 33, true);
	    this.escapist.animations.add('doblejump', [59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113], 122, true);
	    this.escapist.animations.add('jump', [114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135], 21, true);
	    this.escapist.animations.add('idle', [136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157], 21, true);

	     //animaciones chaser
	    this.chaser.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36], 33, true);
	    this.chaser.animations.add('dash', [37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 33, true);
	    this.chaser.animations.add('doblejump', [59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113], 122, true);
	    this.chaser.animations.add('jump', [114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135], 21, true);
	    this.chaser.animations.add('idle', [136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178], 42, true);
	    
	    //por defecto la animacion idle
	    this.chaser.animations.play('idle');
	    this.escapist.animations.play('idle');

	    //Cambio de Eje
	    this.chaser.anchor.setTo(0.3,0.5);
	    this.escapist.anchor.setTo(0.3,0.5);

	    //variable para comprobar el salto
	    this.jumping = false;
	    this.jumping1 = false;	 
	};
	//inicializa todas las trampas
	playdesiertoState.prototype.initTraps = function(){
	    //crear bola del oeste
	    this.bola = this.game.add.sprite(1100, 380, 'tweed');
	    var rodar = this.bola.animations.add('rodar');
	    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
	    this.bola.body.immovable = true;
	    this.bola.body.allowGravity = false;

	    //crear bala
	    this.bala = this.game.add.sprite(-50, this.game.height-220, 'bala');
	    this.game.physics.enable(this.bala, Phaser.Physics.ARCADE);
	    this.bala.body.immovable = true;
	    this.bala.body.allowGravity = false;
	   
	    //crear buitres
	    this.buitre1 = this.game.add.sprite(-200,48, 'buitre');
	    var rodar = this.buitre1.animations.add('rodar');
	    this.game.physics.enable(this.buitre1, Phaser.Physics.ARCADE);
	    this.buitre1.body.immovable = true;
	    this.buitre1.body.allowGravity = false;

	    this.buitre2 = this.game.add.sprite(-200,300, 'buitre');
	    var rodar = this.buitre2.animations.add('rodar');
	    this.game.physics.enable(this.buitre2, Phaser.Physics.ARCADE);
	    this.buitre2.body.immovable = true;
	    this.buitre2.body.allowGravity = false;

	    this.buitre3 = this.game.add.sprite(-200,200, 'buitre');
	    var rodar = this.buitre3.animations.add('rodar');
	    this.game.physics.enable(this.buitre3, Phaser.Physics.ARCADE);
	    this.buitre3.body.immovable = true;
	    this.buitre3.body.allowGravity = false;

	    //crear plataformas que se caen
	    this.plataforma1 = this.game.add.sprite(460, this.game.height - 520, 'plataforma');
	    this.game.physics.enable(this.plataforma1, Phaser.Physics.ARCADE);
	    this.plataforma1.body.immovable = true;
	    this.plataforma1.body.allowGravity = false;

		this.plataforma2 = this.game.add.sprite(460, this.game.height - 350, 'plataforma');
	    this.game.physics.enable(this.plataforma2, Phaser.Physics.ARCADE);
	    this.plataforma2.body.immovable = true;
	    this.plataforma2.body.allowGravity = false;

	    //crear botones
	    this.botonbuitre = this.game.add.sprite(1040, 300, 'bebuitre');
	    this.botonbala = this.game.add.sprite(1040, 330, 'bevaquero');
	    this.botonbola = this.game.add.sprite(1040, 360, 'beTW');

	    //variable para las trampas
	    this.activatedb = false;
	    this.activatedc = false;
	    this.activatedgp = false;
	};
	//crea el timer, su maximo de tiempo y lo inicia
	playdesiertoState.prototype.initTimer = function(){		
        this.timer = this.game.time.create();
       
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);

        this.timer.start();
	};
	//muestras por pantalla todos los textos necesarios
	playdesiertoState.prototype.render = function () {
        if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), this.game.world.centerX-50, 590, "#ffffff",'50px Arial');
        }
        this.game.debug.text("Puntuacion Chaser: "+this.pchaser, 100, 590, "#ffffff",'20px Arial');
        this.game.debug.text("Puntuacion Escapist: "+this.pescapist, 750, 590, "#ffffff",'20px Arial');
    };
    //se activa cuando acaba el tiempo para subir la puntuacion del escapista y activa el cambio
    playdesiertoState.prototype.endTimer = function() {
    	this.timer.stop();
    	this.pescapist++;
	    this.game.add.sprite(0,0,"libre");
	    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
    };
    //comprueba que la puntuacion es correcta y cambia de estado
    playdesiertoState.prototype.cambio = function(){
    	if(this.catched){
    		this.pchaser++;
    		this.pchaser = this.game.state.states["playcastillo"].pchaser+1;
    	}
    	game.sound.stopAll();
    	game.state.start('loadcarga_oceano');
    };
    //crea el formato del cronometro
    playdesiertoState.prototype.formatTime = function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    };
    //recibe la puntuacion del nivel anterior
    playdesiertoState.prototype.init = function(){
    	this.pchaser = this.game.state.states["playcastillo"].pchaser;
    	this.pescapist = this.game.state.states["playcastillo"].pescapist;
    	var object = JSON.stringify({ID: "chaser", puntuacion: this.pchaser});
    	var object1 = JSON.stringify({ID: "escapist", puntuacion: this.pescapist});
        $.ajax(URLe, 
        {
            method: "POST",
            data: object,
            processData: false,
            
            success: function() { console.log("yes");},
            
            headers:{
                "Content-Type": "application/json"
            },
        });
        $.ajax(URLc, 
                {
                    method: "POST",
                    data: object1,
                    processData: false,
                    
                    success: function() { console.log("yep");},
                    
                    headers:{
                        "Content-Type": "application/json"
                    },
                });
        $.ajax(URLe, 
                {
                    method: "GET",
                    processData: false,
                    
                    success: function(data) { console.log(data.puntuacion);},
                    
                    headers:{
                        "Content-Type": "application/json"
                    },
                });
        $.ajax(URLc, 
                {
                    method: "GET",
                    processData: false,
                    
                    success: function(data) { console.log(data.puntuacion);},
                    
                    headers:{
                        "Content-Type": "application/json"
                    },
                });
    };
    //inicializa todas las colisiones y las variables booleanas relacionadas
    playdesiertoState.prototype.initCollisions = function(){
    	this.onTheGround = game.physics.arcade.collide(this.chaser, this.ground);
	    this.onTheLedge = game.physics.arcade.collide(this.chaser, this.ice);
	    this.onTheLedge2 = game.physics.arcade.collide(this.chaser, this.plataforma1);
	    this.onTheLedge4 = game.physics.arcade.collide(this.chaser, this.plataforma2);
	    game.physics.arcade.collide(this.chaser, this.bola);
	    game.physics.arcade.collide(this.chaser, this.buitre1);
	    game.physics.arcade.collide(this.chaser, this.buitre2);
	    game.physics.arcade.collide(this.chaser, this.buitre3);
	    game.physics.arcade.collide(this.chaser, this.cactus);
	    game.physics.arcade.collide(this.chaser, this.bala);
	    this.onTheGround1 = game.physics.arcade.collide(this.escapist, this.ground);
	    this.onTheLedge1 = game.physics.arcade.collide(this.escapist, this.ice);
	    this.onTheLedge3 = game.physics.arcade.collide(this.escapist,	 this.plataforma1);
	    this.onTheLedge5 = game.physics.arcade.collide(this.escapist, this.plataforma2);
	    game.physics.arcade.collide(this.escapist, this.wtrap);
	    game.physics.arcade.collide(this.escapist, this.itrap);
	    this.catched = game.physics.arcade.collide(this.escapist, this.chaser);
    }
}