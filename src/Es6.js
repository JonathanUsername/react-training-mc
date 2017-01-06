import React from 'react';
import * as aboutReact from './aboutReact';
import es6 from '!!raw-loader!./es6.md';
import ReactMarkdown from 'react-markdown';


const Es6 = (props) => <ReactMarkdown source={es6} softBreak={'br'} containerProps={{style: {padding: '20px'}}} renderers={{CodeBlock: aboutReact.CodeBlock}} />;

export default Es6;
