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