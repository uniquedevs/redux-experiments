const headers = new Headers({
  Authorization: 'Bearer 42c9fae3b4d4c4ebe7f154975482cb8bfff8e8ed'
});

const init = {
	headers
};

const methods = {
	get: {
		init: Object.assign(init, {
			method: 'GET'
		}),
		onSucess: resp => Promise.resolve(resp.json())
			.then(resp => resp.data),
		onError: err => Promise.reject(err)
	}
};

export const api = Object.keys(methods).reduce(
  (api, key) => Object.assign(api, {
    [key]: (url, params) => window.fetch(url, methods[key].init)
        .then(response => response.ok && response || Promise.reject('Network response was not ok.'))
        .then(methods[key].onSucess)
        .catch(methods[key].onError)
    }),
  {}
);

// api.get(url)
// api.post(url, body)
