//controles con las flechas y devuelven un bool en caso de que este activo	
//control con WASD
function AInputIsActive(){
	var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.A);
    return isActive;
}
function DInputIsActive(){
	var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.D);
    return isActive;
}
//recibe un duración para evitar saltos infinitos
function WInputIsActive(duration){
	 var isActive = false;
	 isActive = game.input.keyboard.downDuration(Phaser.Keyboard.W, duration);
	 return isActive;
}
function WInputReleased(){
	var released = false;
    released = game.input.keyboard.upDuration(Phaser.Keyboard.W);
    return released;
}
function IinputIsActive(){
	var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.I);
    return isActive;
}
function OInputIsActive(){
	var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.O);
    return isActive;
}
function PInputIsActive(){
	var isActive = false;
    isActive = game.input.keyboard.isDown(Phaser.Keyboard.P);
    return isActive;
}
//creacion de los jugadores
function crearJugadores(){
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
}
function sendear(){
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
}
function get(){
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
}