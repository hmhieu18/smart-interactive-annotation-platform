import { DATASET_DATATYPE } from '../constants/constants'

export default class DatasetClass {
  constructor(id = '', name = '', projectId = '', datatype=DATASET_DATATYPE.IMAGE, otherData = {}) {
    this.id = id
    this.name = name
    this.projectId = projectId
    this.datatype = datatype

    Object.keys(otherData).forEach(key => this[key] = otherData[key])
  }

  static constructorFromServerData(data) {
    console.log("UP A ", data)
    const { id, projectId, name, datatype, ...others } = data
    return new DatasetClass(
      id,
      name,
      projectId,
      datatype,
      others
    )
  }
}