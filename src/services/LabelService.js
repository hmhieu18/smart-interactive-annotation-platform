import LabelClass from '../classes/LabelClass'

import RestConnector from '../connectors/RestConnector'
import {mockupLabelList} from '../mockup'
class LabelService {
  getLabelByDataset(datasetId) {
    // return RestConnector.get(`/labels?dataset-id=${datasetId}`)
    //   .then(response => response.data.map(label => LabelClass.constructorFromServerData(label)))
    //mockup
    return mockupLabelList.map(label => LabelClass.constructorFromServerData(label))

    }

  createLabel(data) {
    return RestConnector.post('/labels', {
      label: data.label,
      dataset_id: data.datasetId,
      annotation_properties: data.annotationProperties
    }).then(response => LabelClass.constructorFromServerData(response.data))
  }

  updateLabel(data) {
    return RestConnector.put('/labels', {
      id: data.id,
      label: data.label,
      annotation_properties: data.annotationProperties
    }).then(response => LabelClass.constructorFromServerData(response.data))
  }

  deleteLabelById(id) {
    return RestConnector.delete(`/labels?id=${id}`)
  }
}

export default new LabelService()