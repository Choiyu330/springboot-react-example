package com.inside.project_cyj.stock.service;

import com.inside.project_cyj.stock.entity.Stock;
import com.inside.project_cyj.stock.repository.StockRepository;
import lombok.RequiredArgsConstructor;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import java.util.List;
import java.util.Optional;

@Service
@Transactional
@RequiredArgsConstructor
public class StockService {
    private final StockRepository stockRepository;

    // 주식 정보 등록
    public Stock regiserStockInfo(Stock stock) {
        verifiedStock(stock.getStockId());
        return stockRepository.save(stock);
    }

    // 주식 정보 상세조회
    public Stock getStockInfo(Long stockId) {
        return stockRepository.findById(stockId).orElseThrow(() -> new RuntimeException("정보를 찾을 수 없습니다."));
    }

    // 주식 정보 목록조회
    public List<Stock> getStockInfoList() {
        return stockRepository.findAll();
    }

    // 주식 정보 삭제
    public void deleteStockInfo(Long stockId) {
        stockRepository.deleteById(stockId);
    }

    // 주식 정보 중복확인
    void verifiedStock(Long stockId) {
        Optional<Stock> findStock = stockRepository.findByStockId(stockId);

        if (findStock.isPresent()) {
            throw new IllegalArgumentException("이미 등록된 정보입니다.");
        }
    }

    // 주식 투자 금액 총 합
    public Double getStockTotalPrice() {
        return stockRepository.getStockTotalPrice();
    }
}
