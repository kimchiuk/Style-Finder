package com.d111.backend.config;

import io.swagger.v3.oas.annotations.OpenAPIDefinition;
import io.swagger.v3.oas.annotations.info.Info;
import org.springdoc.core.models.GroupedOpenApi;
import org.springframework.context.annotation.Bean;
import org.springframework.context.annotation.Configuration;

@OpenAPIDefinition(
        info = @Info(
                title = "StyleFinder API 명세서",
                description = "StyleFinder API 명세서",
                version = "v0"
        )
)
@Configuration
public class SwaggerConfig {

        @Bean
        public GroupedOpenApi sample() {
                return GroupedOpenApi.builder()
                        .group("sample")
                        .pathsToMatch("/api/sample/**")
                        .build();
        }

        @Bean
        public GroupedOpenApi user() {
                return GroupedOpenApi.builder()
                        .group("user")
                        .pathsToMatch("/api/user/**")
                        .build();
        }

        @Bean
        public GroupedOpenApi feed() {
                return GroupedOpenApi.builder()
                        .group("feed")
                        .pathsToMatch("/api/feed/**")
                        .build();
        }

}
