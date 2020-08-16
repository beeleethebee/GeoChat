import React from 'react';
import '../TextualMarker.css'

class TextualMarker extends React.Component {
    render() {
        const { color, name, id, message, number} = this.props;
        return (
            <div id={`marker_${number}`}>
                <div
                    className={id === 'my_marker' ? 'pin bounce mine' :'pin bounce'}
                    style={{ backgroundColor: color, cursor: 'pointer' }}
                    title={name}>
                        <div className="pulse" />
                </div>
                <p id={'message'}>{message}</p>
            </div>
        );
    }
}

export default TextualMarker;
