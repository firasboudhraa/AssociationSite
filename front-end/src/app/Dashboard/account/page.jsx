import * as React from 'react';
import Stack from '@mui/material/Stack';
import Grid from '@mui/material/Unstable_Grid2';

import { AccountDetailsForm } from '@/components/molecules/dashboard/acount/acount-details-form';
import { AccountInfo } from '@/components/molecules/dashboard/acount/account-info';


export default function Page() {
  return (
    <Stack spacing={3}>
      <Grid container spacing={3}>
        <Grid lg={4} md={6} xs={12}>
          <AccountInfo />
        </Grid>
        <Grid lg={8} md={6} xs={12}>
          <AccountDetailsForm />
        </Grid>
      </Grid>
    </Stack>
  );
}
