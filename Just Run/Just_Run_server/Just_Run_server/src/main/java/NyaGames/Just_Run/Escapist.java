package NyaGames.Just_Run;

public class Escapist {
	
	//parametros propios del escapist con getters y setters
	private String ID;
	private int puntuacion;
	private int posicionX;
	private int posicionY;
	private boolean cazado;
	
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
	public void setCazado(boolean c) {
		cazado= c;
	}
	public boolean getCazado() {
		return cazado;
	}
}
