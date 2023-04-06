const getPagination = (req) => {
    const perPage = req.query.rowsPerPage || 10, page = req.query.page || 1

    return {
        limit: perPage,
        skip: perPage * (page - 1)
    }
}
module.exports = {
    getPagination
}