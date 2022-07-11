import Annotation from "./AnnotationClass";
import LabelClass from "./LabelClass";
import { ANNOTATION_TYPE, ENUM_ANNOTATION_TYPE } from "../constants/constants";

export default class EventAnnotation extends Annotation {
  constructor(id, frameID, labelID) {
    super(id, frameID);
    this.type = ANNOTATION_TYPE.EVENT;
    this.labelID = labelID;
  }
  static constructorFromServerData(data) {
    return new EventAnnotation(data.id, data.frameID, data.labelID);
  }
}
