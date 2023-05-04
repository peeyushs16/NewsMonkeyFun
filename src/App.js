import './App.css';

import React, { useState } from 'react'
import NavBar from './components/NavBar';
import News from './components/News';
import {
  BrowserRouter as Router,
  Routes,
  Route
} from "react-router-dom";
import LoadingBar from 'react-top-loading-bar'

const App = () => {

  const [progress, setProgress] = useState(0)

  const country = 'in';
  const pageSize = 5;
  const apikey = process.env.REACT_APP_NEWS_API;


  const setProgressBar = (progress) =>{
    setProgress(progress);
  }

    return (
      <Router>
        <NavBar />
        <LoadingBar
        height={3}
        color='#f11946'
        progress={progress}
      />
        <Routes>
            <Route exact path="/"  element={<News setProgress={setProgressBar} apikey={apikey} key="general" pageSize={pageSize} country={country} category='general'/>} />
            <Route exact path="/business"  element={<News setProgress={setProgressBar} apikey={apikey} key="business" pageSize={pageSize} country={country} category='business'/>} />
            <Route exact path="/entertainment"  element={<News setProgress={setProgressBar} apikey={apikey} key="entertainment" pageSize={pageSize} country={country} category='entertainment'/>} />
            <Route exact path="/general"  element={<News setProgress={setProgressBar} apikey={apikey} key="general" pageSize={pageSize} country={country} category='general'/>} />
            <Route exact path="/health"  element={<News setProgress={setProgressBar} apikey={apikey} key="health" pageSize={pageSize} country={country} category='health'/>} />
            <Route exact path="/science"  element={<News setProgress={setProgressBar} apikey={apikey} key="science" pageSize={pageSize} country={country} category='science'/>} />
            <Route exact path="/sports"  element={<News setProgress={setProgressBar} apikey={apikey} key="sports" pageSize={pageSize} country={country} category='sports'/>} />
            <Route exact path="/technology"  element={<News setProgress={setProgressBar} apikey={apikey} key="technology" pageSize={pageSize} country={country} category='technology'/>} />            
        </Routes>
        
      </Router>
    )
  }
  export default App