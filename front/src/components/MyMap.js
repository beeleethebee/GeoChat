import React from 'react';
import GoogleMapReact  from 'google-map-react';
import TextualMarker from "./TextualMarker";
import JSONDATA from '../data.json'

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
            lat: 0,
            lng: 0,
            markers: [],
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
                console.log(`lat/lng (${position.coords.latitude})/${position.coords.longitude}`)
            }, (error) => {
               console.log(error)
            });
        } else {
            alert('Navigateur non compatible :)')
        }

    }

    getMarkers = () => {
        let json_arr = [];
        Object.keys(JSONDATA).forEach((key) =>
        {
            json_arr.push(
                <TextualMarker
                    key={key}
                    number={key}
                    lng={JSONDATA[key]['lng']}
                    lat={JSONDATA[key]['lat']}
                    message={JSONDATA[key]['message']}
                />)
        })
        this.setState({markers: json_arr} )
    }

    handleMessage = (e) => {
        if (e.key === 'Enter') {
            this.setState({message: e.target.value})
            e.target.value = ""
        }
    }

    handleClick = (e) => {
        this.setState({lng: e.lng, lat: e.lat})
    }

    handleAddMarker = (e) => {
        e.preventDefault()
        let old_markers = this.state.markers
        const lat_item = document.getElementById('form_lat')
        const lng_item = document.getElementById('form_lng')
        const key  = parseInt(old_markers[old_markers.length - 1 ].key) + 1
        let textMark = <TextualMarker
            key={key}
            number={key}
            lng={lng_item.value}
            lat={lat_item.value}
            message={'ooooi josuke'}
        />

        old_markers.push(textMark)
        lat_item.value = '' ; lng_item.value = ''
        this.setState({ markers: old_markers })
        setTimeout( () => { this.disappearMarker(textMark)}, 5000)
    }

    disappearMarker = (marker) => {
        document.getElementById(`marker_${marker.props.number}`).classList.add('fadeOut')
        setTimeout( () => { this.deleteMarker(marker)}, 2000)
    }

    deleteMarker = (marker) => {
        let markers = this.state.markers
        const index = markers.indexOf(marker)
        if (index > -1) {
            markers.splice(index, 1)
        }
        this.setState({markers: markers})
        this.forceUpdate()
    }

    componentDidMount() {
        this.getPos()
        this.getMarkers()
    }

    render() {
        if (this.state.lat === 0 || this.state.lng === 0 || this.state.markers === [])
            return (
                <div>
                    <h1>Loading</h1>
                </div>
            );
        else if (this.props.api_key === '')
            return (
                <div>
                    <h1>You need a google map api key to use this app.</h1>
                </div>
            );
        else
            return (
            <div>
                <h1>Quelle est votre humeur ?</h1>
                <div id={'addMarker'}>
                    <input type={'number'} name={'lng'} id={'form_lng'} defaultValue={3} placeholder={'lng'}/>
                    <input type={'number'} name={'lat'} id={'form_lat'} defaultValue={48.834618899999995} placeholder={'lat'} step={'any'}/>
                    <input type={'submit'} onClick={this.handleAddMarker}/>
                </div>

                <input type={'text'} autoFocus onKeyPress={this.handleMessage} placeholder={'message'}/>
                <div style={{ height: '800px', width: '1000px' }}>
                    <GoogleMapReact
                        bootstrapURLKeys={{ key: this.props.api_key }}
                        defaultCenter={ {lat: this.state.lat, lng: this.state.lng}}
                        defaultZoom={16}
                        options={getMapOptions}
                        onClick={this.handleClick}
                    >
                        <TextualMarker
                            id={'my_marker'}
                            lat={this.state.lat}
                            lng={this.state.lng}
                            message={this.state.message}
                        />
                        {this.state.markers}
                    </GoogleMapReact>
                </div>
            </div>
        );
    }
}

export default MyMap;
