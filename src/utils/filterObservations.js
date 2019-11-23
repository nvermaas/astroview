

export function filterObservations(searchText, fetched_observations, maxResults) {
    //alert("filterObservations("+searchText+")")

    return fetched_observations.filter((observation) => {
        if (observation.name.toUpperCase().includes(searchText)) {

            return true;
        }
        if (observation.field_name.toUpperCase().includes(searchText)) {
            return true;
        }
        if (observation.my_status.toUpperCase().includes(searchText)) {
            return true;
        }
        if (observation.observing_mode.toUpperCase().includes(searchText)) {
            return true;
        }
        if (observation.date.toString().includes(searchText)) {
            return true;
        }
        return false;
    }).slice(0, maxResults);
}


export function getProjects(observations, maxResults) {

    return observations.filter((observation) => {
        if (observation.task_type==='master') {
            //alert('found master')
            return true;
        }
        return false;
    }).slice(0, maxResults);
}

// get child observations of a master observation
export function getChildren(observations, id) {
    return observations.filter((observation) => {
        if (observation.parent===id) {
            return true;
        }
        return false;
    }).slice(0);
}
