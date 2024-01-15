import { createTheme } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      // main: '#b3d2ab' // light green
      main: '#172A3A'
    },
    secondary: {
      main: '#86a8b3'
    },
    tertiary: {
      main: '#856A5D'
    },
    darkBlue: {
      main: '#172A3A'
    },
    aquaBlue: {
      main: '#004346'
    },
    nextColor: {
      main: '#FDE8D8'
    },
    backColor: {
      main: '#6D8EA0'
    }
  },
  components: {
    MuiButton: {
      defaultProps: {
        color: "darkBlue",
        outline: 2,
        variant: "outlined"
      }
    },
    MuiDataGrid: {
      defaultProps: {
        sx: {
          border: 3,
          '& .MuiDataGrid-withBorderColor': {
            border: 0
          },
          '& .MuiDataGrid-columnHeaders': {
            outline: 2,
            outlineColor: 'darkBlue.main'
          },
          '& .MuiDataGrid-row': {
            outline: 1,
            outlineColor: 'darkBlue.main'
          },
          '& .MuiDataGrid-footerContainer': {
            outline: 2,
            outlineColor: 'darkBlue.main'
          },
          // "&.MuiDataGrid-selected": {
          //   backgroundColor: "",
          //   color: "",
          //   "&:hover": {
          //     backgroundColor: ""
          //   }
          // },
          "&.MuiDataGrid-root .MuiDataGrid-columnHeader:focus, &.MuiDataGrid-root .MuiDataGrid-cell:focus, &.MuiDataGrid-root .MuiDataGrid-cellCheckbox:focus":
          {
            outline: "none",
          },
        }
      }
    },
    MuiTextField: {
      defaultProps: {
        color: "darkBlue",
        sx: {
          border: 'var(--color-dark-blue) solid 1px',
          borderRadius: '4px',
          '& input': {
            color: 'var(--color-dark-blue)'
          }
        }
      }
    },
    MuiSelect: {
      defaultProps: {
        sx: {
          border: 'var(--color-dark-blue) solid 1px',
          borderRadius: '4px',
          color: 'var(--color-dark-blue)',
          '& input': { color: 'var(--color-dark-blue)' },
          '& svg': { color: 'var(--color-dark-blue)' }
        }
      }
    },
    MuiDatePicker: {
      defaultProps: {
        sx: {
          border: 'var(--color-dark-blue) solid 1px',
          borderRadius: '4px',
          '& input': { color: 'var(--color-dark-blue)' },
          '& svg': { color: 'var(--color-dark-blue)' }
        }
      }
    },
    MuiAccordion: {
      defaultProps: {
        sx: {
          border: 'var(--color-dark-blue) solid 1px',
          backgroundColor: 'transparent',
          borderRadius: '4px',
          color: 'var(--color-dark-blue)'
        }
      }
    },
    MuiPopover: {
      defaultProps: {
        sx: {
          bgColor: 'orange'
        }
      }
    }
  }
});

export default theme;