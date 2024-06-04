import { useMutation } from '@tanstack/react-query';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { toast } from 'react-toastify';

import { TaxDto } from '../../types.ts';

import { AddTaxFormComponent } from './AddTaxForm.component.tsx';

export const AddTaxFormContainer = () => {
  const navigate = useNavigate();

  const mutation = useMutation({
    mutationFn: (tax: TaxDto) => {
      return axios.post('http://localhost:3000/tax', tax);
    },
    onSuccess: () => {
      navigate('/taxes');
    },
    onError: (error) => {
      console.log(error);
      toast.error(error.message);
    },
  });

  const handleCreateTax = (tax: TaxDto) => {
    console.log('here');
    mutation.mutate(tax);
  };

  return <AddTaxFormComponent onSaveClick={handleCreateTax} />;
};
