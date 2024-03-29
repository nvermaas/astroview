import React from 'react';
import { Link } from "react-router-dom"
import { Button, Badge } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_OBSERVATION_PAGE, SET_CURRENT_PROJECT, SET_CURRENT_TASK_ID, SET_CURRENT_OBSERVATION } from '../../reducers/GlobalStateReducer'

import { ASTROBASE_URL } from '../../utils/skyserver'
import { getMode, getExposure, getImageTypeIcon, getQualityIcon, getHipsIcon, getStarsIcon, getTransientIcon, getDetailsIcon } from '../../utils/styling'


export default function ObservationsGrid(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleDetailsClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_CURRENT_TASK_ID, current_task_id: observation.taskID})
        my_dispatch({type: SET_CURRENT_PROJECT, current_project: observation.taskID})
    }

    const handleProjectClick = (observation) => {
        // let backend_filter = '&fieldsearch='+observation.derived_parent_taskid
        // my_dispatch({type: SET_BACKEND_FILTER, backend_filter: backend_filter})
        my_dispatch({type: SET_CURRENT_PROJECT, current_project: observation.derived_parent_taskid})

    }


    const handlePageChange = (page) => {
        // a change in observation_page is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: page})

    }

    const handlePerRowsChange = () => {
        alert('handlePerRowsChange')
    }

    // generate the details link to forward to
    const getAladinLink = (observation) => {
        let details_link = "/aladin"

        // dispatch current observation to the global store
        // my_dispatch({type: ALADIN_RA, aladin_ra: ra.toString()})
        // my_dispatch({type: ALADIN_DEC, aladin_dec: dec.toString()})
        // my_dispatch({type: ALADIN_FOV, aladin_fov: fov.toString()})
        //my_dispatch({type: ALADIN_MODE, aladin_mode: mode})
        //my_dispatch({type: SET_CURRENT_OBSERVATION, current_observation: observation})

        return details_link
    }

    const getDetailsLink = (observation) => {
        let details_link = "/details/"+observation.taskID
        return details_link
    }

    // generate the api link
    const getAPI = (observation) => {
        //let api_link = ASTROBASE_URL + "observations/" + observation.id.toString()
        let api_link = ASTROBASE_URL + "?search_box=" + observation.taskID.toString()
        return api_link
    }

    // generate the api link
    const getDPSlink = (observation) => {
        let dps_link = ASTROBASE_URL + "task/" + observation.taskID.toString()
        return dps_link
    }

    // generate the api link
    const getParentlink = (observation) => {
        if (observation.derived_parent_taskid===undefined) {
            return null
        }

        let project_link = "projectsss/" + observation.derived_parent_taskid.toString()
        return project_link
    }

    // generate the api link
    const getProjectslink = (observation) => {
        if (observation.taskID===undefined) {
            return null
        }
        let project_link = "projectsss/" + observation.taskID.toString()
        return project_link
    }

    const columns = [
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            width: "15%",
            cell: row => {
                let icon = getImageTypeIcon(row.image_type)
                return <div>{icon}&nbsp;&nbsp;{row.name}</div>
            }
        },
        {
            name: 'ID (children)',
            selector: 'taskID',
            sortable: true,
            width: "8%",
            cell: row => {
                if (row.task_type === 'master') {
                    let nr_of_children = row.children.length
                    return <div>
                        <Link to={getProjectslink(row)}>
                            <div style={{ fontWeight: "bold" }}>{row.taskID}{' '}({nr_of_children})</div>
                        </Link>
                    </div>
                } else {
                    return <div>{row.taskID}</div>
                }
            }
        },
        /*
        {
            name: 'Type',
            selector: 'task_type',
            sortable: true,
            width: "5%",
            cell: row => {
                if (row.task_type === 'master') {
                    return <div style={{ fontWeight: "bold" }}>Project</div>
                }},
        },
        */
        {
            name: 'Parent',
            selector: 'derived_parent_taskid',
            sortable: true,
            style: {
                fontweight: "bold",
            },
            width: "7%",
            cell: row => {

                if (row.derived_parent_taskid) {
                    return <div>
                        <Link to={getParentlink(row)}>
                            <div onClick={() => handleProjectClick(row)} style={{ fontWeight: "bold" }}>{row.derived_parent_taskid}</div>
                        </Link>
                    </div>
                }
            }
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            width: "7%",
            cell: row => {
                var d = new Date(row.date.toString());
                return <div>{d.toDateString()}</div>
            }
        },
        {
            name: 'Field',
            selector: 'field_name',
            sortable: true,
            wrap : true,
            compact: true
        },

        {
            name: 'Mode',
            selector: 'observing_mode',
            sortable: true,
            width: "7%",
            cell: row => {
                let mode = getMode(row)
                return <div>{mode}</div>
            }
        },
        {
            name: 'T(m)',
            selector: 'exposure_in_seconds',
            sortable: true,
            width: "5%",
            cell: row => {
                let exposure = getExposure(row)
                return <div>{exposure}</div>
            }
        },
        {
            name: 'F(mm)',
            selector: 'focal_length',
            sortable: true,
            width: "4%"
        },
        {
            name: 'Q',
            selector: 'quality',
            sortable: true,
            width: "3%",
            cell: row => {
                let icon = getQualityIcon(row.quality)
                return <div>{icon}</div>
            }
        },
        {
            name: 'M',
            selector: 'magnitude',
            sortable: true,
            width: "3%",
            cell: row => {
                return <Link to={() => getDetailsLink(row)}>
                    <div>
                        <Badge pill bg="light">
                            {row.magnitude}
                        </Badge>
                    </div>
                </Link>
            }
        },
/*
        {
            name: 'Status',
            selector: 'my_status',
            sortable: true,
            width: "5%"
        },
*/
        {
            name: 'Box',
            selector: 'used_in_hips',
            sortable: true,
            width: "3%",
            cell: row => {
                let icon = getHipsIcon(row.used_in_hips)
                return <Link to={() => getAladinLink(row)}>
                    <div>{icon}</div>
                </Link>
            }
        },
        {
            name: 'Trans (link)',
            width: "3%",
            cell: row => {
                let icon = getTransientIcon(row.derived_annotated_transient_image)
                return <a href={row.derived_annotated_transient_image} target="_blank" rel="noopener noreferrer">
                    <div>{icon}</div>
                </a>
            },
        },
        {
            name: 'Stars (link)',
            width: "3%",
            cell: row => {
                let icon = getStarsIcon(row.derived_annotated_stars_image)
                return <a href={row.derived_annotated_stars_image} target="_blank" rel="noopener noreferrer">
                    <div>{icon}</div>
                </a>
            },
        },

        {
            name: 'Details (link)',
            width: "3%",
            cell: row => {
                let icon = getDetailsIcon(handleDetailsClick,row)
                return <Link to={() => getDetailsLink(row)}>
                    <div>{icon}</div>
                </Link>
            },
            button: true,
        },
/*
        {
            name: 'Details',
            cell: row => {
                if (row.my_status==='done') {
                    return <Link to={() => getDetailsLink(row)}>
                        <Button variant="warning" onClick={() => handleDetailsClick(row)}>Details</Button>
                    </Link>
                }
            },
            button: true,
        },
*/
        {
            name: 'Astrobase',
            cell: row =>
                <a href={getAPI(row)} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline-info" >API</Button>
                </a>,
            button: true,
        },
    ];

    const conditionalRowStyles = [
        {
            when: row => row.quality === 'annotated',
            style: {
                backgroundColor: 'lightblue',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.quality === 'great',
            style: {
                backgroundColor: '#9FFF7F',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality === 'good',
            style: {
                backgroundColor: '#C0FFC0',
                color: 'black',
                fontWeight: 'bold',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality === 'medium',
            style: {
                backgroundColor: 'lightgrey',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality === 'bad',
            style: {
                backgroundColor: '#ffddd3',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.quality === 'simulated',
            style: {
                backgroundColor: 'lightblue',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.my_status === 'master_xx',
            style: {
                backgroundColor: 'grey',
                color: 'white',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
    ];

    // this creates an 'expand' icon in front of every row and shows additional information (images)
    const ExpandableComponent = ({ data }) => <div>
        <p>{data.description}</p>
        <img src={data.derived_sky_plot_image} height={200} />;
        &nbsp;
        <a href = {data.derived_raw_image} target="_blank" rel="noopener noreferrer"><img src={data.derived_raw_image} height={200} /></a>
        &nbsp;
        <a href = {data.derived_annotated_image} target="_blank" rel="noopener noreferrer"><img src={data.derived_annotated_image} height={200} /></a>
        &nbsp;
        <a href = {data.derived_annotated_transient_image} target="_blank" rel="noopener noreferrer"><img src={data.derived_annotated_transient_image} height={200} /></a>
        &nbsp;
        <a href = {data.derived_annotated_grid_image} target="_blank" rel="noopener noreferrer"><img src={data.derived_annotated_grid_image} height={200} /></a>

    </div>;

    return (
        <div>
            <DataTable
                title="All Observations"
                columns={columns}
                data={props.data}
                conditionalRowStyles={conditionalRowStyles}
                pagination

                // disable this section to return to the original client side pagination
                // but then make sure to set PAGE_SIZE in the backend to something huge to get all the data
                // documentation: https://jbetancur.github.io/react-data-table-component/?path=/story/pagination--server-side
                paginationServer
                paginationTotalRows={my_state.total_observations}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}

                paginationPerPage={100}
                // paginationRowsPerPageOptions={[50, 100]}
                paginationRowsPerPageOptions={[25,50,100]}

                expandOnRowClicked
                expandableRows
                expandableRowsComponent={<ExpandableComponent />}
            />
        </div>
    );
}