package com.inside.project_cyj.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Getter;
import lombok.NoArgsConstructor;
import lombok.Setter;

@Getter @Setter
@NoArgsConstructor
@AllArgsConstructor
public class StockPatchDto {
    private Long stockId;
    private String stockName;
    private Double stockPrice;
}
