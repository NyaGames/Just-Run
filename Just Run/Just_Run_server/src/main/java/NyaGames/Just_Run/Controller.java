package NyaGames.Just_Run;

import org.springframework.http.*;
import org.springframework.web.bind.annotation.*;
import java.util.*;

@RestController
public class Controller{
	private String puntuacionEscapist = "pene";
	private String puntuacionChaser = "polla";
	
	/*@RequestMapping(value = "/puntuacionescapist", method = RequestMethod.POST)
	public void setPuntuacionEscapist() {
		puntuacionEscapist++;
	}*/
	@RequestMapping(value = "/puntuacionescapist", method = RequestMethod.POST)
	public void setPuntuacionEscapist(@RequestBody String number) {
		puntuacionEscapist = number;
	}
	@RequestMapping(value = "/puntuacionescapist", method = RequestMethod.GET)
	public ResponseEntity<String> getPuntacionEscapist() {
		return new ResponseEntity<String>(puntuacionEscapist, HttpStatus.CREATED);
	}
	@RequestMapping(value = "/puntuacioneschaser", method = RequestMethod.POST)
	public void setPuntuacionChaser(@RequestBody String number) {
		puntuacionChaser = number;
	}
	@RequestMapping(value = "/puntuacioneschaser", method = RequestMethod.GET)
	public ResponseEntity<String> getPuntuacionChaser() {
		return new ResponseEntity<String>(puntuacionChaser, HttpStatus.CREATED);
	}
	
}