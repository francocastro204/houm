const urlAves = "https://aves.ninjas.cl/api/birds";

const getAves = async () => {
    const resp = await fetch(urlAves).then(response => response.json());
    return resp;
}

const getAve = async (id) => {
    const url = urlAves+"/"+id;
    const resp = await fetch(url).then(response => response.json());
    return resp;
}

export { getAves, getAve };

