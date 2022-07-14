import LabelClass from "../classes/LabelClass";

import RestConnector from "../connectors/RestConnector";
import { mockupLabelList, mockupLabelMaps } from "../mockup";
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
    return RestConnector.get(`/mapping?dataset-id=${datasetID}`).then(
      (response) => {
        return JSON.parse(response.data.mapping);
      }
    );

    // Mockup
    // const labelmaps = mockupLabelMaps.map(([modelLabel, yourLabel]) => {
    //   return {
    //     classId: modelLabel.id,
    //     labelId: yourLabel.id,
    //   };
    // });
    // console.log("getLabelMappingByDataset", labelmaps);
    // return labelmaps;
  }

  setLabelMapping(labelMapping, datasetId) {
    return RestConnector.post(`/mapping`, {
      datasetID: datasetId,
      mapping: JSON.stringify(labelMapping),
    }).then((response) => {
      return response.data;
    });
  }

  editLabelMapping(labelPairs) {
    return RestConnector.put("/mapping", labelPairs).then((response) => {
      return response.data;
    });
  }

  // deleteLabelMapping(modelLabel, yourLabel) {
  //   return RestConnector.delete(
  //     `/classes/map?class-id=${modelLabel.id}&label-id=${yourLabel.id}`
  //   );
  // }
}

export default new LabelService();
