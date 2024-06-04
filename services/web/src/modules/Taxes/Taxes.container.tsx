import { useMutation, useQuery } from '@tanstack/react-query';
import axios from 'axios';

import { useNotifications } from '../../hooks/useNotifications.ts';
import { Tax } from '../../types.ts';

import { TaxesComponent } from './Taxes.component.tsx';

export const TaxesContainer = () => {
  const { displayInfoToast, displayErrorToast } = useNotifications();

  const {
    isPending,
    error,
    data,
    refetch: refetchTaxes,
  } = useQuery<Tax[]>({
    queryKey: ['GET_TAXES'],
    queryFn: () =>
      axios.get('http://localhost:3000/taxes').then((res) => res.data),
  });

  const deleteTax = useMutation({
    mutationFn: (taxId: string) => {
      return axios.delete('http://localhost:3000/tax', {
        data: { taxId },
      });
    },
    onSuccess: () => {
      displayInfoToast('Tax deleted successfully');
      void refetchTaxes();
    },
    onError: (error) => {
      displayErrorToast(error.message);
    },
  });

  const handleDeleteTax = (taxId: string) => {
    deleteTax.mutate(taxId);
  };

  if (isPending) return 'Loading...';

  if (error) return 'An error has occurred: ' + error.message;

  if (!data) return 'No data';

  return (
    <TaxesComponent taxes={data} onDeleteTaxButtonClick={handleDeleteTax} />
  );
};
