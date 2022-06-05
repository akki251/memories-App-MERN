import { TextField, Grid } from '@material-ui/core';
import React from 'react';

const Input = ({ name, half, label, autoFocus, type, handleChange, handleShowPassword }) => {
  return (
    <Grid xs={12} sm={half ? 6 : 12} item>
      <TextField
        name={name}
        onChange={handleChange}
        variant="outlined"
        required
        fullWidth
        label={label}
        autoFocus
        type={type}
        // InputProps={
        //   name === 'password'
        //     ? {
        //         endAdornment: (
        //           <InputAdornment position="end">
        //             <IconButton onClick={handleShowPassword}></IconButton>
        //             {type === 'password' ? <Visibility /> : <VisibilityOff />}
        //           </InputAdornment>
        //         ),
        //       }
        //     : null
        // }
      />
    </Grid>
  );
};

export default Input;
