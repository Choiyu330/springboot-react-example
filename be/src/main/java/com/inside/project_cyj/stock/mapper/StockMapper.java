package com.inside.project_cyj.stock.mapper;

import com.inside.project_cyj.stock.dto.StockPostDto;
import com.inside.project_cyj.stock.dto.StockSimpleResponseDto;
import com.inside.project_cyj.stock.entity.Stock;
import org.mapstruct.Mapper;

import java.util.ArrayList;
import java.util.List;

@Mapper(componentModel = "spring")
public interface StockMapper {
    Stock postDtoToStock(StockPostDto stockPostDto);

    default StockSimpleResponseDto stockToStockSimpleResponseDto(Stock stock) {
        if (stock == null) {
            return null;
        }

        StockSimpleResponseDto stockSimpleResponseDto = new StockSimpleResponseDto();

        stockSimpleResponseDto.setStockId(stock.getStockId());
        stockSimpleResponseDto.setStockName(stock.getStockName());
        stockSimpleResponseDto.setStockPrice(stock.getStockPrice());
        stockSimpleResponseDto.setRegDtt(stock.getRegDtt());
        stockSimpleResponseDto.setMdfcDtt(stock.getMdfcDtt());

        return stockSimpleResponseDto;
    }

    default List<StockSimpleResponseDto> stockToStockSimpleResponseDtoList(List<Stock> stocks) {
        if (stocks.isEmpty()) {
            return null;
        }

        List<StockSimpleResponseDto> stockSimpleResponseDtoList = new ArrayList<>();

        for (Stock stock : stocks) {
            stockSimpleResponseDtoList.add(stockToStockSimpleResponseDto(stock));
        }

        return stockSimpleResponseDtoList;
    }
}
