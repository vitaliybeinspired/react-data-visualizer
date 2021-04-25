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

const markers = [
    {
        id: 'marker1',
        city: 'Singapore',
        color: 'red',
        coordinates: [1.3521, 103.8198],
        value: 50,
    },
    {
        id: 'marker2',
        city: 'New York',
        color: 'blue',
        coordinates: [40.73061, -73.935242],
        value: 25,
    },
    {
        id: 'marker3',
        city: 'San Francisco',
        color: 'orange',
        coordinates: [37.773972, -122.431297],
        value: 35,
    },
    {
        id: 'marker4',
        city: 'Beijing',
        color: 'gold',
        coordinates: [39.9042, 116.4074],
        value: 135,
    },
    {
        id: 'marker5',
        city: 'London',
        color: 'green',
        coordinates: [51.5074, 0.1278],
        value: 80,
    },
    {
        id: 'marker6',
        city: 'Los Angeles',
        color: 'gold',
        coordinates: [29.7604, -95.3698],
        value: 54,
    },
];

// simple and extensive options to configure globe
// https://github.com/chrisrzhou/react-globe/blob/main/docs/props.mdx
const options = {
    ambientLightColor: 'white',
    ambientLightIntensity: 0.6,
    enableDefocus: false,
    cameraRotateSpeed: 0.25,
    cameraZoomSpeed: 1.5,
    cameraAutoRotateSpeed: 0.05,
    focusAnimationDuration: 2000,
    focusEasingFunction: ['Quintic', 'Out'],
    globeGlowPower: 7,
    enableMarkerGlow: true,
    markerEnterAnimationDuration: 0.4,
    markerGlowCoefficient: 0.5,
    markerGlowPower: 1.2,
    pointLightColor: 'gold',
    pointLightIntensity: 0.1,
    markerType: 'dot',
    markerTooltipRenderer: marker => `${marker.city} (${marker.value})`,
};
/**
 * Use the prop `markerClick` to get a return OUT of the component
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
    render() { 
        return (
            <div className="globe">
                <ReactGlobe
                    height="100vh"
                    //TODO we should download and copy these for our server to use
                    globeBackgroundTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background.png"
                    globeCloudsTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/clouds.png"
                    globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
                    initialCoordinates={[1.3521, 103.8198]}
                    markers={markers}
                    options={options}
                    width="100%"
                    onClickMarker={this.props.markerClick}
                    // onGetGlobe={(globe) => this.setState({globe: globe})}
                    // onMouseOutMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
                    onGlobeTextureLoaded={() => console.log('globe loaded')}
                    // onMouseOverMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
                />
            </div>
        )
    }
}