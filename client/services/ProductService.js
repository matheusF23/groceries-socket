const prompt = require('prompt-sync')()

class ProductService {
  static listAndChooseProduct(data) {
    console.log('\nEscolha o número do produto:')

    const products = JSON.parse(data).products
    const indexes = []

    for (let i = 0; i < products.length; i++) {
      const description = products[i].description
      const price = products[i].price
      const stock = products[i].stock

      indexes.push(i)

      console.log(`${i}: ${description}; preço: R$ ${price}; quantidade disponível: ${stock}`)
    }

    console.log()
    let chosenProduct = Number(prompt('Responda: '))
    while (!indexes.includes(chosenProduct)) {
      chosenProduct = Number(prompt('Escolha um número válido! '))
    }

    console.log()
    let productQuantity = Number(prompt('Escolha a quantidade a ser adicionada: '))
    while (productQuantity < 1 || productQuantity > products[chosenProduct].stock || !productQuantity) {
      productQuantity = Number(prompt('Escolha uma quantidade válida! '))
    }

    return { productId: products[chosenProduct].id, productQuantity }
  }

  static addAnotherProduct() {
    console.log('\nGostaria de adicionar mais um produto?')
    console.log('1: sim\n2: não')

    let chosenOption = prompt('Responda: ')
    while (chosenOption !== '1' && chosenOption !== '2') {
      chosenOption = prompt('Escolha um número válido! ')
    }

    return chosenOption
  }
}

module.exports = ProductService