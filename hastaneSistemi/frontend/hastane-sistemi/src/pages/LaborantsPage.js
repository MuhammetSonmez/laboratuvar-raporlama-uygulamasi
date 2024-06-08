import React from 'react';
import LaborantList from '../components/laborantComponents/LaborantList';
import LaborantEkleForm from '../components/laborantComponents/LaborantEkleForm';
import LaborantSilForm from '../components/laborantComponents/LaborantSilForm';
import LaborantDuzenleForm from '../components/laborantComponents/LaborantDuzenleForm';

function LaborantsPage() {
  return (
    <div>
      <LaborantEkleForm />
      <LaborantSilForm/>
      <LaborantDuzenleForm/>
      <center><h1>Laborantlar</h1></center>
      <LaborantList/>
    </div>
  );
}

export default LaborantsPage;
