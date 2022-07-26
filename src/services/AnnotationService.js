import RestConnector from "../connectors/RestConnector";

import EventAnnotationClass from "../classes/EventAnnotationClass";
import { mockupAnnotationList } from "../mockup";
import { ANNOTATION_TYPE, ENUM_ANNOTATION_TYPE } from "../constants/constants";

class AnnotationService {
  async parseAnnotationObj(ann) {
    switch (ann.type) {
      case ANNOTATION_TYPE.EVENT:
        return await EventAnnotationClass.constructorFromServerData(ann);
      default:
        return {};
    }
  }

  async getAnnotationsByDataInstance(dataInstanceId) {
    try {
      const annotationResponse = await RestConnector.get(
        `/predict/annotation?data-id=${dataInstanceId}`
      );
      //check status code
      if (annotationResponse.status === 200) {
        if (annotationResponse?.data?.annotation === "") {
          return [];
        }
        console.log("getAnnotationsByDataInstance", annotationResponse.data);
        const reponseList = JSON.parse(annotationResponse.data.annotation);
        console.log("getAnnotationsByDataInstance.responseList", reponseList);

        const annotationsObj = await Promise.all(
          reponseList.map(async (ann) => await this.parseAnnotationObj(ann))
        );
        console.log("getAnnotationsByDataInstance", annotationsObj);
        return annotationsObj;

        // // MOCKUP
        // const annotationsObj = await Promise.all(mockupAnnotationList.map(
        //       async (ann) => await this.parseAnnotationObj(ann)
        //     ));
      }
      return [];
    } catch (error) {
      return [];
    }
  }

  async setAnnotationsByDataInstance(dataID, listAnnotation) {
    return RestConnector.post(`/predict/save`, {
      dataID: dataID,
      annotations: JSON.stringify(listAnnotation),
    }).then((response) => {
      return response.data;
    });
  }
}

export default new AnnotationService();
