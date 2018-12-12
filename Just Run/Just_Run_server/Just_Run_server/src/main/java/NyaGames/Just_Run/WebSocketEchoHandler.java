package NyaGames.Just_Run;

import java.io.IOException;
import java.util.Collections;
import java.util.HashSet;
import java.util.Set;

import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import com.fasterxml.jackson.databind.JsonNode;
import com.fasterxml.jackson.databind.ObjectMapper;
import com.fasterxml.jackson.databind.node.ObjectNode;

public class WebSocketEchoHandler extends TextWebSocketHandler {	

	private static Set<WebSocketSession> sessions = Collections.synchronizedSet(new HashSet<WebSocketSession>());
	ObjectMapper mapper = new ObjectMapper();
	
	Chaser chaser = new Chaser();	
	Escapist escapist = new Escapist();
	Traps trampas = new Traps();
	Animations animaciones = new Animations();
	int counter = 0;
	boolean listo = false;
	boolean listo1 = false;
	int ID = 0;
	
	@Override
	public void afterConnectionEstablished(WebSocketSession session) throws Exception {
		sessions.add(session);
		counter++;
	}
	
	@Override
	public void afterConnectionClosed(WebSocketSession session, CloseStatus status) throws Exception {
		sessions.remove(session);
	}
	
	@Override
	protected void handleTextMessage(WebSocketSession session, TextMessage message) throws Exception {
		synchronized(sessions) {
		JsonNode node = mapper.readTree(message.getPayload());
		
		ObjectNode newNode = mapper.createObjectNode();
		newNode = createPlayerInfo(newNode,node);
		
		session.sendMessage(new TextMessage(newNode.toString()));
		}
	}
		
	public ObjectNode createPlayerInfo(ObjectNode newNode,JsonNode nodeReceived) {
		newNode.put("id", nodeReceived.get("id").asText());
		switch(newNode.get("id").asText()) {
		case "Chaser":
			newNode.put("x", nodeReceived.get("x").asText());
			newNode.put("y", nodeReceived.get("y").asText());
			newNode.put("puntuacion", nodeReceived.get("puntuacion").asText());
			chaser.setID();
			chaser.setPosicionX(nodeReceived.get("x").asInt());
			chaser.setPosicionY(nodeReceived.get("y").asInt());
			chaser.setPuntuacion(nodeReceived.get("puntuacion").asInt());
			break;
		case "Escapist":
			newNode.put("x", nodeReceived.get("x").asText());
			newNode.put("y", nodeReceived.get("y").asText());
			newNode.put("puntuacion", nodeReceived.get("puntuacion").asText());
			newNode.put("cazado", nodeReceived.get("cazado").asText());
			escapist.setID();
			escapist.setPosicionX(nodeReceived.get("x").asInt());
			escapist.setPosicionY(nodeReceived.get("y").asInt());
			escapist.setPuntuacion(nodeReceived.get("puntuacion").asInt());
			escapist.setCazado(nodeReceived.get("cazado").asBoolean());
			break;
		case "Animations":
			newNode.put("ChaserIdle", nodeReceived.get("ChaserIdle").asText());
			newNode.put("ChaserRunL", nodeReceived.get("ChaserRunL").asText());
			newNode.put("ChaserRunR", nodeReceived.get("ChaserRunR").asText());
			newNode.put("ChaserJump", nodeReceived.get("ChaserJump").asText());
			newNode.put("EscapistIdle", nodeReceived.get("EscapistIdle").asText());
			newNode.put("EscapistRunL", nodeReceived.get("EscapistRunL").asText());
			newNode.put("EscapistRunR", nodeReceived.get("EscapistRunR").asText());
			newNode.put("EscapistJump", nodeReceived.get("EscapistJump").asText());
			animaciones.ChaserIdle = nodeReceived.get("ChaserIdle").asBoolean();
			animaciones.ChaserRunL = nodeReceived.get("ChaserRunL").asBoolean();
			animaciones.ChaserRunR = nodeReceived.get("ChaserRunR").asBoolean();
			animaciones.ChaserJump = nodeReceived.get("ChaserJump").asBoolean();
			animaciones.EscapistIdle = nodeReceived.get("EscapistIdle").asBoolean();
			animaciones.EscapistRunL = nodeReceived.get("EscapistRunL").asBoolean();
			animaciones.EscapistRunR = nodeReceived.get("EscapistRunR").asBoolean();
			animaciones.EscapistJump = nodeReceived.get("EscapistJump").asBoolean();
			break;
		case "Traps":
			newNode.put("I", nodeReceived.get("I").asText());
			newNode.put("O", nodeReceived.get("O").asText());
			newNode.put("P", nodeReceived.get("P").asText());
			trampas.I = nodeReceived.get("I").asBoolean();
			trampas.O = nodeReceived.get("O").asBoolean();
			trampas.P = nodeReceived.get("P").asBoolean();
			break;
		case "get":
			newNode.put("ChaserX", chaser.getPosicionX());
			newNode.put("ChaserY", chaser.getPosicionY());
			newNode.put("ChaserPuntuacion", chaser.getPuntuacion());
			newNode.put("EscapistX", escapist.getPosicionX());
			newNode.put("EscapistY", escapist.getPosicionY());
			newNode.put("EscapistPuntuacion", escapist.getPuntuacion());
			newNode.put("EscapistCazado", escapist.getCazado());
			newNode.put("IPressed", trampas.I);
			newNode.put("OPressed", trampas.O);
			newNode.put("PPressed", trampas.P);
			newNode.put("ChaserIdle", animaciones.ChaserIdle);
			newNode.put("ChaserRunL", animaciones.ChaserRunL);
			newNode.put("ChaserRunR", animaciones.ChaserRunR);
			newNode.put("ChaserJump", animaciones.ChaserJump);
			newNode.put("EscapistIdle", animaciones.EscapistIdle);
			newNode.put("EscapistRunL", animaciones.EscapistRunL);
			newNode.put("EscapistRunR", animaciones.EscapistRunR);
			newNode.put("EscapistJump", animaciones.EscapistJump);
			break;
		case "post":
			chaser.setPosicionX(nodeReceived.get("ChaserX").asInt());
			chaser.setPosicionY(nodeReceived.get("ChaserY").asInt());
			chaser.setPuntuacion(nodeReceived.get("ChaserPuntuacion").asInt());
			escapist.setPosicionX(nodeReceived.get("EscapistX").asInt());
			escapist.setPosicionY(nodeReceived.get("EscapistY").asInt());
			escapist.setPuntuacion(nodeReceived.get("EscapistPuntuacion").asInt());
			escapist.setCazado(nodeReceived.get("EscapistCazado").asBoolean());
			trampas.I = nodeReceived.get("IPressed").asBoolean();
			trampas.O = nodeReceived.get("OPressed").asBoolean();
			trampas.P = nodeReceived.get("PPressed").asBoolean();
			animaciones.ChaserIdle = nodeReceived.get("ChaserIdle").asBoolean();
			animaciones.ChaserRunL = nodeReceived.get("ChaserRunL").asBoolean();
			animaciones.ChaserRunR = nodeReceived.get("ChaserRunR").asBoolean();
			animaciones.ChaserJump = nodeReceived.get("ChaserJump").asBoolean();
			animaciones.EscapistIdle = nodeReceived.get("EscapistIdle").asBoolean();
			animaciones.EscapistRunL = nodeReceived.get("EscapistRunL").asBoolean();
			animaciones.EscapistRunR = nodeReceived.get("EscapistRunR").asBoolean();
			animaciones.EscapistJump = nodeReceived.get("EscapistJump").asBoolean();
			break;
		case "join":
			if(counter == 1) {
				newNode.put("userID", ""+1);
				if(listo == false) {
					listo = nodeReceived.get("listo").asBoolean();
				}	
			}
			if(counter == 2) {
				newNode.put("userID", ""+2);
				if(listo1==false) {
					listo1 = nodeReceived.get("listo1").asBoolean();					
				}
			}
			if(listo) {
				if(listo1) {
					newNode.put("cambio", "cambio");
				}
			}
			break;
		}
		return newNode;
	}

}
