import React from 'react';
import { Link } from "react-router-dom"
import { Button,Badge } from 'react-bootstrap';
import DataTable from 'react-data-table-component';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { SET_CURRENT_COLLECTION, SET_COLLECTION_PAGE } from '../../reducers/GlobalStateReducer'
import { ASTROBASE_URL } from '../../utils/skyserver'
import ChildrenGrid from './ChildrenGrid'
import { getCollectionChildren } from '../../utils/filterObservations'
import {getImageTypeIcon } from '../../utils/styling'

export default function ProjectsGrid(props) {
    const [ my_state , my_dispatch] = useGlobalReducer()

    const handleDefaultClick = (collection) => {
        // dispatch current collection to the global store
        my_dispatch({type: SET_CURRENT_COLLECTION, current_collection: collection})
    }

    const handlePageChange = (page) => {
        // get the data from the api
        let url = ASTROBASE_URL + "collections?page=" +page.toString()

        // a change in collection_page is used to trigger a new fetch,
        // see the useEffect in FetchData.js how that is done.
        my_dispatch({type: SET_COLLECTION_PAGE, collection_page: page})

    }

    const handlePerRowsChange = () => {
        alert('handlePerRowsChange')
    }

    const handleExpandOnRowClicked = (row) => {
        alert('handleExpandOnRowClicked')
        my_dispatch({type: SET_CURRENT_COLLECTION, current_collection: row})
    }

    // generate the details link to forward to
    const getDetailsLink = (collection) => {
        let details_link = "/collection-details/"+collection.id
        return details_link
    }


    const columns = [

        {
            name: 'Name',
            selector: 'name',
            sortable: true,
            width: "15%",
            cell: row => {
                let icon = getImageTypeIcon(row.collection_type)
                return <div>{icon}&nbsp;&nbsp;{row.name}</div>
            }
        },
        {
            name: 'Date',
            selector: 'date',
            sortable: true,
            width: "10%",
            cell: row => {
                var d = new Date(row.date.toString());
                var n = d.toDateString()
                return <div>{n}</div>
            }
        },
        {
            name: 'Observations',
            selector: 'id',
            sortable: true,
            width: "7%",
            cell: row => {
                let nr_of_children = row.observations.length
                return <div>{nr_of_children}</div>
            }
        },
        {
            name: 'Description',
            selector: 'description',
            sortable: true,
            wrap : true,
            compact: true
        },

        {
            name: 'Details',
            cell: row =>
                <Link to={() => getDetailsLink(row)}>
                    <Button variant="warning" onClick={() => handleDefaultClick(row)}>Details</Button>
                </Link>,

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

    ];

    // this creates an 'expand' icon in front of every row and shows additional information (images)
    const ExpandableComponent = ({ data }) => {

            let children = data.observations
            if (!children) {
                return null
            }

        return <div>
            <ChildrenGrid data={children}/>
            <hr />
        </div>;
    }

    return (
        <div>
            <DataTable
                columns={columns}
                data={props.data}
                conditionalRowStyles={conditionalRowStyles}
                pagination
                paginationServer
                paginationTotalRows={my_state.total_collections}
                onChangePage={handlePageChange}
                onChangeRowsPerPage={handlePerRowsChange}

                paginationPerPage={24}
                // paginationRowsPerPageOptions={[50, 100]}
                paginationRowsPerPageOptions={[25]}
                expandableRows
                expandOnRowClicked={handleExpandOnRowClicked}
                expandableRowsComponent={<ExpandableComponent />}
            />
        </div>
    );
}