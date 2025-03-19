package com.inside.project_cyj.stock.repository;

import com.inside.project_cyj.stock.entity.Stock;
import org.springframework.data.jpa.repository.JpaRepository;
import org.springframework.data.jpa.repository.Query;

import java.util.List;
import java.util.Optional;

public interface StockRepository extends JpaRepository<Stock, Long> {
    Optional<Stock> findByStockId(Long stockId);
    Optional<Stock> findByStockName(String stockName);
    List<Stock> findAll();

    @Query("select coalesce(sum(s.stockPrice), 0) from Stock s")
    Double getStockTotalPrice();

    void deleteByStockId(Long stockId);
}
