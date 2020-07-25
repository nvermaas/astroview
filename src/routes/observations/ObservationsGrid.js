import React from 'react';
import { Link } from "react-router-dom"
import { Button } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useGlobalReducer } from '../../Store';
import { SET_ACTIVE_TASKID, SET_FETCHED_OBSERVATIONS, SET_TOTAL_OBSERVATIONS, SET_STATUS } from '../../reducers/GlobalStateReducer'
//import { url } from '../../components/Main'
import { ASTROBASE_URL } from '../../utils/skyserver'

export default function ObservationsGrid(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_ACTIVE_TASKID, taskid: observation.taskID})
    }

    const handlePageChange = (page) => {
        // get the data from the api
        let url = ASTROBASE_URL + "observations?page=" +page.toString()

        // if a backend_filter is defined then add it to the url
        if (my_state.backend_filter!=undefined) {
            url = url + my_state.backend_filter
        }
        //alert(my_state.total_observations)

        if (my_state.status !== 'fetching')  {
            console.log('fetchObservations: ' + (url))
            my_dispatch({type: SET_STATUS, status: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_OBSERVATIONS, fetched_observations: data.results})
                    my_dispatch({type: SET_TOTAL_OBSERVATIONS, total_observations: data.count})
                    my_dispatch({type: SET_STATUS, status: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS, status: 'failed'})
                    alert("fetch to " + url + " failed.");
                })
            }
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
        let api_link = ASTROBASE_URL + "observations/" + observation.id.toString()
        return api_link
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
        },
        {
            name: 'Project',
            selector: 'parent',
            sortable: true,
            style: {
                fontweight: "bold",
            },
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
        },
        {
            name: 'Name',
            selector: 'name',
            sortable: true,
        },
        {
            name: 'Mode',
            selector: 'observing_mode',
            sortable: true,
        },
        {
            name: 'Field',
            selector: 'field_name',
            sortable: true,
        },
        {
            name: 'Status',
            selector: 'my_status',
            sortable: true,
          },
        {
            name: 'Quality',
            selector: 'quality',
            sortable: true,
        },
        {
            cell: row =>
                <Link to={() => getLink(row)}>
                    <Button variant="warning" onClick={() => handleClick(row)}>Details</Button>
                </Link>,

            button: true,
        },
        {
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
            when: row => row.quality == 'great',
            style: {
                backgroundColor: 'green',
                color: 'white',
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
            when: row => row.my_status == 'master',
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
/*
    try {
        alert(props.data.length)
    } catch (e) {
    }
*/
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