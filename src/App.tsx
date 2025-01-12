//to run in terminal: npm start
//to close a port (for example 8080): 
// netstat -ano | findstr :8080 -> TCP    0.0.0.0:8080             0.0.0.0:0              LISTENING       1234
// taskkill /PID 1234 /F

//1. Create a web application using any or no JavaScript framework (React / Vue / Angular/ etc.)

//VSC was already installed in my machine so the first step was to check whether I had Node.js and Node Package Manager installed:
//node -v for checking Node.js version
//npm -v for checking Node Package Manager 

//cloned repository: https://docs.apryse.com/web/guides/get-started/react (VSC->Clone Git Repository->https://github.com/ApryseSDK/webviewer-react-sample.git)
//I installed then the dependencies: npm install
//Installed WebViewer NPM module: npm i @pdftron/webviewer
//Installed React and ReactDOM: npm install react react-dom

import React, { useRef, useEffect } from 'react';
import WebViewer from '@pdftron/webviewer';
import './App.css';

const App = () => {
  const viewer = useRef(null);

  // if using a class, equivalent of componentDidMount 
  useEffect(() => {
    // If you prefer to use the Iframe implementation, you can replace this line with: WebViewer.Iframe(...)
    //WebViewer.Iframe(
    //You can use WebViewer as a Web Component, or within an iframe. We think that there are significant benefits of using it as a Web Component but currently, that is not the default behavior. At some point, though, the default behavior will change so that instantiation as a Web Component rather than as an iframe will occur. (https://apryse.com/blog/apryse-webviewer-web-components)
    //2. In the web application, instantiate the Apryse WebViewer
    WebViewer.WebComponent(
      {
        path: '/webviewer/lib',
        //initialDoc: '/files/PDFTRON_about.pdf',
        //change 1
        //3. Load any PDF into the web viewer UI
        initialDoc: '/files/sample.pdf',
        //change 2
        licenseKey: 'demo:1736682829506:7e8886f00300000000c3a8fe713d301737eaa1a6ac2f381a5c22adcbbf',  // sign up to get a free trial key at https://dev.apryse.com
      },
      viewer.current,
    ).then((instance) => {
      const { documentViewer, annotationManager, Annotations } = instance.Core;

      documentViewer.addEventListener('documentLoaded', () => {
        const rectangleAnnot = new Annotations.RectangleAnnotation({
          PageNumber: 1,
          // values are in page coordinates with (0, 0) in the top left
          X: 100,
          Y: 150,
          Width: 200,
          Height: 50,
          Author: annotationManager.getCurrentUser()
        });

        annotationManager.addAnnotation(rectangleAnnot);
        // need to draw the annotation otherwise it won't show up until the page is refreshed
        annotationManager.redrawAnnotation(rectangleAnnot);
      });
    });
  }, []);

  return (
    <div className="App">
      <div className="header">React sample</div>
      <div className="webviewer" ref={viewer}></div>
    </div>
  );
};

export default App;
