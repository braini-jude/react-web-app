import React, { useState } from 'react';
import CodeUploader from './components/CodeUploader';
import CodeReviewOutput from './components/CodeReviewOutput';
import { reviewCode } from './api/review';

const App = () => {
  const [code, setCode] = useState('');
  const [feedback, setFeedback] = useState('');
  const [loading, setLoading] = useState(false);

  const handleFileUpload = async (file) => {
    const text = await file.text();
    setCode(text);
    setLoading(true);

    const feedback = await reviewCode(text);
    setFeedback(feedback);
    setLoading(false);
  };

  return (
    <div className="container">
      <h1>AI-Powered Code Reviewer</h1>
      <CodeUploader onFileUpload={handleFileUpload} />
      {loading && <p>Analyzing code...</p>}
      {code && feedback && <CodeReviewOutput code={code} feedback={feedback} />}
    </div>
  );
};

export default App;
