import React from 'react';
import RaporListForm from '../components/raporComponents/RaporListForm';
import RaporEkleForm from '../components/raporComponents/RaporEkleForm';
import RaporDuzenleForm from '../components/raporComponents/RaporDuzenleForm';
import RaporSilForm from '../components/raporComponents/RaporSilForm'
import RaporSearchForm from '../components/raporComponents/RaporSearchForm';


function RaporlarPage() {
  return (
    <div>
      <RaporEkleForm />
      <RaporSilForm/>
      <RaporDuzenleForm/>
      <center><h1>Raporlar</h1></center>

      <RaporListForm/>
      <br/>
      <center><h1>Rapor arama</h1></center>

      <RaporSearchForm/>

      
      
    </div>
  );
}

export default RaporlarPage;
