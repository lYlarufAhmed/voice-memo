import { CREDIT_CARD_CVC_REGEXP, CREDIT_CARD_NUMBER_REGEXP } from 'config/regexrs';

const validate = ({ card, selectedCard, givings }) => {
  const errors = {};

  if (!selectedCard) {
    const cardErrors = {};
    if (!card || !card.number) {
      cardErrors.number = 'Number is required';
    } else if (!CREDIT_CARD_NUMBER_REGEXP.test(card.number)) {
      cardErrors.number = 'Invalid card number input';
    }

    if (!card || !card.exp_month) {
      cardErrors.exp_month = 'Expiry month is required';
    } else if (!/^\d\d$/.test(card.exp_month)) {
      cardErrors.exp_month = 'Expiry month is requiring a Two-digit format';
    } else if (parseInt(card.exp_month, 10) > 12) {
      cardErrors.exp_month = 'Expiry month should be less than or equal to 12';
    }

    if (!card || !card.exp_year) {
      cardErrors.exp_year = 'Expiry year is required';
    } else if (!/^\d\d$/.test(card.exp_year)) {
      cardErrors.exp_year = 'Expiry year is requiring a Two-digit format';
    }

    if (!card || !card.cvc) {
      cardErrors.cvc = 'CVC is required';
    } else if (!CREDIT_CARD_CVC_REGEXP.test(card.cvc)) {
      cardErrors.cvc = 'Invalid CVC input';
    }

    if (!card || !card.name) {
      cardErrors.name = 'Name is required';
    }

    if (!card || !card.address_line1) {
      cardErrors.address_line1 = 'Street Address is required';
    }

    if (!card || !card.address_city) {
      cardErrors.address_city = 'City is required';
    }

    if (!card || !card.address_state) {
      cardErrors.address_state = 'State is required';
    }

    if (!card || !card.address_zip) {
      cardErrors.address_zip = 'Zip code is required';
    }

    if (!card || !card.address_country) {
      cardErrors.address_country = 'Country is required';
    }

    const cardMetadataErrors = {};
    if (!card || !card.metadata || !card.metadata.first_name) {
      cardMetadataErrors.first_name = 'First name is required';
    }

    if (!card || !card.metadata || !card.metadata.last_name) {
      cardMetadataErrors.last_name = 'Last name is required';
    }

    if (Object.keys(cardMetadataErrors).length) cardErrors.metadata = cardMetadataErrors;
    if (Object.keys(cardErrors).length) errors.card = cardErrors;
  }

  if (!givings || !givings.length) {
    errors.givings = { _error: 'At least one giving must be entered' };
  } else {
    const givingsArrayErrors = [];
    givings.forEach((g, gIndex) => {
      const gErrors = {};
      if (!g || !g.productID) {
        gErrors.productID = 'Giving type is required';
        givingsArrayErrors[gIndex] = gErrors;
      }
      if (!g || !g.amount) {
        gErrors.amount = 'Amount is required';
      } else if (parseFloat(g.amount) < 0.5) {
        gErrors.amount = 'Amount can not be less than 0.50';
      }

      if (g && g.isRecurring) {
        if (!g || !g.interval) {
          gErrors.interval = 'Interval is required';
        }

        // if (!g || !g.intervalCount) {
        //   gErrors.intervalCount = 'Interval count is required';
        // }
      }
      if (Object.keys(gErrors).length) givingsArrayErrors[gIndex] = gErrors;
    });
    if (givingsArrayErrors.length) {
      errors.givings = givingsArrayErrors;
    }
  }

  return errors;
};

export default validate;
