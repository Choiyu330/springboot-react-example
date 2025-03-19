import React, { useEffect, useState } from 'react';
import StockInput from "./StockInput";

function StockInfoList() {
    const [stockList, setStockList] = useState([]);
    const [stockTotalPrice, setStockTotalPrice] = useState(0);
    const [loading, setLoading] = useState(true);
    const [error, setError] = useState(null);

    // 주식정보 목록조회
    const fetchStockInfo = async () => {
        try {
            const response = await fetch(`http://localhost:8080/api/stocks`);
            if (!response.ok) {
                throw new Error('데이터를 가져오는 데 실패했습니다.');
            }
            const data = await response.json();
            console.log(data.stockSimpleResponseDtoList);
            setStockList(data.stockSimpleResponseDtoList);
            setStockTotalPrice(data.stockTotalPrice);
        } catch (err) {
            setError(err.message);
        } finally {
            setLoading(false);
        }
    };

    useEffect(() => {
        fetchStockInfo();
    }, []);

    const handleDelete = async (stockId) => {
        if (!window.confirm('삭제하시겠습니까?')) return;

        try {
            const response = await fetch(`/api/stocks/delete/${stockId}`, {
                method: 'DELETE',
            });

            if (!response.ok) {
                throw new Error('삭제 실패');
            }

            fetchStockInfo();
        } catch (error) {
            alert(error.message);
        }
    };

    return (
        <main>
            <StockInput fetchStockInfo={fetchStockInfo} /> 
            <table border={1}>
                <thead>
                    <tr>
                        <th>번호</th>
                        <th>종목명</th>
                        <th>투자금액</th>
                        <th>등록일자</th>
                        <th>삭제</th>
                    </tr>
                </thead>
                <tbody>
                    {stockList?.length > 0 ? (
                        stockList.map((item, index) => (
                            <tr key={index}>
                                <td>{index + 1}</td>
                                <td className="text-left">{item.stockName}</td>
                                <td>{item.stockPrice.toLocaleString()}원</td>
                                <td>{item.regDtt}</td>
                                <td>
                                    <input
                                        type="button"
                                        value="삭제"
                                        onClick={() => handleDelete(item.stockId)}
                                    />
                                </td>
                            </tr>
                        ))
                    ) : (
                        <tr>
                            <td colSpan={5}>데이터가 없습니다.</td>
                        </tr>
                    )}
                </tbody>
                <tfoot>
                    <tr>
                        <td colSpan={1} style={{ textAlign: 'right', fontWeight: 'bold' }}>합계</td>
                        <td colSpan={4} style={{ fontWeight: 'bold' }}>{stockTotalPrice.toLocaleString()} 원</td>
                    </tr>
                </tfoot>
            </table>
        </main>
    )
}

export default StockInfoList;