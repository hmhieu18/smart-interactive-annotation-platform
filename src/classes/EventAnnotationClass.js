import Annotation from "./AnnotationClass";
import LabelClass from "./LabelClass";
import { ANNOTATION_TYPE, ENUM_ANNOTATION_TYPE } from "../constants/constants";

export default class EventAnnotation extends Annotation {
  constructor(id, frameID, label) {
    super(id, frameID);
    this.type = ANNOTATION_TYPE.EVENT;
    this.label = label;
  }

  static constructorFromServerData(data, labelsList) {
    let mlabel = new LabelClass();
    for (const label of labelsList) {
      if (label.id == data.labelID) {
        mlabel = label;
      }
    }
    return new EventAnnotation(data.id, data.frameID, mlabel);
  }
}
