import React, { useContext, useState }  from 'react';
import {Card, Button, Table, Image } from 'react-bootstrap'
import Iframe from '@trendmicro/react-iframe';

export default function HipsCard(props) {
        console.log("HipsCard "+props.data.hips_service_url)
    return (
        <Card>
            <Card.Body>
                <Table>
                    <p align="left"><a href={props.data.hips_service_url} target="_blank">{props.data.hips_service_url}</a></p>

                    <Iframe src={props.data.hips_service_url} width="100%" height={540} />
                    <p>Release Data : {props.data.hips_release_date}</p>

                </Table>
            </Card.Body>

        </Card>

    );

}


