import RestConnector from "../connectors/RestConnector";

import EventAnnotationClass from "../classes/EventAnnotationClass";
import {mockupAnnotationList} from "../mockup"

class AnnotationService {
  async parseAnnotationObj(ann) {
    switch (ann._cls) {
      case "Annotation.Event":
        return await EventAnnotationClass.constructorFromServerData(ann);
      default:
        return {};
    }
  }

  async getAnnotationsByDataInstance(dataInstanceId) {
    // const annotationResponse = await RestConnector.get(
    //   `/annotations?data-id=${dataInstanceId}`
    // );

    // const annotationsObj = await Promise.all(
    //   annotationResponse.data.map(
    //     async (ann) => await this.parseAnnotationObj(ann, labelList)
    //   )
    // );
    // MOCKUP
    const annotationsObj = await Promise.all(mockupAnnotationList.map(
          async (ann) => await this.parseAnnotationObj(ann)
        ));

    return annotationsObj;
  }

  async setAnnotationsByDataInstance(dataID, listAnnotation) {
    return RestConnector.post(`/annotations`, {
      dataID: dataID,
      annotationList: JSON.stringify(listAnnotation),
    }).then((response) => {
      return response.data;
    });
  }
}

export default new AnnotationService();
