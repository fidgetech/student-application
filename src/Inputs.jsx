import { Box, Typography, Checkbox, FormControlLabel, RadioGroup, Radio, TextField } from '@mui/material';
import { DatePicker, LocalizationProvider } from '@mui/x-date-pickers';
import { AdapterMoment } from '@mui/x-date-pickers/AdapterMoment';
import { PatternFormat } from 'react-number-format';
import { Field, FastField } from 'formik';

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

export const DateInput = ({ name, label, required }) => {
  return (
    <LocalizationProvider dateAdapter={AdapterMoment}>
      <FastField name={name}>
        {({ field, form }) => (
          <DatePicker
            label={label}
            value={field.value}
            onBlur={(newValue) => { form.setFieldValue(name, newValue) }}
            slots={{
              textField: (params) => (
                <TextField
                  {...params}
                  fullWidth
                  required={required}
                  // error={Boolean(form.touched[name] && form.errors[name])}
                  // helperText={form.touched[name] && form.errors[name]}
                />
              ),
            }}
            inputFormat="MM/dd/yyyy"
          />
        )}
      </FastField>
    </LocalizationProvider>
  );
};

export const PhoneInput = ({ label, name, ...props }) => {
  // const { touched, errors, setFieldValue } = useFormikContext();
  return (
    <FastField name={name}>
      {({ field, form }) => {
        {/* const fieldError = getIn(errors, name);
        const isTouched = getIn(touched, name); */}
        return (
          <Box sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between' }}>
            <PatternFormat
              type='tel'
              customInput={TextField}
              label={label}
              format='###-###-####'
              onValueChange={({value}) => form.setFieldValue(name, value)}
              inputMode='numeric'
              fullWidth
              // error={Boolean(isTouched && fieldError)}
              // helperText={isTouched && fieldError}
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
      sx={{ width: '100%' }}
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
    </>
  );
};
