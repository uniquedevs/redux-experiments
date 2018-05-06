import * as React from 'react';

import { api } from './endpoints/api';

const App = () => (
    <div>
        <a href="javascript:window.open('https://api.imgur.com/oauth2/authorize?client_id=d1317e86556994a&response_type=token&state=none')">Authorize</a>
    </div>
);

api().get('https://api.imgur.com/3/account/me/images').then(console.log);



export default App;
