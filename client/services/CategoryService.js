const prompt = require("prompt-sync")()

class CategoryService {
  static listAndChooseCategories(data) {
    console.log('\nEscolha o número da categoria:')

    const categories = JSON.parse(data)
    const categoryKeys = Object.keys(categories)

    categoryKeys.forEach(key => {
      console.log(`${key}: ${categories[key]}`)
    })

    console.log()
    let chosenCategory = prompt('Responda: ')
    while (!categoryKeys.includes(chosenCategory)){
      chosenCategory = prompt('Escolha um número válido! ')
    }

    return categories[chosenCategory]
  }
}

module.exports = CategoryService