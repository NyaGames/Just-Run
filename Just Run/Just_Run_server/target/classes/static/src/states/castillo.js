JustRun.playcastilloState = function(game){
	
}	
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
//variables del movimiento
var velocidadmaxima = 300;
var aceleracion = 500;
var frenada = 3600;
var gravedad = 1500; 
var salto = -600;

var jumping;
var jumping1;

var cargacompleta = false;
var cargacompleta1 = false;

var corriendoizq = false;
var corriendoder = false;
var saltando = false;


//variable para las trampas
var activatedb = false;
var activatedc = false;
var activatedgp = false;  
JustRun.playcastilloState.prototype = {
		init: function(){
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
			this.getTrampas(function (data){
				IPressed = data.I;
				OPressed = data.O;
				PPressed = data.P;
			})
		},
		create: function() {        	
			//inicializacion de los sprites
		    this.background = game.add.sprite(0,0,'castle');
		    
		    this.initTraps();
		    this.crearmundo();    
		    this.initTimer();
		    this.init();
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
		update: function(){
		//crea las colisiones que los diversos elementos del mapa, asi como las variables de control usadas durante el nivel
	    this.initCollisions();
	    //comprueba que el tiempo no se ha acabado y que el escapist no ha sido cazado

	    if(cargacompleta && cargacompleta1){
	    if(this.timer.running){
	    if(!this.catched){	    	
	    	chaser.ID = "Chaser";
	    	escapist.ID = "Escapist";
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
			
	    	if(chaser.body.position.x < escapist.body.position.x+70 && chaser.body.position.x > escapist.body.position.x-70){
	    		if(chaser.body.position.y < escapist.body.position.y+50 && chaser.body.position.x > escapist.body.position.y-50){
	    			game.add.sprite(0,0,"catched");
			    	game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
	    		}
	    	}
	    	if(JustRun.userID == 1){
	    		 $.ajax({
			    		method: "GET",
			    		url: "/escapist",
			    		processData: false,
			    		headers: {
			    			"Content-Type": "application/json"
			    		}
			    	}).done(function(data){
				    	if(newposicionEscapist.x > data.posicionX - 10){
				    		corriendoizq = true;
				    		corriendoder = false;
				    		saltando = false;
				    	}else if(newposicionEscapist.x < data.posicionX + 10){
				    		corriendoder = true;
				    		corriendoizq = false;
				    		saltando = false;
				    	}
				    		newposicionEscapist.x = data.posicionX;
				    		newposicionEscapist.y = data.posicionY;
			    	});
	    		 if(saltando){
	    			 if(corriendoizq){
	    				 escapist.scale.setTo(-1,1);
	    			 }else if (corriendoder){
	    				 escapist.scale.setTo(1,1);
	    			 }
	    			 escapist.animations.play("doblejump");
	    		 }else if(corriendoizq){
	    			 escapist.scale.setTo(-1,1);
	    			 escapist.animations.play("run");
	    		 }else if(corriendoder){
	    			 escapist.scale.setTo(1,1);
	    			 escapist.animations.play("run");
	    		 }else{
	    			 escapist.animations.play("idle");
	    		 }
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
	    		 //control de movimiento y de las animaciones
			    if (this.AInputIsActive()) {
			    	chaser.scale.setTo(-1, 1);
			    	if(this.onTheGround || this.onTheLedge){
			    		chaser.animations.play('run');
			    		
			    	}
			        	chaser.body.acceleration.x = -aceleracion;
			        	chaser.posicionX = chaser.body.position.x;
			        	chaser.posicionY = chaser.body.position.y;
			    } else if (this.DInputIsActive()) {
			    	chaser.scale.setTo(1, 1);
			    	if(this.onTheGround || this.onTheLedge){
			    		chaser.animations.play('run'); 
			    	}
			        	chaser.body.acceleration.x = aceleracion;
			        	chaser.posicionX = chaser.body.position.x;
			        	chaser.posicionY = chaser.body.position.y;
			    } else {
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
			    $.ajax({
		    		method: "GET",
		    		url: "/chaser",
		    		processData: false,
		    		headers: {
		    			"Content-Type": "application/json"
		    		}
		    	}).done(function(data){
		    		if(newposicionChaser.x > data.posicionX - 10){
			    		corriendoizq = true;
			    		corriendoder = false;
			    		saltando = false;
			    	}else if(newposicionChaser.x < data.posicionX + 10){
			    		corriendoder = true;
			    		corriendoizq = false;
			    		saltando = false;
			    	}
		    		if(saltando){
		    			 if(corriendoizq){
		    				 chaser.scale.setTo(-1,1);
		    			 }else if (corriendoder){
		    				 chaser.scale.setTo(1,1);
		    			 }
		    			 chaser.animations.play("doblejump");
		    		 }else if(corriendoizq){
		    			 chaser.scale.setTo(-1,1);
		    			 chaser.animations.play("run");
		    		 }else if(corriendoder){
		    			 chaser.scale.setTo(1,1);
		    			 chaser.animations.play("run");
		    		 }else{
		    			 chaser.animations.play("idle");
		    		 }
		    		newposicionChaser.x = data.posicionX;
		    		newposicionChaser.y = data.posicionY;
		    	})
		    	chaser.body.position.x = newposicionChaser.x;
		    	chaser.body.position.y = newposicionChaser.y;
	    		if (this.AInputIsActive()) {
			    	if(this.onTheGround1 || this.onTheLedge1){
			    		escapist.scale.setTo(-1,1);
			    		escapist.animations.play('run');
			    	}
			        	escapist.body.acceleration.x = -aceleracion;
			        	escapist.posicionX = escapist.body.position.x;
			        	escapist.posicionY = escapist.body.position.y;
			        	console.log(escapist);
			    	
			    } else if (this.DInputIsActive()) {
			    	if(this.onTheGround1 || this.onTheLedge1){
			    		escapist.scale.setTo(1,1);
			    		escapist.animations.play('run');
			    	}
			           	escapist.body.acceleration.x = aceleracion;
			           	escapist.posicionX = escapist.body.position.x;
			        	escapist.posicionY = escapist.body.position.y;
			    } else {
			    	escapist.animations.play('idle');
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
		balltrap: function(){
			this.bola.scale.setTo(-1,1);		
		    this.bola.animations.play('rodar', 12, true);
			this.bola.body.velocity.x = -200;
			this.botonbola = this.game.add.sprite(1040, 360, 'bacaballero');
			game.time.events.add(Phaser.Timer.SECOND * 7, this.ballrelease, this);
		},
		ballrelease: function(){
			this.bola.destroy();
			this.bola = this.game.add.sprite(1100, 395, 'horse');
		    var rodar = this.bola.animations.add('rodar');
		    this.game.physics.enable(this.bola, Phaser.Physics.ARCADE);
		    this.bola.body.immovable = true;
		    this.bola.body.allowGravity = false;	
		    this.botonbola = this.game.add.sprite(1040, 360, 'becaballero');
		    activatedb = false;
		    IPressed = false;
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
		    OPressed = false;
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
		    PPressed = false;
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
	            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), this.game.world.centerX-50, 590, "#ffffff",'50px Arial');
	        }
	        this.game.debug.text("Puntuacion Chaser: "+chaser.puntuacion, 100, 590, "#ffffff",'20px Arial');
	        this.game.debug.text("Puntuacion Escapist: "+escapist.puntuacion, 750, 590, "#ffffff",'20px Arial');
	    },
	    //gestiona el cambio cuando se acaba el tiempo
	    endTimer: function() {
	        this.timer.stop();
	        this.pescapist++;
			this.game.add.sprite(0,0,"libre");
		    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
	    },
	    //genera el cambio de pantallas
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
	    	game.state.start('loadcarga_desierto');
	    },
	    //crea el formato de timer
	    formatTime: function(s) {
	        var minutes = "0" + Math.floor(s / 60);
	        var seconds = "0" + (s - minutes * 60);
	        return minutes.substr(-2) + ":" + seconds.substr(-2);   
	    },
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
