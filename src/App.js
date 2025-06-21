import React, { useState } from 'react';
import axios from 'axios';
import FileUpload from './components/FileUpload';
import AnalysisResults from './components/AnalysisResults';
import LoadingSpinner from './components/LoadingSpinner';
import './App.css';

function App() {
  const [analysis, setAnalysis] = useState(null);
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);

const handleAnalysis = async (formData) => {
  setLoading(true);
  setError(null);
  
  try {
    const response = await axios.post('http://localhost:3001/analyze', formData, {
      headers: {
        'Content-Type': 'multipart/form-data'
      }
    });
    
    // Transform backend response to match frontend structure
    const transformedData = {
      matchPercentage: response.data.matchScore,
      matchingKeywords: response.data.strengths,
      missingKeywords: response.data.missingKeywords,
      experienceGap: response.data.improvements.join(' • '),
      suggestions: [...response.data.improvements, ...response.data.recommendations]
    };
    
    setAnalysis(transformedData);
  } catch (err) {
    setError(err.response?.data?.error || 'Failed to analyze documents. Please try again.');
  } finally {
    setLoading(false);
  }
};

  return (
    <div className="app-container">
      <div className="animated-background"></div>
      <header className="app-header">
  <h1 
    className="title-gradient clickable-header"
    onClick={() => setAnalysis(null)}
  >
    Resume & Job Description Analyzer
  </h1>
  <p className="subtitle">Get instant feedback on how well your resume matches any job description</p>
</header>
      
      <main className="app-main">
        {loading ? (
          <LoadingSpinner />
        ) : analysis ? (
          <AnalysisResults analysis={analysis} onReset={() => setAnalysis(null)} />
        ) : (
          <FileUpload onAnalyze={handleAnalysis} />
        )}
        
        {error && <div className="error-message">{error}</div>}
      </main>
      
      <footer className="app-footer">
  <p>© {new Date().getFullYear()} Resume Analyzer | Made by Ashish</p>
  <p className="footer-contact">
    <a href='mailto:ashishkumarinfo6@gmail.com' className="contact-link">
      Contact Me
    </a>
  </p>
</footer>
    </div>
  );
}

export default App;