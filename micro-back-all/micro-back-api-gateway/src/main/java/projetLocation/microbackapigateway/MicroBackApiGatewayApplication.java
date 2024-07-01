package projetLocation.microbackapigateway;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.cors.CorsConfiguration;
import org.springframework.web.cors.reactive.UrlBasedCorsConfigurationSource;
import org.springframework.web.cors.reactive.CorsWebFilter;

import java.util.Arrays;
import java.util.List;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroBackApiGatewayApplication {



	public static void main(String[] args) {
		SpringApplication.run(MicroBackApiGatewayApplication.class, args);
	}

}
