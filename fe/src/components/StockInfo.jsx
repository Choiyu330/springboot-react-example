import React, { useEffect, useState } from 'react';

const StockInfo = ({ stockId }) => {
  const [stock, setStock] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchStockInfo = async () => {
      try {
        const response = await fetch(`http://localhost:8080/api/stocks/1`);
        if (!response.ok) {
          throw new Error('데이터를 가져오는 데 실패했습니다.');
        }
        const data = await response.json();
        setStock(data);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    fetchStockInfo();
  }, [stockId]);

  if (loading) return <p>로딩 중...</p>;
  if (error) return <p>에러 발생: {error}</p>;

  return (
    <div className="max-w-md mx-auto bg-white rounded-xl shadow-md p-6">
      <h2 className="text-xl font-bold mb-4">오 이게 된다</h2>
      {stock ? (
        <div>
          <p><strong>이름:</strong> {stock.stockName}</p>
          <p><strong>가격:</strong> {stock.stockPrice}원</p>
          <p><strong>등록일자:</strong> {stock.regDtt}</p>
        </div>
      ) : (
        <p>데이터가 없습니다.</p>
      )}
    </div>
  );
};

export default StockInfo;