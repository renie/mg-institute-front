export const fetchDataAPI = async (url) => await fetch(`/api/${url}`)
    .then((response) => response.json())

export const isAdmin = async () => (await fetch('/api/amIAdmin').then((response) => response.status)) === 200

export const redirectHome = () => (window.location.href = window.location.origin)
