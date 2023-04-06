const { Item } = require("../../models");
const { getPagination } = require("../../services/pagination");
const { ResponseSuccess } = require("../../services/response");

const listItems = async (req, res) => {
    try {
        let query = {
            state: { $ne: 4 }
        }
        if (req.query.search) {
            query.$or = [
                { name: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                { _id: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                { owner: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
            ]
        }

        const { limit, skip } = getPagination(req)
        const items = await Item.find(query)
                    .sort('-createdAt')
                    .limit(limit)
                    .skip(skip)

        const total = await Item.find(query).count()

        ResponseSuccess(res, { items, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    listItems
}