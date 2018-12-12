JustRun.playcastilloState = function(game){
	
}	
//variables globales necesarias para la gestión de la información que se recibe del servidor
var emitterc;
var emittere;

var chaser;
var escapist;
var object;
var sumado = false;
var sumado1 = false;

//variables de carga de los get
var cargacompleta = false;

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
JustRun.playcastilloState.prototype = {
		create: function() {        	
			//inicializacion de los sprites
		    this.background = game.add.sprite(0,0,'castle');
		    
		  //llama al metodo para iniciar los jugadores, el mundo, las trampas, el cronometro y lo que recibe de los mapas anteriores
		    this.crearJugadores();
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
	    	object = {"id":"get"};
			//callbacks de los getters, para inicializar los jugadores
			connection.send(JSON.stringify(object));
			connection.onmessage = function(event){
				var msg = event.data;
				message = JSON.parse(msg);
				switch(message.id){
				case "get":
					ObjetoChaser.posicionX = message.ChaserX;
					ObjetoChaser.posicionY = message.ChaserY;
					ObjetoChaser.puntuacion = message.ChaserPuntuacion;
					ObjetoEscapist.posicionX = message.EscapistX;
					ObjetoEscapist.posicionY = message.EscapistY;
					ObjetoEscapist.puntuacion = message.EscapistPuntuacion;
					ObjetoEscapist.cazado = message.EscapistCazado;
					ObjetoTrampas.IPressed = message.IPressed;
					ObjetoTrampas.OPressed = message.OPressed;
					ObjetoTrampas.PPressed = message.PPressed;
					ObjetoAnimaciones.ChaserIdle = message.ChaserIdle;
					ObjetoAnimaciones.ChaserRunL = message.ChaserRunL;
					ObjetoAnimaciones.ChaserRunR = message.ChaserRunR;
					ObjetoAnimaciones.ChaserJump = message.ChaserJump;
					ObjetoAnimaciones.EscapistIdle = message.EscapistIdle;
					ObjetoAnimaciones.EscapistRunL = message.EscapistRunL;
					ObjetoAnimaciones.EscapistRunR = message.EscapistRunR;
					ObjetoAnimaciones.EscapistJump = message.EscapistJump;
					break;
				}
			};
			
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
				    if (this.AInputIsActive()) {
				    	chaser.scale.setTo(-1, 1);
				    	if(this.onTheGround || this.onTheLedge){
				    		chaser.animations.play('run');
				    		ObjetoAnimaciones.ChaserIdle = false;
				    		ObjetoAnimaciones.ChaserRunL = true;
				    		ObjetoAnimaciones.ChaserRunR = false;
				    		ObjetoAnimaciones.ChaserJump = false;
				    		
				    	}
				        chaser.body.acceleration.x = -aceleracion;
				    } else if (this.DInputIsActive()) {
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
				    if (this.jumps > 0 && this.WInputIsActive(5)) {
				    	chaser.animations.play('doblejump');
				    	ObjetoAnimaciones.ChaserIdle = false;
			    		ObjetoAnimaciones.ChaserRunL = false;
			    		ObjetoAnimaciones.ChaserRunR = false;
			    		ObjetoAnimaciones.ChaserJump = true;
				    	chaser.body.velocity.y = salto;
				        jumping = true;
				    }	        
				    if (jumping && this.WInputReleased()) {
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
		    		if (this.AInputIsActive()) {
				    	if(this.onTheGround1 || this.onTheLedge1){
				    		escapist.scale.setTo(-1,1);
				    		escapist.animations.play('run');
				    		ObjetoAnimaciones.EscapistIdle = false;
				    		ObjetoAnimaciones.EscapistRunL = true;
				    		ObjetoAnimaciones.EscapistRunR = false;
				    		ObjetoAnimaciones.EscapistJump = false;
				    	}
				        	escapist.body.acceleration.x = -aceleracion;
				    	
				    } else if (this.DInputIsActive()) {
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
					    if (this.jumps1 > 0 && this.WInputIsActive(5)) {
					    		escapist.animations.play('doblejump');
					    		ObjetoAnimaciones.EscapistIdle = false;
					    		ObjetoAnimaciones.EscapistRunL = false;
					    		ObjetoAnimaciones.EscapistRunR = false;
					    		ObjetoAnimaciones.EscapistJump = true;
					    		escapist.body.velocity.y = salto;
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
						    	ObjetoTrampas.IPressed = true;	
					    }
					    if (this.OInputIsActive() && !activatedc){
					    		activatedc = true;
					    		this.strap();
					    		ObjetoTrampas.OPressed = true;
					    }
					    if (this.PInputIsActive() && !activatedgp){
					    		activatedgp = true;
						    	this.ptrap();
						    	ObjetoTrampas.PPressed = true;
						}
				    	ObjetoEscapist.posicionX = escapist.body.position.x;
				    	ObjetoEscapist.posicionY = escapist.body.position.y;
		    	} 
			    this.sendear();
			}else{	
				//se ha pillado al escapista se muestra la pantalla de cazado y se empieza el cambio de escenas
				//control del cambio de pantallas
				ObjetoChaser.puntuacion++;
				ObjetoEscapist.cazado = true;
				game.add.sprite(0,0,"catched");
		    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);

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
		balltrap: function(){
			this.bola.scale.setTo(-1,1);		
		    this.bola.animations.play('rodar', 12, true);
			this.bola.body.velocity.x = -200;
			this.botonbola = this.game.add.sprite(1040, 360, 'bacaballero');
			game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
		},
		ballrelease: function(){
			this.bola.position.x = 1100;
			this.bola.body.velocity.x = 0;	
		    this.botonbola = this.game.add.sprite(1040, 360, 'becaballero');
		    activatedb = false;
		    ObjetoTrampas.IPressed = false;
		},
		strap: function(){
			this.aceite1.body.allowGravity = true;
		    this.botonestalactita = this.game.add.sprite(1040, 330, 'baaceite');
		    game.time.events.add(Phaser.Timer.SECOND * 7, this.srelease, this);
		},
		srelease: function(){
			this.aceite1.destroy();
			this.aceite1 = this.game.add.sprite(520, -90, 'aceite');
		    this.game.physics.enable(this.aceite1, Phaser.Physics.ARCADE);
		    this.aceite1.body.immovable = true;
		    this.aceite1.body.allowGravity = false;
		    this.botonestalactita = this.game.add.sprite(1040, 330, 'beaceite');
		    activatedc = false;
		    ObjetoTrampas.OPressed = false;
		},
		ptrap: function(){
			this.p1.body.velocity.x = 300;
			this.p2.body.velocity.x = 300;
			this.p3.body.velocity.x = 300;
			this.botonflecha = this.game.add.sprite(1040, 300, 'baelfo');
			game.time.events.add(Phaser.Timer.SECOND * 7, this.prelease, this);
		},
		//resetea las fotos
		prelease: function(){
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
		    activatedgp = false;
		    ObjetoTrampas.PPressed = false;
		},
		//crea todos los elementos estaticos del mundo
		crearmundo: function(){
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
		},
		//renderia los elementos de la UI
		render: function () {
			 if (this.timer.running) {
		            game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), game.world.centerX-50, 590, "#ffffff",'50px Arial');
		        }
		        game.debug.text("Puntuacion Chaser: "+JustRun.puntuacionC, 100, 590, "#ffffff",'20px Arial');
		        game.debug.text("Puntuacion Escapist: "+ JustRun.puntuacionE, 750, 590, "#ffffff",'20px Arial');
	    },
	    //gestiona el cambio cuando se acaba el tiempo
	    endTimer: function() {
	    	this.timer.stop();
	        ObjetoEscapist.puntuacion++;
			game.add.sprite(0,0,"libre");
		    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
	    },
	    crearJugadores: function(){
			ObjetoChaser = {
					ID: "Chaser",
					posicionX: 60,
					posicionY: 300,
					puntuacion: JustRun.puntuacionC,
				};
				ObjetoEscapist = {
					ID: "Escapist",
					posicionX: 1000,
					posicionY: 300,
					puntuacion: JustRun.puntuacionE,
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
			ObjetoChaser.puntuacion = JustRun.puntuacionC;
			ObjetoEscapist.puntuacion = JustRun.puntuacionE;
			chaser = game.add.sprite(ObjetoChaser.posicionX, ObjetoChaser.posicionY, 'chaser');
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
    	    
    	    //variable para comprobar el salto
    	    jumping = false;
    	    
    	    escapist = game.add.sprite(ObjetoEscapist.posicionX, ObjetoEscapist.posicionY, 'escapist');
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
		    escapist.animations.play('idle');

		    escapist.anchor.setTo(0.3,0.5);			    
		    jumping1 = false;	 
		},
	    //genera el cambio de pantallas
	    cambio: function(){
	    	game.sound.stopAll();
	    	if(ObjetoEscapist.cazado && !sumado){
	    		ObjetoEscapist.puntuacion++;
	    		JustRun.puntuacionE++;
	    		sumado = true;
	    	}else if(!sumado1){
	    		ObjetoChaser.puntuacion++;
	    		JustRun.puntuacionC++;
	    		sumado1 = true;
	    	}
	    	this.sendear();
	    	game.sound.stopAll();
	    	ObjetoChaser.posicionX = 60;
	    	ObjetoChaser.posicionY = 300;
	    	ObjetoEscapist.posicionX = 1000;
	    	ObjetoEscapist.posicionY = 300;
	    	game.state.start("loadcarga_desierto");
	    },
	    //crea el formato de timer
	    formatTime: function(s) {
	        var minutes = "0" + Math.floor(s / 60);
	        var seconds = "0" + (s - minutes * 60);
	        return minutes.substr(-2) + ":" + seconds.substr(-2);   
	    },
	    sendear: function(){
	    	object = {
	    		id:"post",
	    		ChaserX: ObjetoChaser.posicionX,
	    		ChaserY: ObjetoChaser.posicionY,
	    		ChaserPuntuacion: ObjetoChaser.puntuacion,
	    		EscapistX: ObjetoEscapist.posicionX,
	    		EscapistY: ObjetoEscapist.posicionY,
	    		EscapistPuntuacion: ObjetoEscapist.puntuacion,
	    		EscapistCazado: ObjetoEscapist.cazado,
	    		IPressed: ObjetoTrampas.IPressed,
	    		OPressed: ObjetoTrampas.OPressed,
	    		PPressed: ObjetoTrampas.PPressed,
	    		ChaserIdle: ObjetoAnimaciones.ChaserIdle,
	    		ChaserRunL: ObjetoAnimaciones.ChaserRunL,
	    		ChaserRunR: ObjetoAnimaciones.ChaserRunR,
	    		ChaserJump: ObjetoAnimaciones.ChaserJump,
	    		EscapistIdle: ObjetoAnimaciones.EscapistIdle,
	    		EscapistRunL: ObjetoAnimaciones.EscapistRunL,
	    		EscapistRunR: ObjetoAnimaciones.EscapistRunR,
	    		EscapistJump: ObjetoAnimaciones.EscapistJump,
	    	}
	    	connection.send(JSON.stringify(object));
	    },
		//crea el timer, su maximo de tiempo y lo inicia
		initTimer: function(){		
	        this.timer = this.game.time.create();
	       
	        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);

	        this.timer.start();
		},
		//inicializa las trampas
		initTraps: function(){
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
		},
		//inicializa las colisiones
		initCollisions: function(){
			this.onTheGround = game.physics.arcade.collide(chaser, this.ground);
		    this.onTheLedge = game.physics.arcade.collide(chaser, this.wood);
		    game.physics.arcade.collide(chaser, this.bola);
		    game.physics.arcade.collide(chaser, this.aceite1);
		    game.physics.arcade.collide(chaser, this.p1);
		    game.physics.arcade.collide(chaser, this.p2);
		    game.physics.arcade.collide(chaser, this.p3);
		    this.onTheGround1 = game.physics.arcade.collide(escapist, this.ground);
		    game.physics.arcade.collide(escapist, this.water);
		    this.onTheLedge1 = game.physics.arcade.collide(escapist, this.wood);
		    this.catched = game.physics.arcade.collide(escapist, chaser);
		},
		
}
