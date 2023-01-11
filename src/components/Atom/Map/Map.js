import './Map.scss';
import {MapContainer, Marker, Tooltip, TileLayer} from 'react-leaflet';

function Map({lat, long, city}) {
    const coordinates= [lat, long];


    return (
        <div data-testid="map_container">
            <MapContainer center={coordinates} zoom={20} scrollWheelZoom={false}>
                <TileLayer
                    attribution='&copy; <a href="https://www.openstreetmap.org/copyright%22%3EOpenStreetMap</a> contributors'
                    url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
                />
                <Marker position={coordinates}>
                    <Tooltip direction="right" offset={[0, 0]} opacity={1}>
                    Agencia, {city}
                    </Tooltip>
                </Marker>
            </MapContainer>
        </div>
    )
}

export default Map;

