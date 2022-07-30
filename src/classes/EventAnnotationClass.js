import Annotation from "./AnnotationClass";
import LabelClass from "./LabelClass";
import { ANNOTATION_TYPE, ENUM_ANNOTATION_TYPE } from "../constants/constants";

export default class EventAnnotation extends Annotation {
  static _cls = "EVENT";
  constructor(id, frameID, labelID, confidence = 1) {
    super(id, frameID);
    this.type = ANNOTATION_TYPE.EVENT;
    this.labelID = labelID;
    this.confidence = confidence;
  }

  static constructorFromServerData(data) {
    if (!data.confidence) {
      data.confidence = 1;
    }
    return new EventAnnotation(
      data.id,
      data.frameID,
      data.labelID,
      data.confidence
    );
  }
}
