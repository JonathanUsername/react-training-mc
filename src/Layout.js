import React from 'react';
import * as components from './HelloWorld';
import source from '!!raw-loader!./HelloWorld';
import SyntaxHighlighter from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/styles';


const Section = props => {
  const first = source.indexOf(`PART${props.idx}`) + 6;
  const last = source.indexOf(`PART${props.idx + 1}`) - 4;
  const code = source.substring(first, last);
  return (
    <SyntaxHighlighter style={docco} language='javascript'>
      {code}
    </SyntaxHighlighter>
  );
};

class Separator extends React.Component {
  state = { open: true};
  toggle = () => this.setState({open: !this.state.open});
  render() {
    const {open} = this.state;
    return (
        <div onClick={this.toggle} style={{
          height: open ? '100vh' : 20,
          backgroundColor: '#ddd',
          textAlign: 'center'
        }}>
          {open ? '-' : '+'}
        </div>
    );
  }
}

// Here's where we put them all together:
class Layout extends React.Component {
  render() {
    const arr = Object.keys(components).map(i => components[i]);
    
    return (
      <div>
        {arr.map((Component, idx) => (
          <div key={idx}>
            <h3>Part {idx} - {Component.name || "Wrapped Component"}</h3>
            <div>
              <div style={{border: 'solid #ddd', padding: '5px 20px'}}>
                <Component key={idx} {...this.props} />
              </div>
            </div>
            <div>
              <Section source={source} idx={idx} />
            </div>
            <Separator />
          </div>
        ))}
      </div>
    );
  }
}

export default Layout;
