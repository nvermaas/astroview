import React from 'react';

const Aladin = (props) => {

    React.useEffect(() => {
        let aladin = window.A.aladin('#aladin-lite-div', { survey: 'P/DSS2/color', fov:60 })
        aladin.setFov(props.fov)
        aladin.gotoRaDec(props.ra, props.dec)

        let my_overlay = window.A.graphicOverlay({color: '#ee2345', lineWidth: 2});
        aladin.addOverlay(my_overlay);

        let my_catalog = window.A.catalog({name: 'MyObservations', sourceSize: 10});
        aladin.addCatalog(my_catalog);

        props.data.forEach(function(observation){
            let url = "/details/"+observation.taskID

            my_overlay.add(window.A.circle(
                observation.field_ra,
                observation.field_dec,
                observation.field_fov,
                {color: 'green'}
            )); // radius in degrees

            my_catalog.addSources([window.A.marker(
                observation.field_ra,
                observation.field_dec,
                {popupTitle: '<a href="'+url+'">'+observation.taskID+' - '+observation.name+'</a>',
                    popupDesc: observation.target,
                }
            )]);
        })

    }, [])

    return (
        <div id='aladin-lite-div' className="aladin"  />
    )
}

export default Aladin