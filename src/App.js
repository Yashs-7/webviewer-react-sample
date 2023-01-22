import React, { useRef, useEffect, useState } from 'react';
import WebViewer from '@pdftron/webviewer';
import ReactQuill from 'react-quill';
import 'react-quill/dist/quill.snow.css';
import './App.css';

const App = () => {
  const viewer = useRef(null);
  const [content, setContent] = useState('');

  const handleContentChange = (newContent) => {
    setContent(newContent);
  };

  useEffect(() => {
    WebViewer({
        path: '/webviewer/lib',
        initialDoc: '/files/PDFTRON_about.pdf',
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header"><img src="../assets/apple-touch-icon.png" height="50px" Width="50px"  alt="brand logo"/> 
       <div className='heading-text'>PDF Ellite</div> </div>
      <div className="webviewer-container">
        <div className="webviewer" ref={viewer}></div>
        <div className="text-editor-container">
          <ReactQuill value={content} onChange={handleContentChange} />
        </div>
      </div>
    </div>
  );
};

export default App;
