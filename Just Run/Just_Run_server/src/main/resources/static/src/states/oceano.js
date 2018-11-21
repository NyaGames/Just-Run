JustRun.playoceanoState = function(game){
	
}

JustRun.playoceanoState.prototype = {
	create: function() {        	
		//inicializacion de los sprites
	    this.background = game.add.sprite(0,0,'sea');
	    song = game.add.audio('song');
		song.play();
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
	},

	update: function() {
		this.initCollisions();
		//se ejecuta siempre y cuando el tiempo no se haya acabado, o no se haya pillado al escapista
		if(this.timer.running){
	    if(!this.catched){
	    	//respawn si se sale del mapa
	     if(this.chaser.body.position.y > this.game.height - 64){
	    	this.chaser.body.position.x = 60;
	    	this.chaser.body.position.y = this.game.height - 300;
	    }
	    if(this.escapist.body.position.y > this.game.height - 64){
	    	this.escapist.body.position.x = 1000;
	    	this.escapist.body.position.y = this.game.height - 300;
	    }
		
	    //bloque que se cae
	    if(this.onTheLedge){
	    	this.ledge.body.allowGravity = true;
	    	this.activatedg = true;
	    	game.time.events.add(Phaser.Timer.SECOND * 5, this.platform, this);
	    }
	    //salto alto  de las burbujas
	    if(this.onBubble){
	    	this.chaser.body.velocity.y = this.salto*2;
	    }
	    if(this.onBubble1){
	    	this.escapist.body.velocity.y = this.salto*2;
	    }
	    //control izquierda/derecha y gestión de las animaciones
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
	    //control de las trampas
	    if(this.spikes && this.activatedgp){
	    	this.chaser.body.velocity.x = this.salto;
	    }
	    if (this.IinputIsActive() && !this.activatedb){
	    		this.activatedb = true;	    		
		    	this.sharktrap();	
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

	},
	platform: function(){
		this.ledge.destroy();
		this.activatedg = false;
		this.ledge = this.game.add.sprite(460, this.game.height - 350, 'piedra');
	    this.game.physics.enable(this.ledge, Phaser.Physics.ARCADE);
	    this.ledge.body.immovable = true;
	    this.ledge.body.allowGravity = false;
	}
	//controles con las flechas y devuelven un bool en caso de que este activo	
	leftInputIsActive: function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.LEFT);
	    return isActive;
	},
	rightInputIsActive: function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.RIGHT);
	    return isActive;
	},
	//recibe un duración para evitar saltos infinitos
	upInputIsActive: function(duration) {
	    var isActive = false;
	    isActive = this.input.keyboard.downDuration(Phaser.Keyboard.UP, duration);
	    return isActive;
	},
	upInputReleased: function() {
	    var released = false;
	    released = this.input.keyboard.upDuration(Phaser.Keyboard.UP);
	    return released;
	},
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
	//control de las trampas
	spaceInputIsAcive: function() {
	    var isActive = false;
	    isActive = this.input.keyboard.isDown(Phaser.Keyboard.SPACEBAR);
	    return isActive;
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
	//activa el tiburon
	sharktrap: function(){		
	    this.tiburon.animations.play('rodar', 12, true);
		this.tiburon.body.velocity.x = (-this.tiburon.body.position.x + this.chaser.body.position.x)/2;
		this.tiburon.body.velocity.y = (-this.tiburon.body.position.y + this.chaser.body.position.y)/2;
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
	    this.activatedb = false;
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
	    this.activatedc = false;
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
	    this.activatedgp = false;
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
	//muestra la IU por pantalla
	render = function () {
        if (this.timer.running) {
            this.game.debug.text(this.formatTime(Math.round((this.timerEvent.delay - this.timer.ms) / 1000)), this.game.world.centerX-50, 590, "#ffffff",'50px Arial');
        }
        this.game.debug.text("Puntuacion Chaser: "+this.pchaser, 100, 590, "#ffffff",'20px Arial');
        this.game.debug.text("Puntuacion Escapist: "+this.pescapist, 750, 590, "#ffffff",'20px Arial');
    },
    //para el cronometro y gestiona la puntuacion
    endTimer: function() {
        this.timer.stop();
        this.pescapist++;
	    this.game.add.sprite(0,0,"libre");
	    game.time.events.add(Phaser.Timer.SECOND * 2,this.cambio,this);
    },
    //gestiona el cammbio de pantalla
    cambio: function(){
    	if(this.catched){
    		this.pchaser = this.game.state.states["playdesierto"].pchaser+1;
    	}
    	game.sound.stopAll();
    	game.state.start('loadcarga_volcan');
    },
    //crea la logica del cronometro
    formatTime = function(s) {
        var minutes = "0" + Math.floor(s / 60);
        var seconds = "0" + (s - minutes * 60);
        return minutes.substr(-2) + ":" + seconds.substr(-2);   
    },
    //carga la puntuacion del nivel anterior
    init: function(){
    	this.pchaser = this.game.state.states["playdesierto"].pchaser;
    	this.pescapist = this.game.state.states["playdesierto"].pescapist;
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
    },
    //crea los jugadores y todas las variables relacionadas	
	crearJugadores: function(){
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

	    //variable para las trampas
	    this.activatedb = false;
	    this.activatedc = false;
	    this.activatedgp = false;

	    //crea los botones
	    this.botonerizo = this.game.add.sprite(1040, 300, 'beerizo');
	    this.botonestalactita = this.game.add.sprite(1040, 330, 'beancla');
	    this.botontiburon = this.game.add.sprite(1040, 360, 'betiburon');

	},
	//inicializa las colisiones
	initCollisions: function(){		
	    this.onTheGround = game.physics.arcade.collide(this.chaser, this.ground);
	    game.physics.arcade.collide(this.chaser, this.tiburon);
	    game.physics.arcade.collide(this.chaser, this.ancla1);
	    game.physics.arcade.collide(this.chaser, this.ancla2);
	    this.spikes = game.physics.arcade.collide(this.chaser, this.erizos);
	    this.onTheLedge = game.physics.arcade.collide(this.chaser, this.ledge);
	    this.onTheLedge1 = game.physics.arcade.collide(this.escapist, this.ledge);
	    this.onBubble = game.physics.arcade.collide(this.chaser, this.burbuja);
	    this.onBubble1 = game.physics.arcade.collide(this.escapist, this.burbuja);
	    game.physics.arcade.collide(this.chaser, this.p1);
	    game.physics.arcade.collide(this.chaser, this.p2);
	    game.physics.arcade.collide(this.chaser, this.p3);
	    this.onTheGround1 = game.physics.arcade.collide(this.escapist, this.ground);
	    this.catched = game.physics.arcade.collide(this.escapist, this.chaser);
	}
}