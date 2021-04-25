import React from 'react';
import Globe from 'react-globe.gl';


//We will likely need to use Labels Layer
//There are functions like onlabelclick and hover fortunately
//https://github.com/vasturiano/react-globe.gl
//some texutes:
//https://github.com/chrisrzhou/react-globe/tree/main/textures
//https://unpkg.com/browse/three-globe@2.18.0/example/img/
export class MyGlobe extends React.Component {
  
  render(){
      return (
      <Globe
        globeImageUrl="//unpkg.com/three-globe/example/img/earth-day.jpg"
        bumpImageUrl="//raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe_dark.jpg"
        backgroundImageUrl="//unpkg.com/three-globe/example/img/night-sky.png"
      />
    )
  }
}

export default MyGlobe