package NyaGames.Just_Run;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class Controller{
	public Jugador escapist = new Jugador();
	public Jugador chaser = new Jugador();
	
	@GetMapping(value = "/puntuacionescapist")
	public Jugador getEscapist() {
		return escapist;
	}
	
	@PostMapping(value = "/puntuacionescapist")
	public ResponseEntity<Boolean> setEscapist(@RequestBody Jugador player){
		escapist.ID = player.ID;
		escapist.puntuacion = player.puntuacion;
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
	}
	@GetMapping(value = "/puntuacionchaser")
	public Jugador getChaser() {
		return chaser;
	}
	
	@PostMapping(value = "/puntuacionchaser")
	public ResponseEntity<Boolean> setChaser(@RequestBody Jugador player){
		chaser.ID = player.ID;
		chaser.puntuacion = player.puntuacion;
		return new ResponseEntity<Boolean>(true, HttpStatus.ACCEPTED);
	}
	
}