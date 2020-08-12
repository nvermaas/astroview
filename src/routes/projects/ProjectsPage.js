import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ProjectsGrid from './ProjectsGrid'
import { useGlobalReducer } from '../../Store';

import { filterProjects } from '../../utils/filterObservations'
import { SET_FILTERED_PROJECTS, SET_BACKEND_FILTER} from '../../reducers/GlobalStateReducer';

export default function Projects(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()
    const loading = my_state.status === 'fetching'

    // conditional render. Only render the observations when the status is 'fetched'
    let renderProjects

    if (my_state!=='unfetched') {
        let projects = my_state.fetched_projects
        if (props.taskid) {
            //alert(props.taskid)
            projects = filterProjects(projects,props.taskid,1)
        }
        renderProjects = <ProjectsGrid data={projects}/>
    }

    let renderSpinner
    if (my_state.status === "fetching") {
        renderSpinner = <LoadingSpinner/>
    }

    return (
        <div className="App">
            <div>
                {renderSpinner}
                {renderProjects}
            </div>
        </div>
    );
}