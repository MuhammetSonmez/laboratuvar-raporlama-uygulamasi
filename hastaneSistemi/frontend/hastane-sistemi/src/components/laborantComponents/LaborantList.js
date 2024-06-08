import React from 'react';
import { useGetLaborantsQuery } from '../../api/laborantApi';
import { Table, Loader, Alert } from '@mantine/core';

function LaborantList() {
  const { data, error, isLoading } = useGetLaborantsQuery();

  const tableStyle = {
    width: '100%',
    marginTop: '20px',
    boxShadow: '0 2px 4px rgba(0, 0, 0, 0.1)',
    borderCollapse: 'collapse'
  };

  const cellStyle = {
    padding: '10px',
    borderBottom: '1px solid #dee2e6',
    textAlign: 'left'
  };

  if (isLoading) return <Loader />;
  if (error) return <Alert color="red">Error fetching laborants</Alert>;

  return (
    <Table style={tableStyle}>
      <thead>
        <tr>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>İsim</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Soyisim</th>
          <th style={{ ...cellStyle, backgroundColor: '#007bff', color: 'white' }}>Hastane kimlik numarası</th>
        </tr>
      </thead>
      <tbody>
        {data.map((laborant) => (
          <tr key={laborant.id}>
            <td style={cellStyle}>{laborant.adi}</td>
            <td style={cellStyle}>{laborant.soyadi}</td>
            <td style={cellStyle}>{laborant.hastaneKimlikNumarasi}</td>
          </tr>
        ))}
      </tbody>
    </Table>
  );
}

export default LaborantList;
