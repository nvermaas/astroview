import React from 'react';
import { Link } from "react-router-dom"
import { Button, Badge } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useGlobalReducer } from '../../contexts/GlobalContext';
// import { SET_ACTIVE_TASKID } from '../../reducers/GlobalStateReducer'
import { ASTROBASE_URL } from '../../utils/skyserver'
import {getMode, getExposure, getImageTypeIcon, getQualityIcon, getDetailsIcon} from '../../utils/styling'
import {SET_CURRENT_PROJECT, SET_CURRENT_TASK_ID} from "../../reducers/GlobalStateReducer";

export default function ChildrenGrid(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleClick = (observation) => {
        // dispatch current observation to the global store
        // my_dispatch({type: SET_ACTIVE_TASKID, taskid: observation.taskID})
    }

    const handleDetailsClick = (observation) => {
        // dispatch current observation to the global store
        my_dispatch({type: SET_CURRENT_TASK_ID, current_task_id: observation.taskID})
        my_dispatch({type: SET_CURRENT_PROJECT, current_project: observation.taskID})
    }


    // generate the details link to forward to
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
            name: 'TaskID',
            selector: 'taskID',
            sortable: true,
            width: "7%"
        },
        {
            name: 'Observation Date',
            selector: 'date',
            sortable: true,
            width: "8%",
            cell: row => {
                var d = new Date(row.date.toString());
                var n = d.toDateString()
                return <div>{n}</div>
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
                return <div>
                    <Badge pill bg="light">
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
    ];

    // this creates an 'expand' icon in front of every row and shows additional information (images)
    const ExpandableComponent = ({ data }) => <div>
        <p>{data.description}</p>
        <img src={data.derived_sky_plot_image} height={200} />;
        &nbsp;
        <a href = {data.derived_raw_image} target="_blank" rel="noopener noreferrer"><img src={data.derived_raw_image} height={200} /></a>
        &nbsp;
        <a href = {data.derived_annotated_transient_image} target="_blank" rel="noopener noreferrer"><img src={data.derived_annotated_transient_image} height={200} /></a>
        &nbsp;
        <a href = {data.derived_annotated_grid_image} target="_blank" rel="noopener noreferrer"><img src={data.derived_annotated_grid_image} height={200} /></a>

    </div>;

    // default expand all children tabs to show all the images of a project when it is opened
    let i = 0
    while (i < props.data.length) {
        props.data[i].defaultExpanded = true;
        i++;
    }


    return (
        <div>
            <DataTable
                columns={columns}
                data={props.data}
                conditionalRowStyles={conditionalRowStyles}
                //customTheme={myTheme}
                dense
                expandableRows
                expandOnRowClicked
                expandableRowExpanded={row => row} // expand all rows
                expandableRowsComponent={<ExpandableComponent />}
            />
        </div>
    );
}