import ModelLabelClass from "../classes/ModelLabelClass";

import RestConnector from "../connectors/RestConnector";
class ModelLabelService {
  getLabelByModel(modelId) {
    return RestConnector.get(`/classes?model-id=${modelId}`)
      .then(response => response.data.map(label => ModelLabelClass.constructorFromServerData(label)))
  }
  createLabel(data) {
    return RestConnector.post("/classes", {
      label: data.label,
      modelId: data.modelId,
    }).then((response) => ModelLabelClass.constructorFromServerData(response.data));
  }

  updateLabel(data) {
    return RestConnector.put("/classes", {
      id: data.id,
      label: data.label,
    }).then((response) => ModelLabelClass.constructorFromServerData(response.data));
  }

  deleteLabelById(id) {
    return RestConnector.delete(`/classes?id=${id}`);
  }
}

export default new ModelLabelService();
