const { products } = require('../database/Products')
const { order } = require('../database/Orders')


class OrderService {
  static addProduct(productId, qty) {
    for (let i = 0; i < products.length; i++) {
      if (products[i].id === productId) {
        products[i].stock -= qty
        order.products.push({
          product: products[i].description,
          qty,
          price: qty * products[i].price
        })
        order.totalPrice += qty * products[i].price
      }
    }
  }

  static getOrder() {
    return order
  }
}

module.exports = OrderService