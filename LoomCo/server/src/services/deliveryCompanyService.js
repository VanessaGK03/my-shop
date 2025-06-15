import DeliveryCompany from '../models/DeliveryCompany.js';

const deliveryCompanyService = {
    async getAllCompanies() {
        return await DeliveryCompany.find();
    },

    async createCompany(data) {
        const company = new DeliveryCompany(data);

        return await company.save();
    },

    async updateCompany(id, data) {
        const updated = await DeliveryCompany.findByIdAndUpdate(id, data, { new: true });
        if (!updated) throw new Error('Company not found');
        return updated;
    },

    async deleteCompany(id) {
        const deleted = await DeliveryCompany.findByIdAndDelete(id);
        if (!deleted) throw new Error('Company not found');
        return { message: 'Deleted successfully' };
    }
};

export default deliveryCompanyService;
