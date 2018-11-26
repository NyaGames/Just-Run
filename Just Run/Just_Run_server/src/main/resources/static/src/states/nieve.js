JustRun.playnieveState = function(game){
	
}
//variables globales necesarias para la gestión de la información que se recibe del servidor
	var emitterc;
	var emittere;
	
	var chaser;
	var escapist;
	
	var newposicionEscapist = {
		x: -1,
		y: -1,
	};
	var newposicionChaser = {
			x: -1,
			y: -1,
	};

    
	var IPressed;
	var OPressed;
	var PPressed;

    //variables de carga de los get
    var cargacompleta = false;
    var cargacompleta1 = false;
    
    //animaciones del chaser y escapist respectivamente
    var idle = false;
    var corriendoizq = false;
    var corriendoder = false;
    var saltando = false;
    var idle1 = false;
    var corriendoizq1 = false;
    var corriendoder1 = false;
    var saltando1 = false;
	//variables del movimiento
    var velocidadmaxima = 300;
    var aceleracion = 500;
    var frenada = 3600;
    var gravedad = 1500; 
    var salto = -600;
    
    var jumping;
    var jumping1;

    //variable para las trampas
    var activatedb = false;
    var activatedc = false;
    var activatedgp = false;
JustRun.playnieveState.prototype = {
		init: function(){
			//inicia los datos y recibe la información del servidor para iniciar el juego
			chaser = {
					ID: -1,
					posicionX: -1,
					posicionY: -1,
					puntuacion: -1,
				};
			escapist = {
					ID: -1,
					posicionX: -1,
					posicionY: -1,
					puntuacion: -1,
			};
			console.log(JustRun.userID);
			//callbacks de los getters, para inicializar los jugadores
			this.getChaser(function (data) {
	            chaser = game.add.sprite(data.posicionX, data.posicionY, 'chaser');
	    	    game.physics.enable(chaser, Phaser.Physics.ARCADE);
	    	    chaser.body.collideWorldBounds = true;
	    	    chaser.body.maxVelocity.setTo(velocidadmaxima, velocidadmaxima * 10);
	    	    chaser.body.drag.setTo(frenada, 0);
	    	    game.physics.arcade.gravity.y = gravedad;
	    	    
	    	    //animaciones chaser
	    	    chaser.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36], 33, true);
	    	    chaser.animations.add('dash', [37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 33, true);
	    	    chaser.animations.add('doblejump', [59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113], 122, true);
	    	    chaser.animations.add('jump', [114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135], 21, true);
	    	    chaser.animations.add('idle', [136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157,158,159,160,161,162,163,164,165,166,167,168,169,170,171,172,173,174,175,176,177,178], 42, true);
	    	    
	    	    //por defecto la animacion idle
	    	    chaser.animations.play('idle');
	    	    
	    	    //Cambio de Eje
	    	    chaser.anchor.setTo(0.3,0.5);
	    	    
	    	    //particulas
	    	    emitterc = game.add.emitter(chaser.body.position.x, chaser.body.position.y, 1);
		   		emitterc.makeParticles('particulas');
		   		chaser.ID = data.ID;
		   		chaser.posicionX = data.posicionX;
		   		chaser.posicionY = data.posicionY;
		   		chaser.puntuacion = data.puntuacion;
	    	    
	    	    //variable para comprobar el salto
	    	    jumping = false;
	    	    cargacompleta1 = true;
	        })
			this.getEscapist(function(data){
				escapist = game.add.sprite(data.posicionX, data.posicionY, 'escapist');
			    game.physics.enable(escapist, Phaser.Physics.ARCADE);
			    escapist.body.collideWorldBounds = true;
			    escapist.body.maxVelocity.setTo(velocidadmaxima, velocidadmaxima * 10);
			    escapist.body.drag.setTo(frenada, 0);
			    game.physics.arcade.gravity.y = gravedad;

			    //animaciones escapist
			  	escapist.animations.add('run', [0,1,2,3,4,5,6,7,8,9,10,11,12,13,14,15,16,17,18,19,20,21,22,23,24,25,26,27,28,29,30,31,32,34,35,36], 33, true);
			    escapist.animations.add('dash', [37,38,39,40,41,42,43,44,45,46,47,48,49,50,51,52,53,54,55,56,57,58], 33, true);
			    escapist.animations.add('doblejump', [59,60,61,62,63,64,65,66,67,68,69,70,71,72,73,74,75,76,77,78,79,80,81,82,83,84,85,86,87,88,89,90,91,92,93,94,95,96,97,98,99,100,101,102,103,104,105,106,107,108,109,110,111,112,113], 122, true);
			    escapist.animations.add('jump', [114,115,116,117,118,119,120,121,122,123,124,125,126,127,128,129,130,131,132,133,134,135], 21, true);
			    escapist.animations.add('idle', [136,137,138,139,140,141,142,143,144,145,146,147,148,149,150,151,152,153,154,155,156,157], 21, true);

			    emittere = game.add.emitter(escapist.body.position.x, escapist.body.position.y, 1);

		   		emittere.makeParticles('particulas');	
		   		escapist.ID = data.ID;
		   		escapist.posicionX = data.posicionX;
		   		escapist.posicionY = data.posicionY;
		   		escapist.puntuacion = data.puntuacion;	
		   		escapist.cazado = data.cazado;
		   		
			    escapist.animations.play('idle');

			    escapist.anchor.setTo(0.3,0.5);			    
			    jumping1 = false;	 
	    	    cargacompleta = true;
			})
			//conseguir las trampas
			this.getTrampas(function (data){
				IPressed = data.I;
				OPressed = data.O;
				PPressed = data.P;
			})
		},
    
		create: function() {  	
			//inicializacion de los sprites
		    this.background = game.add.sprite(0,0,'snowfield');
		    
		    //llama al metodo para iniciar los jugadores, el mundo, las trampas, el cronometro y lo que recibe de los mapas anteriores
		    this.initTraps();
		    this.crearmundo();    
		    this.initTimer();
		    song = game.add.audio('song');
			song.play();

		    //control de las teclas, para evitar los usos por defecto, que pueden dar problemas
		    game.input.keyboard.addKeyCapture([
		        Phaser.Keyboard.A,
		        Phaser.Keyboard.D,
		        Phaser.Keyboard.W,
		        Phaser.Keyboard.S,
		        Phaser.Keyboard.I,
		        Phaser.Keyboard.O,
		        Phaser.Keyboard.P,
		    ]);
		},
		update: function() {
			//crea las colisiones que los diversos elementos del mapa, asi como las variables de control usadas durante el nivel
		    this.initCollisions();
		    //comprueba que el tiempo no se ha acabado y que el escapist no ha sido cazado

		    if(cargacompleta && cargacompleta1){
		    if(this.timer.running){
		    if(!this.catched){	    
		    	//control del cambio de pantallas
		    	if(chaser.puntuacion > escapist.puntuacion){
		    		game.sound.stopAll();
		    		game.state.start("victoriaC");
		    	}
		    	if(escapist.puntuacion > chaser.puntuacion){
		    		game.sound.stopAll();
		    		game.state.start("victoriaE");
		    	}
		    	chaser.ID = "Chaser";
		    	escapist.ID = "Escapist";
		    	//consigue la informacion de las trampas y de las animaciones
		    	$.ajax({
		    		method: "GET",
		    		url: "/traps",
		    		processData: false,
		    		headers: {
		    			"Content-Type": "application/json"
		    		}
		    	}).done(function(data){
		    		IPressed = data.I;
		    		OPressed = data.O;
		    		PPressed = data.P;
		    	});
		    	this.getAnimations(function (data){
					var idle = data.ChaserIdle;
				    var corriendoizq = data.ChaserRunL;
				    var corriendoder = data.ChaserRunR;
				    var saltando = data.ChaserJump;
				    var idle1 = data.EscapistIdle;
				    var corriendoizq1 = data.EscapistRunL;
				    var corriendoder1 = data.EscapistRunR;
				    var saltando1 = data.EscapistJump;
				})
		    	 //creacion de particulas chaser
				if(this.onTheGround){
					emitterc.start(true, 100, null, 2); 
				}
				//Particulas escapist
				if(this.onTheGround1){
					emittere.start(true, 100, null, 2); 
				}

		    	//en caso de que se caigan fuera los limites hacen respawn
			    if(chaser.body.position.y > game.height - 64){
			    	chaser.body.position.x = 60;
			    	chaser.body.position.y = game.height - 300;
			    }
			    if(escapist.body.position.y > game.height - 64){
			    	escapist.body.position.x = 1000;
			    	escapist.body.position.y = game.height - 300;
			    }	
				//hitbox de la colision entre jugadores para el cliente donde no se produce la colision
		    	if(chaser.body.position.x < escapist.body.position.x+70 && chaser.body.position.x > escapist.body.position.x-70){
		    		if(chaser.body.position.y < escapist.body.position.y+50 && chaser.body.position.x > escapist.body.position.y-50){
		    			game.add.sprite(0,0,"catched");
				    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
		    		}
		    	}
		    	if(JustRun.userID == 1){
		    		//control de la posicion que recibe del server (escapist)
		    		 $.ajax({
				    		method: "GET",
				    		url: "/escapist",
				    		processData: false,
				    		headers: {
				    			"Content-Type": "application/json"
				    		}
				    	}).done(function(data){
					    		newposicionEscapist.x = data.posicionX;
					    		newposicionEscapist.y = data.posicionY;
				    	});
		    		 //control animaciones del escapist
		    		 if(corriendoizq1){
		    			 escapist.scale.setTo(-1,1);
		    			 escapist.animations.play("run");
		    		 }else if(corriendoder1){
		    			 escapist.scale.setTo(-1,1);
		    			 escapist.animations.play("run");
		    		 }else if(saltando1){
		    			 escapist.animations.play("doblejump");
		    		 }else if(idle1){
		    			 escapist.animations.play("idle");
		    		 }
		    		 //control de las trampas en el otro cliente
		    		 if(IPressed && !activatedb){
					    	activatedb = true;	    		
					    	this.balltrap();
					    }
					    if (OPressed && !activatedc){
				    		activatedc = true;
				    		this.strap();
					    }
					    if (PPressed && !activatedgp){
					    	activatedgp = true;
						    this.ptrap();
						}
				    escapist.body.position.x = newposicionEscapist.x;
			    	escapist.body.position.y = newposicionEscapist.y;
			    	//control del movimiento del chaser
				    if (this.AInputIsActive()) {
				    	chaser.scale.setTo(-1, 1);
				    	if(this.onTheGround || this.onTheLedge){
				    		chaser.animations.play('run');
				    		corriendoizq = true;
				    		
				    	}
				        	chaser.body.acceleration.x = -aceleracion;
				        	chaser.posicionX = chaser.body.position.x;
				        	chaser.posicionY = chaser.body.position.y;
				    } else if (this.DInputIsActive()) {
				    	chaser.scale.setTo(1, 1);
				    	if(this.onTheGround || this.onTheLedge){
				    		chaser.animations.play('run'); 
				    		corriendoder = true;
				    	}
				        	chaser.body.acceleration.x = aceleracion;
				        	chaser.posicionX = chaser.body.position.x;
				        	chaser.posicionY = chaser.body.position.y;
				    } else {
				    	idle = true;
				    	chaser.animations.play('idle');
				        chaser.body.acceleration.x = 0;
				        chaser.posicionX = chaser.body.position.x;
			        	chaser.posicionY = chaser.body.position.y;
				    }
				  //control del doble salto que se resetea si detecta colisiona con una plataforma o con el suelo
				    if (this.onTheGround || this.onTheLedge) {
				    	this.jumps = 2;
				        jumping = false;
				            
				    }
				    if (this.jumps > 0 && this.WInputIsActive(5)) {
				    	chaser.animations.play('doblejump');
				    	saltando = true;
				    	if(this.activated){
				    		chaser.body.velocity.y = salto/2.5;
				    		chaser.posicionX = chaser.body.position.x;
				        	chaser.posicionY = chaser.body.position.y;
				        	jumping = true;
				        	this.jumps = 0;
				    	}else{
				    		chaser.body.velocity.y = salto;
				    		chaser.posicionX = chaser.body.position.x;
				        	chaser.posicionY = chaser.body.position.y;
				        	jumping = true;
				    	}
				    }	        
				    if (jumping && this.WInputReleased()) {
				        this.jumps--;
				        jumping = false;
				    }
		    	}
		    	if(JustRun.userID == 2){	
		    		//recibe la info del chaser
				    $.ajax({
			    		method: "GET",
			    		url: "/chaser",
			    		processData: false,
			    		headers: {
			    			"Content-Type": "application/json"
			    		}
			    	}).done(function(data){
			    		newposicionChaser.x = data.posicionX;
			    		newposicionChaser.y = data.posicionY;
			    	})
			    	//control animaciones del chaser en el otro cliente
			    	if(corriendoizq){
			    		chaser.scale.setTo(-1,1);
			    		chaser.animations.play("run");
		    		 }else if(corriendoder){
		    			 chaser.scale.setTo(-1,1);
		    			 chaser.animations.play("run");
		    		 }else if(saltando){
		    			 chaser.animations.play("doblejump");
		    		 }else if(idle){
		    			 chaser.animations.play("idle");
		    		 }
			    	chaser.body.position.x = newposicionChaser.x;
			    	chaser.body.position.y = newposicionChaser.y;
			    	//control movimiento escapist
		    		if (this.AInputIsActive()) {
				    	if(this.onTheGround1 || this.onTheLedge1){
				    		escapist.scale.setTo(-1,1);
				    		escapist.animations.play('run');
				    		corriendoizq1 = true;
				    	}
				        	escapist.body.acceleration.x = -aceleracion;
				        	escapist.posicionX = escapist.body.position.x;
				        	escapist.posicionY = escapist.body.position.y;
				        	console.log(escapist);
				    	
				    } else if (this.DInputIsActive()) {
				    	if(this.onTheGround1 || this.onTheLedge1){
				    		escapist.scale.setTo(1,1);
				    		escapist.animations.play('run');
				    		corriendoder1 = true;
				    	}
				           	escapist.body.acceleration.x = aceleracion;
				           	escapist.posicionX = escapist.body.position.x;
				        	escapist.posicionY = escapist.body.position.y;
				    } else {
				    	escapist.animations.play('idle');
				    	idle1 = true;
				        escapist.body.acceleration.x = 0;
				        escapist.posicionX = escapist.body.position.x;
			        	escapist.posicionY = escapist.body.position.y;
				    }
		    		 if (this.onTheGround1 || this.onTheLedge1) {
					    	this.jumps1 = 2;
					        jumping1 = false;	       
					    }
					    if (this.jumps1 > 0 && this.WInputIsActive(5)) {
					    		escapist.animations.play('doblejump');
					    		saltando1 = true;
					    		escapist.body.velocity.y = salto;
					    		escapist.posicionX = escapist.body.position.x;
					        	escapist.posicionY = escapist.body.position.y;
					        	jumping1 = true;    
					    }
					    if (jumping1 && this.WInputReleased()) {
					        this.jumps1--;
					        jumping1 = false;
					    }
					  //detecta si se han pulsado las teclas que activan las trampas
					    if (this.IinputIsActive() && !activatedb){
					    		activatedb = true;	    		
						    	this.balltrap();
						    	IPressed = true;	
					    }
					    if (this.OInputIsActive() && !activatedc){
					    		activatedc = true;
					    		this.strap();
					    		OPressed = true;
					    }
					    if (this.PInputIsActive() && !activatedgp){
					    		activatedgp = true;
						    	this.ptrap();
						    	PPressed = true;
						}
		    	}
		    	//crear los JSON que se subiran al servidor
			    this.jsonear(chaser, escapist);
			}else{	
				//se ha pillado al escapista se muestra la pantalla de cazado y se empieza el cambio de escenas
				escapist.cazado = true;
				game.add.sprite(0,0,"catched");
		    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);

		}
		    }

		emitterc.emitX = chaser.body.position.x+27;
		emitterc.emitY = chaser.body.position.y+50;
		emittere.emitX = escapist.body.position.x+27;
		emittere.emitY = escapist.body.position.y+50;
		}
		},

		//controles con las flechas y devuelven un bool en caso de que este activo	
		//control con WASD
		AInputIsActive: function() {
		    var isActive = false;
		    isActive = this.input.keyboard.isDown(Phaser.Keyboard.A);
		    return isActive;
		},
		DInputIsActive: function() {
		    var isActive = false;
		    isActive = this.input.keyboard.isDown(Phaser.Keyboard.D);
		    return isActive;
		},
		//recibe un duración para evitar saltos infinitos
		WInputIsActive: function(duration) {
		    var isActive = false;
		    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
		    return isActive;
		},
		WInputReleased: function() {
		    var released = false;
		    released = this.input.keyboard.upDuration(Phaser.Keyboard.W);
		    return released;
		},
		IinputIsActive: function() {
		    var isActive = false;
		    isActive = this.input.keyboard.isDown(Phaser.Keyboard.I);
		    return isActive;
		},
		OInputIsActive: function() {
		    var isActive = false;
		    isActive = this.input.keyboard.isDown(Phaser.Keyboard.O);
		    return isActive;
		},
		PInputIsActive: function() {
		    var isActive = false;
		    isActive = this.input.keyboard.isDown(Phaser.Keyboard.P);
		    return isActive;
		},
		//metodos de las trampas
		//funcion que ejecuta el movimiento de la bola a ras de suelo, modificando la velocidad, cambiando el boton y llamando al metodo que resetea la trampa tras x tiempo
		balltrap: function(){		
		    this.bola.animations.play('rodar', 12, true);
			this.bola.body.velocity.x = -200;
			this.botonbola = game.add.sprite(1040, 360, 'babola');
			game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
		},
		//reseta la trampa de la bola
		ballrelease: function(){
			this.bola.destroy();
			this.bola = game.add.sprite(1100, 367, 'snowball');
		    var rodar = this.bola.animations.add('rodar');
		    game.physics.enable(this.bola, Phaser.Physics.ARCADE);
		    this.bola.body.immovable = true;
		    this.bola.body.allowGravity = false;	
		    this.botonbola = game.add.sprite(1040, 360, 'bebola');
		    activatedb = false;
		    IPressed = false;
		},
		//activa la gravedad de los chuzos	
		strap: function(){
			this.chuzo1.body.allowGravity = true;
		    this.chuzo2.body.allowGravity = true;
		    this.botonestalactita = game.add.sprite(1040, 330, 'baestalactita');
		    game.time.events.add(Phaser.Timer.SECOND * 7, this.srelease, this);
		},
		//resetea la posicion y velocidad de los chuzos
		srelease: function(){
			this.chuzo1.destroy();
			this.chuzo2.destroy();
			this.chuzo1 = game.add.sprite(650, -90, 'chuzo');
		    game.physics.enable(this.chuzo1, Phaser.Physics.ARCADE);
		    this.chuzo1.body.immovable = true;
		    this.chuzo1.body.allowGravity = false;
		    this.chuzo2 = game.add.sprite(400, -90, 'chuzo');
		    game.physics.enable(this.chuzo2, Phaser.Physics.ARCADE);
		    this.chuzo2.body.immovable = true;
		    this.chuzo2.body.allowGravity = false;
		    this.botonestalactita = game.add.sprite(1040, 330, 'bestalactita');
		    activatedc = false;
		    OPressed = false;
		},
		//activa la velocidad de los pinguinos
		ptrap: function(){
			this.p1.body.velocity.x = 300;
			this.p2.body.velocity.x = 300;
			this.p3.body.velocity.x = 300;
			this.botonpinguino = game.add.sprite(1040, 300, 'bapinguino');
			game.time.events.add(Phaser.Timer.SECOND * 7, this.prelease, this);
		},
		//resete los pinguinos en velocidad y posicion
		prelease: function(){
			this.p1.destroy();
			this.p2.destroy();
			this.p3.destroy();
			this.p1 = game.add.sprite(-50,70, 'pinguino');
		    game.physics.enable(this.p1, Phaser.Physics.ARCADE);
		    this.p1.body.immovable = true;
		    this.p1.body.allowGravity = false;
		    this.p2 = game.add.sprite(-50,315, 'pinguino');
		    game.physics.enable(this.p2, Phaser.Physics.ARCADE);
		    this.p2.body.immovable = true;
		    this.p2.body.allowGravity = false;
		    this.p3 = game.add.sprite(-50,170, 'pinguino');
		    game.physics.enable(this.p3, Phaser.Physics.ARCADE);
		    this.p3.body.immovable = true;
		    this.p3.body.allowGravity = false;	
		    this.botonpinguino = game.add.sprite(1040, 300, 'bepinguino');
		    activatedgp = false;
		    PPressed = false;
		},
		//crear mundo y los grupos de colision
		crearmundo: function(){
			this.ground = game.add.group();
		    this.water = game.add.group();
		    this.ice = game.add.group();
		    this.wtrap = game.add.group();
		    this.itrap = game.add.group();

		    var block;
		    for(var i = 0; i <34; i++){
		    	block = game.add.sprite(32*i, game.height - 32, 'ground');
		    	game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
			    block = game.add.sprite(i*32, game.height - 64, 'ground');
		    	game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
			    block = game.add.sprite(i*32, game.height - 96, 'ground');
		    	game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
			    if(i < 14 || i > 18){
			    	block = game.add.sprite(i*32, game.height - 128, 'snow');
			    	game.physics.enable(block, Phaser.Physics.ARCADE);
				    block.body.immovable = true;
				    block.body.allowGravity = false;
				    this.ground.add(block);	
			    }
		    }
		    
		    block = game.add.sprite(448, game.height-128, 'water');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
			block.body.immovable = true;
			block.body.allowGravity = false;
			this.water.add(block);

		    block = game.add.sprite(120, game.height - 250, 'ledge');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ice.add(block);
		    block = game.add.sprite(240, game.height - 250, 'ledge');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ice.add(block);

		    block = game.add.sprite(700, game.height - 250, 'ledge');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ice.add(block);
		    block = game.add.sprite(820, game.height - 250, 'ledge');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ice.add(block);


		    block = game.add.sprite(460, game.height - 400, 'ledge');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ice.add(block);

		    block = game.add.sprite(760, game.height - 500, 'ledge');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ice.add(block);

		    block = game.add.sprite(180, game.height - 500, 'ledge');
		    game.physics.enable(block, Phaser.Physics.ARCADE);
		    block.body.immovable = true;
		    block.body.allowGravity = false;
		    this.ice.add(block);
		},
		//inicializa las trampas
		initTraps: function(){		
		    //crear bola de nieve
		    this.bola = game.add.sprite(1100, 367, 'snowball');
		    var rodar = this.bola.animations.add('rodar');
		    game.physics.enable(this.bola, Phaser.Physics.ARCADE);
		    this.bola.body.immovable = true;
		    this.bola.body.allowGravity = false;
		    //crear chuzo de punta
		    this.chuzo1 = game.add.sprite(650, -90, 'chuzo');
		    game.physics.enable(this.chuzo1, Phaser.Physics.ARCADE);
		    this.chuzo1.body.immovable = true;
		    this.chuzo1.body.allowGravity = false;
		    this.chuzo2 = game.add.sprite(400, -90, 'chuzo');
		    game.physics.enable(this.chuzo2, Phaser.Physics.ARCADE);
		    this.chuzo2.body.immovable = true;
		    this.chuzo2.body.allowGravity = false;
		    //crear penguinos
		    this.p1 = game.add.sprite(-50,70, 'pinguino');
		    game.physics.enable(this.p1, Phaser.Physics.ARCADE);
		    this.p1.body.immovable = true;
		    this.p1.body.allowGravity = false;
		    this.p2 = game.add.sprite(-50,315, 'pinguino');
		    game.physics.enable(this.p2, Phaser.Physics.ARCADE);
		    this.p2.body.immovable = true;
		    this.p2.body.allowGravity = false;
		    this.p3 = game.add.sprite(-50,170, 'pinguino');
		    game.physics.enable(this.p3, Phaser.Physics.ARCADE);
		    this.p3.body.immovable = true;
		    this.p3.body.allowGravity = false;

		    //crear botones
		    this.botonpinguino = game.add.sprite(1040, 300, 'bepinguino');
		    this.botonestalactita = game.add.sprite(1040, 330, 'bestalactita');
		    this.botonbola = game.add.sprite(1040, 360, 'bebola');

		},
		//crea el timer, su maximo de tiempo y lo inicia
		initTimer: function(){		
	        this.timer = game.time.create();
	       
	        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);

	        this.timer.start();
		},
		//inicializa las colisiones
		initCollisions: function(){
			this.onTheGround = game.physics.arcade.collide(chaser, this.ground);
		    game.physics.arcade.collide(chaser, this.water);
		    this.onTheLedge = game.physics.arcade.collide(chaser, this.ice);
		    game.physics.arcade.collide(chaser, this.bola);
		    game.physics.arcade.collide(chaser, this.chuzo1);
		    game.physics.arcade.collide(chaser, this.chuzo2);
		    game.physics.arcade.collide(chaser, this.p1);
		    game.physics.arcade.collide(chaser, this.p2);
		    game.physics.arcade.collide(chaser, this.p3);
		    this.onTheGround1 = game.physics.arcade.collide(escapist, this.ground);
		    game.physics.arcade.collide(escapist, this.water);
		    this.onTheLedge1 = game.physics.arcade.collide(escapist, this.ice);
		    game.physics.arcade.collide(escapist, this.wtrap);
		    game.physics.arcade.collide(escapist, this.itrap);
		    this.catched = game.physics.arcade.collide(escapist, chaser);
		},
		//muestra por pantallas todos los textos
		render: function () {
	        if (this.timer.running) {
	            game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), game.world.centerX-50, 590, "#ffffff",'50px Arial');
	        }
	        game.debug.text("Puntuacion Chaser: "+chaser.puntuacion, 100, 590, "#ffffff",'20px Arial');
	        game.debug.text("Puntuacion Escapist: "+escapist.puntuacion, 750, 590, "#ffffff",'20px Arial');
	    },
	    //se activa cuando acaba el tiempo para subir la puntuacion del escapista y activa el cambio
	    endTimer: function() {
	        this.timer.stop();
	        escapist.puntuacion++;
			game.add.sprite(0,0,"libre");
		    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
	    },
	    //comprueba que la puntuacion es correcta y cambia de estado
	    cambio: function(){
	    	if(this.catched){
	    		chaser.puntuacion = 1;
	    	}
	    	game.sound.stopAll();
	    	console.log(chaser.puntuacion);
	    	console.log(escapist.puntuacion);
	    	$.ajax({
	    		method: "DELETE",
	    		url: "/chaser",
	    		processData: false,
	    		data: JSON.stringify(chaser.puntuacion),
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	})
	    	$.ajax({
	    		method: "DELETE",
	    		url: "/escapist",
	    		processData: false,
	    		data: JSON.stringify(escapist.puntuacion),
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	})
	    	if(chaser.puntuacion > escapist.puntuacion){
	    		game.sound.stopAll();
	    		game.state.start("victoriaC");
	    	}
	    	if(escapist.puntuacion > chaser.puntuacion){
	    		game.sound.stopAll();
	    		game.state.start("victoriaE");
	    	}
	    },
	    //crea el timer, su maximo de tiempo y lo inicia
	    formatTime: function(s) {
	        var minutes = "0" + Math.floor(s / 60);
	        var seconds = "0" + (s - minutes * 60);
	        return minutes.substr(-2) + ":" + seconds.substr(-2);   
	    },
	    //get del chaser
	    getChaser: function(callback){
	    	$.ajax({
	    		method: "GET",
	    		url: "/chaser",
	    		processData: false,
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	}).done(function(data){
	    		callback(data)
	    	})
	    },
	    //GET del escapist
	    getEscapist: function(callback){
	    	$.ajax({
	    		method: "GET",
	    		url: "/escapist",
	    		processData: false,
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	}).done(function(data){
	    		callback(data)
	    	})
	    },
	    //GET de las trampas
	    getTrampas: function(callback){
	    	$.ajax({
	    		method: "GET",
	    		url: "/traps",
	    		processData: false,
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	}).done(function(data){
	    		callback(data)
	    	})
	    },
	    //GET de las animaciones
	    getAnimations: function(callback){
	    	$.ajax({
	    		method: "GET",
	    		url: "/animations",
	    		processData: false,
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	}).done(function(data){
	    		callback(data)
	    	})
	    },
	    //crea los JSON y los sube al server
	    jsonear: function(c, e){
	    	if(JustRun.userID == 1){
	    		var objeto = new Object();
		    	objeto.ID = c.ID;
				objeto.posicionX = c.posicionX;
				objeto.posicionY = c.posicionY;
				objeto.puntuacion =  c.puntuacion;
				
				$.ajax({
		    		method: "PUT",
		    		url: "/chaser",
		    		processData: false,
		    		data: JSON.stringify(objeto),
		    		headers: {
		    			"Content-Type": "application/json"
		    		}
		    	})
	    	}
	    	
	    	if(JustRun.userID == 2){
	    		var objeto1 = new Object();
		    	objeto1.ID = e.ID;
				objeto1.posicionX = e.posicionX;
				objeto1.posicionY = e.posicionY;
				objeto1.puntuacion = e.puntuacion;
				$.ajax({
		    		method: "PUT",
		    		url: "/escapist",
		    		processData: false,
		    		data: JSON.stringify(objeto1),
		    		headers: {
		    			"Content-Type": "application/json"
		    		}
		    	})
	    	}
	    	var object = new Object();
	    	object.I = IPressed;
	    	object.O = OPressed;
	    	object.P = PPressed;
	    	$.ajax({
	    		method: "PUT",
	    		url: "/traps",
	    		processData: false,
	    		data: JSON.stringify(object),
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	})
	    	var object1 = new Object();
	    	object1.ChaserIdle = idle;
	    	object1.ChaserRunL = corriendoizq;
	    	object1.ChaserRunR = corriendoder;
	    	object1.ChaserJump = saltando;
	    	object1.EscapistIdle = idle1;
	    	object1.EscapistRunL = corriendoizq1;
	    	object1.EscapistRunR = corriendoder1;
	    	object1.EscapistJump = saltando1;
	    	$.ajax({
	    		method: "PUT",
	    		url: "/animations",
	    		processData: false,
	    		data: JSON.stringify(object1),
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	})
	    }
}