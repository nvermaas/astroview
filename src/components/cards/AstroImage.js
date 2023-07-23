import React, { useContext, useState }  from 'react';

export default function AstroImage(props) {
    let image_src = props.observation.derived_annotated_image
    return <img src={image_src} width="1000"/>

}


