import React, { useState, useCallback } from "react";
import { render } from "react-dom";
import Gallery from "react-photo-gallery";
import Carousel, { Modal, ModalGateway } from "react-images";

export default function ImageGallery(props) {

    if (!props.photos) {
        return <div>No images selected</div>
    }

    return (
        <div>
            <Gallery photos={props.photos}  />
        </div>
    );
}

