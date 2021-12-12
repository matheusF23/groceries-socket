const CategoryService = require('./services/CategoryService')
const ProductService = require('./services/ProductService')
const OrderService = require('./services/OrderService')

const app = (socket) => {
  socket.write("WELCOME");

  socket.on("data", data => {
    const listParams = data.toString().trim().split('-|-')

    switch (listParams[0]) {
      case 'listCategories':
        const categories = JSON.stringify(CategoryService.listCategories())
        socket.write(`listAndChooseCategories-|-${categories}`)
        break;
      case 'chosenCategory':
        const category = listParams[1]
        const products = JSON.stringify(ProductService.getProductsByCategory(category))
        socket.write(`listAndChooseProduct-|-${products}`)
        break;
      case 'chosenProduct':
        const { productId, productQuantity } = JSON.parse(listParams[1])
        OrderService.addProduct(productId, productQuantity)
        socket.write('addAnotherProduct')
        break;
      case 'getOrder':
        const order = JSON.stringify(OrderService.getOrder())
        socket.write(`showOrder-|-${order}`)
        break;
      case 'deleteProduct':
        const newOrder = JSON.stringify(OrderService.deleteProduct(listParams[1]))
        socket.write(`showOrder-|-${newOrder}`)
        break;
      case 'closeOrder':
        const closeOrder = listParams[1]
        if (closeOrder === '2') socket.write('addAnotherProduct')
        if (closeOrder === '1') {
          OrderService.clearOrder()
          socket.write('orderClosed')
        }
        break;

      default:
        socket.write("ERROR-|-Comando não reconhecido\n")
        break;
    }
  });
}

module.exports = app
