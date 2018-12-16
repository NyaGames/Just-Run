JustRun.playnieveState = function(game){
	JustRun.puntuacionC = 0;
	JustRun.puntuacionE = 0;
}
//variables globales necesarias para la gestión de la información que se recibe del servidor
	var emitterc;
	var emittere;
	
	ObjetoChaser = {
			ID: "Chaser",
			posicionX: 60,
			posicionY: 300,
			puntuacion: 0,
		};
		ObjetoEscapist = {
			ID: "Escapist",
			posicionX: 1000,
			posicionY: 300,
			puntuacion: 0,
			cazado: false,
		};
		ObjetoTrampas = {
			IPressed: false,
			OPressed: false,
			PPressed: false,
		};
		ObjetoAnimaciones = {
			ChaserIdle: true,
			ChaserRunL: false,
			ChaserRunR: false,
			ChaserJump: false,
			EscapistIdle: true,
			EscapistRunL: false,
			EscapistRunR: false,
			EscapistJump: false,
		};
	var object;
	var sumado = false;
	var sumado1 = false;
	
    var nivel = "nieve";
    
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
		create: function() {  	
			//inicializacion de los sprites
		    this.background = game.add.sprite(0,0,'snowfield');
		    
		    //llama al metodo para iniciar los jugadores, el mundo, las trampas, el cronometro y lo que recibe de los mapas anteriores
		    crearJugadores();
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
	    	get();		
		    if(this.timer.running){
		    	if((ObjetoChaser.posicionX >= ObjetoEscapist.posicionX && ObjetoChaser.posicionX < ObjetoEscapist.posicionX + 60)||(ObjetoChaser.posicionX+60 >= ObjetoEscapist.posicionX && ObjetoChaser.posicionX+60 < ObjetoEscapist.posicionX+60)){
					if((ObjetoChaser.posicionY >= ObjetoEscapist.posicionY && ObjetoChaser.posicionY < ObjetoEscapist.posicionY + 60)||(ObjetoChaser.posicionY+60 >= ObjetoEscapist.posicionY && ObjetoChaser.posicionY+60 < ObjetoEscapist.posicionY+60)){
						ObjetoEscapist.cazado = true;
					}		
				}
		    if(!ObjetoEscapist.cazado){		    	
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
				
		    	if(JustRun.userID == 1){
		    		 //control animaciones del escapist
		    		 if(ObjetoAnimaciones.EscapistRunL){
		    			 escapist.scale.setTo(-1,1);
		    			 escapist.animations.play("run");
		    		 }else if(ObjetoAnimaciones.EscapistRunR){
		    			 escapist.scale.setTo(1,1);
		    			 escapist.animations.play("run");
		    		 }else if(ObjetoAnimaciones.EscapistJump){
		    			 escapist.animations.play("doblejump");
		    		 }else if(ObjetoAnimaciones.EscapistIdle){
		    			 escapist.animations.play("idle");
		    		 }
			    		escapist.body.position.x = ObjetoEscapist.posicionX;
				    	escapist.body.position.y = ObjetoEscapist.posicionY;
		    		 //control de las trampas en el otro cliente
		    		 if(ObjetoTrampas.IPressed && !activatedb){
					    	activatedb = true;	    		
					    	this.balltrap();
					    }
					 if (ObjetoTrampas.OPressed && !activatedc){
				    		activatedc = true;
				    		this.strap();
					 }
					 if (ObjetoTrampas.PPressed && !activatedgp){
					    	activatedgp = true;
						    this.ptrap();
					 }
					 ObjetoTrampas.IPressed = false;
					 ObjetoTrampas.OPressed = false;
					 ObjetoTrampas.PPressed = false;
					//control del movimiento del chaser
				    if (AInputIsActive()) {
				    	chaser.scale.setTo(-1, 1);
				    	if(this.onTheGround || this.onTheLedge){
				    		chaser.animations.play('run');
				    		ObjetoAnimaciones.ChaserIdle = false;
				    		ObjetoAnimaciones.ChaserRunL = true;
				    		ObjetoAnimaciones.ChaserRunR = false;
				    		ObjetoAnimaciones.ChaserJump = false;
				    		
				    	}
				        chaser.body.acceleration.x = -aceleracion;
				    } else if (DInputIsActive()) {
				    	chaser.scale.setTo(1, 1);
				    	if(this.onTheGround || this.onTheLedge){
				    		chaser.animations.play('run'); 
				    		ObjetoAnimaciones.ChaserIdle = false;
				    		ObjetoAnimaciones.ChaserRunL = false;
				    		ObjetoAnimaciones.ChaserRunR = true;
				    		ObjetoAnimaciones.ChaserJump = false;
				    	}
				        chaser.body.acceleration.x = aceleracion;
				    } else {
				    	ObjetoAnimaciones.ChaserIdle = true;
			    		ObjetoAnimaciones.ChaserRunL = false;
			    		ObjetoAnimaciones.ChaserRunR = false;
			    		ObjetoAnimaciones.ChaserJump = false;
				    	chaser.animations.play('idle');
				        chaser.body.acceleration.x = 0
				    }
				  //control del doble salto que se resetea si detecta colisiona con una plataforma o con el suelo
				    if (this.onTheGround || this.onTheLedge) {
				    	this.jumps = 2;
				        jumping = false;
				            
				    }
				    if (this.jumps > 0 && WInputIsActive(5)) {
				    	chaser.animations.play('doblejump');
				    	ObjetoAnimaciones.ChaserIdle = false;
			    		ObjetoAnimaciones.ChaserRunL = false;
			    		ObjetoAnimaciones.ChaserRunR = false;
			    		ObjetoAnimaciones.ChaserJump = true;
				    	chaser.body.velocity.y = salto;
				        jumping = true;
				    }	        
				    if (jumping && WInputReleased()) {
				        this.jumps--;
				        jumping = false;
				    }
		        	ObjetoChaser.posicionX = chaser.body.position.x;
		        	ObjetoChaser.posicionY = chaser.body.position.y;
		    	}
		    	if(JustRun.userID == 2){	
		    		//control animaciones del chaser en el otro cliente
			    	if(ObjetoAnimaciones.ChaserRunL){
			    		chaser.scale.setTo(-1,1);
			    		chaser.animations.play("run");
		    		 }else if(ObjetoAnimaciones.ChaserRunR){
		    			 chaser.scale.setTo(1,1);
		    			 chaser.animations.play("run");
		    		 }else if(ObjetoAnimaciones.ChaserJump){
		    			 chaser.animations.play("doblejump");
		    		 }else if(ObjetoAnimaciones.ChaserIdle){
		    			 chaser.animations.play("idle");
		    		 }
			    	chaser.body.position.x = ObjetoChaser.posicionX;
			    	chaser.body.position.y = ObjetoChaser.posicionY;
			    	//control movimiento escapist
		    		if (AInputIsActive()) {
				    	if(this.onTheGround1 || this.onTheLedge1){
				    		escapist.scale.setTo(-1,1);
				    		escapist.animations.play('run');
				    		ObjetoAnimaciones.EscapistIdle = false;
				    		ObjetoAnimaciones.EscapistRunL = true;
				    		ObjetoAnimaciones.EscapistRunR = false;
				    		ObjetoAnimaciones.EscapistJump = false;
				    	}
				        	escapist.body.acceleration.x = -aceleracion;
				    	
				    } else if (DInputIsActive()) {
				    	if(this.onTheGround1 || this.onTheLedge1){
				    		escapist.scale.setTo(1,1);
				    		escapist.animations.play('run');
				    		ObjetoAnimaciones.EscapistIdle = false;
				    		ObjetoAnimaciones.EscapistRunL = false;
				    		ObjetoAnimaciones.EscapistRunR = true;
				    		ObjetoAnimaciones.EscapistJump = false;
				    	}
				           	escapist.body.acceleration.x = aceleracion;
				    } else {
				    	escapist.animations.play('idle');
				    	ObjetoAnimaciones.EscapistIdle = true;
			    		ObjetoAnimaciones.EscapistRunL = false;
			    		ObjetoAnimaciones.EscapistRunR = false;
			    		ObjetoAnimaciones.EscapistJump = false;
				        escapist.body.acceleration.x = 0;
				    }
		    		 if (this.onTheGround1 || this.onTheLedge1) {
					    	this.jumps1 = 2;
					        jumping1 = false;	       
					    }
					    if (this.jumps1 > 0 && WInputIsActive(5)) {
					    		escapist.animations.play('doblejump');
					    		ObjetoAnimaciones.EscapistIdle = false;
					    		ObjetoAnimaciones.EscapistRunL = false;
					    		ObjetoAnimaciones.EscapistRunR = false;
					    		ObjetoAnimaciones.EscapistJump = true;
					    		escapist.body.velocity.y = salto;
					        	jumping1 = true;    
					    }
					    if (jumping1 && WInputReleased()) {
					        this.jumps1--;
					        jumping1 = false;
					    }
					  //detecta si se han pulsado las teclas que activan las trampas
					   if (IinputIsActive() && !activatedb){
					    		activatedb = true;	    		
						    	this.balltrap();
						    	ObjetoTrampas.IPressed = true;	
					    }
					    if (OInputIsActive() && !activatedc){
					    		activatedc = true;
					    		this.strap();
					    		ObjetoTrampas.OPressed = true;
					    }
					    if (PInputIsActive() && !activatedgp){
					    		activatedgp = true;
						    	this.ptrap();
						    	ObjetoTrampas.PPressed = true;
						}
				    	ObjetoEscapist.posicionX = escapist.body.position.x;
				    	ObjetoEscapist.posicionY = escapist.body.position.y;
		    	} 
			    sendear();
			}else{	
				//se ha pillado al escapista se muestra la pantalla de cazado y se empieza el cambio de escenas
				//control del cambio de pantallas
				ObjetoEscapist.cazado = true;
				game.add.sprite(0,0,"catched");
	    		JustRun.puntuacionC = 1;
	    		JustRun.puntuacionE = 0;
		    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio(),this);

		}

		emitterc.emitX = chaser.body.position.x+27;
		emitterc.emitY = chaser.body.position.y+50;
		emittere.emitX = escapist.body.position.x+27;
		emittere.emitY = escapist.body.position.y+50;
		}
		   
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
			this.bola.position.x = 1100;
			this.bola.body.velocity.x = 0;
		    this.botonbola = game.add.sprite(1040, 360, 'bebola');
		    activatedb = false;
		    ObjetoTrampas.IPressed = false;
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
		    ObjetoTrampas.OPressed = false;
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
		    ObjetoTrampas.PPressed = false;
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
		    this.catched = game.physics.arcade.collide(chaser, escapist);
		},	

		//crea el timer, su maximo de tiempo y lo inicia
		initTimer: function(){		
	        this.timer = this.game.time.create();	       
	        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);	
	        this.timer.start();
		},
	    //genera el cambio de pantallas
	    cambio: function(){
	    	game.sound.stopAll();
	    	ObjetoChaser.posicionX = 60;
	    	ObjetoChaser.posicionY = 300;
	    	ObjetoChaser.puntuacion += JustRun.puntuacionC;
	    	ObjetoEscapist.posicionX = 1000;
	    	ObjetoEscapist.posicionY = 300;
	    	ObjetoEscapist.puntuacion += JustRun.puntuacionE;
	    	ObjetoEscapist.cazado = false;
	    	console.log(ObjetoChaser.puntuacion);
	    	console.log(ObjetoEscapist.puntuacion);
	    	sendear();
	    	game.state.start("loadcarga_castillo");
	    },
	    //crea el formato de timer
	    formatTime: function(s) {
	        var minutes = "0" + Math.floor(s / 60);
	        var seconds = "0" + (s - minutes * 60);
	        return minutes.substr(-2) + ":" + seconds.substr(-2);   
	    },
	  //renderia los elementos de la UI
		render: function () {
			 if (this.timer.running) {
		            game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), game.world.centerX-50, 590, "#ffffff",'50px Arial');
		        }
		        game.debug.text("Puntuacion Chaser: "+ObjetoChaser.puntuacion, 100, 590, "#ffffff",'20px Arial');
		        game.debug.text("Puntuacion Escapist: "+ObjetoEscapist.puntuacion, 750, 590, "#ffffff",'20px Arial');
	    },
	    //gestiona el cambio cuando se acaba el tiempo
	    endTimer: function() {
	    	this.timer.stop();
    		JustRun.puntuacionE = 1;
    		JustRun.puntuacionC = 0;
			game.add.sprite(0,0,"libre");
		    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
	    },
}