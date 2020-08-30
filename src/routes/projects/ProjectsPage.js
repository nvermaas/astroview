import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ProjectsGrid from './ProjectsGrid'
import { ButtonBar } from '../../components/ButtonBar';
import { useGlobalReducer } from '../../contexts/GlobalContext';

import { SET_CURRENT_PROJECT, SET_PROJECT_PAGE } from '../../reducers/GlobalStateReducer'
import { filterProjects } from '../../utils/filterObservations'

export default function Projects(props) {

    const [ my_state, my_dispatch] = useGlobalReducer()
    const loading = my_state.status_projects === 'fetching'

    // conditional render. Only render the observations when the status is 'fetched'
    let renderProjects

    if (my_state.status_projects!=='unfetched') {
        let projects = my_state.fetched_projects

        if (props.taskid) {
            projects = filterProjects(my_state.fetched_projects, props.taskid, 1)
            if (projects.length===0) {
                projects = filterProjects(my_state.current_observations, props.taskid, 1)
            }
        }
        renderProjects = <ProjectsGrid data={projects}/>
    }

    let renderSpinner
    if (my_state.project_status === "fetching") {
        renderSpinner = <LoadingSpinner/>
    }

    return (
        <div className="App">
            <div>
                <ButtonBar/>
                {renderSpinner}
                {renderProjects}
            </div>
        </div>
    );
}