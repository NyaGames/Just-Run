var matchmakingState = function(Just_Run) {	
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
	}
}