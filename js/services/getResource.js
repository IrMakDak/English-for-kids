import getUrl from "../script";

const getResource = async() => {
  const url = getUrl();
    const res = await fetch(url, {
      method: "GET"
    }) 
    if (!res.ok) {
        throw new Error(`Could not fetch ${url}, status ${res.status}`);
    } else {
      return await res.json();
    }
  };
  
  export {getResource};