package com.projetLocation.microbackfavori;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.cloud.client.discovery.EnableDiscoveryClient;
import org.springframework.context.annotation.Bean;
import org.springframework.web.reactive.function.client.WebClient;
import org.modelmapper.ModelMapper;

@SpringBootApplication
@EnableDiscoveryClient
public class MicroBackFavoriApplication {
	@Bean
	public ModelMapper modelMapper(){
		return new ModelMapper();
	}
	@Bean
	public WebClient webClient() {
		return WebClient.builder().build();
	}

	public static void main(String[] args) {
		SpringApplication.run(MicroBackFavoriApplication.class, args);
	}

}
