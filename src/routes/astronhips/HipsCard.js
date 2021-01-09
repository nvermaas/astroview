import React, { useContext, useState }  from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import Iframe from '@trendmicro/react-iframe';

export default function HipsCard(props) {
        console.log("HipsCard "+props.data.hips_service_url)
    return (
        <Card>
            <Card.Body>
                <Table>
                <tr>
                    <h3><a href={props.data.hips_service_url} target="_blank">{props.data.hips_service_url}</a></h3>
                </tr>
                    <Iframe src={props.data.hips_service_url} width="100%" height={540} />
                    <p>Release Data : {props.data.hips_release_date}</p>
                    <p>HIPS Status  : {props.data.hips_status}</p>

                </Table>
            </Card.Body>

        </Card>

    );

}


