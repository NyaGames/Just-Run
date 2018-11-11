package NyaGames.Just_Run;

public class Jugador {
	private int puntuacion;
	private String id;
	
	public Jugador() {
		
	}
	public Jugador(String tipo) {
		id = tipo;
		puntuacion = 0;
	}
	public int getPuntuacion() {
		return puntuacion;
	}
	public void setPuntuacion() {
		puntuacion++;
	}
	public String getID() {
		return id;
	}
}
