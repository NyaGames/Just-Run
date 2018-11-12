var playvolcanState = function(Just_run){
	const URLe="/puntuacionescapist"
	const URLc="/puntuacioneschaser"
	playvolcanState.prototype.create = function() {        	
		//inicializacion de los sprites
	    this.background = game.add.sprite(0,0,'volcano');
	    //metodos para iniciar todo lo necesario
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

	playvolcanState.prototype.update = function() {
		this.initCollisions();
	    //se ejecuta el buble si el tiempo no ha acabado y si el escapista sigue libre
	    if(this.timer.running){
	    	if(!this.catched){
	    //respawn si se sale del mapa
	    if(this.chaser.body.position.y > this.game.height - 64){
	    	this.chaser.body.position.x = 60;
	    	this.chaser.body.position.y = this.game.height - 300;
	    }
	    if(this.escapist.body.position.y > this.game.height - 64){
	    	this.escapist.body.position.x = 60;
	    	this.escapist.body.position.y = this.game.height - 300;
	    }
	    //control izquierda/derecha y gestion de las animacioens
	    if (this.AInputIsActive()) {
	    	this.chaser.scale.setTo(-1, 1);
	    	if(this.onTheGround|| this.onTheLedge){
	    		this.chaser.animations.play('run');
	    	}
	        	this.chaser.body.acceleration.x = -this.aceleracion;
	    } else if (this.DInputIsActive()) {
	    	this.chaser.scale.setTo(1, 1);
	    	if(this.	onTheGround || this.onTheLedge){
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
	    if(this.catched){
	    	this.game.add.sprite(0,0,"catched");
	    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
	    }
	    //control de las trampas
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
	playvolcanState.prototype.leftInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
	    return isActive;
	};
	playvolcanState.prototype.rightInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playvolcanState.prototype.upInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	    return isActive;
	};
	playvolcanState.prototype.upInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	    return released;
	};
	//control con WASD
	playvolcanState.prototype.AInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.A);
	    return isActive;
	};
	playvolcanState.prototype.DInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);
	    return isActive;
	};
	//recibe un duración para evitar saltos infinitos
	playvolcanState.prototype.WInputIsActive = function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
	    return isActive;
	};
	playvolcanState.prototype.WInputReleased = function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
	    return released;
	};
	//control de las trampas
	playvolcanState.prototype.spaceInputIsAcive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
	    return isActive;
	};
	playvolcanState.prototype.IinputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.I);
	    return isActive;
	};
	playvolcanState.prototype.OInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.O);
	    return isActive;
	};
	playvolcanState.prototype.PInputIsActive = function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.P);
	    return isActive;
	};

	//inicia la ola
	playvolcanState.prototype.balltrap = function(){	
		this.ola.body.velocity.x = -200;
		this.botonola = this.game.add.sprite(1040, 360, 'baola');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
	};
	//resetea la ola
	playvolcanState.prototype.ballrelease = function(){
		this.ola.destroy();
		this.ola = this.game.add.sprite(1100, 375, 'ola');
		this.game.physics.enable(this.ola, Phaser.Physics.ARCADE);
	    this.ola.body.immovable = true;
	    this.ola.body.allowGravity = false;	
	    this.botonola = this.game.add.sprite(1040, 360, 'beola');
	    this.activatedb = false;
	};	
	//inicia los meteoritos para que caigan en diagonal
	playvolcanState.prototype.strap = function(){
		this.meteor1.body.allowGravity = true;
		this.meteor1.body.velocity.x = -300;
	    this.meteor2.body.allowGravity = true;
	    this.meteor2.body.velocity.x = -300;
	    this.meteor3.body.allowGravity = true;
	    this.meteor3.body.velocity.x = -300;
	    this.botonmeteorito = this.game.add.sprite(1040, 330, 'bameteorito');
	    game.time.events.add(Phaser.Timer.SECOND * 7, this.srelease, this);
	};
	//resetea los meteoritos
	playvolcanState.prototype.srelease = function(){
		this.meteor1.destroy();
		this.meteor2.destroy();
		this.meteor3.destroy();
		this.meteor1 = this.game.add.sprite(650, -90, 'meteor');
	    this.game.physics.enable(this.meteor1, Phaser.Physics.ARCADE);
	    this.meteor1.body.immovable = true;
	    this.meteor1.body.allowGravity = false;
	    this.meteor2 = this.game.add.sprite(400, -90, 'meteor');
	    this.game.physics.enable(this.meteor2, Phaser.Physics.ARCADE);
	    this.meteor2.body.immovable = true;
	    this.meteor2.body.allowGravity = false;
	    this.meteor3 = this.game.add.sprite(1000, -90, 'meteor');
	    this.game.physics.enable(this.meteor3, Phaser.Physics.ARCADE);
	    this.meteor3.body.immovable = true;
	    this.meteor3.body.allowGravity = false;
	    this.botonmeteorito = this.game.add.sprite(1040, 330, 'bmeteorito');
	    this.activatedc = false;
	};
	//inician los magma cubes
	playvolcanState.prototype.ptrap = function(){
		this.p1.body.velocity.x = 300;
		this.p2.body.velocity.x = 300;
		this.botonmagma = this.game.add.sprite(1040, 300, 'bamagma');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.prelease, this);
	};
	//resetea los magma ccubes
	playvolcanState.prototype.prelease = function(){
		this.p1.destroy();
		this.p2.destroy();
		this.p1 = this.game.add.sprite(-50,110, 'magma');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.p2 = this.game.add.sprite(-50,325, 'magma');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.botonmagma = this.game.add.sprite(1040, 300, 'bemagma');
	    this.activatedgp = false;
	};
	//crea los elementos estaticos del mundo
	playvolcanState.prototype.crearmundo = function(){
		this.ground = this.game.add.group();


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
		    if(i == 6 || i == 25){
			    block = this.game.add.sprite(32*i, this.game.height - 128, 'lava');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
			    block = this.game.add.sprite(i*32, this.game.height - 160, 'lava');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
			    block = this.game.add.sprite(i*32, this.game.height - 192, 'lava');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
			    block = this.game.add.sprite(i*32, this.game.height - 224, 'lava');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
		    }
		    
	    }   
	    //trampa arena

	    block = this.game.add.sprite(120, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

	    block = this.game.add.sprite(700+64, this.game.height - 250, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);



	    block = this.game.add.sprite(760+64, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;ty = false;
	    this.ground.add(block);

	    block = this.game.add.sprite(180, this.game.height - 450, 'ledge');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	};
	
	//muestra la IU por pantalla
	playvolcanState.prototype.render = function () {
        if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), this.game.world.centerX-50, 590, "#ffffff",'50px Arial');
        }
        this.game.debug.text("Puntuacion Chaser: "+this.pchaser, 100, 590, "#ffffff",'20px Arial');
        this.game.debug.text("Puntuacion Escapist: "+this.pescapist, 750, 590, "#ffffff",'20px Arial');
    };
    //para el cronometro y gestiona la puntuacion
    playvolcanState.prototype.endTimer = function() {
        this.timer.stop();
        this.pescapist++;
	    this.game.add.sprite(0,0,"libre");
	    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
    };
    //gestiona el cammbio de pantalla
    playvolcanState.prototype.cambio = function(){
    	if(this.catched){
    		this.pchaser = this.game.state.states["playoceano"].pchaser+1;
    	}
    	if(this.pchaser > this.pescapist){
    		game.state.start("victoriaC");
    	}
    	if(this.pescapist > this.pchaser){
    		game.state.start("victoriaE");
    	}
    };
    //crea la logica del cronometro
    playvolcanState.prototype.formatTime = function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    };
    //carga la puntuacion del nivel anterior
    playvolcanState.prototype.init = function(){
    	this.pchaser = this.game.state.states["playoceano"].pchaser;
    	this.pescapist = this.game.state.states["playoceano"].pescapist;
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
    //crea los jugadores y todas las variables relacionadas	
	playvolcanState.prototype.crearJugadores = function(){
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
	playvolcanState.prototype.initTimer = function(){		
        this.timer = this.game.time.create();
       
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);

        this.timer.start();
	};
	//inicializa las trampas
	playvolcanState.prototype.initTraps = function(){
	    //crear ola de nieve
	    this.ola = this.game.add.sprite(1100, 375, 'ola');
	    this.game.physics.enable(this.ola, Phaser.Physics.ARCADE);
	    this.ola.body.immovable = true;
	    this.ola.body.allowGravity = false;
	    //crear meteor de punta
	    this.meteor1 = this.game.add.sprite(650, -90, 'meteor');
	    this.game.physics.enable(this.meteor1, Phaser.Physics.ARCADE);
	    this.meteor1.body.immovable = true;
	    this.meteor1.body.allowGravity = false;
	    this.meteor2 = this.game.add.sprite(400, -90, 'meteor');
	    this.game.physics.enable(this.meteor2, Phaser.Physics.ARCADE);
	    this.meteor2.body.immovable = true;
	    this.meteor2.body.allowGravity = false;
	    this.meteor3 = this.game.add.sprite(1000, -90, 'meteor');
	    this.game.physics.enable(this.meteor3, Phaser.Physics.ARCADE);
	    this.meteor3.body.immovable = true;
	    this.meteor3.body.allowGravity = false;
	    //crear penguinos
	    this.p1 = this.game.add.sprite(-50,110, 'magma');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.p2 = this.game.add.sprite(-50,325, 'magma');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;


	    //variable para las trampas
	    this.activatedb = false;
	    this.activatedc = false;
	    this.activatedgp = false;

	    //crear botones
	    this.botonmagma = this.game.add.sprite(1040, 300, 'bemagma');
	    this.botonmeteorito = this.game.add.sprite(1040, 330, 'bmeteorito');
	    this.botonola = this.game.add.sprite(1040, 360, 'beola');	
	};
	//inicializa las colisiones
	playvolcanState.prototype.initCollisions = function(){
		this.onTheGround = game.physics.arcade.collide(this.chaser, this.ground);
	    this.onTheLedge = game.physics.arcade.collide(this.chaser, this.ground);
	    game.physics.arcade.collide(this.chaser, this.ola);
	    game.physics.arcade.collide(this.chaser, this.meteor1);
	    game.physics.arcade.collide(this.chaser, this.meteor2);
	    game.physics.arcade.collide(this.chaser, this.meteor3);
	    game.physics.arcade.collide(this.chaser, this.p1);
	    game.physics.arcade.collide(this.chaser, this.p2);
	    game.physics.arcade.collide(this.chaser, this.p3);
	    this.onTheGround1 = game.physics.arcade.collide(this.escapist, this.ground);
	    this.onTheLedge1 = game.physics.arcade.collide(this.escapist, this.ground);
	    this.catched = game.physics.arcade.collide(this.escapist, this.chaser);
	};
}