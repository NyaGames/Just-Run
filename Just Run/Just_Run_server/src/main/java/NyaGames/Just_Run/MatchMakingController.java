package NyaGames.Just_Run;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;


@RestController
@RequestMapping("/matchmaking")
public class MatchMakingController {
	int jugadores = 0;
	
	@GetMapping
	@ResponseStatus(HttpStatus.CREATED)
	public int getPlayersConnected(){
		return jugadores;	
	}
	
	@PostMapping
	public ResponseEntity<Boolean> ConnectedUser(){
		jugadores++;
		return new ResponseEntity<>(true, HttpStatus.ACCEPTED);
	}	
}
