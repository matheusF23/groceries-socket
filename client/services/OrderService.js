const prompt = require('prompt-sync')()

class OrderService {
  static showOrder(order) {
    console.log('\nAqui está o seu pedido!')

    const orderObj = JSON.parse(order)

    console.log(`Valor total: R$ ${orderObj.totalPrice};\nProdutos:`)
    orderObj.products.forEach(product => {
      console.log(`Produto: ${product.product}; Quantidade: ${product.qty}; Preço: R$ ${product.price}`)
    })
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