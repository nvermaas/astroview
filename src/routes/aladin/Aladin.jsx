import React from 'react';

const Aladin = (props) => {

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        let overlay_other = window.A.graphicOverlay({name: 'other quality',color: 'blue', lineWidth: 1});
        aladin.addOverlay(overlay_other);

        let overlay_great = window.A.graphicOverlay({name: 'great quality', color: 'yellow', lineWidth: 1});
        aladin.addOverlay(overlay_great);

        let overlay_good = window.A.graphicOverlay({name: 'good quality',color: 'green', lineWidth: 1});
        aladin.addOverlay(overlay_good);

        let overlay_medium = window.A.graphicOverlay({name: 'medium quality',color: 'grey', lineWidth: 1});
        aladin.addOverlay(overlay_medium);

        let overlay_bad = window.A.graphicOverlay({name: 'bad quality',color: 'red', lineWidth: 1});
        aladin.addOverlay(overlay_bad);

        let my_selected_overlay = window.A.graphicOverlay({name: 'current',color: 'yellow', lineWidth: 1});
        aladin.addOverlay(my_selected_overlay);

        let my_catalog = window.A.catalog({
            name: 'MyObservations',
            sourceSize: 20,
            //labelColumn: 'name',
            //displayLabel: true,
            onClick: 'showTable'});
        aladin.addCatalog(my_catalog);

        props.data.forEach(function(observation){

            if (observation.quality==='great') {
                addBoxesToOverlay(overlay_great, observation, "yellow")
            } else

            if (observation.quality==='good') {
                addBoxesToOverlay(overlay_good, observation, "green")
            } else

            if (observation.quality==='medium') {
                addBoxesToOverlay(overlay_medium, observation, "gray")
            } else

            if (observation.quality==='bad') {
                addBoxesToOverlay(overlay_bad, observation, "red")
            } else {
                addBoxesToOverlay(overlay_other, observation, "blue")
            }

            // draw a clickable icon for each observation
            addToCatalog(my_catalog, observation)

        })

        // in case of a single observation
        if (props.observation!==undefined) {
            addSingleObservation(aladin, props.observation, props.mode)
            // show the active rectangle
            addBoxesToOverlay(my_selected_overlay, props.observation,"yellow")
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