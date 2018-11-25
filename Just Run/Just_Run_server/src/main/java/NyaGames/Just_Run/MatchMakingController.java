package NyaGames.Just_Run;

import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;

@RestController
@RequestMapping("/matchmaking")
public class MatchMakingController {
	Chaser chaser = null;
	Escapist escapist = null;
	
	@CrossOrigin(origins = "192.168.1.108:8080")
	@GetMapping
	public boolean getPlayersConnected(){
		if(chaser == null || escapist == null) {
			return false;
		}else {
			return true;
		}
	}	
	
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
	@CrossOrigin
	@DeleteMapping
	public void reset() {
		chaser = null;
		escapist = null;
	}
}
