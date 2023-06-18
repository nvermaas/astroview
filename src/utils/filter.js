
// apply the filters that are set in the state to the url_observations
export const getFilteredUrl = (url, my_state, page) => {

    if (page) {
        url = url + "?page=" + page
    } else {
        url = url + "?"
    }

    if (my_state.backend_filter !== undefined) {
        url = url + my_state.backend_filter
    }

    if (my_state.observation_image_type !== "All") {
        url = url + '&image_type__icontains=' + my_state.observation_image_type
    }

    if (my_state.observation_quality.indexOf(',') >= 0) {
        url = url + '&quality__in=' + my_state.observation_quality.toLowerCase()
    } else

    if (my_state.observation_quality !== "All") {
        url = url + '&quality__icontains=' + my_state.observation_quality
    }

    if (my_state.observation_status !== "All") {
        url = url + '&my_status__icontains=' + my_state.observation_status
    }

    if (my_state.observation_iso !== "All") {
        url = url + '&iso=' + my_state.observation_iso
    }

    if (my_state.observation_focal_length !== "All") {
        url = url + '&focal_length=' + my_state.observation_focal_length
    }

    if (my_state.observation_instrument !== "All") {
        url = url + '&instrument=' + my_state.observation_instrument
    }

    return url
}

// apply the filters that are set in the state to the url_observations
export const getFilteredUrlCollections = (url, my_state, page) => {

    url = url + "?page=" + page

    if (my_state.backend_filter !== undefined) {
        url = url + my_state.backend_filter
    }

    if (my_state.observation_image_type !== "All") {
        url = url + '&collection_type__icontains=' + my_state.observation_image_type
    }

    if (my_state.observation_quality !== "All") {
        url = url + '&quality__icontains=' + my_state.observation_quality
    }

    if (my_state.observation_iso !== "All") {
        url = url + '&iso=' + my_state.observation_iso
    }

    if (my_state.observation_focal_length !== "All") {
        url = url + '&focal_length=' + my_state.observation_focal_length
    }
    return url
}