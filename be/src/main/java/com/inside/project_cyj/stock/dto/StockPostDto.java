package com.inside.project_cyj.stock.dto;

import jakarta.validation.constraints.NotBlank;
import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.Setter;

@Getter @Setter
@AllArgsConstructor
public class StockPostDto {
    @NotBlank
    private String stockName;
    private Double stockPrice;
}
