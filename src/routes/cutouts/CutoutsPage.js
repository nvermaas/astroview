import React, {useState, useEffect }  from 'react';
import { Container, Row, Col, Card, Table } from 'react-bootstrap';

import { useGlobalReducer } from '../../contexts/GlobalContext';
import {
    SET_STATUS_CUTOUT_IMAGES,
    SET_FETCHED_CUTOUT_IMAGES,
    SET_GALLERY_IMAGES,
} from '../../reducers/GlobalStateReducer';

import { ASTROBASE_URL } from '../../utils/skyserver'

import CutoutDirectories from './CutoutsDirectories'
import ImageGallery from './ImageGallery'

export default function CutoutsPage(props) {

    const [ my_state , my_dispatch] = useGlobalReducer()
    const [ photos, setPhotos] = useState([])

    useEffect(() => {
            fetchImages(my_state.current_cutout)
        }, [my_state.reload, my_state.current_cutout]
    );


    const fetchImages = (current_cutout) => {

        if (!current_cutout) return null
        let url = ASTROBASE_URL + "cutouts?directory=" + current_cutout.directory

        if (my_state.status_cutout_images !== 'fetching')  {

            my_dispatch({type: SET_STATUS_CUTOUT_IMAGES, status_cutout_images: 'fetching'})

            fetch(url)
                .then(results => {
                    return results.json();
                })
                .then(data => {
                    my_dispatch({type: SET_FETCHED_CUTOUT_IMAGES, fetched_cutout_images: data.results})
                    let gallery_images = getGalleryImages(data.results)
                    setPhotos(gallery_images)
                    my_dispatch({type: SET_GALLERY_IMAGES, gallery_images: gallery_images})
                    my_dispatch({type: SET_STATUS_CUTOUT_IMAGES, status_cutout_images: 'fetched'})
                })
                .catch(function () {
                    my_dispatch({type: SET_STATUS_CUTOUT_IMAGES, status_cutout_images: 'failed'})
                    alert("fetching cutout_images from " + url + " failed.");
                })
        }
    }

    const getGalleryImages = (cutout_images) => {

        let images = []
        cutout_images.forEach((cutout_image) => {
            let image = {}
            image['src'] = cutout_image.derived_url
            image['width'] = 1
            image['height'] = 1
            images.push(image)
        })

        return images
    }



    return (
        <div className="App">

            <Container fluid>

                <Row>
                    <Col sm={3} md={3} lg={3}>

                        <Card>
                            <CutoutDirectories/>
                        </Card>
                   </Col>
                    <Col sm={9} md={9} lg={9}>
                        <Card>
                            <ImageGallery photos={photos} />
                        </Card>
                    </Col>

                </Row>

            </Container>
        </div>
    );
}