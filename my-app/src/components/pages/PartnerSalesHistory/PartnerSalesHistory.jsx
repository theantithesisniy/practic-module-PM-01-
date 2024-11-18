import React, { useEffect, useState } from 'react';
import calculateDiscount from '../../../utils/calculateDiscount';
import './PartnerSalesHistory.css';

export function PartnerSalesHistory() {
	const [partnerName, setPartnerName] = useState('');
	const [salesHistory, setSalesHistory] = useState([]);
	const [loading, setLoading] = useState(false);
	const [error, setError] = useState(null);
	const [discount, setDiscount] = useState(0);

	const fetchSalesHistory = async (name) => {
		setLoading(true);
		setError(null);

		try {
			const response = await fetch(`http://localhost:3001/partners/sales-history/${name}`);

			if (!response.ok) {
				throw new Error(`Ошибка HTTP: ${response.status}`);
			}

			const data = await response.json();
			setSalesHistory(data);
		} catch (err) {
			setError(err.message);
		} finally {
			setLoading(false);
		}
	};

	useEffect(() => {
		if (salesHistory.length > 0) {
			const totalQuantity = salesHistory.reduce((sum, sale) => sum + sale.Quantity_production, 0);
			const calculatedDiscount = calculateDiscount(totalQuantity);
			setDiscount(calculatedDiscount);
		}
	}, [salesHistory]);

	const handleSubmit = (e) => {
		e.preventDefault();
		fetchSalesHistory(partnerName);
	};

	return (
		<div className="table-container">
			<h2 className="table-title">Получить историю реализации продукции партнера</h2>
			<form onSubmit={handleSubmit} className="sales-form">
				<label>
					Введите имя партнера:
					<input
						type="text"
						value={partnerName}
						onChange={(e) => setPartnerName(e.target.value)}
						placeholder="Например, Паркет 29"
						required
						className="sales-input"
					/>
				</label>
				<div className="button-container">
					<button type="submit" className="edit-button">
						Получить данные
					</button>
				</div>
			</form>

			{loading && <p>Загрузка...</p>}
			{error && <p>Ошибка: {error}</p>}

			{salesHistory.length > 0 ? (
				<>
					<p>Текущая скидка партнера: {discount}%</p>
					<table className="sales-table">
						<thead>
							<tr>
								<th>Наименование продукции</th>
								<th>Количество</th>
								<th>Дата продажи</th>
							</tr>
						</thead>
						<tbody>
							{salesHistory.map((sale, index) => (
								<tr key={index}>
									<td className="product-name">{sale.products}</td>
									<td>{sale.Quantity_production}</td>
									<td>{sale.Date_Sale}</td>
								</tr>
							))}
						</tbody>
					</table>
				</>
			) : (
				!loading && <p>История реализации продукции отсутствует.</p>
			)}
		</div>
	);
}
