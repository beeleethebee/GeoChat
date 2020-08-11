import React from 'react';

class Map extends React.Component {

    constructor(props) {
        super(props);
        this.state = {};
    }

    componentDidMount() {
        // navigator.geolocation.getCurrentPosition(function(position) {
        //     console.log("Latitude is :", position.coords.latitude);
        //     console.log("Longitude is :", position.coords.longitude);
        // });
        navigator.geolocation.getCurrentPosition(function(position) {
            console.log(position)
        });
    }

    render() {
        return (
            <div>
                <h1>Bonjour, monde !</h1>
                <h2>Il est.</h2>
            </div>
        );
    }
}
export default Map;
