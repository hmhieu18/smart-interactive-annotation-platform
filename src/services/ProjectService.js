// import RestConnector from '../connectors/RestConnector'

import ProjectClass from '../classes/ProjectClass'

import {projectList, mockupProject} from '../mockup'

class ProjectService {
  async getProjects() {
    return projectList.map(data => ProjectClass.constructorFromServerData(data))
  }

  async getProjectById(projectId) {
    // const projectResponse = await RestConnector.get(`/projects?id=${projectId}`)
    //Mockup
    // const projectResponse = projectList
    const projectData = mockupProject

    if (projectData) {
      return ProjectClass.constructorFromServerData(projectData)
    } else {
      return null
    }
  }
}

export default new ProjectService()