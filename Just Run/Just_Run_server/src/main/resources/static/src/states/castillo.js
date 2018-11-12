var playcastilloState = function(Just_run){
	const URLe="/puntuacionescapist"
	const URLc="/puntuacioneschaser"
	playcastilloState.prototype.create = function() {        	
		//inicializacion de los sprites
	    this.background = game.add.sprite(0,0,'castle');

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
	        Phaser.Keyboard.SPACEBAR,
	    ]);
	};

	playcastilloState.prototype.update = function() {
	    this.initCollisions();
	    	//se ejecuta todo el bucle de control siempre y cuando siga el tiempo corriendo y no se haya escapado
	    if(this.timer.running){
	    if(!this.catched){
	    	//respawn
	    if(this.chaser.body.position.y > this.game.height - 64){
	    	this.chaser.body.position.x = 60;
	    	this.chaser.body.position.y = this.game.height - 300;
	    }
	    if(this.escapist.body.position.y > this.game.height - 64){
	    	this.escapist.body.position.x = 1000;
	    	this.escapist.body.position.y = this.game.height - 300;
	    }
	    //controles izquierda/derecha
	    if (this.AInputIsActive()) {
	    	this.chaser.scale.setTo(-1, 1);
	    	if(this.onTheGround|| this.onTheLedge){
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
	    //control del doble salto
	    if (this.onTheGround || this.onTheLedge) {
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
	    //gestión de las trampas
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
			this.game.add.sprite(0,0,"catched");
	    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
		}
	}
	};

	//controles con las flechas y devuelven un bool en caso de que este activo	
	playcastilloState.prototype.leftInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
	    return isActive;
	};
	playcastilloState.prototype.rightInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playcastilloState.prototype.upInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	    return isActive;
	};
	playcastilloState.prototype.upInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	    return released;
	};
	//control con WASD
	playcastilloState.prototype.AInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.A);
	    return isActive;
	};
	playcastilloState.prototype.DInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playcastilloState.prototype.WInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
	    return isActive;
	};
	playcastilloState.prototype.WInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
	    return released;
	};
	//control de las trampas
	playcastilloState.prototype.spaceInputIsAcive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
	    return isActive;
	};
	playcastilloState.prototype.IinputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.I);
	    return isActive;
	};
	playcastilloState.prototype.OInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.O);
	    return isActive;
	};
	playcastilloState.prototype.PInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.P);
	    return isActive;
	};
	playcastilloState.prototype.balltrap = function(){
		this.bola.scale.setTo(-1,1);		
	    this.bola.animations.play('rodar', 12, true);
		this.bola.body.velocity.x = -200;
		this.botonbola = this.game.add.sprite(1040, 360, 'bacaballero');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
	};
	playcastilloState.prototype.ballrelease = function(){
		this.bola.destroy();
		this.bola = this.game.add.sprite(1100, 395, 'horse');
	    var rodar = this.bola.animations.add('rodar');
	    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
	    this.bola.body.immovable = true;
	    this.bola.body.allowGravity = false;	
	    this.botonbola = this.game.add.sprite(1040, 360, 'becaballero');
	    this.activatedb = false;
	};	
	playcastilloState.prototype.strap = function(){
		this.aceite1.body.allowGravity = true;
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'baaceite');
	    game.time.events.add(Phaser.Timer.SECOND * 7, this.srelease, this);
	};
	playcastilloState.prototype.srelease = function(){
		this.aceite1.destroy();
		this.aceite1 = this.game.add.sprite(520, -90, 'aceite');
	    this.game.physics.enable(this.aceite1, Phaser.Physics.ARCADE);
	    this.aceite1.body.immovable = true;
	    this.aceite1.body.allowGravity = false;
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'beaceite');
	    this.activatedc = false;
	};
	playcastilloState.prototype.ptrap = function(){
		this.p1.body.velocity.x = 300;
		this.p2.body.velocity.x = 300;
		this.p3.body.velocity.x = 300;
		this.botonflecha = this.game.add.sprite(1040, 300, 'baelfo');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.prelease, this);
	};
	//resetea las fotos
	playcastilloState.prototype.prelease = function(){
		this.p1.destroy();
		this.p2.destroy();
		this.p3.destroy();
		this.p1 = this.game.add.sprite(-50,130, 'flecha');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.p2 = this.game.add.sprite(-150,130, 'flecha');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.p3 = this.game.add.sprite(-250,130, 'flecha');
	    this.game.physics.enable(this.p3, Phaser.Physics.ARCADE);
	    this.p3.body.immovable = true;
	    this.p3.body.allowGravity = false;	
	    this.botonflecha = this.game.add.sprite(1040, 300, 'beelfo');
	    this.activatedgp = false;
	};
	//crea todos los elementos estaticos del mundo
	playcastilloState.prototype.crearmundo = function(){
		this.ground = this.game.add.group();
	    this.wood = this.game.add.group();

	    var block;
	    for(var i = 0; i <34; i++){
	    	if(i < 13 || i > 16){
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
			    if(i < 18){
			    	block = this.game.add.sprite(i*32, this.game.height - 128, 'grass');
			    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
				    block.body.immovable = true;
				    block.body.allowGravity = false;
				    this.ground.add(block);	
			    }else{
			    	block = this.game.add.sprite(i*32, this.game.height - 128, 'carpet');
			    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
				    block.body.immovable = true;
				    block.body.allowGravity = false;
				    this.ground.add(block);	
			    }
	    	}
	    	if(i >= 13 && i <= 16){
	    		block = this.game.add.sprite(32*i, this.game.height-32, 'water');
				block = this.game.add.sprite(i*32, this.game.height-64, 'water');
	    	}
	    }
	    block = this.game.add.sprite(448, this.game.height - 76, 'coco');

	    block = this.game.add.sprite(120, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(152, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(184, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(216, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

 		block = this.game.add.sprite(332, this.game.height - 350, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(364, this.game.height - 350, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(396, this.game.height - 350, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

	    block = this.game.add.sprite(0, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(32, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(64, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(96, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

	    block = this.game.add.sprite(550, this.game.height - 250, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(550, this.game.height - 282, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(550, this.game.height - 314, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(550, this.game.height - 346, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(550, this.game.height - 378, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(550, this.game.height - 538, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(550, this.game.height - 570, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(550, this.game.height - 602, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

	    block = this.game.add.sprite(728, this.game.height - 250, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);
	    block = this.game.add.sprite(632, this.game.height - 250, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);
	    block = this.game.add.sprite(664, this.game.height - 250, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);
	    block = this.game.add.sprite(696, this.game.height - 250, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);

	    block = this.game.add.sprite(940, this.game.height - 400, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);
	    block = this.game.add.sprite(972, this.game.height - 400, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);
	    block = this.game.add.sprite(1004, this.game.height - 400, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);
	    block = this.game.add.sprite(1036, this.game.height - 400, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);

	    block = this.game.add.sprite(582, this.game.height - 378, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);
	    block = this.game.add.sprite(614, this.game.height - 378, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.wood.add(block);

	    block = this.game.add.sprite(582, this.game.height - 538, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(614, this.game.height - 538, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(646, this.game.height - 538, 'pared');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

	    this.puerta = this.game.add.sprite(560, this.game.height - 330, 'puerta');
	    this.game.physics.enable(this.puerta, Phaser.Physics.ARCADE);
	    this.puerta.body.immovable = true;
	    this.puerta.body.allowGravity = false;
	};
	//renderia los elementos de la UI
	playcastilloState.prototype.render = function () {
        if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), this.game.world.centerX-50, 590, "#ffffff",'50px Arial');
        }
        this.game.debug.text("Puntuacion Chaser: "+this.pchaser, 100, 590, "#ffffff",'20px Arial');
        this.game.debug.text("Puntuacion Escapist: "+this.pescapist, 750, 590, "#ffffff",'20px Arial');
    };
    //gestiona el cambio cuando se acaba el tiempo
     playcastilloState.prototype.endTimer = function() {
        this.timer.stop();
        this.pescapist++;
		this.game.add.sprite(0,0,"libre");
	    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
    };
    //genera el cambio de pantallas
    playcastilloState.prototype.cambio = function(){
    	if(this.catched){
    		this.pchaser = this.game.state.states["playnieve"].pchaser+1;
    	}
    	game.state.start('loadcarga_desierto');
    };
    //crea el formato de timer
    playcastilloState.prototype.formatTime = function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    };
    //carga los datos de la pantalla anterior
    playcastilloState.prototype.init = function(){
    	this.pchaser = this.game.state.states["playnieve"].pchaser;
    	this.pescapist = this.game.state.states["playnieve"].pescapist;
    	var pchaserString = this.pchaser.toString();
    	var pescapistString = this.pescapist.toString();  
    	$.post(URLe, pchaserString, function(){console.log("lanzado1")});
    	$.post(URLc, pescapistString, function(){console.log("lanzado2")});
    	$.get(URLe, function(data){console.log(data)});
    	$.get(URLc, function(data){console.log(data)});
    };
    //crea los jugadores y todas las variables relacionadas	
	playcastilloState.prototype.crearJugadores = function(){
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
	//crea el timer, su maximo de tiempo y lo inicia
	playcastilloState.prototype.initTimer = function(){		
        this.timer = this.game.time.create();
       
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);

        this.timer.start();
	};
	//inicializa las trampas
	playcastilloState.prototype.initTraps = function(){
	  //crear bola de nieve
	    this.bola = this.game.add.sprite(1100, 395, 'horse');
	    var rodar = this.bola.animations.add('rodar');
	    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
	    this.bola.body.immovable = true;
	    this.bola.body.allowGravity = false;
	    //crear aceite de punta
	    this.aceite1 = this.game.add.sprite(520,-90, 'aceite');
	    this.game.physics.enable(this.aceite1, Phaser.Physics.ARCADE);
	    this.aceite1.body.immovable = true;
	    this.aceite1.body.allowGravity = false;
	    //crear penguinos
	    this.p1 = this.game.add.sprite(-50,130, 'flecha');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.p2 = this.game.add.sprite(-150,130, 'flecha');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.p3 = this.game.add.sprite(-250,130, 'flecha');
	    this.game.physics.enable(this.p3, Phaser.Physics.ARCADE);
	    this.p3.body.immovable = true;
	    this.p3.body.allowGravity = false;
	    //crear botones
	    this.botonflecha = this.game.add.sprite(1040, 300, 'beelfo');
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'beaceite');
	    this.botonbola = this.game.add.sprite(1040, 360, 'becaballero');

	    //variable para las trampas
	    this.activatedb = false;
	    this.activatedc = false;
	    this.activatedgp = false;
	};
	//inicializa las colisiones
	playcastilloState.prototype.initCollisions = function(){
		this.onTheGround = game.physics.arcade.collide(this.chaser, this.ground);
	    this.onTheLedge = game.physics.arcade.collide(this.chaser, this.wood);
	    game.physics.arcade.collide(this.chaser, this.bola);
	    game.physics.arcade.collide(this.chaser, this.aceite1);
	    game.physics.arcade.collide(this.chaser, this.p1);
	    game.physics.arcade.collide(this.chaser, this.p2);
	    game.physics.arcade.collide(this.chaser, this.p3);
	    this.onTheGround1 = game.physics.arcade.collide(this.escapist, this.ground);
	    game.physics.arcade.collide(this.escapist, this.water);
	    this.onTheLedge1 = game.physics.arcade.collide(this.escapist, this.wood);
	    this.catched = game.physics.arcade.collide(this.escapist, this.chaser);
	};
}