package NyaGames.Just_Run;

public class Escapist {
	private String ID;
	private int puntuacion;
	private int posicionX;
	private int posicionY;
	
	Escapist(){
		
	}
	public String getID() {
		return ID;
	}
	public void setID() {
		ID = "Escapist";
	}
	public int getPosicionX() {
		return posicionX;
	}
	
	public void setPosicionX(int posicion) {
		posicionX = posicion;
	}
	public int getPosicionY() {
		return posicionY;
	}
	public void setPosicionY(int posicion) {
		posicionY = posicion;
	}
	public int getPuntuacion() {
		return puntuacion;
	}
	public void setPuntuacion(int p) {
		puntuacion = p;
	}
}
