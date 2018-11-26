package NyaGames.Just_Run;
import org.springframework.web.bind.annotation.*;
import org.springframework.http.*;
@RestController
@RequestMapping("/chaser")
public class ChaserController {
	Chaser chaser;
	
	//crea el chaser con unas posiciones por default
	@CrossOrigin
	@PostMapping
	@ResponseStatus(HttpStatus.CREATED)
	public Chaser createChaser() {
		chaser = new Chaser();
		
		chaser.setID();
		chaser.setPosicionX(60);
		chaser.setPosicionY(300);
		chaser.setPuntuacion(0);
		
		return chaser;
	}	
	
	//recibe el objeto chaser del cliente
	@CrossOrigin
	@GetMapping
	@ResponseStatus(HttpStatus.CREATED)
	public ResponseEntity<Chaser> getChaser(){
		Chaser savedChaser = chaser;
		
		if(savedChaser != null) {
			return new ResponseEntity<>(savedChaser, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//actualiza el chaser del servidor con la informacion que recibe
	@CrossOrigin
	@PutMapping
	public ResponseEntity<Chaser> updateChaser(@RequestBody Chaser GameChaser){
		Chaser savedChaser = chaser;
		if(savedChaser != null) {
			chaser.setPosicionX(GameChaser.getPosicionX());
			chaser.setPosicionY(GameChaser.getPosicionY());
			chaser.setPuntuacion(GameChaser.getPuntuacion());
			return new ResponseEntity<>(chaser, HttpStatus.OK);
		}else {
			return new ResponseEntity<>(HttpStatus.NOT_FOUND);
		}
	}
	
	//resetea la posicion del chaser
	@CrossOrigin
	@DeleteMapping
	public void deleteChaser(@RequestBody int GameChaser){
		Chaser savedchaser = chaser;
		if(savedchaser != null) {
			chaser.setPosicionX(60);
			chaser.setPosicionY(300);
			chaser.setPuntuacion(GameChaser);
			System.out.println(chaser.getPuntuacion());
	}
	}
	
}
