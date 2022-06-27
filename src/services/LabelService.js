import LabelClass from "../classes/LabelClass";

import RestConnector from "../connectors/RestConnector";
import { mockupLabelList } from "../mockup";
class LabelService {
  getLabelByDataset(datasetId) {
    return RestConnector.get(`/labels?dataset-id=${datasetId}`).then(
      (response) =>
        response.data.map((label) =>
          LabelClass.constructorFromServerData(label)
        )
    );
    // mockup
    // return mockupLabelList.map(label => LabelClass.constructorFromServerData(label))
  }
  getLabelByModel(modelId) {
    // return RestConnector.get(`/labels?model-id=${modelId}}`)
    //   .then(response => response.data.map(label => LabelClass.constructorFromServerData(label)))
    // mockup
    return mockupLabelList.map((label) =>
      LabelClass.constructorFromServerData(label)
    );
  }
  createLabel(data) {
    return RestConnector.post("/labels", {
      label: data.label,
      dataset_id: data.datasetId,
      annotation_properties: data.annotationProperties,
    }).then((response) => LabelClass.constructorFromServerData(response.data));
  }

  updateLabel(data) {
    return RestConnector.put("/labels", {
      id: data.id,
      label: data.label,
      annotation_properties: data.annotationProperties,
    }).then((response) => LabelClass.constructorFromServerData(response.data));
  }

  deleteLabelById(id) {
    return RestConnector.delete(`/labels?id=${id}`);
  }

  getLabelMappingByDataset(datasetID) {
    return RestConnector.get(`/classes/map?dataset-id=${datasetID}`).then(
      (response) =>
        response.data.map((modelLabel, yourLabel) => [
          LabelClass.constructorFromServerData(modelLabel),
          LabelClass.constructorFromServerData(yourLabel),
        ])
    );
  }

  setLabelMapping(modelLabel, yourLabel) {
    return RestConnector.post("/classes/map", {
      classID: modelLabel.id,
      labelID: yourLabel.id,
    }).then((response) => {
      return response.data;
    });
  }

  editLabelMapping(labelPairs) {
    return RestConnector.put("/classes/map", labelPairs).then((response) => {
      return response.data;
    });
  }

  deleteLabelMapping(modelLabel, yourLabel) {
    return RestConnector.delete(`/classes/map?class-id=${modelLabel.id}&label-id=${yourLabel.id}`);
  }
}

export default new LabelService();
