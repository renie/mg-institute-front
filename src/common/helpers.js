export const fetchDataAPI = async (url) => await fetch(`/api/${url}`)
    .then((response) => response.json())
