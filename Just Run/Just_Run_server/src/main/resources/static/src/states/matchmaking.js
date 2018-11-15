var matchmakingState = function(Just_Run) {	
	matchmakingState.prototype.preload = function(){

	}

	matchmakingState.prototype.create = function(){
		$.get("http://localhost:8080/matchmaking", function(data){
			if(data === 0){
				$.post("http://localhost:8080/matchmaking");
			}else if(data > 0){
				game.state.start('tutorial');
			}
		})
		text = "Esperando jugadores..\n"
	    style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "center" };
	    spr_text = game.add.text(game.world.centerX-100, 50, text, style);

	    //animacion pantalla carga
	    var pantallacarga = game.add.sprite(940, 470, 'carga');
	    pantallacarga.scale.setTo(0.2,0.2);
		var loading = pantallacarga.animations.add('load');
		pantallacarga.animations.play('load', 26, true);
	}

}