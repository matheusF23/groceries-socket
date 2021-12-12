const CategoryService = require('./services/CategoryService')
const ProductService = require('./services/ProductService')
const OrderService = require('./services/OrderService')

const app = socket => {
  socket.on('data', data => {
    const listParams = data.toString().trim().split('-|-')

    switch (listParams[0]) {
      case 'WELCOME':
        console.log('Seja bem vindo ao mercadinho SD!')
        socket.write('listCategories')
        break
      case 'listAndChooseCategories':
        const category = CategoryService.listAndChooseCategories(listParams[1])
        socket.write(`chosenCategory-|-${category}`)
        break
      case 'listAndChooseProduct':
        const userChoice = JSON.stringify(ProductService.listAndChooseProduct(listParams[1]))
        socket.write(`chosenProduct-|-${userChoice}`)
        break
      case 'addAnotherProduct':
        const userAnswer = ProductService.addAnotherProduct()
        if (userAnswer === '1') {
          socket.write('listCategories')
          break
        }
        socket.write('getOrder')
        break
      case 'showOrder':
        OrderService.showOrder(listParams[1])
        const deleteProduct = OrderService.deleteProduct(listParams[1])
        if(deleteProduct) {
          socket.write(`deleteProduct-|-${deleteProduct}`)
          break
        }
        const closeOrder = OrderService.closeOrder()
        socket.write(`closeOrder-|-${closeOrder}`)
        break
      case 'orderClosed':
        console.log("Pedido finalizado com sucesso! Volte Sempre!")
        socket.end()
        break
      case 'ERROR':
        console.log(listParams[1])
        break
      default:
        break
    }
  })
};

module.exports = app
