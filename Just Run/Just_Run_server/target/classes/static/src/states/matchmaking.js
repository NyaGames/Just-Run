JustRun.matchmakingState = function(game){

	JustRun.userID = -1;
}
var cambio = false;
JustRun.matchmakingState.prototype = {
		create: function(){
			$.ajax({
	    		method: "POST",
	    		url: "/matchmaking",
	    		processData: false,
	    		headers: {
	    			"Content-Type": "application/json"
	    		}
	    	}).done(function(data){
	    		if(data){
	    			JustRun.userID = 1;
	    		}else{
	    			JustRun.userID = 2;
	    		}
	    	})
			
			text = "Esperando jugadores..\n"
		    style = { font: "20px Times New Roman", fill: "#FFFFFF", align: "center" };
		    spr_text = game.add.text(game.world.centerX-100, 50, text, style);
		},
		update: function(){
			$.get("/matchmaking", function(data){
				console.log(data);
				if(data){
					cambio = true;
				}
			})		
			if(cambio){
				game.state.start('tutorial');
			}
		}	
}