import React, { useState, useEffect } from 'react';
import PropTypes from 'prop-types';

import './style.css';

const ButtonGroupSelect = React.memo(({ data, onSelect, ...props }) => {
  const [selected, setSelected] = useState(data[0].value);

  useEffect(() => {
    onSelect(selected);
  }, [selected, onSelect]);

  if (!data || !data.length) return <div />;

  return (
    <div {...props}>
      <div className="tab-button-group" role="group">
        {data.map(item => (
          <button
            key={item.value}
            type="button"
            className={`button ${selected === item.value ? 'red' : 'gray'} small`}
            onClick={() => setSelected(item.value)}
          >
            {item.label}
          </button>
        ))}
      </div>
    </div>
  );
});

ButtonGroupSelect.defaultProps = {
  data: null,
};

ButtonGroupSelect.propTypes = {
  data: PropTypes.arrayOf(
    PropTypes.shape({
      label: PropTypes.string.isRequired,
      value: PropTypes.oneOfType([PropTypes.string, PropTypes.number]),
    }),
  ),
  onSelect: PropTypes.func.isRequired,
};

export default ButtonGroupSelect;
