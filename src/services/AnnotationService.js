import RestConnector from '../connectors/RestConnector'

import EventAnnotationClass from '../classes/EventAnnotationClass'

class AnnotationService {
  async parseAnnotationObj(ann) {
    switch (ann._cls) {
      case "Annotation.Event":
        return await EventAnnotationClass.constructorFromServerData(ann)
      default:
        return {}
    }
  }

  async getAnnotationsByDataInstance(dataInstanceId) {
    const annotationResponse = await RestConnector.get(`/annotations?data_instance_id=${dataInstanceId}`)

    const annotationsObj = await Promise.all(annotationResponse.data.map(async ann => await this.parseAnnotationObj(ann)))

    return annotationsObj
  }

  async getAnnotationByAnnotationObject(annotationObjectId) {
    const annotationResponse = await RestConnector.get(`/annotations?annotation_object_id=${annotationObjectId}`)

    const annotationsObj = await Promise.all(annotationResponse.data.map(async ann => await this.parseAnnotationObj(ann)))

    return annotationsObj
  }

  async deleteAnnotationById(id) {
    return RestConnector.delete(`/annotations?id=${id}`)
      .then((response) => {
        return response.data
      })
  }
}

export default new AnnotationService()