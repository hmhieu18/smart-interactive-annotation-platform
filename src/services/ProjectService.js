// import RestConnector from '../connectors/RestConnector'

import ProjectClass from '../classes/ProjectClass'

import {projectList} from '../mockup'

class ProjectService {
  async getProjects() {
    return projectList.map(data => ProjectClass.constructorFromServerData(data))
  }
}

export default new ProjectService()