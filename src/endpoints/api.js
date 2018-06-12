export const api = () => {
	const headers = {
		Authorization: 'Bearer 33f1e0c38454747d065499a9fa5c867718548f65'
	};
	const api = Object.keys(methods).reduce(
		(api, key) => (url, params) => window.fetch(url, {  })
	)
};

const methods = {
	get: {
			headers: {
				Authorization: 'Bearer 33f1e0c38454747d065499a9fa5c867718548f65'
			}
		})
			.then(resp => resp.json())
			.then(resp => resp.data)
	}
};
