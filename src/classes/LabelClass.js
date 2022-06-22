export default class LabelClass {
  constructor(labelId = '', label = '', datasetId = '', annotationProperties = {}) {
    this.id = labelId
    this.label = label
    this.datasetId = datasetId
    this.annotationProperties = annotationProperties
  }

  static constructorFromServerData(data) {
    return new LabelClass(
      data.id,
      data.label,
      data.dataset,
      data.annotation_properties
    )
  }

  set updateAnnotationProperties(annotationProperties) {
    this.annotationProperties = {
      ...this.annotationProperties,
      ...annotationProperties,
    }
  }
}