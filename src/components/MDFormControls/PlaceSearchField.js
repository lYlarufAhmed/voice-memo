import React from 'react';
import PropTypes from 'prop-types';
import { GoogleApiWrapper } from 'google-maps-react';
import PlacesAutocomplete from 'react-places-autocomplete';
import TextField from 'components/MDFormControls/TextField';

const PlaceSearchField = React.memo(({ input, label, meta, ...rest }) => (
  <PlacesAutocomplete {...input} {...rest}>
    {({ getInputProps, suggestions, getSuggestionItemProps, loading }) => (
      <>
        <TextField label={label} {...getInputProps({})} meta={meta} />
        <div className="autocomplete-dropdown-container">
          {loading && <div>Loading...</div>}
          {suggestions.map((suggestion, index) => {
            const className = suggestion.active ? 'suggestion-item--active' : 'suggestion-item';
            const stylePlaces = suggestion.active
              ? { backgroundColor: '#fafafa', cursor: 'pointer' }
              : { backgroundColor: '#ffffff', cursor: 'pointer' };
            return (
              <div
                {...getSuggestionItemProps(suggestion, {
                  className,
                  style: stylePlaces,
                })}
                // eslint-disable-next-line react/no-array-index-key
                key={index}
              >
                <span>{suggestion.description}</span>
              </div>
            );
          })}
        </div>
      </>
    )}
  </PlacesAutocomplete>
));

PlaceSearchField.defaultProps = {
  meta: {
    touched: false,
    error: '',
  },
  input: {},
  label: '',
};

PlaceSearchField.propTypes = {
  label: PropTypes.string,
  input: PropTypes.object,
  meta: PropTypes.object,
};

export default GoogleApiWrapper({
  apiKey: process.env.REACT_APP_GOOGLE_MAPS_API_KEY,
})(PlaceSearchField);
