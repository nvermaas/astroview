export const getCookie = (cname) => {
  if (typeof document === "undefined") return null;
  const name = `${cname}=`;
  const decodedCookie = decodeURIComponent(document.cookie);
  //alert(decodedCookie)
  const ca = decodedCookie.split(";");
  for (let i = 0; i < ca.length; i += 1) {
    let c = ca[i];
    while (c.charAt(0) === " ") {
      c = c.substring(1);
    }
    if (c.indexOf(name) === 0) {
        //alert(c)
        return c.substring(name.length, c.length);
    }
  }
  return null;
};

