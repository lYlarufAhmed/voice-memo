import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutoComplete, { geocodeByPlaceId } from 'react-places-autocomplete';
import './style.css';

const placeSearchOptions = {
  types: ['address'],
  componentRestrictions: { country: ['us'] },
};

const CustomPlaceAutoComplete = React.memo(({ value, onSelect, inputProps, ...props }) => {
  const handleSelect = async (fullAddr, placeId) => {
    const initial = {
      state: { sn: '', ln: '' },
      country: { sn: '', ln: '' },
      zip: '',
      address: '',
      streetNumber: '',
      city: '',
    };
    if (!placeId) {
      onSelect(fullAddr, null);
      return;
    }
    geocodeByPlaceId(placeId)
      .then(results => {
        const addrObj = results[0].address_components.reduce((accumulator, currentValue) => {
          if (currentValue.types.find(item => item === 'country')) {
            return {
              ...accumulator,
              country: {
                sn: currentValue.short_name,
                ln: currentValue.long_name,
              },
            };
          }
          if (currentValue.types.find(item => item === 'administrative_area_level_1')) {
            return {
              ...accumulator,
              state: {
                sn: currentValue.short_name,
                ln: currentValue.long_name,
              },
            };
          }
          if (currentValue.types.find(item => item === 'locality')) {
            return { ...accumulator, city: currentValue.long_name };
          }
          if (currentValue.types.find(item => item === 'route')) {
            return { ...accumulator, address: currentValue.long_name };
          }
          if (currentValue.types.find(item => item === 'street_number')) {
            return { ...accumulator, streetNumber: currentValue.long_name };
          }
          if (currentValue.types.find(item => item === 'postal_code')) {
            return { ...accumulator, zip: currentValue.long_name };
          }
          return accumulator;
        }, initial);
        onSelect(fullAddr, addrObj);
      })
      .catch(() => {
        onSelect(fullAddr, null);
      });
  };

  return (
    <PlacesAutoComplete {...props} value={value} onSelect={handleSelect} searchOptions={placeSearchOptions}>
      {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
        <div style={{ position: 'relative' }}>
          <input {...getInputProps(inputProps)} type="text" />
          {loading && (
            <div className="place-autocomplete-dropdown-container" style={{ textAlign: 'center' }}>
              <span>Loading...</span>
            </div>
          )}
          {suggestions && suggestions.length ? (
            <div className="place-autocomplete-dropdown-container">
              {suggestions.map((suggestion, index) => {
                const className = suggestion.active ? 'suggestion-item active' : 'suggestion-item';
                return (
                  <div
                    {...getSuggestionItemProps(suggestion, {
                      className,
                    })}
                    // eslint-disable-next-line react/no-array-index-key
                    key={index}
                  >
                    <span>{suggestion.description}</span>
                  </div>
                );
              })}
            </div>
          ) : (
            <></>
          )}
        </div>
      )}
    </PlacesAutoComplete>
  );
});
CustomPlaceAutoComplete.defaultProps = {
  inputProps: {},
};

CustomPlaceAutoComplete.propTypes = {
  value: PropTypes.string.isRequired,
  onSelect: PropTypes.func.isRequired,
  inputProps: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(CustomPlaceAutoComplete);
