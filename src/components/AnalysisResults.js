import React from 'react';
import { motion } from 'framer-motion';
import SkillsChart from './SkillsChart';

const AnalysisResults = ({ analysis, onReset }) => {
  return (
    <motion.div 
      className="analysis-results"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
    >
      <motion.button 
        onClick={onReset} 
        className="back-button"
        whileHover={{ x: -3 }}
      >
        &larr; Analyze Another
      </motion.button>
      
      <div className="summary-section">
        <h2>Analysis Summary</h2>
        <motion.div 
          className="percentage-circle"
          initial={{ scale: 0 }}
          animate={{ scale: 1 }}
          transition={{ type: 'spring', stiffness: 200 }}
          style={{ '--percentage': analysis.matchPercentage }} // CSS variable for the circle
        >
          <span>{analysis.matchPercentage}%</span>
          <div className="circle-bg"></div>
        </motion.div>
        <p className="match-text">
          {analysis.matchPercentage >= 75 ? 'Strong match!' : 
           analysis.matchPercentage >= 50 ? 'Moderate match' : 'Needs improvement'}
        </p>
      </div>
      
      <div className="details-grid">
        <motion.div 
          className="details-card strengths-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.2 }}
        >
          <h3>✅ Your Strengths</h3>
          <ul>
            {analysis.matchingKeywords.map((keyword, index) => (
              <motion.li 
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.3 + index * 0.05 }}
              >
                {keyword}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          className="details-card missing-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.3 }}
        >
          <h3>❌ Missing Keywords</h3>
          <ul>
            {analysis.missingKeywords.map((keyword, index) => (
              <motion.li 
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.4 + index * 0.05 }}
              >
                {keyword}
              </motion.li>
            ))}
          </ul>
        </motion.div>
        
        <motion.div 
          className="details-card suggestions-card"
          initial={{ y: 20, opacity: 0 }}
          animate={{ y: 0, opacity: 1 }}
          transition={{ delay: 0.4 }}
        >
          <h3>💡 Recommendations</h3>
          <ul>
            {analysis.suggestions.map((suggestion, index) => (
              <motion.li 
                key={index}
                initial={{ x: -10, opacity: 0 }}
                animate={{ x: 0, opacity: 1 }}
                transition={{ delay: 0.5 + index * 0.05 }}
              >
                {suggestion}
              </motion.li>
            ))}
          </ul>
        </motion.div>
      </div>
      
      <div className="chart-section">
        <SkillsChart 
          matching={analysis.matchingKeywords.length} 
          missing={analysis.missingKeywords.length} 
        />
      </div>
    </motion.div>
  );
};

export default AnalysisResults;