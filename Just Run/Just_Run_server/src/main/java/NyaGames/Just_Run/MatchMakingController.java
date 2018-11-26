package NyaGames.Just_Run;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@RestController
@RequestMapping("/matchmaking")
public class MatchMakingController {
	Chaser chaser = null;
	Escapist escapist = null;
	
	//inicia la partida si estan los dos jugadores conectados
	@CrossOrigin
	@GetMapping
	public boolean getPlayersConnected(){
		if(chaser == null || escapist == null) {
			return false;
		}else {
			return true;
		}
	}	
	
	//recibe un jugador, el primero que se conecte será el chaser y el segundo el escapist
	@CrossOrigin
	@PostMapping
	public ResponseEntity<Boolean> ConnectedUser(){
		if(chaser == null) {
			chaser = new Chaser();
			return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
		}else if(escapist == null) {
			escapist = new Escapist();
			return new ResponseEntity<>(false, HttpStatus.ACCEPTED);
		}
		return new ResponseEntity<>(false, HttpStatus.ACCEPTED);
	}	
	
	//borra la información del servidor para poder resetear la partida
	@CrossOrigin
	@DeleteMapping
	public void reset() {
		chaser = null;
		escapist = null;
	}
}
