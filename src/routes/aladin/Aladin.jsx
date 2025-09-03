import React, { useEffect, useRef, useState } from 'react';
import A from 'aladin-lite';
import { useGlobalReducer } from '../../contexts/GlobalContext';
import { ALADIN_HIGH_OBS } from '../../reducers/GlobalStateReducer';

const Aladin = ({ data, observation, fov = 60, ra, dec, mode }) => {
    const [my_state, my_dispatch] = useGlobalReducer();
    const [highlightedObservation, setHighlightedObservation] = useState(null);

    // persistent refs
    const aladinRef = useRef(null);
    const overlaysRef = useRef({});
    const catalogRef = useRef(null);

    useEffect(() => {
        A.init.then(() => {
            if (!aladinRef.current) {
                // init viewer once
                aladinRef.current = A.aladin('#aladin-lite-div', {
                    survey: 'P/DSS2/color',
                    fov: parseFloat(fov) || 60,
                    projection: 'SIN',
                    cooFrame: 'equatorial',
                });

                const aladin = aladinRef.current;

                // overlays
                overlaysRef.current = {
                    other: A.graphicOverlay({ name: 'other', color: 'blue', lineWidth: 1 }),
                    great: A.graphicOverlay({ name: 'great', color: 'yellow', lineWidth: 1 }),
                    good: A.graphicOverlay({ name: 'good', color: 'green', lineWidth: 1 }),
                    medium: A.graphicOverlay({ name: 'medium', color: 'grey', lineWidth: 1 }),
                    bad: A.graphicOverlay({ name: 'bad', color: 'red', lineWidth: 1 }),
                    current: A.graphicOverlay({ name: 'current', color: 'yellow', lineWidth: 2 }),
                };

                Object.values(overlaysRef.current).forEach((ov) => aladin.addOverlay(ov));

                // catalog
                catalogRef.current = A.catalog({
                    name: 'MyObservations',
                    shape: 'circle',
                    color: 'yellow',
                    sourceSize: 20,
                    onClick: 'showTable',
                });
                aladin.addCatalog(catalogRef.current);

                // hover event
                aladin.on('objectHovered', (object) => {
                    if (object?.data?.my_field_name) {
                        const obs = object.data.my_observation;
                        setHighlightedObservation(obs);
                        my_dispatch({ type: ALADIN_HIGH_OBS, aladin_high_obs: obs });
                    }
                });
            }

            // update view
            aladinRef.current.setFov(fov);
            aladinRef.current.gotoRaDec(ra, dec);

            // (re)populate overlays & catalog
            updateLayersAndCatalog(data, observation);

            // optional single observation FITS handling
            if (observation) {
                addSingleObservation(aladinRef.current, observation, mode);
            }
        });
    }, [data, observation, fov, ra, dec, mode]);

    // === helpers ===

    const updateLayersAndCatalog = (data, highlighted) => {
        if (!catalogRef.current) return;

        Object.values(overlaysRef.current).forEach((ov) => ov.removeAll());
        catalogRef.current.clear();

        if (!data || !data.length) return;

        data.forEach((obs) => {
            switch (obs.quality) {
                case 'great':
                    addBoxesToOverlay(overlaysRef.current.great, obs, 'yellow');
                    break;
                case 'good':
                    addBoxesToOverlay(overlaysRef.current.good, obs, 'green');
                    break;
                case 'medium':
                    addBoxesToOverlay(overlaysRef.current.medium, obs, 'grey');
                    break;
                case 'bad':
                    addBoxesToOverlay(overlaysRef.current.bad, obs, 'red');
                    break;
                default:
                    addBoxesToOverlay(overlaysRef.current.other, obs, 'blue');
            }
            addToCatalog(catalogRef.current, obs);
        });

        if (highlighted) {
            addBoxesToOverlay(overlaysRef.current.current, highlighted, 'yellow');
        }
    };

    const getBox = (observation) => {
        const coords = observation.box.split(',').map(parseFloat);
        const pts = [
            [coords[0], coords[1]],
            [coords[2], coords[3]],
            [coords[4], coords[5]],
            [coords[6], coords[7]],
            [coords[0], coords[1]],
        ];
        return pts;
    };

    const addBoxesToOverlay = (overlay, observation, color) => {
        overlay.add(A.polyline(getBox(observation), { color, lineWidth: 1 }));
    };

    const addToCatalog = (catalog, obs) => {
        const url = `/astroview/details/${obs.taskID}`;
        const source = A.source(obs.field_ra, obs.field_dec, {
            my_field_name: obs.field_name,
            my_name: obs.name,
            my_observation: obs,
            popupHtml: `
        <div style="font-family:sans-serif;max-width:200px;">
          <h4 style="margin:0;"><a href="${url}" target="_blank">${obs.taskID} - ${obs.name}</a></h4>
          <p style="margin:0;">${obs.field_name}</p>
        </div>
      `,
        });
        catalog.addSources([source]);
    };

    const addSingleObservation = (aladin, obs, mode) => {
        if (mode === 'fits') {
            aladin.displayFITS(obs.derived_fits);
        }
        const coords = `${obs.field_ra},${obs.field_dec}`;
        const radius = obs.field_fov * 1.5;
        if (radius < 1) {
            A.catalogFromSimbad(coords, radius, { color: 'yellow', onClick: 'showTable' }, (cat) =>
                aladin.addCatalog(cat)
            );
        }
    };

    // === render ===
    const title =
        highlightedObservation?.name
            ? `${highlightedObservation.name} (${highlightedObservation.taskID})`
            : 'Hover over yellow objects to highlight observation';

    return (
        <div>
            <h3>{title}</h3>
            <div id="aladin-lite-div" style={{ width: '100%', height: '500px' }} />
        </div>
    );
};

export default Aladin;
