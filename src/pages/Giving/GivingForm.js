import React from 'react';
import PropTypes from 'prop-types';
import * as Yup from 'yup';
// import { connect } from 'react-redux';
import { Button, FormControl, Grid, IconButton, InputLabel, Paper, Typography } from '@material-ui/core';
import { DropDownPicker, RadioGroupField } from 'components/MDFormControls';
import { ReactComponent as TrashIcon } from 'assets/images/trash-alt.svg';
import { Add } from '@material-ui/icons';
import { Field, FieldArray, Form, Formik } from 'formik';
import FormControlLabel from '@material-ui/core/FormControlLabel';
import Checkbox from '@material-ui/core/Checkbox';
import Select from '@material-ui/core/Select';
import ExpandMoreIcon from '@material-ui/icons/ExpandMore';
import MenuItem from '@material-ui/core/MenuItem';
import { useSelector } from 'react-redux';
import { Loading } from '../../components';
import { InputComponent } from './InputComponent';

const schema = as =>
  Yup.object({
    givings: Yup.array().of(
      Yup.object().shape({
        productID: Yup.string().required('Giving type is required!'),
        amount: Yup.number().required('Amount is required').positive('Should be a positive number'),
      }),
    ),
    isRecurring: Yup.bool().required(),
    frequency: Yup.string().default('week'),
    selectedCard: Yup.string().default(''),
    card: Yup.object({
      metadata: Yup.object()
        .shape({
          first_name: Yup.string().required('First Name is Required!'),
          last_name: Yup.string().required('Last Name is Required!'),
          email: Yup.string().email('Should be a valid email!').required('Email is Required!'),
        })
        .required(),
    }),
  });

const frequencyOptions = [
  {
    label: 'Weekly',
    value: 'week',
  },
  {
    label: 'Bi-Weekly',
    value: 'bi-week',
  },
  {
    label: 'Monthly',
    value: 'month',
  },
  {
    label: 'Yearly',
    value: 'year',
  },
];
const ITEM_HEIGHT = 48;
const ITEM_PADDING_TOP = 8;
const MenuProps = {
  PaperProps: {
    style: {
      maxHeight: ITEM_HEIGHT * 4.5 + ITEM_PADDING_TOP,
    },
  },
};

const GivingForm = ({
  gifts,
  handleSubmit,
  selectedCard,
  // as,
  // email,
  // firstName,
  // lastName,
  handleDeleteCard,
  cards,
  deletingCard,
}) => {
  const { as, user } = useSelector(state => state.auth);
  return (
    <Formik
      initialValues={{
        givings: [{ productID: '', amount: '' }],
        isRecurring: false,
        frequency: 'week',
        card: {
          metadata: {
            first_name: as === 'guest' ? '' : user.profile.firstName,
            last_name: as === 'guest' ? '' : user.profile.lastName,
            email: as === 'guest' ? '' : user.email,
          },
        },
        selectedCard,
      }}
      validationSchema={schema(as)}
      onSubmit={async (values, formikHelpers) => {
        formikHelpers.setSubmitting(true);
        if (values.card?.metadata?.email) {
          // eslint-disable-next-line no-param-reassign
          values.card.metadata.email = values.card?.metadata?.email.toLowerCase();
        }
        await handleSubmit(values);
        formikHelpers.setSubmitting(false);
      }}
    >
      {({ values, isSubmitting }) => {
        const totalAmount = values.givings.reduce((acc, { amount }) => acc + (amount || 0), 0)?.toFixed(2);
        const getGiftOptions = index =>
          gifts
            .map(({ productID, title }) => ({
              label: title,
              value: productID,
            }))
            .filter(
              ({ value }) =>
                !values.givings.some(({ productID }, ig) => productID === value && index !== ig),
            );
        const showPayment = values.givings.some(({ productID }) => productID) && totalAmount > 0;
        return (
          <Form>
            <Grid item xs={12}>
              <FieldArray
                name="givings"
                render={arrayHelpers => (
                  <Grid container justifyContent="space-around" alignItems="center" spacing={2}>
                    <Grid item sm={9}>
                      <Grid container direction="column" spacing={2} style={{ gap: '2rem' }}>
                        {as === 'guest' && (
                          <Grid item sm={10} xs={12}>
                            <Grid container justifyContent="space-between">
                              <Grid item sm={5} xs={12} className="margin-btm-sm">
                                <InputComponent label="First name" name="card.metadata.first_name" />
                              </Grid>
                              <Grid item sm={5} xs={12}>
                                <InputComponent label="Last name" name="card.metadata.last_name" />
                              </Grid>
                            </Grid>
                          </Grid>
                        )}

                        <Grid item sm={10} xs={12}>
                          {as === 'guest' && <InputComponent label="Email" name="card.metadata.email" />}
                        </Grid>

                        {values.givings.map((_, index) => (
                          // eslint-disable-next-line react/no-array-index-key
                          <Grid item key={`giving-${index}`} sm={10} xs={12}>
                            <Grid container alignItems="center" justifyContent="space-between">
                              <Grid item sm={6} xs={5}>
                                <Field
                                  name={`givings.${index}.productID`}
                                  component={({ field, form }) => (
                                    <DropDownPicker
                                      input={{ ...field }}
                                      meta={{
                                        error: form.errors.givings && form.errors.givings[index]?.productID,
                                        touched:
                                          form.touched?.givings && form.touched.givings[index]?.productID,
                                      }}
                                      menuArray={getGiftOptions(index)}
                                      label="Giving Type"
                                    />
                                  )}
                                />
                              </Grid>
                              <Grid item xs={6} sm={5}>
                                <Grid container>
                                  <Grid item sm={10} xs={index === 0 ? 12 : 9}>
                                    <InputComponent
                                      min={0}
                                      label="Amount"
                                      type="number"
                                      name={`givings.${index}.amount`}
                                      startAdornment
                                      id="amount"
                                    />
                                  </Grid>
                                  {index !== 0 && (
                                    <Grid item xs={1}>
                                      <IconButton
                                        type="button"
                                        disableRipple
                                        size="small"
                                        className="button lightgreen icon-button"
                                        onClick={() => arrayHelpers.remove(index)}
                                      >
                                        <TrashIcon />
                                      </IconButton>
                                    </Grid>
                                  )}
                                </Grid>
                              </Grid>
                            </Grid>
                          </Grid>
                        ))}
                        <Grid item>
                          <Button
                            variant="outlined"
                            startIcon={<Add />}
                            disabled={getGiftOptions(values.givings.length).length === 0}
                            // type="button"
                            className="border-dark button"
                            style={{ borderRadius: '4em' }}
                            onClick={() =>
                              arrayHelpers.push({
                                productID: '',
                                amount: '',
                              })
                            }
                          >
                            Add Donation
                          </Button>
                        </Grid>
                      </Grid>
                    </Grid>
                    <Grid item sm={3} xs={12} style={{ textAlign: 'center' }}>
                      <Paper
                        id="total-paper"
                        elevation={0}
                        style={{
                          display: 'flex',
                          justifyContent: 'center',
                          flexDirection: 'column',
                          alignItems: 'center',
                          border: '1px solid',
                          borderRadius: '10px',
                          height: '140px',
                          width: '220px',
                        }}
                      >
                        <Typography variant="h5">Total</Typography>
                        <Typography variant="h4">${totalAmount}</Typography>
                      </Paper>
                    </Grid>
                  </Grid>
                )}
              />
            </Grid>
            <Grid item>
              <Grid container direction="column" style={{ paddingLeft: '2rem' }}>
                {as !== 'guest' && (
                  <Grid item xs={12}>
                    <Field
                      name="isRecurring"
                      component={({ field }) => (
                        <FormControl>
                          <FormControlLabel
                            control={<Checkbox {...field} checked={field.value} />}
                            label="Make this Gift Recurring"
                          />
                        </FormControl>
                      )}
                    />
                  </Grid>
                )}

                {values.isRecurring && (
                  <>
                    <Grid item xs={12}>
                      <Typography variant="h5" style={{ marginBottom: '2rem' }}>
                        Recurring Gift Details
                      </Typography>
                    </Grid>
                    <Grid item sm={3} xs={9}>
                      <FormControl fullWidth>
                        <InputLabel htmlFor="freq" shrink={false}>
                          Frequency
                        </InputLabel>
                        <Field
                          name="frequency"
                          component={({ field }) => (
                            <Select
                              variant="filled"
                              labelId="freq"
                              disableUnderline
                              MenuProps={MenuProps}
                              IconComponent={ExpandMoreIcon}
                              {...field}
                            >
                              {frequencyOptions.map(v => (
                                <MenuItem key={v.value} value={v.value}>
                                  {v.label}
                                </MenuItem>
                              ))}
                            </Select>
                          )}
                        />
                      </FormControl>
                    </Grid>
                  </>
                )}
              </Grid>
            </Grid>

            {showPayment && (
              <>
                <Grid item xs={12}>
                  <Grid container direction="column" alignItems="center">
                    <Grid item>
                      {as === 'user' && (
                        <>
                          {deletingCard ? (
                            <div style={{ position: 'relative', height: 56, width: '100%' }}>
                              <Loading />
                            </div>
                          ) : (
                            <Field
                              name="selectedCard"
                              component={({ field }) => (
                                <RadioGroupField
                                  input={{ ...field }}
                                  label="Select a card"
                                  handleDelete={handleDeleteCard}
                                  color="primary"
                                  items={[
                                    ...cards.sort((a, b) => {
                                      if (a.id === selectedCard) return -1;
                                      if (b.id === selectedCard) return 1;
                                      return b.joinDate - a.joinDate;
                                    }),
                                    { id: '' },
                                  ].map(card => ({
                                    value: card.id,
                                    label:
                                      card.id === ''
                                        ? 'Use a new payment method'
                                        : `${card.id === selectedCard ? 'CURRENT - ' : ''}${
                                            card.name || ''
                                          } (${card.brand.toUpperCase()} Ending ${card.last4})`,
                                  }))}
                                />
                              )}
                            />
                          )}
                        </>
                      )}
                    </Grid>
                  </Grid>
                </Grid>
                <Grid item xs={12} style={{ textAlign: 'center' }}>
                  {isSubmitting ? (
                    <div style={{ position: 'relative', height: 56, width: '100%' }}>
                      <Loading />
                    </div>
                  ) : (
                    <Grid item xs={12}>
                      <Button
                        style={{ backgroundColor: 'greenyellow' }}
                        type="submit"
                        className="button large"
                        disabled={!totalAmount}
                      >
                        <div className="d-flex flex-column">
                          <span>Next</span>
                          <span style={{ textTransform: 'none' }}>{`Total amount - ${
                            totalAmount ? `$${totalAmount}` : ''
                          }`}</span>
                        </div>
                      </Button>
                    </Grid>
                  )}
                </Grid>
              </>
            )}
          </Form>
        );
      }}
    </Formik>
  );
};
GivingForm.defaultProps = {
  churchName: '',
  churchLogo: '',
  cards: [],
};
GivingForm.propTypes = {
  handleSubmit: PropTypes.func.isRequired,
  handleDeleteCard: PropTypes.func.isRequired,
  gifts: PropTypes.arrayOf(
    PropTypes.shape({
      title: PropTypes.string.isRequired,
      productID: PropTypes.string.isRequired,
    }),
  ).isRequired,
  selectedCard: PropTypes.string.isRequired,
  churchName: PropTypes.string,
  churchLogo: PropTypes.string,
  deletingCard: PropTypes.bool.isRequired,
  cards: PropTypes.arrayOf(
    PropTypes.shape({
      id: PropTypes.string.isRequired,
    }),
  ),
};

export default GivingForm;
