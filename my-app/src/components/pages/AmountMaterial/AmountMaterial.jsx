import React, { useEffect, useState } from 'react';

export function AmountMaterial() {
  const [productTypes, setProductTypes] = useState([]);
  const [materialTypes, setMaterialTypes] = useState([]);
  const [selectedProductType, setSelectedProductType] = useState('');
  const [selectedMaterialType, setSelectedMaterialType] = useState('');
  const [quantity, setQuantity] = useState('');
  const [result, setResult] = useState(null);

  useEffect(() => {
    const fetchProductTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/partners/product-types');
        const data = await response.json();
        setProductTypes(data);
      } catch (error) {
        console.error('Ошибка получения типов продукции:', error);
      }
    };

    fetchProductTypes();
  }, []);

  useEffect(() => {
    const fetchMaterialTypes = async () => {
      try {
        const response = await fetch('http://localhost:3001/partners/material-types');
        const data = await response.json();
        setMaterialTypes(data);
      } catch (error) {
        console.error('Ошибка получения типов материалов:', error);
      }
    };

    fetchMaterialTypes();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const response = await fetch('http://localhost:3001/partners/calculate-material', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({
          productTypeId: selectedProductType,
          materialTypeId: selectedMaterialType,
          quantity: quantity,
        }),
      });

      if (!response.ok) {
        const error = await response.json();
        throw new Error(`Error ${response.status}: ${error.error}`);
      }

      const data = await response.json();
      setResult(data.requiredMaterial)
    } catch (error) {
      console.error('Fetch error:', error);
    }
  };



  return (
    <div>
      <h2>Рассчитать необходимое количество материала</h2>
      <form onSubmit={handleSubmit}>
        <label>
          Выберите тип продукции:
          <select value={selectedProductType} onChange={(e) => setSelectedProductType(e.target.value)}>
            <option value="">Выберите тип продукции</option>
            {productTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.product_type}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Выберите тип материала:
          <select value={selectedMaterialType} onChange={(e) => setSelectedMaterialType(e.target.value)}>
            <option value="">Выберите тип материала</option>
            {materialTypes.map((type) => (
              <option key={type.id} value={type.id}>
                {type.material_type}
              </option>
            ))}
          </select>
        </label>
        <br />

        <label>
          Количество продукции:
          <input
            type="number"
            value={quantity}
            onChange={(e) => setQuantity(e.target.value)}
            required
          />
        </label>
        <br />

        <button type="submit">Рассчитать</button>
      </form>

      {result !== null && <p>Необходимое количество материала: {result}</p>}
    </div>
  );
}
