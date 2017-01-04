import React from 'react';
import {render} from 'react-dom';
import Layout from './Layout.js';

// This is our data. We'll pass it into the app at its root,
// but we'd fetch it via Relay or similar in the real world.
const data = {
  name: 'Jon'
};

// We're spreading the data here, so they're like top-level props.
render(<Layout {...data} />, document.querySelector('#app'));