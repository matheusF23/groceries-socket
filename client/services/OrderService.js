const prompt = require('prompt-sync')()

class OrderService {
  static showProducts(products) {
    products.forEach(product => {
      console.log(`${products.indexOf(product)}: ${product.product}; Quantidade: ${product.qty}; Preço: R$ ${product.price}`)
    })
  }

  static showOrder(order) {
    console.log('\nAqui está o seu pedido!')

    const orderObj = JSON.parse(order)

    console.log(`Valor total: R$ ${orderObj.totalPrice};\nProdutos:`)
    OrderService.showProducts(orderObj.products)
  }

  static deleteProduct(order) {
    let product = null

    console.log('\nGostaria de remover algum produto?')
    console.log('1: sim\n2: não')

    let chosenOption = prompt('Responda: ')
    while (chosenOption !== '1' && chosenOption !== '2') {
      chosenOption = prompt('Escolha um número válido! ')
    }

    if(chosenOption === '1') {
      const orderObj = JSON.parse(order)

      console.log('\nEscolha o produto!')
      OrderService.showProducts(orderObj.products)

      product = prompt('Responda: ')
      while (product < 0 || product > orderObj.products.length - 1 || !product) {
        product = prompt('Escolha um número válido! ')
      }
    }

    return product
  }

  static closeOrder() {
    console.log('\nGostaria de finalizar o pedido?')
    console.log('1: sim\n2: não')

    let chosenOption = prompt('Responda: ')
    while (chosenOption !== '1' && chosenOption !== '2') {
      chosenOption = prompt('Escolha um número válido! ')
    }

    return chosenOption
  }
}

module.exports = OrderService
