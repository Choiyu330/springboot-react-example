import React, { useState } from 'react';

function StockInput({ fetchStockInfo }) {
    const [stockName, setStockName] = useState('');
    const [stockPrice, setStockPrice] = useState('');

    // 투자금액에 천 단위 쉼표 추가 (한글 입력 시 숫자 지워짐 이슈슈)
    const handlePriceChange = (e) => {
        let value = e.target.value;

        // 글자가 아닌 숫자만 남기기
        const numericValue = value.replace(/[^0-9]/g, ''); // 숫자만 남기고 제거

        // 3자리마다 쉼표 추가
        let formattedValue = numericValue.replace(/\B(?=(\d{3})+(?!\d))/g, ',');

        setStockPrice(formattedValue);
    };

    const handleSubmit = async (e) => {
        e.preventDefault(); // 폼 기본 동작 방지

        if (!stockName || !stockPrice) {
            alert('모든 필드를 입력해주세요.');
            return;
        }

        const numericPrice = parseFloat(stockPrice.replace(/,/g, ''));

        if (isNaN(numericPrice) || numericPrice <= 0) {
            alert('투자금액은 0보다 큰 숫자만 입력 가능합니다.');
            return;
        }

        const stockData = {
            stockName,
            stockPrice: numericPrice,
        };

        // 주식정보 등록
        try {
            const response = await fetch('http://localhost:8080/api/stocks/register', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify(stockData),
            });

            if (!response.ok) {
                throw new Error('등록 실패');
            }

            setStockName('');
            setStockPrice('');


            fetchStockInfo();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <form className="stock-form" onSubmit={handleSubmit}>
            <div className="form-group">
                <label>📌 종목명</label>
                <input type="text" value={stockName} onChange={(e) => setStockName(e.target.value)} placeholder="종목명을 입력하세요"></input>
            </div>
            <div className="form-group">
                <label>💰 투자금액</label>
                <input type="text" value={stockPrice} onChange={handlePriceChange} placeholder="투자금액을 입력하세요" min="1"></input>
            </div>
            <input type="submit" value="등록" className="submit-btn"></input>
        </form>
    )
}

export default StockInput;