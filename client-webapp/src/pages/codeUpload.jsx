import React, { Component } from 'react';
import { Prism as SyntaxHighlighter } from 'react-syntax-highlighter';
import { solarizedlight } from 'react-syntax-highlighter/dist/esm/styles/prism';

export default class CodeUpload extends Component {
  constructor(props) {
    super(props);
    this.state = {
      code: '',
    };
  }

  handleCodeChange = (e) => {
    this.setState({ code: e.target.value });
  };

  render() {
    return (
      <div className="flex h-screen">
        <div className="flex-none w-64 p-4 border-r flex flex-col">
          <div className="bg-container rounded p-4 flex-1">
            <h2 className="text-lg font-bold mb-4">Status</h2>
            <div className="mb-4"><b>Robot</b>: Healthy</div>
            <div>
              <div><b>Attachments Modules:</b></div>
              <ul className="list-none pl-0">
                <li>&emsp;Arm: Healthy</li>
                <li>&emsp;Wheels: Healthy</li>
                <li>&emsp;Camera: Disconnected</li>
              </ul>
            </div>
          </div>
          <div className="mt-auto gaps-3">
            <button className="bg-primary hover:bg-container-accent text-f-accent px-4 py-2 rounded mb-2 mt-3 ml-1 mr-7">Submit</button>
            <button className="bg-primary hover:bg-container-accent text-f-accent px-4 py-2 rounded mb-2 mt-3 ml-6">Cancel</button>
          </div>
        </div>
        <div className="flex-1 p-4 overflow-y-auto">
          <textarea
            rows="10"
            placeholder="Enter your code here..."
            className="w-full border rounded p-2 mt-4"
            onChange={this.handleCodeChange}
          />
          <SyntaxHighlighter language="c" style={solarizedlight}>
            {this.state.code}
          </SyntaxHighlighter>
        </div>
      </div>
    );
  }
}
