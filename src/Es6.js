import React from 'react';
import * as layout from './Layout';
import es6 from '!!raw-loader!./es6.md';
import ReactMarkdown from 'react-markdown';


const Es6 = (props) => <ReactMarkdown source={es6} softBreak={'br'} containerProps={{style: {padding: '20px'}}} renderers={{CodeBlock: layout.CodeBlock}} />;

export default Es6;
