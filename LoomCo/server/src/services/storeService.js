import StoreInfo from "../models/StoreInfo.js";

const storeService = {
    async getStoreInfo() {
        const info = await StoreInfo.findOne();
        if (!info) throw new Error('Store info not set');
        return info;
    },

    async updateStoreInfo(data) {
        let info = await StoreInfo.findOne();
        if (!info) {
            info = new StoreInfo(data);
        } else {
            info.name = data.name;
            info.address = data.address;
        }
        return await info.save();
    }
};

export default storeService;