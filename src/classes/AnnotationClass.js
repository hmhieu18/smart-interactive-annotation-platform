import generateNewUid from "../utils/uidGenerator"

export default class Annotation {
  constructor(id = '', frameID) {
    this.id = id || generateNewUid()
    this.frameID = frameID
  }
}