const { authController, itemController, orderController, userController } = require('../controllers/admin');
const adminMiddleware = require('../middleware/admin')

module.exports = app => {
    app.post('/admin/auth/create', authController.createAdmin)
    app.post('/admin/auth/login', authController.login)
    app.get('/admin/auth/me', adminMiddleware, authController.me)

    app.get('/admin/items', adminMiddleware, itemController.listItems)

    app.get('/admin/orders', adminMiddleware, orderController.listOrders)

    app.get('/admin/users', adminMiddleware, userController.listUsers)
}