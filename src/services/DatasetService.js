import RestConnector from '../connectors/RestConnector'

import DatasetClass from '../classes/DatasetClass'
import {mockupDataset} from '../mockup'
class DatasetService {
  getDatasetById(id) {
    return RestConnector.get(`/datasets?id=${id}`)
      .then(response => {
        if (!response.data) {
          throw new Error("Not found dataset")
        }
        return DatasetClass.constructorFromServerData(response.data)
      })
    // return DatasetClass.constructorFromServerData(mockupDataset)
  }

  async getDatasetByProject(projectId) {
    return RestConnector.get(`/datasets?project-id=${projectId}`)
      .then(response => response.data.map(dataset => DatasetClass.constructorFromServerData(dataset)))
    // return [mockupDataset].map(dataset => DatasetClass.constructorFromServerData(dataset))
  }

  createDataset(data) {
    return RestConnector.post(`/datasets`, {
      projectId: data.projectId,
      name: data.name,
      datatype: data.datatype,
      description: data.description,
    })
    .then(response => {
      return DatasetClass.constructorFromServerData(response.data)
    })
  }

  updateDataset(newDataset) {
    return RestConnector.put(`/datasets`, {
      id: newDataset.id,
      name: newDataset.name,
      description: newDataset.description,
    }).then(response => {
      return DatasetClass.constructorFromServerData(response.data)
    })
  }
  
  deleteDatasetById(id) {
    return RestConnector.delete(`/datasets?id=${id}`)
      .then((response) => {
        return response.data
      })
  }
}

export default new DatasetService()