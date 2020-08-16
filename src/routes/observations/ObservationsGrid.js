import React from 'react';
import { Link } from "react-router-dom"
import { Button, Badge } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useGlobalReducer } from '../../Store';
import { SET_ACTIVE_TASKID, SET_OBSERVATION_PAGE, SET_BACKEND_FILTER } from '../../reducers/GlobalStateReducer'
//import { url_observations } from '../../components/Main'
import InfoLink from '../../components/buttons/InfoLink'

import { ASTROBASE_URL } from '../../utils/skyserver'
import { getMode, getExposure, getImageTypeIcon, getQualityIcon } from '../../utils/styling'


export default function ObservationsGrid(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_ACTIVE_TASKID, taskid: observation.taskID})
    }

    const handleProjectClick = (observation) => {
        let backend_filter = '&fieldsearch='+observation.derived_parent_taskid
        my_dispatch({type: SET_BACKEND_FILTER, backend_filter: backend_filter})
    }



    const handlePageChange = (page) => {
        // get the data from the api
        let url = ASTROBASE_URL + "observations?page=" +page.toString()

        // if a backend_filter is defined then add it to the url_observations
        if (my_state.backend_filter!=undefined) {
            url = url + my_state.backend_filter
        }

        // a change in observation_page is used to trigger a new fetch,
        // see the useEffect in the Main.js how that is done.
        my_dispatch({type: SET_OBSERVATION_PAGE, observation_page: page})

    }

    const handlePerRowsChange = () => {
        alert('handlePerRowsChange')
    }

    // generate the details link to forward to
    const getLink = (observation) => {
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
        /*
        {
            name: 'id',
            selector: 'id',
            size: 50,
            sortable: true,
            cell: row =>
                <Link to={() => getLink(row)}>
                    {row.id}&nbsp;
                </Link>,
        },
        */
        {
            name: 'TaskID',
            selector: 'taskID',
            sortable: true,
            width: "7%",
            cell: row => {
                if (row.task_type === 'master') {
                    return <div>
                        <Link to={getProjectslink(row)}>
                            <div style={{ fontWeight: "bold" }}>{row.taskID}</div>
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
            name: 'Project',
            selector: 'derived_parent_taskid',
            sortable: true,
            style: {
                fontweight: "bold",
            },
            width: "6%",
            cell: row => {
                if (row.derived_parent_taskid) {
                    return <div>
                        <Link to={getParentlink(row)}>
                            <div style={{ fontWeight: "bold" }}>{row.derived_parent_taskid}</div>
                        </Link>
                    </div>
                }
            }
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            width: "9%",
            cell: row => {
                var d = new Date(row.date.toString());
                return <div>{d.toDateString()}</div>
            }
        },
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
            name: 'T(s)',
            selector: 'exposure_in_seconds',
            sortable: true,
            width: "4%",
            cell: row => {
                let exposure = getExposure(row)
                return <div>{exposure}</div>
            }
        },
        {
            name: 'F(mm)',
            selector: 'focal_length',
            sortable: true,
            width: "3%"
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
                return <div>
                    <Badge pill variant="light">
                        {row.magnitude}
                    </Badge></div>
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
            name: 'Details',
            cell: row =>
                <Link to={() => getLink(row)}>
                    <Button variant="warning" onClick={() => handleClick(row)}>Details</Button>
                </Link>,

            button: true,
        },
        {
            name: 'Dataproducts',
            sortable: true,
            width: "5%",
            cell: row => {

                if (row.generated_dataproducts.length > 1) {
                    return <a href={getDPSlink(row)} target="_blank" rel="noopener noreferrer">
                        <Button variant="outline-info" onClick={() => handleClick(row)}>DPS</Button>
                    </a>
                }
            }
        },
        {
            name: 'Astrobase',
            cell: row =>
                <a href={getAPI(row)} target="_blank" rel="noopener noreferrer">
                    <Button variant="outline-info" onClick={() => handleClick(row)}>API</Button>
                </a>,
            button: true,
        },
    ];

    const myTheme = {
        title: {
            fontSize: '22px',
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
        },
        contextMenu: {
            backgroundColor: '#E91E63',
            fontColor: '#FFFFFF',
        },
        header: {
            fontSize: '12px',
            fontColorActive: 'FFFFFF',
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            borderColor: 'rgba(255, 255, 255, .12)',
        },
        rows: {
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            borderColor: 'rgba(255, 255, 255, .12)',
            hoverFontColor: 'black',
            hoverBackgroundColor: 'rgba(0, 0, 0, .24)',
        },
        cells: {
            cellPadding: '48px',
        },
        pagination: {
            fontSize: '13px',
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            buttonFontColor: '#FFFFFF',
            buttonHoverBackground: 'rgba(255, 255, 255, .12)',
        },
        expander: {
            fontColor: '#FFFFFF',
            backgroundColor: '#363640',
            expanderColor: '#FFFFFF',
        },
        footer: {
            separatorColor: 'rgba(255, 255, 255, .12)',
        },
    };

    const conditionalRowStyles = [
        {
            when: row => row.quality == 'annotated',
            style: {
                backgroundColor: 'lightblue',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.quality == 'great',
            style: {
                backgroundColor: '#9FFF7F',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality == 'good',
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
            when: row => row.quality == 'medium',
            style: {
                backgroundColor: 'lightgrey',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },

        },
        {
            when: row => row.quality == 'bad',
            style: {
                backgroundColor: '#ffddd3',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.quality == 'simulated',
            style: {
                backgroundColor: 'lightblue',
                color: 'black',
                '&:hover': {
                    cursor: 'pointer',
                },
            },
        },
        {
            when: row => row.my_status == 'master_xx',
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

    </div>;

    return (
        <div>
            <DataTable
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

                paginationPerPage={25}
                // paginationRowsPerPageOptions={[50, 100]}
                paginationRowsPerPageOptions={[25]}

                expandableRows
                expandableRowsComponent={<ExpandableComponent />}
            />
        </div>
    );
}