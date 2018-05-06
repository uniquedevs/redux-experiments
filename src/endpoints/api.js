export const api = () => ({
    get: (url) => {
        return window.fetch(url, {
            method: 'get',
            headers: {
                Authorization: 'Bearer 33f1e0c38454747d065499a9fa5c867718548f65'
            }
        })
            .then( resp => resp.json())
            .then( resp => resp.data )
    }
});