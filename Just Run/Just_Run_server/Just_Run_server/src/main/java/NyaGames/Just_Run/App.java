package NyaGames.Just_Run;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.context.annotation.Bean;
import org.springframework.web.bind.annotation.CrossOrigin;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;
import org.springframework.web.servlet.ModelAndView;


@CrossOrigin
@EnableWebSocket
@SpringBootApplication
public class App implements WebSocketConfigurer{ 
	@Override
	 public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
		 registry.addHandler(echoHandler(), "/echo").setAllowedOrigins("*");
	 }
	 
	 @Bean
	 public WebSocketEchoHandler echoHandler() {
		 return new WebSocketEchoHandler();
	 }
	 public static void main(String[] args) {
		 SpringApplication.run(App.class, args);
	 }
}
