package com.inside.project_cyj.stock.controller;

import com.inside.project_cyj.stock.dto.StockListDto;
import com.inside.project_cyj.stock.dto.StockPostDto;
import com.inside.project_cyj.stock.dto.StockSimpleResponseDto;
import com.inside.project_cyj.stock.entity.Stock;
import com.inside.project_cyj.stock.mapper.StockMapper;
import com.inside.project_cyj.stock.service.StockService;
import jakarta.validation.Valid;
import jakarta.validation.constraints.Positive;
import lombok.RequiredArgsConstructor;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.validation.annotation.Validated;
import org.springframework.web.bind.annotation.*;

import java.util.List;

@Validated
@RestController
@RequiredArgsConstructor
@RequestMapping("/api/stocks")
public class StockController {
    private final StockService stockService;
    private final StockMapper stockMapper;

    // 주식 정보 등록
    @PostMapping("/register")
    public ResponseEntity registerStockInfo(@RequestBody @Valid StockPostDto stockPostDto) {
        Stock stock = stockService.regiserStockInfo(stockMapper.postDtoToStock(stockPostDto));
        return new ResponseEntity<>(stockMapper.stockToStockSimpleResponseDto(stock), HttpStatus.CREATED);
    }

    // 주식 정보 목록조회
    @GetMapping
    public ResponseEntity getStockInfoList() {
        List<Stock> stocks = stockService.getStockInfoList();
        List<StockSimpleResponseDto> stockList = stockMapper.stockToStockSimpleResponseDtoList(stocks);
        Double stockTotalPrice = stockService.getStockTotalPrice();

        StockListDto stockListDto = new StockListDto(stockList, stockTotalPrice);
        return new ResponseEntity<>(stockListDto, HttpStatus.OK);
    }

    // 주식 정보 상세조회
    @GetMapping("/{stockId}")
    public ResponseEntity getStockInfo(@PathVariable("stockId") @Positive Long stockId) {
        Stock stock = stockService.getStockInfo(stockId);
        return new ResponseEntity<>(stockMapper.stockToStockSimpleResponseDto(stock), HttpStatus.OK);
    }

    // 주식 정보 삭제
    @DeleteMapping("/delete/{stockId}")
    public ResponseEntity deleteStockInfo(@PathVariable("stockId") @Positive Long stockId) {
        stockService.deleteStockInfo(stockId);
        return new ResponseEntity<>(HttpStatus.NO_CONTENT);
    }
}
