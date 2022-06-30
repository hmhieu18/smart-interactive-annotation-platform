export default class ModelLabelClass {
  constructor(labelId = '', label = '', modelId = '') {
    this.id = labelId
    this.label = label
    this.modelId = modelId
  }

  static constructorFromServerData(data) {
    return new ModelLabelClass(
      data.id,
      data.label,
      data.model,
    )
  }
}