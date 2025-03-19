package com.inside.project_cyj.stock.dto;

import lombok.AllArgsConstructor;
import lombok.Builder;
import lombok.Getter;
import lombok.Setter;

import java.util.List;

@Getter
@Setter
@Builder
@AllArgsConstructor
public class StockListDto {
    List<StockSimpleResponseDto> stockSimpleResponseDtoList;
    private Double stockTotalPrice;
}
