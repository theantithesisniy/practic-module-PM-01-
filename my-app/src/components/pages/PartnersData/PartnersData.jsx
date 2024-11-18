import React from 'react';
import { useEffect, useState } from 'react';

export function PartnersData() {

	const [partnersData, setPartnersData] = useState([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentPartner, setCurrentPartner] = useState(null);

  useEffect(() => {
    fetchPartnersData();
  }, []);

  const fetchPartnersData = async () => {
    try {
      const response = await fetch('http://localhost:3001/partners/get-partners');

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const data = await response.json();
      setPartnersData(data);
    } catch (error) {
      console.error("Ошибка при получении данных:", error);
    }
  };

  const handleEditClick = (partner) => {
    setIsEditing(true);
    setCurrentPartner(partner);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setCurrentPartner({ ...currentPartner, [name]: value });
  };

  const handleSaveClick = async () => {
    try {
      const response = await fetch(`http://localhost:3001/partners/update-partner/${currentPartner.id}`, {
        method: 'PUT',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(currentPartner),
      });

      if (!response.ok) {
        throw new Error(`Ошибка HTTP: ${response.status}`);
      }

      const updatedPartners = partnersData.map(partner => 
        partner.id === currentPartner.id ? currentPartner : partner
      );

      setPartnersData(updatedPartners);
      setIsEditing(false);
      setCurrentPartner(null);
    } catch (error) {
      console.error("Ошибка при обновлении данных:", error);
    }
  };

  return (
    <div className="App">
      <h1>Список партнеров</h1>
      <table border="1" cellPadding="10" style={{ borderCollapse: 'collapse', width: '100%' }}>
        <thead>
          <tr>
            <th>ID</th>
            <th>Тип</th>
            <th>Название компании</th>
            <th>Юридический адрес</th>
            <th>ИНН</th>
            <th>Имя директора</th>
            <th>Телефон</th>
            <th>Email</th>
            <th>Рейтинг</th>
            <th>Действия</th>
          </tr>
        </thead>
        <tbody>
          {partnersData.map((partner) => (
            <tr key={partner.id}>
              <td>{partner.id}</td>
              <td>{partner.type}</td>
              <td>{partner.company_name}</td>
              <td>{partner.legal_address}</td>
              <td>{partner.inn}</td>
              <td>{partner.director_name}</td>
              <td>{partner.contact_phone}</td>
              <td>{partner.contact_email}</td>
              <td>{partner.rating}</td>
              <td>
                <button onClick={() => handleEditClick(partner)}>Редактировать</button>
              </td>
            </tr>
          ))}
        </tbody>
      </table>

      {isEditing && (
        <div className="edit-form">
          <h2>Редактировать партнера</h2>
          <form>
            <label>
              Тип:
              <input type="text" name="type" value={currentPartner.type} onChange={handleInputChange} />
            </label>
            <label>
              Название компании:
              <input type="text" name="company_name" value={currentPartner.company_name} onChange={handleInputChange} />
            </label>
            <label>
              Юридический адрес:
              <input type="text" name="legal_address" value={currentPartner.legal_address} onChange={handleInputChange} />
            </label>
            <label>
              ИНН:
              <input type="text" name="inn" value={currentPartner.inn} onChange={handleInputChange} />
            </label>
            <label>
              Имя директора:
              <input type="text" name="director_name" value={currentPartner.director_name} onChange={handleInputChange} />
            </label>
            <label>
              Телефон:
              <input type="text" name="contact_phone" value={currentPartner.contact_phone} onChange={handleInputChange} />
            </label>
            <label>
              Email:
              <input type="text" name="contact_email" value={currentPartner.contact_email} onChange={handleInputChange} />
            </label>
            <label>
              Рейтинг:
              <input type="number" name="rating" value={currentPartner.rating} onChange={handleInputChange} />
            </label>
            <button type="button" onClick={handleSaveClick}>Сохранить</button>
          </form>
        </div>
      )}
    </div>
  );
}