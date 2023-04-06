const { Order } = require("../../models");
const { getPagination } = require("../../services/pagination");
const { ResponseSuccess } = require("../../services/response");

const listOrders = async (req, res) => {
    try {
        let query = {}
        if (req.query.search) {
            query = {
                $or: [
                    { seller: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                    { _id: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                    { purchaser: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                    { itemContract: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                ],
            }
        }

        const { limit, skip } = getPagination(req)
        const orders = await Order.find(query)
                    .sort('-createdAt')
                    .populate('itemContract', '_id name picture price owner')
                    .limit(limit)
                    .skip(skip)

        const total = await Order.find(query).count()
        ResponseSuccess(res, { orders, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    listOrders
}