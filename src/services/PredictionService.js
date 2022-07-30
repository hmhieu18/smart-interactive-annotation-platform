import RestConnector from "../connectors/RestConnector";

import ProjectClass from "../classes/ProjectClass";

import { projectList, mockupProject } from "../mockup";

class PredictionService {
  async getPredictionByModelIdAndDataId(modelId, dataId) {
    const predictionResponse = await RestConnector.get(
      `/predictf?model-id=${modelId}&data-id=${dataId}`
    );
    const dataResponse = predictionResponse.data;
    // //get first letter "{""  in dataResponse
    // const startIndex = dataResponse.indexOf("{");
    // //get last letter "}" in dataResponse
    // const endIndex = dataResponse.lastIndexOf("}");
    // //get substring from startIndex to endIndex
    // const data = dataResponse.substring(startIndex, endIndex + 1);
    const predictionURL = JSON.parse(dataResponse).result;
    console.log("predictionURL", predictionURL);
    return predictionURL;
  }
}

export default new PredictionService();
