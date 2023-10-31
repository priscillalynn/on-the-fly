import './App.css';
import React, { useState, useEffect } from 'react';
import { useRoutes } from 'react-router-dom'
import ReadTrips from './pages/ReadTrips'
import CreateTrip from './pages/CreateTrip'
import EditTrip from './pages/EditTrip'
import CreateDestination from './pages/CreateDestination';
import ReadDestinations from './pages/ReadDestinations'
import TripDetails from './pages/TripDetails'
import { Link } from 'react-router-dom'
import CreateActivity from './pages/CreateActivity';
import AddToTrip from './pages/AddToTrip';
import Login from './pages/Login';

const App = () => {

  const API_URL = "http://localhost:3001";

  
  const [trips, setTrips] = useState([]);
  const [destinations, setDestinations] = useState([]);

  useEffect(() => {
    const fetchTrips = async () => {
      //get trips
      const res = await fetch(`${API_URL}/api/trips`);
      //convert to json
      const tripsData = await res.json();
      setTrips(tripsData);
    }
    const fetchDestinations = async () => {
      const response = await fetch(`${API_URL}/api/destinations`);
      const data = await response.json();
      setDestinations(data);
    };
    fetchTrips();
    fetchDestinations();
  }, []);

  // Sets up routes
  let element = useRoutes([
    {
      path: "/",
      element: <ReadTrips data={trips} />,
    },
    {
      path: "/trip/new",
      element: <CreateTrip user={user} api_url={API_URL} />,
    },
    {
      path: "/edit/:id",
      element: <EditTrip user={user} data={trips} api_url={API_URL} />,
    },
    {
      path: "/destinations",
      element: <ReadDestinations user={user} data={destinations} />,
    },
    {
      path: "/trip/get/:id",
      element: <TripDetails user={user} data={trips} api_url={API_URL} />,
    },
    {
      path: "/destination/new/:trip_id",
      element: <CreateDestination user={user} api_url={API_URL} />,
    },
    {
      path: "/activity/create/:trip_id",
      element: <CreateActivity user={user} api_url={API_URL} />,
    },
    {
      path: "/destinations/add/:destination_id",
      element: <AddToTrip user={user} data={trips} api_url={API_URL} />,
    },
  ]);

  
  return ( 

    <div className="App">

      <div className="header">

        <h1>On The Fly ✈️</h1>
        <Link to="/"><button className="headerBtn">Explore Trips</button></Link>
        <Link to="/destinations"><button className="headerBtn">Explore Destinations</button></Link>
        <Link to="/trip/new"><button className="headerBtn"> + Add Trip </button></Link>
      </div>
        {element}
    </div>

  );
}

export default App;
