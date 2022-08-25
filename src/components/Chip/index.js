import React, { useState, useRef } from 'react';
import PropTypes from 'prop-types';
import { IconButton, Popover } from '@material-ui/core';

import './style.css';

const Chip = React.memo(({ data }) => {
  const [isVisible, setVisible] = useState(false);
  const anchorEl = useRef(null);

  const handleClick = () => {
    setVisible(true);
  };

  const handleClose = () => {
    setVisible(false);
  };

  const mainLabel = data && data.length ? data[0] : '';
  const restLabel = data && data.length > 1 ? data.slice(1) : [];
  const id = isVisible ? 'chip-popover' : undefined;

  return (
    <div className="chip-wrapper">
      {mainLabel}
      {restLabel.length > 0 && (
        <div className="chip" aria-describedby={id} ref={anchorEl}>
          <IconButton className="chip-btn" color="primary" onClick={handleClick}>
            <span>+{restLabel.length}</span>
          </IconButton>
        </div>
      )}
      <Popover
        id={id}
        open={isVisible}
        anchorEl={anchorEl && anchorEl.current}
        onClose={handleClose}
        anchorOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        transformOrigin={{
          vertical: 'top',
          horizontal: 'left',
        }}
        PaperProps={{
          className: 'rest-chip-container',
        }}
      >
        <IconButton className="chip-btn" color="primary" onClick={handleClose}>
          <span>+{restLabel.length}</span>
        </IconButton>
        {restLabel.map((item, idx) => (
          // eslint-disable-next-line react/no-array-index-key
          <p key={idx}>{item || 'Unknown'}</p>
        ))}
      </Popover>
    </div>
  );
});

Chip.propTypes = {
  data: PropTypes.arrayOf(PropTypes.string).isRequired,
};

export default Chip;
