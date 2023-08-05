import React, { useContext, useState }  from 'react';


export default function AstroImage(props) {
    String.prototype.splice = function(index, remove, string) {
        return (this.slice(0, index) + string + this.slice(index + Math.abs(remove)));
    };

    function callback() {

    }

    function toHeader(wcsObj) {
        var header = [];

        var line = "                                                                                ";
        for (var card in wcsObj) {
            var value = wcsObj[card];

            var entry = line.splice(0, card.length, card);
            entry = entry.splice(8, 1, "=");

            entry = entry.splice(10, value.toString().length, value);
            header.push(entry);
        }

        return header.join('\n');
    }

    let image_src = props.observation.derived_annotated_image
    let fits_url = props.observation.derived_fits
    let fits_header_url = fits_url.replace('.fits','_wcs_file.fits')

    let fits_headers = ""
    // http://web-of-wyrd.nl/data_on_yggdrasil/astrobase/data/230708012/8738880_wcs_file.fits
    //http://web-of-wyrd.nl/data_on_yggdrasil/astrobase/data/230708012/8738880.fits

    let wcsCards = {
        NAXIS: 2,
        NAXIS1: 461,
        NAXIS2: 368,
        CRPIX1: 274.49405098,
        CRPIX2: 256.662769318,
        CRVAL1: 308.376126576,
        CRVAL2: 45.5763461284,
        CD1_1: -0.0014969857774,
        CD1_2: -0.000676818931436,
        CD2_1: 0.000667126992707,
        CD2_2: -0.00149670918156,
        CTYPE1: "RA---TAN-SIP",
        CTYPE2: "DEC--TAN-SIP",
        CUNIT1: "deg",
        CUNIT2: "deg",
        EQUINOX: 2000,
        RADESYS: "ICRS"
    };


    let fits = new FITS("http://web-of-wyrd.nl/data_on_yggdrasil/astrobase/data/230708012/8738880.fits",callback)

    var header = toHeader(wcsCards);
    var w = window.wcs()
    w.init(header);
    var world = w.pix2sky(10, 10);
    alert(world)
    return <img src={image_src} width="1000"/>

}


