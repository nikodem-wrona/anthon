import {
  Box,
  Button,
  FormControl,
  MenuItem,
  Select,
  TextField,
} from '@mui/material';
import { Formik, Field, Form, ErrorMessage } from 'formik';
import * as Yup from 'yup';

import { TaxDto } from '../../types.ts';

type AddTaxFormComponentProps = {
  onSaveClick: (values: TaxDto) => void;
};

export const AddTaxFormComponent = ({
  onSaveClick,
}: AddTaxFormComponentProps) => {
  const initialValues: TaxDto = {
    amount: 0,
    currency: 'PLN',
    type: 'INCOME',
    transferredAt: new Date().toISOString().split('T')[0],
  };

  const validationSchema = Yup.object({
    amount: Yup.number().required('Required'),
    currency: Yup.string().required('Required'),
    type: Yup.string().required('Required'),
    transferredAt: Yup.string().required('Required'),
  });

  return (
    <Box>
      <Formik
        initialValues={initialValues}
        validationSchema={validationSchema}
        onSubmit={(values, { setSubmitting }) => {
          console.log('click', values);
          onSaveClick(values);
          setSubmitting(false);
        }}
      >
        {() => (
          <Form id={'add-tax-form'}>
            <Box
              sx={{
                padding: '2rem',
                display: 'flex',
                flexDirection: 'column',
                gap: '1rem',
              }}
            >
              <FormControl fullWidth>
                <Field
                  as={TextField}
                  name="amount"
                  type="number"
                  label="Amount"
                  variant="outlined"
                />
                <ErrorMessage name="amount" component="div" />
              </FormControl>

              <FormControl fullWidth>
                <Field
                  as={Select}
                  name="currency"
                  id="currency-input"
                  variant="outlined"
                >
                  <MenuItem value={'PLN'}>PLN</MenuItem>
                </Field>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  as={Select}
                  name="type"
                  id="tax-type-input"
                  variant="outlined"
                >
                  <MenuItem value={'INSURANCE'}>INSURANCE</MenuItem>
                  <MenuItem value={'INCOME'}>INCOME</MenuItem>
                </Field>
              </FormControl>

              <FormControl fullWidth>
                <Field
                  as={TextField}
                  name="transferredAt"
                  type="date"
                  label="Transferred at"
                  variant="outlined"
                />
                <ErrorMessage name="transferredAt" component="div" />
              </FormControl>

              <Box>
                <Button
                  type="submit"
                  variant={'contained'}
                  form={'add-tax-form'}
                >
                  Save
                </Button>
              </Box>
            </Box>
          </Form>
        )}
      </Formik>
    </Box>
  );
};
