import React from 'react';
import { Light as SyntaxHighlighter } from 'react-syntax-highlighter';
import { docco } from 'react-syntax-highlighter/dist/esm/styles/hljs';

const CodeReviewOutput = ({ code, feedback }) => (
  <div>
    <h2>Uploaded Code:</h2>
    <SyntaxHighlighter language="javascript" style={docco}>
      {code}
    </SyntaxHighlighter>

    <h2>AI Feedback:</h2>
    <p className="feedback-box">{feedback}</p>
  </div>
);

export default CodeReviewOutput;
