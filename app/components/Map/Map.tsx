'use client'
import React, { useEffect } from 'react';
import { MapContainer, Marker, Popup, TileLayer, useMap } from 'react-leaflet';
import { LatLngExpression } from 'leaflet';
import { Paper, Typography, useMediaQuery } from '@material-ui/core';
// import LocationOnOutlinedIcon from '@material-ui/icons/LocationOnOutlined';
// import Rating from '@material-ui/lab/Rating';
import useStyles from './styles';

interface Place {
  latitude: number;
  longitude: number;
  name: string;
  photo: { images: { large: { url: string } } };
  rating: number;
}

interface WeatherData {
  coord: { lat: number; lon: number };
  weather: { icon: string }[];
}

interface MapProps {
  coords: LatLngExpression;
  places: Place[];
  setCoords: (coords: LatLngExpression) => void;
  setBounds: (bounds: { ne: LatLngExpression; sw: LatLngExpression }) => void;
  setChildClicked: (child: any) => void;
  weatherData?: { list: WeatherData[] };
}

const Map: React.FC<MapProps> = ({ coords, places, setCoords, setBounds, setChildClicked, weatherData }) => {
  const classes = useStyles();
  const matches = useMediaQuery('(min-width:600px)');

  return (
    <MapContainer center={coords as LatLngExpression} zoom={14} scrollWheelZoom={false} className={classes.mapContainer}>
      <TileLayer
        attribution='&copy; <a href="https://www.openstreetmap.org/copyright">OpenStreetMap</a> contributors'
        url="https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png"
      />
      <MapMarkers places={places} setChildClicked={setChildClicked} />
      <WeatherMarkers weatherData={weatherData} />
    </MapContainer>
  );
};

const MapMarkers: React.FC<{ places: Place[]; setChildClicked: (child: any) => void }> = ({ places, setChildClicked }) => {
  return (
    <>
      {places.map((place, i) => (
        <Marker position={[place.latitude, place.longitude]} key={i} eventHandlers={{
          click: () => setChildClicked(i),
        }}>
          <Popup>
            <Paper elevation={3}>
              <Typography variant="subtitle2" gutterBottom>{place.name}</Typography>
              <img
                src={place.photo ? place.photo.images.large.url : 'https://www.foodserviceandhospitality.com/wp-content/uploads/2016/09/Restaurant-Placeholder-001.jpg'}
                alt={place.name}
              />
              {/* <Rating name="read-only" size="small" value={place.rating} readOnly /> */}
            </Paper>
          </Popup>
        </Marker>
      ))}
    </>
  );
};

const WeatherMarkers: React.FC<{ weatherData?: { list: WeatherData[] } }> = ({ weatherData }) => {
  return (
    <>
      {weatherData?.list.map((data, i) => (
        <Marker position={[data.coord.lat, data.coord.lon]} key={i}>
          <Popup>
            <img src={`http://openweathermap.org/img/w/${data.weather[0].icon}.png`} height="70px" alt="weather icon" />
          </Popup>
        </Marker>
      ))}
    </>
  );
};

export default Map;