import { Field } from 'formik';
import { Typography, Checkbox, FormControlLabel, RadioGroup, Radio, TextField } from '@mui/material';

export const TextInput = ({ name, label, required, ...props }) => {
  return (
    <>
      <Field name={name}>
        {({ field, meta }) => (
          <TextField
            id={name}
            fullWidth
            autoComplete='off'
            label={label}
            required={required}
            {...field}
            {...props}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      </Field>
    </>
  );
};

export const TextAreaInput = ({ name, rows, required }) => {
  return (
    <Field
      as={TextField}
      name={name}
      multiline
      rows={rows}
      required={required}
      sx={{ width: '100%' }}
    />
  );
};

export const CheckboxInput = ({ name, label, options, ...props }) => {
  return (
    <>
      {label && <Typography gutterBottom htmlFor={name}>{label}</Typography>}
      {options.map(option => (
        <div key={option}>
          <Field name={name}>
            {({ field }) => (
              <FormControlLabel
                control={
                  <Checkbox
                    id={option}
                    checked={field.value.includes(option)}
                    {...field}
                    value={option}
                    color="secondary"
                    {...props}
                  />
                }
                label={option}
              />
            )}
          </Field>
        </div>
      ))}
    </>
  );
};

export const RadioInput = ({ name, label, options, required, ...props }) => {
  return (
    <>
      {label && <Typography gutterBottom htmlFor={name}>
        {label}
        {required && <Typography component="span" color='error'> *</Typography>}
      </Typography>}
      <RadioGroup sx={{ '.MuiFormControlLabel-asterisk': { display: 'none' } }}>
        {options.map(option => (
          <div key={option}>
            <Field name={name}>
              {({ field }) => (
                <FormControlLabel
                  control={
                    <Radio
                      id={option}
                      checked={field.value === option}
                      {...field}
                      value={option}
                      color="secondary"
                      required={required}
                      {...props}
                    />
                  }
                  label={option}
                />
              )}
            </Field>
          </div>
        ))}
      </RadioGroup>
    </>
  );
};

// export const RadioButtons = ({ name, label, options, field, index, required }) => {
//   const { values, errors, touched, setFieldValue } = useFormikContext();
//   const fieldError = getIn(errors, name);
//   const isTouched = getIn(touched, name);

//   return (
//     <FormControl error={Boolean(fieldError)}>
//       {label && <Typography gutterBottom htmlFor={name}>
//         {label}
//         {required && <Typography component="span" color='error'> *</Typography>}
//       </Typography>}
//       <RadioGroup
//         name={name}
//         // value={values.people[index][field]}
//         // onChange={ (e) => {
//         //   setFieldValue(name, e.currentTarget.value, true);
//         // } }>
//         {options.map((option) => (
//           <FormControlLabel
//             key={option}
//             label={option}
//             value={option}
//             labelPlacement="end"
//             control={<Radio />}
//           />
//         ))}
//       </RadioGroup>
//       {isTouched && fieldError && <FormHelperText sx={{ mt: 2 }}>{fieldError}</FormHelperText>}
//     </FormControl>
//   );
// };
