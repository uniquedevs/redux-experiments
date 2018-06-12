import * as React from 'react';

import FolderApp from './folder-app/FolderApp';

const App = () => (
  <div>
    <a href="javascript:window.open('https://api.imgur.com/oauth2/authorize?client_id=d1317e86556994a&response_type=token&state=none')">Authorize</a>
    <FolderApp />
  </div>
);

export default App;
