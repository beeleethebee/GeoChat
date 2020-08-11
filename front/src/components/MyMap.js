import React from 'react';
import GoogleMapReact  from 'google-map-react';
import TextualMarker from "./TextualMarker";

const getMapOptions = (maps) => {
    return {
        disableDefaultUI: true,
        mapTypeControl: true,
        streetViewControl: true,
        styles: [{featureType: 'poi', elementType: 'labels', stylers: [{visibility: 'on'}]}],
    };
}

class MyMap extends React.Component {

    constructor(props) {
        super(props);

        this.state = {
            api_key: process.env.REACT_APP_GOOGLE_MAP_API_KEY,
            lat: 0,
            lng: 0,
            message: ''
        };
    }

    getPos = () => {
        if (navigator.geolocation) {
            navigator.geolocation.getCurrentPosition((position) => {
                this.setState({
                    lat: position.coords.latitude,
                    lng: position.coords.longitude
                });
            }, (error) => {
               console.log(error)
            });
        } else {
            alert('Navigateur non compatible :)')
        }
    }

    handleMessage = (e) => {
        this.setState({message: e.target.value})
    }

    componentDidMount() {
        this.getPos()
    }

    render() {
        if (this.state.lat === 0 && this.state.lng === 0)
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        else
        return (
            <div>
                <h1>Quelle est votre humeur ?</h1>
                <input type={'text'} onChange={this.handleMessage} autoFocus/>
                <div style={{ height: '800px', width: '1000px' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this.state.api_key }}
                        defaultCenter={ {lat: this.state.lat, lng: this.state.lng}}
                        defaultZoom={18}
                        options={getMapOptions}
                    >
                        <TextualMarker
                            lat={this.state.lat}
                            lng={this.state.lng}
                            message={this.state.message}
                        />
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default MyMap;
