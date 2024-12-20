'use client'
import Header from './components/Header/Header';
import List from './components/List/List';
import Map from './components/Map/Map';
import { LatLngExpression } from 'leaflet';
import { CssBaseline, Grid } from '@material-ui/core';
import { useEffect, useState } from 'react';

interface WeatherData {
  coord: { lat: number; lon: number };
  weather: { icon: string }[];
}

interface WeatherResponse {
  list: WeatherData[];
}

const App = () => {
    const [coords, setCoords] = useState<LatLngExpression>({ lat: 51.505, lng: -0.09 });
    const [places, setPlaces] = useState([]); // Replace with actual data fetching logic
    const [bounds, setBounds] = useState<{ ne: LatLngExpression; sw: LatLngExpression }>({ ne: { lat: 0, lng: 0 }, sw: { lat: 0, lng: 0 } });
    const [childClicked, setChildClicked] = useState<number | null>(null);
    const [weatherData, setWeatherData] = useState<WeatherResponse | undefined>(undefined); // Adjusted type
  
    useEffect(() => {
        const fetchPlaces = async () => {
            // Fetch your places data here
            // setPlaces(fetchedPlaces);
        };

        const fetchWeather = async () => {
            // Fetch your weather data here
            // Example: setWeatherData(fetchedWeather);
        };

        fetchPlaces();
        fetchWeather();
    }, []);
  
    return (
        <>
            <CssBaseline />
            <Header />
            <Grid container spacing={3} style={{ width: '100%' }}>
                <Grid item xs={12} md={4}>
                    <List />
                </Grid>
                <Grid item xs={12} md={8}>
                <div style={{ height: '100vh' }}>
                        <Map
                            coords={coords}
                            places={places}
                            setCoords={setCoords}
                            setBounds={setBounds}
                            setChildClicked={setChildClicked}
                            weatherData={weatherData}
                        />
                    </div>
                </Grid>
            </Grid>

        </>
    );
}

export default App;