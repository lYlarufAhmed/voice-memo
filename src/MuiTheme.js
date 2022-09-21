import { createTheme } from '@material-ui/core/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: 'rgb(186, 233, 255)',
    },
    secondary: {
      main: '#00bcd4',
    },
  },
  typography: {
    fontFamily: 'Lato, sans-serif',
  },
  overrides: {
    MuiFormControl: {},
    MuiInputBase: {
      input: {
        padding: '16px 16px !important',
        border: '1px solid rgb(186, 233, 255)',
        '&:focus': {
          borderColor: '#00bcd4',
        },
        '&:hover': {
          backgroundColor: '#d8f3f5',
        },
      },
    },
    MuiFilledInput: {
      root: {
        backgroundColor: 'transparent',
      },
    },
    MuiSelect: {
      filled: {
        borderRadius: '.5rem',
        paddingTop: '20px',
      },
    },
    MuiPickersToolbarText: {
      toolbarBtnSelected: {
        color: 'white',
      },
      toolbarTxt: {
        color: '#00000069',
      },
    },
    MuiPickerDTTabs: {
      tabs: {
        color: 'white',
      },
    },
    MuiPickersDay: {
      daySelected: {
        color: 'white',
      },
    },
    MuiButton: {
      label: {
        fontWeight: 'bold',
      },
    },
    MuiCheckbox: {
      root: {
        color: 'rgb(48, 189, 255)',
      },
    },
    MuiInputLabel: {
      formControl: {
        top: '-30px',
        transform: 'none',
      },
    },
    MuiFormLabel: {
      root: {
        color: 'rgba(0, 0, 0, 0.54) !important',
      },
    },
  },
});

export default theme;
