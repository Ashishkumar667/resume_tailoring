// import React, { useCallback, useState } from 'react';
// import { useDropzone } from 'react-dropzone';

// const FileUpload = ({ onAnalyze }) => {
//   const [resume, setResume] = useState(null);
//   const [jobDescription, setJobDescription] = useState(null);
//   const [jdText, setJdText] = useState('');

//   const onDropResume = useCallback(acceptedFiles => {
//     if (acceptedFiles.length) {
//       setResume(acceptedFiles[0]);
//     }
//   }, []);

//   const onDropJobDescription = useCallback(acceptedFiles => {
//     if (acceptedFiles.length) {
//       setJobDescription(acceptedFiles[0]);
//     }
//   }, []);

//   const { getRootProps: getResumeRootProps, getInputProps: getResumeInputProps } = useDropzone({
//     onDrop: onDropResume,
//     accept: {
//       'application/pdf': ['.pdf'],
//       'application/msword': ['.doc'],
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
//       'text/plain': ['.txt']
//     },
//     maxFiles: 1
//   });

//   const { getRootProps: getJdRootProps, getInputProps: getJdInputProps } = useDropzone({
//     onDrop: onDropJobDescription,
//     accept: {
//       'application/pdf': ['.pdf'],
//       'application/msword': ['.doc'],
//       'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx'],
//       'text/plain': ['.txt']
//     },
//     maxFiles: 1
//   });

//   const handleSubmit = (e) => {
//     e.preventDefault();
    
//     if ((!resume && !jdText) || (!jobDescription && !jdText)) {
//       alert('Please upload both resume and job description or enter job description text');
//       return;
//     }

//     const formData = new FormData();
//     if (resume) formData.append('resume', resume);
//     if (jobDescription) formData.append('jobDescription', jobDescription);
//     if (jdText) formData.append('jdText', jdText);

//     onAnalyze(formData);
//   };

//   return (
//     <div className="file-upload-container">
//       <form onSubmit={handleSubmit}>
//         <div className="upload-section">
//           <h3>Upload Your Resume</h3>
//           <div {...getResumeRootProps({ className: 'dropzone' })}>
//             <input {...getResumeInputProps()} />
//             <p>Drag & drop your resume here, or click to select files</p>
//             <p>(PDF, DOC, DOCX, or TXT)</p>
//             {resume && <p className="file-info">Selected: {resume.name}</p>}
//           </div>
//         </div>

//         <div className="upload-section">
//           <h3>Upload Job Description</h3>
//           <div {...getJdRootProps({ className: 'dropzone' })}>
//             <input {...getJdInputProps()} />
//             <p>Drag & drop job description here, or click to select files</p>
//             <p>(PDF, DOC, DOCX, or TXT)</p>
//             {jobDescription && <p className="file-info">Selected: {jobDescription.name}</p>}
//           </div>
//           <p className="or-text">OR</p>
//           <div className="text-input-section">
//             <label htmlFor="jdText">Paste Job Description Text:</label>
//             <textarea
//               id="jdText"
//               value={jdText}
//               onChange={(e) => setJdText(e.target.value)}
//               placeholder="Paste the job description text here..."
//               rows="6"
//             />
//           </div>
//         </div>

//         <button type="submit" className="analyze-button" disabled={!resume || (!jobDescription && !jdText)}>
//           Analyze Documents
//         </button>
//       </form>
//     </div>
//   );
// };

// export default FileUpload;
import React, { useCallback, useState } from 'react';
import { useDropzone } from 'react-dropzone';
import { motion } from 'framer-motion';

const FileUpload = ({ onAnalyze }) => {
  const [resume, setResume] = useState(null);
  const [jdText, setJdText] = useState('');
  const [isDragging, setIsDragging] = useState(false);

  const onDropResume = useCallback(acceptedFiles => {
    setIsDragging(false);
    if (acceptedFiles.length) {
      setResume(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps: getResumeRootProps, getInputProps: getResumeInputProps } = useDropzone({
    onDrop: onDropResume,
    accept: {
      'application/pdf': ['.pdf'],
      'application/msword': ['.doc'],
      'application/vnd.openxmlformats-officedocument.wordprocessingml.document': ['.docx']
    },
    maxFiles: 1,
    onDragEnter: () => setIsDragging(true),
    onDragLeave: () => setIsDragging(false)
  });

  const handleSubmit = (e) => {
    e.preventDefault();
    
    if (!resume || !jdText) {
      alert('Please upload your resume and enter job description text');
      return;
    }

    const formData = new FormData();
    formData.append('resume', resume);
    formData.append('jobDescription', jdText);

    onAnalyze(formData);
  };

  return (
    <motion.div 
      className="file-upload-container"
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ duration: 0.5 }}
    >
      <form onSubmit={handleSubmit}>
        <div className="upload-section">
          <h3 className="section-title">Upload Your Resume</h3>
          <div 
            {...getResumeRootProps({ 
              className: `dropzone ${isDragging ? 'dragging' : ''}`
            })}
          >
            <input {...getResumeInputProps()} />
            <div className="upload-icon">
              <svg viewBox="0 0 24 24">
                <path d="M19,13H13V19H11V13H5V11H11V5H13V11H19V13Z" />
              </svg>
            </div>
            <p>Drag & drop your resume here, or click to select files</p>
            <p className="file-types">(PDF, DOC, or DOCX)</p>
            {resume && (
              <motion.div 
                className="file-info"
                initial={{ scale: 0.9 }}
                animate={{ scale: 1 }}
              >
                <span>✓</span> {resume.name}
              </motion.div>
            )}
          </div>
        </div>

        <div className="upload-section">
          <h3 className="section-title">Job Description</h3>
          <div className="text-input-section">
            <label htmlFor="jdText">Paste the Job Description:</label>
            <textarea
              id="jdText"
              value={jdText}
              onChange={(e) => setJdText(e.target.value)}
              placeholder="Copy and paste the job description here..."
              rows="8"
            />
          </div>
        </div>

        <motion.button 
          type="submit" 
          className="analyze-button"
          disabled={!resume || !jdText}
          whileHover={{ scale: 1.02 }}
          whileTap={{ scale: 0.98 }}
        >
          Analyze My Resume
          <span className="button-icon">→</span>
        </motion.button>
      </form>
    </motion.div>
  );
};

export default FileUpload;