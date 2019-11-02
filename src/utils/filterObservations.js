

export default function filterObservations(searchText, fetched_observations, maxResults) {
    //alert("filterObservations("+searchText+")")

    return fetched_observations.filter((observation) => {
        if (observation.name.toUpperCase().includes(searchText)) {

            return true;
        }
        if (observation.field_name.toUpperCase().includes(searchText)) {
            return true;
        }
        if (observation.date.toString().includes(searchText)) {
            return true;
        }
        return false;
    }).slice(0, maxResults);
}
