

export function filterObservations(searchText, fetched_observations, maxResults) {
    //alert("filterObservations("+searchText+")")

    return fetched_observations.filter((observation) => {
        if (observation.id.toString().includes(searchText)) {
            return true;
        }

        try {
            if (observation.parent !== undefined) {
                if (observation.parent.toString().includes(searchText)) {
                    return true;
                }
            }
        } catch (e) {
        }

        if (observation.name.toUpperCase().includes(searchText)) {

            return true;
        }
        if (observation.field_name.toUpperCase().includes(searchText)) {
            return true;
        }
        if (observation.my_status.toUpperCase().includes(searchText)) {
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

export function filterProjects(observations, taskid, maxResults) {
        if (observations===undefined) {
            return false
        }
      return observations.filter((observation) => {
        if (observation.task_type==='master') {
            if (observation.taskID===taskid) {
                return true;
            }
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

export function filterCollections(collections, id, maxResults) {
    if (collections===undefined) {
        return false
    }
    return collections.filter((collection) => {
        if (collection.id===id) {
            return true;
        }
        return false;
    }).slice(0, maxResults);
}

// get child observations of a master observation
export function getCollectionChildren(observations, id) {
    return observations.filter((observation) => {
        if (observation.parent===id) {
            return true;
        }
        return false;
    }).slice(0);
}

// create a comma separated list of id's from a json list of observations (used as id__in=<ids>)
export function getIds(observations) {
    let ids = ''

    ids = observations.map( (observation) => {
        return observation.id}

    )
    return ids

}