// a collection of functions that return url's to sky surveys

// legacy
// http://legacysurvey.org/viewer/jpeg-cutout?ra=154.7709&dec=46.4537&width=100&layer=mzls+bass-dr6&pixscale=0.3&bands=grz

// http://skyserver.sdss.org/dr12/en/help/docs/api.aspx#RestWebServices
export function getUrlSDSS(ra,dec,scale, width,height,opt) {
    let url = 'https://skyserver.sdss.org/dr12/SkyserverWS/ImgCutout/getjpeg'
    url += '?ra=' + ra
    url += '&dec=' + dec
    url += '&scale=' + scale
    url += '&width=' + width
    url += '&height=' + height
    url += '&opt=' + opt
  return url
}

// http://sky.esa.int
export function getUrlESASky(ra,dec,equinox,fov,hips) {
  // NVSS intensitiy maps
  let url = 'http://sky.esa.int/?action=goto'
  url += '&target=' + ra + ' ' + dec
  url += '&hips=DSS2%20color'
  url += '&fov='+fov
  url += '&sci=false'
  return url
}

//http://aladin.unistra.fr/AladinLite/?target=05%2033%2059.891-01%2047%207.32&fov=0.49&survey=P%2FSDSS9%2Fcolor
export function getUrlAladin(ra,dec,fov,survey) {
    // NVSS intensitiy maps
    let url = 'http://aladin.unistra.fr/AladinLite/'
    url += '?target=' + ra + ' ' + dec
    url += '&fov=' + fov
    url += '&survey=' + survey
    return url
}

// http://cdsportal.u-strasbg.fr/?target=202.5%2047.2
export function getUrlCDSPortal(ra,dec) {
  // NVSS intensitiy maps
  let url = 'http://cdsportal.u-strasbg.fr/'
  url += '?target=' + ra + '%20' + dec
  return url


}
