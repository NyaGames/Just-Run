var playnieveState = function(Just_run){
	const URLe="/puntuacionescapist"
	const URLc="/puntuacionchaser"

	var emitterc;
	var emittere;
	
	playnieveState.prototype.create = function() {  	
		//inicializacion de los sprites
	    this.background = game.add.sprite(0,0,'snowfield');

	    //llama al metodo para iniciar los jugadores, el mundo, las trampas, el cronometro y lo que recibe de los mapas anteriores
	    this.crearJugadores();
	    this.initTraps();
	    this.crearmundo();    
	    this.initTimer();
	    this.init();
	    song = game.add.audio('song');
		song.play();


		//particles

		emitterc = game.add.emitter(this.chaser.body.position.x, this.chaser.body.position.y, 1);

   		emitterc.makeParticles('particulas');

   		emittere = game.add.emitter(this.escapist.body.position.x, this.escapist.body.position.y, 1);

   		emittere.makeParticles('particulas');

		

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
	        Phaser.Keyboard.SPACEBAR,
	    ]);
	};


	playnieveState.prototype.update = function() {
		//crea las colisiones que los diversos elementos del mapa, asi como las variables de control usadas durante el nivel
	    this.initCollisions();
	    //comprueba que el tiempo no se ha acabado y que el escapist no ha sido cazado
	    if(this.timer.running){
	    if(!this.catched){
	    	

			 //creacion de particulas chaser
			if(this.onTheGround){
				emitterc.start(true, 100, null, 2); 
			}
			//Particulas escapist
			if(this.onTheGround1){
				emittere.start(true, 100, null, 2); 
			}

	    	//en caso de que se caigan fuera los limites hacen respawn
		    if(this.chaser.body.position.y > this.game.height - 64){
		    	this.chaser.body.position.x = 60;
		    	this.chaser.body.position.y = this.game.height - 300;
		    }
		    if(this.escapist.body.position.y > this.game.height - 64){
		    	this.escapist.body.position.x = 1000;
		    	this.escapist.body.position.y = this.game.height - 300;
		    }
		     //control de movimiento y de las animaciones
		    if (this.AInputIsActive()) {
		    	this.chaser.scale.setTo(-1, 1);
		    	if(this.onTheGround || this.onTheLedge){
		    		this.chaser.animations.play('run');
		    		
		    	}
		        	this.chaser.body.acceleration.x = -this.aceleracion;
		    } else if (this.DInputIsActive()) {
		    	this.chaser.scale.setTo(1, 1);
		    	if(this.onTheGround || this.onTheLedge){
		    		this.chaser.animations.play('run'); 
		    	}
		        	this.chaser.body.acceleration.x = this.aceleracion;
		    } else {
		    	this.chaser.animations.play('idle');
		        this.chaser.body.acceleration.x = 0;
		    }

		    if (this.leftInputIsActive()) {
		    	if(this.onTheGround1 || this.onTheLedge1){
		    		this.escapist.scale.setTo(-1,1);
		    		this.escapist.animations.play('run');
		    	}
		        	this.escapist.body.acceleration.x = -this.aceleracion;
		    	
		    } else if (this.rightInputIsActive()) {
		    	if(this.onTheGround1 || this.onTheLedge1){
		    		this.escapist.scale.setTo(1,1);
		    		this.escapist.animations.play('run');
		    	}
		           	this.escapist.body.acceleration.x = this.aceleracion;
		    } else {
		    	this.escapist.animations.play('idle');
		        this.escapist.body.acceleration.x = 0;
		    }
		    //control del doble salto que se resetea si detecta colisiona con una plataforma o con el suelo
		    if (this.onTheGround || this.onTheLedge) {
		    	this.jumps = 2;
		        this.jumping = false;
		            
		    }
		    if (this.jumps > 0 && this.WInputIsActive(5)) {
		    	this.chaser.animations.play('doblejump');
		    	if(this.activated){
		    		this.chaser.body.velocity.y = this.salto/2.5;
		        	this.jumping = true;
		        	this.jumps = 0;
		    	}else{
		    		this.chaser.body.velocity.y = this.salto;
		        	this.jumping = true;
		    	}
		    }	        
		    if (this.jumping && this.WInputReleased()) {
		        this.jumps--;
		        this.jumping = false;
		    }

		    if (this.onTheGround1 || this.onTheLedge1) {
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

	emitterc.emitX = this.chaser.body.position.x+27;
	emitterc.emitY = this.chaser.body.position.y+50;
	emittere.emitX = this.escapist.body.position.x+27;
	emittere.emitY = this.escapist.body.position.y+50;
	}

	};

	//controles con las flechas y devuelven un bool en caso de que este activo	
	playnieveState.prototype.leftInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
	    return isActive;
	};
	playnieveState.prototype.rightInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playnieveState.prototype.upInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	    return isActive;
	};
	playnieveState.prototype.upInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	    return released;
	};
	//control con WASD
	playnieveState.prototype.AInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.A);
	    return isActive;
	};
	playnieveState.prototype.DInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playnieveState.prototype.WInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
	    return isActive;
	};
	playnieveState.prototype.WInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
	    return released;
	};
	//control de las trampas
	playnieveState.prototype.spaceInputIsAcive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
	    return isActive;
	};
	playnieveState.prototype.IinputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.I);
	    return isActive;
	};
	playnieveState.prototype.OInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.O);
	    return isActive;
	};
	playnieveState.prototype.PInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.P);
	    return isActive;
	};
	//metodos de las trampas
	//funcion que ejecuta el movimiento de la bola a ras de suelo, modificando la velocidad, cambiando el boton y llamando al metodo que resetea la trampa tras x tiempo
	playnieveState.prototype.balltrap = function(){		
	    this.bola.animations.play('rodar', 12, true);
		this.bola.body.velocity.x = -200;
		this.botonbola = this.game.add.sprite(1040, 360, 'babola');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
	};
	//reseta la trampa de la bola
	playnieveState.prototype.ballrelease = function(){
		this.bola.destroy();
		this.bola = this.game.add.sprite(1100, 367, 'snowball');
	    var rodar = this.bola.animations.add('rodar');
	    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
	    this.bola.body.immovable = true;
	    this.bola.body.allowGravity = false;	
	    this.botonbola = this.game.add.sprite(1040, 360, 'bebola');
	    this.activatedb = false;
	};
	//activa la gravedad de los chuzos	
	playnieveState.prototype.strap = function(){
		this.chuzo1.body.allowGravity = true;
	    this.chuzo2.body.allowGravity = true;
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'baestalactita');
	    game.time.events.add(Phaser.Timer.SECOND * 7, this.srelease, this);
	};
	//resetea la posicion y velocidad de los chuzos
	playnieveState.prototype.srelease = function(){
		this.chuzo1.destroy();
		this.chuzo2.destroy();
		this.chuzo1 = this.game.add.sprite(650, -90, 'chuzo');
	    this.game.physics.enable(this.chuzo1, Phaser.Physics.ARCADE);
	    this.chuzo1.body.immovable = true;
	    this.chuzo1.body.allowGravity = false;
	    this.chuzo2 = this.game.add.sprite(400, -90, 'chuzo');
	    this.game.physics.enable(this.chuzo2, Phaser.Physics.ARCADE);
	    this.chuzo2.body.immovable = true;
	    this.chuzo2.body.allowGravity = false;
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'bestalactita');
	    this.activatedc = false;
	};
	//activa la velocidad de los pinguinos
	playnieveState.prototype.ptrap = function(){
		this.p1.body.velocity.x = 300;
		this.p2.body.velocity.x = 300;
		this.p3.body.velocity.x = 300;
		this.botonpinguino = this.game.add.sprite(1040, 300, 'bapinguino');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.prelease, this);
	};
	//resete los pinguinos en velocidad y posicion
	playnieveState.prototype.prelease = function(){
		this.p1.destroy();
		this.p2.destroy();
		this.p3.destroy();
		this.p1 = this.game.add.sprite(-50,70, 'pinguino');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.p2 = this.game.add.sprite(-50,315, 'pinguino');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.p3 = this.game.add.sprite(-50,170, 'pinguino');
	    this.game.physics.enable(this.p3, Phaser.Physics.ARCADE);
	    this.p3.body.immovable = true;
	    this.p3.body.allowGravity = false;	
	    this.botonpinguino = this.game.add.sprite(1040, 300, 'bepinguino');
	    this.activatedgp = false;
	};
	//crear mundo y los grupos de colision
	playnieveState.prototype.crearmundo = function(){
		this.ground = this.game.add.group();
	    this.water = this.game.add.group();
	    this.ice = this.game.add.group();
	    this.wtrap = this.game.add.group();
	    this.itrap = this.game.add.group();

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
		    if(i < 14 || i > 18){
		    	block = this.game.add.sprite(i*32, this.game.height - 128, 'snow');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);	
		    }
	    }
	    
	    block = this.game.add.sprite(448, this.game.height-128, 'water');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
		block.body.immovable = true;
		block.body.allowGravity = false;
		this.water.add(block);

	    block = this.game.add.sprite(120, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(240, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);

	    block = this.game.add.sprite(700, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	    block = this.game.add.sprite(820, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);


	    block = this.game.add.sprite(460, this.game.height - 400, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);

	    block = this.game.add.sprite(760, this.game.height - 500, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);

	    block = this.game.add.sprite(180, this.game.height - 500, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ice.add(block);
	};
	//crear jugadores
	playnieveState.prototype.crearJugadores = function(){
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
	//inicializa las trampas
	playnieveState.prototype.initTraps = function(){		
	    //crear bola de nieve
	    this.bola = this.game.add.sprite(1100, 367, 'snowball');
	    var rodar = this.bola.animations.add('rodar');
	    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
	    this.bola.body.immovable = true;
	    this.bola.body.allowGravity = false;
	    //crear chuzo de punta
	    this.chuzo1 = this.game.add.sprite(650, -90, 'chuzo');
	    this.game.physics.enable(this.chuzo1, Phaser.Physics.ARCADE);
	    this.chuzo1.body.immovable = true;
	    this.chuzo1.body.allowGravity = false;
	    this.chuzo2 = this.game.add.sprite(400, -90, 'chuzo');
	    this.game.physics.enable(this.chuzo2, Phaser.Physics.ARCADE);
	    this.chuzo2.body.immovable = true;
	    this.chuzo2.body.allowGravity = false;
	    //crear penguinos
	    this.p1 = this.game.add.sprite(-50,70, 'pinguino');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.p2 = this.game.add.sprite(-50,315, 'pinguino');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.p3 = this.game.add.sprite(-50,170, 'pinguino');
	    this.game.physics.enable(this.p3, Phaser.Physics.ARCADE);
	    this.p3.body.immovable = true;
	    this.p3.body.allowGravity = false;

	    //crear botones
	    this.botonpinguino = this.game.add.sprite(1040, 300, 'bepinguino');
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'bestalactita');
	    this.botonbola = this.game.add.sprite(1040, 360, 'bebola');

	    //variable para las trampas
	    this.activatedb = false;
	    this.activatedc = false;
	    this.activatedgp = false;
	};
	//crea el timer, su maximo de tiempo y lo inicia
	playnieveState.prototype.initTimer = function(){		
        this.timer = this.game.time.create();
       
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);

        this.timer.start();
	};
	//inicializa las colisiones
	playnieveState.prototype.initCollisions = function(){
		this.onTheGround = game.physics.arcade.collide(this.chaser, this.ground);
	    game.physics.arcade.collide(this.chaser, this.water);
	    this.onTheLedge = game.physics.arcade.collide(this.chaser, this.ice);
	    game.physics.arcade.collide(this.chaser, this.bola);
	    game.physics.arcade.collide(this.chaser, this.chuzo1);
	    game.physics.arcade.collide(this.chaser, this.chuzo2);
	    game.physics.arcade.collide(this.chaser, this.p1);
	    game.physics.arcade.collide(this.chaser, this.p2);
	    game.physics.arcade.collide(this.chaser, this.p3);
	    this.onTheGround1 = game.physics.arcade.collide(this.escapist, this.ground);
	    game.physics.arcade.collide(this.escapist, this.water);
	    this.onTheLedge1 = game.physics.arcade.collide(this.escapist, this.ice);
	    game.physics.arcade.collide(this.escapist, this.wtrap);
	    game.physics.arcade.collide(this.escapist, this.itrap);
	    this.catched = game.physics.arcade.collide(this.escapist, this.chaser);
	};
	//muestra por pantallas todos los textos
	playnieveState.prototype.render = function () {
        if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), this.game.world.centerX-50, 590, "#ffffff",'50px Arial');
        }
        this.game.debug.text("Puntuacion Chaser: "+this.pchaser, 100, 590, "#ffffff",'20px Arial');
        this.game.debug.text("Puntuacion Escapist: "+this.pescapist, 750, 590, "#ffffff",'20px Arial');
    };
    //se activa cuando acaba el tiempo para subir la puntuacion del escapista y activa el cambio
    playnieveState.prototype.endTimer = function() {
        this.timer.stop();
        this.pescapist++;
		this.game.add.sprite(0,0,"libre");
	    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
    };
    //comprueba que la puntuacion es correcta y cambia de estado
    playnieveState.prototype.cambio = function(){
    	if(this.catched){
    		this.pchaser = 1;
    	}
    	game.sound.stopAll();
    	game.state.start('loadcarga_castillo');
    };
    //crea el timer, su maximo de tiempo y lo inicia
    playnieveState.prototype.formatTime = function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    };
    //recibe la puntuacion del nivel anterior
    playnieveState.prototype.init = function(){
    	//this.pchaser = this.game.state.states["loadcarga_nieve"].pchaser;
    	//this.pescapist = this.game.state.states["loadcarga_nieve"].pescapist;
    	
        $.ajax(URLe, 
                {
                    method: "GET",
                    processData: false,
                    
                    success: function(data) {
                    	document.getElementById("pescapist").innerHTML = data.puntuacion;
                    },
                    
                    headers:{
                        "Content-Type": "application/json"
                    },
                });
        $.ajax(URLc, 
                {
                    method: "GET",
                    processData: false,
                    
                    success: function(data) {
                    	document.getElementById("pchaser").innerHTML = data.puntuacion;
                    },
                    
                    headers:{
                        "Content-Type": "application/json"
                    },
                });
    }

}