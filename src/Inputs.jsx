import { Box, Typography, Checkbox, FormControlLabel, RadioGroup, Radio, TextField, FormHelperText, Slider } from '@mui/material';
import { PatternFormat } from 'react-number-format';
import { useFormikContext, Field, FastField, getIn } from 'formik';
// import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
// import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
// import moment from 'moment';

export const TextInput = ({ name, label, required, fastField=true, ...props }) => {
  const FieldComponent = fastField ? FastField : Field;
  return (
    <>
      <FieldComponent name={name}>
        {({ field, meta }) => (
          <TextField
            id={name}
            fullWidth
            // autoComplete="off"
            label={label}
            required={required}
            {...field}
            {...props}
            error={meta.touched && Boolean(meta.error)}
            helperText={meta.touched && meta.error}
          />
        )}
      </FieldComponent>
    </>
  );
};

// export const DateInput = ({ name, label, required }) => {
//   return (
//     <LocalizationProvider dateAdapter={AdapterMoment}>
//       <FastField name={name}>
//         {({ field, form }) => (
//           <DatePicker
//             label={label}
//             value={field.value}
//             onChange={(newValue) => {
//               if (newValue) form.setFieldValue(name, newValue);
//             }}
//             slots={{
//               textField: (params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   required={required}
//                   // error={Boolean(form.touched[name] && form.errors[name])}
//                   // helperText={form.touched[name] && form.errors[name]}
//                 />
//               ),
//             }}
//             inputFormat="MM/dd/yyyy"
//           />
//         )}
//       </FastField>
//     </LocalizationProvider>
//   );
// };

export const NumberInput = ({ label, name, format, placeholder, ...props }) => {
  return (
    <FastField name={name}>
      {({ field, form }) => {
        const fieldError = getIn(form.errors, name);
        const isTouched = getIn(form.touched, name);
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <PatternFormat
              type='tel'
              customInput={TextField}
              label={label}
              format={format}
              placeholder={placeholder}
              onValueChange={({value}) => form.setFieldValue(name, value)}
              inputMode='numeric'
              fullWidth
              error={Boolean(isTouched && fieldError)}
              helperText={isTouched && fieldError}
              {...field}
              {...props}
            />
          </Box>
        )
      }}
    </FastField>
  );
};

export const TextAreaInput = ({ name, rows, required }) => {
  return (
    <FastField
      as={TextField}
      name={name}
      multiline
      rows={rows}
      required={required}
      sx={{ width: '100%', '& textarea': { resize: 'vertical' } }}
    />
  );
};

export const CheckboxInput = ({ name, label, options, fastField=true, ...props }) => {
  const FieldComponent = fastField ? FastField : Field;
  return (
    <>
      {label && <Typography gutterBottom htmlFor={name}>{label}</Typography>}
      {options.map(option => (
        <div key={option}>
          <FieldComponent name={name}>
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
          </FieldComponent>
        </div>
      ))}
    </>
  );
};

export const RadioInput = ({ name, label, options, required, ...props }) => {
  const { errors, touched } = useFormikContext();
  const fieldError = getIn(errors, name);
  const isTouched = getIn(touched, name);
  return (
    <>
      {label && <Typography gutterBottom htmlFor={name}>
        {label}
        {required && <Typography component="span" color='error'> *</Typography>}
      </Typography>}
      <RadioGroup sx={{ '.MuiFormControlLabel-asterisk': { display: 'none' } }}>
        {options.map(option => (
          <div key={option}>
            <FastField name={name}>
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
            </FastField>
          </div>
        ))}
      </RadioGroup>
      {isTouched && fieldError && <FormHelperText sx={{ mt: 2, color: 'rgb(211, 47, 47)' }}>{fieldError}</FormHelperText>}
    </>
  );
};

export const SliderInput = ({ name, label, required, ...props }) => {
  const { errors, touched, setFieldValue, values } = useFormikContext();
  const fieldError = getIn(errors, name);
  const isTouched = getIn(touched, name);
  const value = getIn(values, name);

  const marks = [
    { value: 1, label: '1' },
    { value: 2, label: '2' },
    { value: 3, label: '3' },
    { value: 4, label: '4' },
    { value: 5, label: '5' },
  ];

  return (
    <>
      {label && (
        <Typography gutterBottom htmlFor={name}>
          {label}
          {required && <Typography component="span" color="error"> *</Typography>}
        </Typography>
      )}
      <Slider
        value={value || 1}
        onChange={(e, newValue) => setFieldValue(name, newValue)}
        aria-labelledby={name}
        step={1}
        marks={marks}
        min={1}
        max={5}
        {...props}
      />
      {isTouched && fieldError && (
        <FormHelperText sx={{ mt: 2, color: 'rgb(211, 47, 47)' }}>
          {fieldError}
        </FormHelperText>
      )}
    </>
  );
};
