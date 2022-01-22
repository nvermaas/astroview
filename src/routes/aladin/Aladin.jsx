import React from 'react';

import { useGlobalReducer } from '../../contexts/GlobalContext'
import { ALADIN_HIGH_OBS } from '../../reducers/GlobalStateReducer'

const Aladin = (props) => {
    const [ my_state , my_dispatch] = useGlobalReducer()
    const [ highlightedObservation , setHighlightedObservation] = React.useState([]);

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        // create the catalog and overlays layers
        createLayers(aladin, props.data, props.observation)

        // in case of a single observation
        if (props.observation!==undefined) {
            addSingleObservation(aladin, props.observation, props.mode)
       }

        // add a listener to aladin
        // define function triggered when  a source is hovered
        aladin.on('objectHovered', function(object) {

            var msg;
            if (object) {
                msg = object.data.my_field_name;

                 // highlight the observation under the mouse
                let my_observation = object.data.my_observation

                // recreate all the layers, but now with a different highlighted observation
                createLayers(aladin, props.data, my_observation)

                // save the highlighted observation to the local state
                // now only used to display it
                setHighlightedObservation(my_observation)

                // save the highlighed observation to the global state (not used for anything yet)
                my_dispatch({type: ALADIN_HIGH_OBS, aladin_high_obs: my_observation})
            }
        });

    }, [])

    // create the catalog and all the overlay layers
    const createLayers = (aladin, data, highlighted_observation) => {
        aladin.removeLayers()

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
            shape : 'circle',
            color : 'yellow',
            sourceSize: 20,
            //labelColumn: 'name',
            //displayLabel: true,
            onClick: 'showTable'});

        // loop through all the observations and add them to the appropriate layer based on quality
        data.forEach(function(observation){

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

        aladin.addCatalog(my_catalog);

        if (highlighted_observation) {
            addBoxesToOverlay(my_selected_overlay, highlighted_observation, "yellow")
        }
    }

    // get the bounding box in world coordinates from an observation
    const getBox = (observation) => {
        let coords = observation.box.split(',')
        let point1 = [coords[0],coords[1]]
        let point2 = [coords[2],coords[3]]
        let point3 = [coords[4],coords[5]]
        let point4 = [coords[6],coords[7]]
        let box = [point1,point2,point3,point4,point1]
        return box
    }


    const addToCatalog = (my_catalog, observation) => {
        let url = "/astroview/details/"+observation.taskID

        let box = getBox(observation)

        let source = window.A.source(
            observation.field_ra,
            observation.field_dec,
            {
                my_field_name: observation.field_name,
                my_name: observation.name,
                popupTitle: '<a href="'+url+'">'+observation.taskID+' - '+observation.name+'</a>',
                popupDesc: observation.field_name,
                my_observation : observation
            }
        )

        let marker = [window.A.marker(
            observation.field_ra,
            observation.field_dec,

            {
                my_field_name: observation.field_name,
                my_name: observation.name,
                popupTitle: '<a href="'+url+'">'+observation.taskID+'</a>',
                popupDesc: '<hr>'+observation.name +'<br>'+ observation.field_name,
            },

            {
                my_field_name: observation.field_name,
                taskID : observation.taskID,
                my_observation : observation,
            },
        )]
        my_catalog.addSources(source);
        //my_catalog.addSources(marker);
    }


    const addBoxesToOverlay = (my_overlay, observation, color) => {
        let box = getBox(observation)
        my_overlay.add(window.A.polyline(box, {color: color, lineWidth: 1}));
    }


    const addBoxToOverlay = (my_overlay, box, color) => {
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

    let title = "hover over yellow objects to highlight observation"
    //alert(highlightedObservation)
    if (highlightedObservation.name) {
        title = highlightedObservation.name + ' ('+highlightedObservation.taskID+')'
    }
    return (
        <div>
            <h3>{title}</h3>
            <div id='aladin-lite-div' className="aladin"  />
        </div>
    )
}

export default Aladin