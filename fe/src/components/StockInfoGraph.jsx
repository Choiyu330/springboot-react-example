import React, { useEffect, useState } from "react";
import { PieChart, Pie, Cell, Tooltip, Legend, ResponsiveContainer } from "recharts";

const COLORS = ["#0056b3", "#5A60C9", "#5C4B8D", "#394A6E", "#4A5C88"]; // 색상 배열

function StockInfoGraph() {
    const [chartData, setChartData] = useState([]);

    // 주식정보 그래프 조회
    useEffect(() => {
        fetch("http://localhost:8080/api/stocks")
            .then((res) => res.json())
            .then((data) => {
                // stockType별 투자금액 합산
                const groupedData = data.stockSimpleResponseDtoList.reduce((acc, item) => {
                    const existingType = acc.find((d) => d.name === item.stockName);
                    if (existingType) {
                        existingType.value += item.stockPrice;
                    } else {
                        acc.push({ name: item.stockName, value: item.stockPrice });
                    }
                    return acc;
                }, []);

                setChartData(groupedData);
            })
            .catch((err) => console.error("데이터 로드 실패", err));
    }, []);

    return (
        <div style={{ width: "100%", maxWidth: "400px", margin: "0 auto" }}>
            <h2 className="text-xl font-bold text-center">📊 투자 비율</h2>
            <ResponsiveContainer width="100%" height={300}>
                <PieChart>
                    <Pie
                        data={chartData}
                        cx="50%"
                        cy="50%"
                        labelLine={false}
                        label={({ name, percent }) => `${name} ${(percent * 100).toFixed(0)}%`}
                        outerRadius={120}
                        fill="#8884d8"
                        dataKey="value"
                    >
                        {chartData.map((entry, index) => (
                            <Cell key={`cell-${index}`} fill={COLORS[index % COLORS.length]} />
                        ))}
                    </Pie>
                    <Tooltip />
                    <Legend />
                </PieChart>
            </ResponsiveContainer>
        </div>
    );
}

export default StockInfoGraph;
