import React from 'react';
import ReactGlobe from 'react-globe';

// import optional tippy styles for tooltip support
import 'tippy.js/dist/tippy.css';
import 'tippy.js/animations/scale.css';

/*  IMPORTANT
    it is worth noting that this demo only works with Three.js 0.118 thru 0.124
    
    There is a regex Dos (ReDos) vulnerability https://www.npmjs.com/advisories/1639 fixed in 0.125
    soooo TL;DR don't let the user pick colors of the globe and we should be okay. 
*/

export class SimpleGlobe extends React.Component {
    // support rendering markers with simple data
    constructor(props) {
        super(props);
        this.state = {
            globe: null,
        }
    }

    // simple component usage
    getGlobe() { 
        return (
            <ReactGlobe
                initialCameraDistanceRadiusScale="3.25"
                //TODO we should download and copy these for our server to use
                globeBackgroundTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background.png"
                globeCloudsTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/clouds.png"
                globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
                initialCoordinates={this.props.initialCoordinates}
                markers={this.props.markers}
                options={this.props.options}
                onClickMarker={this.props.markerClick}
                // onGetGlobe={(globe) => this.setState({globe: globe})}
                // onMouseOutMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
                onGlobeTextureLoaded={() => console.log('globe loaded')}
                // onMouseOverMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
            />
        )
    }
}