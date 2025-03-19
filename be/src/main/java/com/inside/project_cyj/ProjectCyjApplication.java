package com.inside.project_cyj;

import org.springframework.boot.SpringApplication;
import org.springframework.boot.autoconfigure.SpringBootApplication;
import org.springframework.data.jpa.repository.config.EnableJpaAuditing;

@EnableJpaAuditing
@SpringBootApplication
public class ProjectCyjApplication {

	public static void main(String[] args) {
		SpringApplication.run(ProjectCyjApplication.class, args);
	}

}
