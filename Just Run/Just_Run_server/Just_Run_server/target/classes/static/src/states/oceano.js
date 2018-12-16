JustRun.playoceanoState = function(game){
	
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
JustRun.playoceanoState.prototype = {
	create: function() {        	
		//inicializacion de los sprites
	    this.background = game.add.sprite(0,0,'sea');
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
	    //comprueba que el tiempo no se ha acabado y que el escapist no ha sido cazado
	    if(this.timer.running){
	    	if((ObjetoChaser.posicionX >= ObjetoEscapist.posicionX && ObjetoChaser.posicionX < ObjetoEscapist.posicionX + 60)||(ObjetoChaser.posicionX+60 >= ObjetoEscapist.posicionX && ObjetoChaser.posicionX+60 < ObjetoEscapist.posicionX+60)){
				if((ObjetoChaser.posicionY >= ObjetoEscapist.posicionY && ObjetoChaser.posicionY < ObjetoEscapist.posicionY + 60)||(ObjetoChaser.posicionY+60 >= ObjetoEscapist.posicionY && ObjetoChaser.posicionY+60 < ObjetoEscapist.posicionY+60)){
					ObjetoEscapist.cazado = true;
				}		
			}
	    if(!ObjetoEscapist.cazado){		

		    //salto alto  de las burbujas
		    if(this.onBubble){
		    	chaser.body.velocity.y = this.salto*2;
		    }
		    if(this.onBubble1){
		    	escapist.body.velocity.y = this.salto*2;
		    }
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
				    	this.sharktrap();
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
					    	this.sharktrap();
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
	//activa el tiburon
	sharktrap: function(){		
	    this.tiburon.animations.play('rodar', 12, true);
		this.tiburon.body.velocity.x = (-this.tiburon.body.position.x + chaser.body.position.x)/2;
		this.tiburon.body.velocity.y = (-this.tiburon.body.position.y + chaser.body.position.y)/2;
		this.botontiburon = this.game.add.sprite(1040, 360, 'batiburon');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.sharkrelease, this);
	},
	//resetea el tiburon
	sharkrelease: function(){
		this.tiburon.destroy();
		this.tiburon = this.game.add.sprite(1100, 367, 'shark');
	    var rodar = this.tiburon.animations.add('rodar');
	    this.game.physics.enable(this.tiburon, Phaser.Physics.ARCADE);
	    this.tiburon.body.immovable = true;
	    this.tiburon.body.allowGravity = false;	
	    this.botontiburon = this.game.add.sprite(1040, 360, 'betiburon');
	    activatedb = false;
	    ObjetoTrampas.IPressed = false;
	},
	//activa el ancla
	strap: function(){
		this.ancla1.body.allowGravity = true;
	    this.ancla2.body.allowGravity = true;
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'baestalactita');
	    game.time.events.add(Phaser.Timer.SECOND * 7, this.srelease, this);
	},
	//resetea el ancla
	srelease: function(){
		this.ancla1.destroy();
		this.ancla2.destroy();
		this.ancla1 = this.game.add.sprite(0, -90, 'ancla');
	    this.game.physics.enable(this.ancla1, Phaser.Physics.ARCADE);
	    this.ancla1.body.immovable = true;
	    this.ancla1.body.allowGravity = false;
	    this.ancla2 = this.game.add.sprite(928, -90, 'ancla');
	    this.game.physics.enable(this.ancla2, Phaser.Physics.ARCADE);
	    this.ancla2.body.immovable = true;
	    this.ancla2.body.allowGravity = false;
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'beancla');
	    activatedc = false;
	    ObjetoTrampas.OPressed = false;
	},
	//activa la trampa de los erizos y inicia el timer hasta el reseteo
	ptrap: function(){
		this.p1.destroy();
		this.p2.destroy();
		this.p3.destroy();
		this.p4.destroy();
		this.p1 = this.game.add.sprite(264, 90, 'erizoa');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.erizos.add(this.p1);
	    this.p2 = this.game.add.sprite(256,335, 'erizoa');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.erizos.add(this.p2);
	    this.p3 = this.game.add.sprite(850,335, 'erizoa');
	    this.game.physics.enable(this.p3, Phaser.Physics.ARCADE);
	    this.p3.body.immovable = true;
	    this.p3.body.allowGravity = false;
	    this.erizos.add(this.p3);
	    this.p4 = this.game.add.sprite(818, 90, 'erizoa');
	    this.game.physics.enable(this.p4, Phaser.Physics.ARCADE);
	    this.p4.body.immovable = true;
	    this.p4.body.allowGravity = false;
	    this.erizos.add(this.p4);
		this.botonerizo = this.game.add.sprite(1040, 300, 'baerizo');
		game.time.events.add(Phaser.Timer.SECOND * 7, this.prelease, this);
	},
	//resetea la trampa de los erizos
	prelease: function(){
		this.p1.destroy();
		this.p2.destroy();
		this.p3.destroy();
		this.p4.destroy();
		this.p1 = this.game.add.sprite(264, 90, 'erizo');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.erizos.add(this.p1);
	    this.p2 = this.game.add.sprite(256,335, 'erizo');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.erizos.add(this.p2);
	    this.p3 = this.game.add.sprite(850,335, 'erizo');
	    this.game.physics.enable(this.p3, Phaser.Physics.ARCADE);
	    this.p3.body.immovable = true;
	    this.p3.body.allowGravity = false;
	    this.erizos.add(this.p3);
	    this.p4 = this.game.add.sprite(818, 90, 'erizo');
	    this.game.physics.enable(this.p4, Phaser.Physics.ARCADE);
	    this.p4.body.immovable = true;
	    this.p4.body.allowGravity = false;
	    this.erizos.add(this.p4);
	    this.botonerizo = this.game.add.sprite(1040, 300, 'beerizo');
	    activatedgp = false;
	    ObjetoTrampas.PPressed = false;
	},
	//crea todos los bloque inamovibles
	crearmundo: function(){
		this.ground = this.game.add.group();
		this.burbuja= this.game.add.group();

		this.ledge = this.game.add.sprite(460, this.game.height - 350, 'piedra');
	    this.game.physics.enable(this.ledge, Phaser.Physics.ARCADE);
	    this.ledge.body.immovable = true;
	    this.ledge.body.allowGravity = false;

	    var block;
	    for(var i = 0; i <34; i++){
	    	if(i ==1){
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
			    block = this.game.add.sprite(i*32, this.game.height - 128, 'ground');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
	    	}
	    	if(i == 0 || i == 29){
	    		block = this.game.add.sprite(32*i, this.game.height - 158, 'bubble');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.burbuja.add(block);
	    	}
	    	if(i == 31){
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
			    block = this.game.add.sprite(i*32, this.game.height - 128, 'ground');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
	    	}
	    	if(i > 8 && i < 21){
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
			    block = this.game.add.sprite(i*32, this.game.height - 128, 'ground');
		    	this.game.physics.enable(block, Phaser.Physics.ARCADE);
			    block.body.immovable = true;
			    block.body.allowGravity = false;
			    this.ground.add(block);
			}
	    }

	    block = this.game.add.sprite(120, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(152, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(184, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(216, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(248, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(280, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

	    block = this.game.add.sprite(700, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(732, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(764, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(796, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(828, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(860, this.game.height - 250, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);


	    block = this.game.add.sprite(760, this.game.height - 500, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(792, this.game.height - 500, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(824, this.game.height - 500, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);

	    block = this.game.add.sprite(280, this.game.height - 500, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(312, this.game.height - 500, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	    block = this.game.add.sprite(344, this.game.height - 500, 'ground');
	    this.game.physics.enable(block, Phaser.Physics.ARCADE);
	    block.body.immovable = true;
	    block.body.allowGravity = false;
	    this.ground.add(block);
	},
	//renderia los elementos de la UI
	render: function () {
		 if (this.timer.running) {
	            game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), game.world.centerX-50, 590, "#ffffff",'50px Arial');
	        }
	        game.debug.text("Puntuacion Chaser: "+ ObjetoChaser.puntuacion, 100, 590, "#ffffff",'20px Arial');
	        game.debug.text("Puntuacion Escapist: "+ ObjetoEscapist.puntuacion, 750, 590, "#ffffff",'20px Arial');
    },
    //gestiona el cambio cuando se acaba el tiempo
    endTimer: function() {
    	this.timer.stop();
		JustRun.puntuacionE = 1;
		JustRun.puntuacionC = 0;
		game.add.sprite(0,0,"libre");
	    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
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
    	game.state.start("loadcarga_volcan");
    },
    //crea el formato de timer
    formatTime: function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },
	//crea el timer, su maximo de tiempo y lo inicia
	initTimer: function(){		
        this.timer = this.game.time.create();
       
        this.timerEvent = this.timer.add(Phaser.Timer.SECOND * 30, this.endTimer, this);

        this.timer.start();
	},
	//inicializa las trampas
	initTraps: function(){

	    //crear tiburon
	    this.tiburon = this.game.add.sprite(1100, 367, 'shark');
	    var rodar = this.tiburon.animations.add('rodar');
	    this.game.physics.enable(this.tiburon, Phaser.Physics.ARCADE);
	    this.tiburon.body.immovable = true;
	    this.tiburon.body.allowGravity = false;
	    //crear anclas
	    this.ancla1 = this.game.add.sprite(0, -90, 'ancla');
	    this.game.physics.enable(this.ancla1, Phaser.Physics.ARCADE);
	    this.ancla1.body.immovable = true;
	    this.ancla1.body.allowGravity = false;
	    this.ancla2 = this.game.add.sprite(928, -90, 'ancla');
	    this.game.physics.enable(this.ancla2, Phaser.Physics.ARCADE);
	    this.ancla2.body.immovable = true;
	    this.ancla2.body.allowGravity = false;

	    this.erizos = game.add.group();
	    //crear erizos
	    this.p1 = this.game.add.sprite(284, 90, 'erizo');
	    this.game.physics.enable(this.p1, Phaser.Physics.ARCADE);
	    this.p1.body.immovable = true;
	    this.p1.body.allowGravity = false;
	    this.erizos.add(this.p1);
	    this.p2 = this.game.add.sprite(256,335, 'erizo');
	    this.game.physics.enable(this.p2, Phaser.Physics.ARCADE);
	    this.p2.body.immovable = true;
	    this.p2.body.allowGravity = false;
	    this.erizos.add(this.p2);
	    this.p3 = this.game.add.sprite(850,335, 'erizo');
	    this.game.physics.enable(this.p3, Phaser.Physics.ARCADE);
	    this.p3.body.immovable = true;
	    this.p3.body.allowGravity = false;
	    this.erizos.add(this.p3);
	    this.p4 = this.game.add.sprite(818, 90, 'erizo');
	    this.game.physics.enable(this.p4, Phaser.Physics.ARCADE);
	    this.p4.body.immovable = true;
	    this.p4.body.allowGravity = false;
	    this.erizos.add(this.p4);
	    //crea los botones
	    this.botonerizo = this.game.add.sprite(1040, 300, 'beerizo');
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'beancla');
	    this.botontiburon = this.game.add.sprite(1040, 360, 'betiburon');

	},
	//inicializa las colisiones
	initCollisions: function(){		
	    this.onTheGround = game.physics.arcade.collide(chaser, this.ground);
	    game.physics.arcade.collide(chaser, this.tiburon);
	    game.physics.arcade.collide(chaser, this.ancla1);
	    game.physics.arcade.collide(chaser, this.ancla2);
	    this.spikes = game.physics.arcade.collide(chaser, this.erizos);
	    this.onTheLedge = game.physics.arcade.collide(chaser, this.ledge);
	    this.onTheLedge1 = game.physics.arcade.collide(escapist, this.ledge);
	    this.onBubble = game.physics.arcade.collide(chaser, this.burbuja);
	    this.onBubble1 = game.physics.arcade.collide(escapist, this.burbuja);
	    game.physics.arcade.collide(chaser, this.p1);
	    game.physics.arcade.collide(chaser, this.p2);
	    game.physics.arcade.collide(chaser, this.p3);
	    this.onTheGround1 = game.physics.arcade.collide(escapist, this.ground);
	    this.catched = game.physics.arcade.collide(escapist, chaser);
	}
}