export default class ModelClass {
  constructor(id = '', name = '', description = '', otherData = {}) {
    this.id = id
    this.name = name
    this.description = description

    Object.keys(otherData).forEach(key => this[key] = otherData[key])
  }

  static constructorFromServerData(data) {
    const { id, name, description, ...others } = data
    return new ModelClass(
      id,
      name,
      description,
      others
    )
  }
}