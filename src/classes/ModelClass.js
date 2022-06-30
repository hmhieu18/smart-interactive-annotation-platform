export default class ModelClass {
  constructor(id = '', name = '', description = '', input = '', output = '', feature='', URL='', otherData = {}) {
    this.id = id
    this.name = name
    this.description = description
    this.input = input
    this.output = output
    this.feature = feature
    this.URL = URL
    Object.keys(otherData).forEach(key => this[key] = otherData[key])
  }

  static constructorFromServerData(data) {
    const { id, name, description, input, output, feature, URL, ...others } = data
    return new ModelClass(
      id,
      name,
      description,
      input, output, feature, URL,
      others
    )
  }
}