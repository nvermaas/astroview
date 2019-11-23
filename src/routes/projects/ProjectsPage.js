import React from 'react';

import LoadingSpinner from '../../components/LoadingSpinner';
import ProjectsGrid from './ProjectsGrid'
import { useGlobalReducer } from '../../Store';

import { getProjects } from '../../utils/filterObservations'
import { SET_FILTERED_PROJECTS} from '../../reducers/GlobalStateReducer';

export default function Projects(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()
    const loading = my_state.status === 'fetching'

    // conditional render. Only render the observations when the status is 'fetched'
    let renderProjects

    if (my_state!=='unfetched') {
        let projects
        if (my_state.filter_type === 'show_fetched') {
            projects = my_state.fetched_projects
        } else if (my_state.filter_type === 'show_filtered') {
            projects = my_state.filtered_projects
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