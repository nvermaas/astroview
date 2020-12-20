import React from 'react';

const Aladin = (props) => {

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        let my_overlay = window.A.graphicOverlay({color: 'yellow', lineWidth: 1});
        aladin.addOverlay(my_overlay);

        let my_selected_overlay = window.A.graphicOverlay({color: 'red', lineWidth: 1});
        aladin.addOverlay(my_selected_overlay);

        let my_catalog = window.A.catalog({name: 'MyObservations', sourceSize: 20, onClick: 'showTable'});
        aladin.addCatalog(my_catalog);

        props.data.forEach(function(observation){

            // draw the outline rectangle of the image
            addBoxesToOverlay(my_overlay, observation, "yellow")

            // draw a clickable icon for each observation
            addToCatalog(my_catalog, observation)

        })

        // in case of a single observation
        if (props.observation!==undefined) {
            addSingleObservation(aladin, props.observation, props.mode)

            addBoxesToOverlay(my_selected_overlay, props.observation,"red")
       }

    }, [])


    const addToCatalog = (my_catalog, observation) => {
        let url = "/astroview/details/"+observation.taskID

        my_catalog.addSources([window.A.marker(
            observation.field_ra,
            observation.field_dec,
            {popupTitle: '<a href="'+url+'">'+observation.taskID+' - '+observation.name+'</a>',
                popupDesc: observation.target,

            }
        )]);
    }

    const addBoxesToOverlay = (my_overlay, observation, color) => {
        let coords = observation.box.split(',')
        let point1 = [coords[0],coords[1]]
        let point2 = [coords[2],coords[3]]
        let point3 = [coords[4],coords[5]]
        let point4 = [coords[6],coords[7]]
        let box = [point1,point2,point3,point4,point1]

        my_overlay.add(window.A.polyline(box, {color: color, lineWidth: 1}));
    }


    const addSingleObservation = (aladin, observation, mode) => {

        if (mode==='fits') {
            aladin.displayFITS(observation.derived_fits)

            let coordinates = observation.field_ra + "," + observation.field_dec
            let radius = observation.field_fov * 1.5

            if (radius < 5) {
                aladin.addCatalog(window.A.catalogFromSimbad(coordinates, radius, {color: 'yellow', onClick: 'showTable'}));
            }
        }
    }

    return (
        <div id='aladin-lite-div' className="aladin"  />
    )
}

export default Aladin