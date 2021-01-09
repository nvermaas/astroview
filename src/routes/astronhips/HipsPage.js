
import React, {useState, useEffect }  from 'react';
import { Container, Tabs, Tab, Row, Col, Table } from 'react-bootstrap';

import LoadingSpinner from '../../components/LoadingSpinner';
import HipsCard from './HipsCard'

// const url = "https://hips.astron.nl/hipslist"
//const url = "http://localhost/hipslist.txt"
const url = "http://localhost:3000/hipslist.txt"

export default function HipsPage(props) {
    const [ hipsList , setHipsList] = useState(undefined);

    useEffect(() => {
            fetchHipsList(url)
        }, []
    );

    // get the data from the api
    const fetchHipsList = (url) => {

        fetch(url,{ mode: 'no-cors'})
            .then(results => {
                return results.text();
            })
            .then(results => {
                let parsed_results = parseHipsList(results)
                setHipsList(parsed_results)
                return parsed_results;
            })
            .catch(function () {
                alert("fetch jobs from " + url + " failed.");
            })
    }

    // construct the hipsList array of records
    const parseHipsList = (results) => {
        let lines = results.split('\n')
        let records = []
        let record = {}
        let record_nr = 0

        // loop through the results line by line and build the list of records
        for (var i = 0; i < lines.length; i++) {

            try {
                let split_line = lines[i].split('=')

                if (split_line[0].includes('creator_did')) {
                    record['creator_did'] = split_line[1]

                    let title = split_line[1].split("/").pop();
                    record['title'] = title
                }

                if (split_line[0].includes('hips_release_date')) {
                    record['hips_release_date'] = split_line[1]
                }

                if (split_line[0].includes('hips_service_url')) {
                    record['hips_service_url'] = split_line[1]
                }

                if (split_line[0].includes('hips_status')) {
                    record['hips_status'] = split_line[1]

                    // this also signals the end of the record
                    // add the record to the records array, and clear the record
                    records.push(record)
                    record = {}
                    record_nr = record_nr + 1
                }
            } catch (e) {
                alert(e)
            }

        }
        return records
    }

    // show spinner as long as the data is not read
    if (!hipsList) return <LoadingSpinner/>

    // not used, but kept for posterity
    let renderHipsList = <Table>
            {
                hipsList.map((record) => {
                    return (
                        <Col lg={true}>
                            <HipsCard data={record}/>
                        </Col>
                    );
                })
            }
        </Table>


    // --- why doesn't this  work!? -----
    let my_tabs = hipsList.map((record) => {
        return <Tab eventkey={record['title']} title={record['title']}>
            <HipsCard data={record}/>
        </Tab>
    })

    let renderTabs0 = <Tabs defaultActiveKey={hipsList[0]['title']} id="hips_tab">
                            {my_tabs}
                      </Tabs>

    // ------------------------------------------
    let tabs_array = []
    for (var i = 0; i < hipsList.length; i++) {
        let my_tab = <Tab eventKey={hipsList[i]['title']} title={hipsList[i]['title']}>
            <HipsCard data={hipsList[i]}/>
        </Tab>
        tabs_array.push(my_tab)
    }
    let renderTabs=<Tabs defaultActiveKey={hipsList[0]['title']} id="hips_tab">
        {tabs_array}
    </Tabs>


    return (
        <div className="App">
            {renderTabs}
        </div>
    );
}