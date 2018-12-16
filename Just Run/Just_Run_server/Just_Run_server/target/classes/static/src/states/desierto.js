JustRun.playdesiertoState = function(game){
	
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
JustRun.playdesiertoState.prototype = {		
	create: function() {        	
		//inicializacion de los sprites
	    this.background = game.add.sprite(0,0,'fondo');
	    
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
		    this.sendear();
		}else{	
			//se ha pillado al escapista se muestra la pantalla de cazado y se empieza el cambio de escenas
			//control del cambio de pantallas
    		JustRun.puntuacionC = 1;
    		JustRun.puntuacionE = 0;
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
	//metodos de las trampas
	//funcion que ejecuta el movimiento de la bola a ras de suelo, modificando la velocidad, cambiando el boton y llamando al metodo que resetea la trampa tras x tiempo
	balltrap: function(){	
		this.bola.scale.setTo(0.5,0.5);		
	    this.bola.animations.play('rodar', 12, true);
		this.bola.body.velocity.x = -200;
		this.botonbola = this.game.add.sprite(1040, 360, 'baTW');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
	},
	//reseta la trampa de la bola
	ballrelease: function(){
		this.bola.destroy();
		this.bola = this.game.add.sprite(1100, 380, 'tweed');
	    var rodar = this.bola.animations.add('rodar');
	    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
	    this.bola.body.immovable = true;
	    this.bola.body.allowGravity = false;	
	    this.botonbola = this.game.add.sprite(1040, 360, 'beTW');
	    activatedb = false;
	    ObjetoTrampas.IPressed = false;
	},	
	//activa la velocidad de la bala para que vaya a la posicion del chaser
	strap: function(){
		this.bala.body.velocity.x = (-this.bala.body.position.x + chaser.body.position.x)*2;
		this.bala.body.velocity.y = (-this.bala.body.position.y + chaser.body.position.y)*2;
	    this.botonbala = this.game.add.sprite(1040, 330, 'bavaquero');
	    game.time.events.add(Phaser.Timer.SECOND * 5, this.srelease, this);
	},
	//resetea la posicion y velocidad de la bala
	srelease: function(){
		this.bala.destroy();
		this.bala = this.game.add.sprite(-50, this.game.height-220, 'bala');
	    this.game.physics.enable(this.bala, Phaser.Physics.ARCADE);
	    this.bala.body.immovable = true;
	    this.bala.body.allowGravity = false;
	   
	    this.botonbala = this.game.add.sprite(1040, 330, 'bevaquero');
	    activatedc = false;
	    ObjetoTrampas.OPressed = false;
	},
	//activa la velocidad de los buitres
	ptrap: function(){
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
	},
	//resetea los buitres en posicion y velocidad
	prelease: function(){
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
	    activatedgp = false;
	    ObjetoTrampas.PPressed = false;
	},
	//crea todo el mundo, los diversos grupos de colisiones de cara a definir las interacciones
	crearmundo: function(){
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
    crearJugadores: function(){
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
				ObjetoEscapist.cazado = false;
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
    	ObjetoChaser.posicionX = 60;
    	ObjetoChaser.posicionY = 300;
    	ObjetoChaser.puntuacion += JustRun.puntuacionC;
    	ObjetoEscapist.posicionX = 1000;
    	ObjetoEscapist.posicionY = 300;
    	ObjetoEscapist.puntuacion += JustRun.puntuacionE;
    	ObjetoEscapist.cazado = false;
    	console.log(ObjetoChaser.puntuacion);
    	console.log(ObjetoEscapist.puntuacion);
    	this.sendear();
    	game.state.start("loadcarga_oceano");
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
	initTraps: function(){
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
	},
    //inicializa todas las colisiones y las variables booleanas relacionadas
    initCollisions: function(){
    	this.onTheGround = game.physics.arcade.collide(chaser, this.ground);
	    this.onTheLedge = game.physics.arcade.collide(chaser, this.ice);
	    game.physics.arcade.collide(chaser, this.bola);
	    game.physics.arcade.collide(chaser, this.buitre1);
	    game.physics.arcade.collide(chaser, this.buitre2);
	    game.physics.arcade.collide(chaser, this.buitre3);
	    game.physics.arcade.collide(chaser, this.cactus);
	    game.physics.arcade.collide(chaser, this.bala);
	    this.onTheGround1 = game.physics.arcade.collide(escapist, this.ground);
	    this.onTheLedge1 = game.physics.arcade.collide(escapist, this.ice);
	    game.physics.arcade.collide(escapist, this.wtrap);
	    game.physics.arcade.collide(escapist, this.itrap);
	    this.catched = game.physics.arcade.collide(escapist, chaser);
    }
}