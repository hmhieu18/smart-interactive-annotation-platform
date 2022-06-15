import React from 'react'
import { makeStyles } from '@material-ui/core/styles'
import Grid from '@material-ui/core/Grid'
// import { useStore } from 'react-redux'

import Loading from '../../../../components/Loading'
import ProjectItem from './components/ProjectItem'

const useStyles = makeStyles(() => ({
  listContainer: {
    marginTop: 20
  }
}))

const List = (props) => {
  const classes = useStyles()
  const { useStore } = props
  const isLoading = useStore(state => state.isLoading)
  const projects = useStore(state => state.projects)

  return (
    <div className="row">
      <Loading isLoading={isLoading}/>
      {
        projects.map(project => (
          <ProjectItem
            key={`project-${project.id}`}
            project={project}
          />
        ))
      }
    </div>
  )
}

export default List