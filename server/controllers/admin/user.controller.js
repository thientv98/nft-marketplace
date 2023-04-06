const { Account } = require("../../models");
const { getPagination } = require("../../services/pagination");
const { ResponseSuccess } = require("../../services/response");

const listUsers = async (req, res) => {
    try {
        const { limit, skip } = getPagination(req)

        let query = {}
        if (req.query.search) {
            query = {
                $or: [
                    { name: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                    { _id: { $regex: '.*' + req.query.search + '.*', $options: 'i' } },
                ],
            }
        }
        const users = await Account.find(query)
            .sort('-createdAt')
            .limit(limit)
            .skip(skip)
        const total = await Account.find(query).count()
        ResponseSuccess(res, { users, total })
    } catch (error) {
        res.status(400).send(error)
    }
}

module.exports = {
    listUsers
}