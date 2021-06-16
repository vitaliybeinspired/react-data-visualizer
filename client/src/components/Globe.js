import React from 'react';
import ReactGlobe from 'react-globe';
// import logo from '../images/logo.png';

/*  IMPORTANT
    it is worth noting that this demo only works with Three.js 0.118 thru 0.124
    There is a regex Dos (ReDos) vulnerability https://www.npmjs.com/advisories/1639 fixed in 0.125
    soooo TL;DR don't let the user pick colors of the globe and we should be okay. 
*/

export const markers = [

    {

        id: 'ElSalvador',
        country: 'El Salvador',
        color: 'yellow',
        coordinates: [13.598871, -88.909731],
        value: 20,
    },
    {
        id: 'Nicaragua',
        country: 'Nicaragua',
        color: 'yellow',
        coordinates: [12.793830, -84.854074],
        value: 10,
    },
    {
        id: 'Mexico',
        country: 'Mexico',
        color: 'yellow',
        coordinates: [23.502654, -102.227797],
        value: 80,
    },
    {
        id: 'CostaRica',
        country: 'Costa Rica',
        color: 'yellow',
        coordinates: [10.031846, -83.896692],
        value: 40,
    }
];

const options = {
    ambientLightColor: 'white',
    ambientLightIntensity: 0.15,
    enableDefocus: true,
    cameraRotateSpeed: 0.25,
    cameraZoomSpeed: 1.5,
    cameraAutoRotateSpeed: 0.025,
    focusAnimationDuration: 1750,
    focusEasingFunction: ['Quintic', 'InOut'],
    globeGlowPower: 5,
    enableMarkerGlow: true,
    markerEnterAnimationDuration: 0.4,
    markerGlowCoefficient: 0.5,
    markerGlowPower: 1.2,
    pointLightColor: 'white',
    pointLightIntensity: 1.0,
    pointLightPositionRadiusScales: [-1500, 500, 1500],
    markerType: 'dot',
    markerTooltipRenderer: marker => `${marker.country}`,
};

export class Globe extends React.Component {
    getGlobe() { 
        return (
            <ReactGlobe
                initialCameraDistanceRadiusScale="3.25"
                //TODO we should download and copy these for our server to use
                globeBackgroundTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/background.png"
                globeCloudsTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/clouds.png"
                globeTexture="https://raw.githubusercontent.com/chrisrzhou/react-globe/main/textures/globe.jpg"
                initialCoordinates={[17.4921, -84.0852]}
                markers={markers}
                options={options}
                onClickMarker={this.props.markerClick}
                onDefocus={this.props.defocusHandler}
                // onGetGlobe={(globe) => this.setState({globe: globe})}
                // onMouseOutMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
                onGlobeTextureLoaded={() => console.log('globe loaded')}
                // onMouseOverMarker={(marker, markerObject, event) => console.log(marker, markerObject, event)}
            />
        )
    }
}