import RestConnector from '../connectors/RestConnector'

import ModelClass from '../classes/ModelClass'

import {modelList, mockupModel} from '../mockup'

class ModelService {
  async getModels() {
    // return modelList.map(data => ModelClass.constructorFromServerData(data))
    return RestConnector.get(`/models`)
      .then(response => response.data.map(data => ModelClass.constructorFromServerData(data)))
  }

  async getModelById(modelId) {
    const modelResponse = await RestConnector.get(`/models?id=${modelId}`)
    const modelData = modelResponse.data

    // Mockup
    // const modelResponse = modelList
    // const modelData = mockupModel

    if (modelData) {
      return ModelClass.constructorFromServerData(modelData)
    } else {
      return null
    }
  }
  
  createModel(data) {
    return RestConnector.post(`/models`, {
      name: data.name,
      description: data.description,
      input: data.input,
      output: data.output,
      feature: data.feature,
      URL: data.URL,
    })
      .then(response => {
        return ModelClass.constructorFromServerData(response.data)
      })
  }

  updateModel(newModel) {
    return RestConnector.put(`/models`, {
      id: newModel.id,
      name: newModel.name,
      description: newModel.description,
      url: newModel.URL,
    }).then(response => {
      return ModelClass.constructorFromServerData(response.data)
    })
  }

  deleteModelById(id) {
    return RestConnector.delete(`/models?id=${id}`)
      .then((response) => {
        return response.data
      })
  }
}

export default new ModelService()