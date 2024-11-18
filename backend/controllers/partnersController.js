const Partner = require('../models/Partner');
const PartnerProducts = require('../models/PartnerProducts');
const ProductType = require('../models/ProductType');
const MaterialType = require('../models/MaterialType')

class parthnersController {

	async getPartnersData(req, res) {

		try {
			const partners = await Partner.findAll({
				attributes: ['id', 'type', 'company_name', 'legal_address', 'inn', 'director_name', 'contact_phone', 'contact_email', 'rating']
			});

			res.json(partners); // Возвращаем результат в формате JSON
		} catch (error) {
			console.error('Error fetching partners:', error);
			res.status(500).send('Internal Server Error');
		}

	}

	async putPartnerData(req, res) {
		const { id } = req.params;
		const { type, company_name, legal_address, inn, director_name, contact_phone, contact_email, rating } = req.body;

		try {
			await Partner.update(
				{
					type,
					company_name,
					legal_address,
					inn,
					director_name,
					contact_phone,
					contact_email,
					rating,
				},
				{
					where: { id },
				}
			);

			res.status(200).send({ message: 'Partner updated successfully' });
		} catch (error) {
			res.status(500).send({ error: 'Failed to update partner' });
		}
	}

	async getPartnerSalesHistory(req, res) {
		const { partnerName } = req.params;

		try {
			const salesHistory = await PartnerProducts.findAll({
				attributes: ['products', 'Name_partner', 'Quantity_production', 'Date_Sale'], // Убрал поле 'id'
				where: { Name_partner: partnerName }
			});

			if (salesHistory.length > 0) {
				res.json(salesHistory);
			} else {
				res.status(404).json({ message: "История продаж не найдена для данного партнера." });
			}
		} catch (error) {
			console.error("Error fetching sales history:", error);
			res.status(500).json({ message: "Ошибка на сервере." });
		}
	};

	async getProductTypes(req, res) {

		try {
			const productTypes = await ProductType.findAll({
				attributes: ['product_type', 'product type coefficient'],
			});

			res.json(productTypes);
		} catch (error) {
			console.error('Error fetching partners:', error);
			res.status(500).send('Internal Server Error');
		}

	}

	async getMaterialTypes(req, res) {

		try {
			const materialTypes = await MaterialType.findAll({
				attributes: ['material_type', 'reject_rate'],
			});

			res.json(materialTypes);
		} catch (error) {
			console.error('Error fetching partners:', error);
			res.status(500).send('Internal Server Error');
		}

	}

	async calculateMaterial(req, res) {
		const { productTypeId, materialTypeId, quantity } = req.body;
	
		if (!productTypeId || !materialTypeId || !quantity) {
			return res.status(400).json({ error: 'Invalid input data' });
		}
	
		try {
			const productType = await ProductType.findOne({
				where: { product_type: productTypeId }
			});
			
			if (!productType) {
				return res.status(404).json({ error: 'Product type not found' });
			}
			
			const typeCoefficient = productType['product type coefficient'];
	
			const materialType = await MaterialType.findOne({
				where: { material_type: materialTypeId }
			});
	
			if (!materialType) {
				return res.status(404).json({ error: 'Material type not found' });
			}
			
			const rejectRate = materialType.reject_rate;
			const totalMaterial = (quantity * typeCoefficient) / (1 - (rejectRate / 100));			
			res.json({ requiredMaterial: Math.ceil(totalMaterial) });
		} catch (error) {
			res.status(500).json({ error: 'Internal server error' });
		}
	}
	


}

module.exports = new parthnersController();;