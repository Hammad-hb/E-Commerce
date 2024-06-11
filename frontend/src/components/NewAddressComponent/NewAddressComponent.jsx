import '@geoapify/geocoder-autocomplete/styles/round-borders.css';
import {
  GeoapifyGeocoderAutocomplete,
  GeoapifyContext,
} from '@geoapify/react-geocoder-autocomplete';
import { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { updatePlace } from '@/redux/crud/reducer';

const NewAddressComponent = ({ field }) => {
  const [address, setAddress] = useState('');
  const [country, setCountry] = useState('');
  const [state, setState] = useState('');
  const [city, setCity] = useState('');
  const [postalCode, setPostalCode] = useState('');

  const result = useSelector((state) => state.crud);
  const dispatch = useDispatch();

  const handleAddressChange = (value) => {
    setAddress(value);

    // Extract country, state, city from the complete address
    // You can use an API service to fetch detailed address components based on the address
    // For simplicity, we'll just split the address by commas
    const addressParts = value.split(',');
    if (addressParts.length >= 3) {
      setCountry(addressParts[addressParts.length - 1].trim());
      setState(addressParts[addressParts.length - 2].trim());
      setCity(addressParts[addressParts.length - 3].trim());
    } else {
      console.log('Invalid address format');
    }
  };

  const handleCountryChange = (value) => {
    setCountry(value);
    // field.country = value;
  };

  const handleStateChange = (value) => {
    setState(value);
  };

  const handleCityChange = (value) => {
    setCity(value);
  };

  const onPlaceSelect = (place) => {
    if (place && place.properties) {
      const { formatted, country, state, city } = place.properties;
      setAddress(formatted);
      setCountry(country);
      setState(state);
      setCity(city);
      console.log('Place selected:', place);
      dispatch(updatePlace(country));
    }
  };

  return (
    <GeoapifyContext apiKey="801a551a7ce94ddf90c249eb4477734d">
      <GeoapifyGeocoderAutocomplete
        placeholder="Enter address here"
        placeSelect={onPlaceSelect}
        value={address}
        onChange={(value) => handleAddressChange(value)}
      />
      <input
        type="text"
        placeholder="Country"
        value={country}
        onChange={(e) => handleCountryChange(e.target.value)}
        style={{ marginTop: '12px' }}
      />
      <input
        type="text"
        placeholder="State"
        value={state}
        onChange={(e) => handleStateChange(e.target.value)}
        style={{ marginTop: '12px', marginLeft: '12px' }}
      />
      <input
        type="text"
        placeholder="City"
        value={city}
        onChange={(e) => handleCityChange(e.target.value)}
        style={{ marginTop: '12px' }}
      />
    </GeoapifyContext>
  );
};

export default NewAddressComponent;
