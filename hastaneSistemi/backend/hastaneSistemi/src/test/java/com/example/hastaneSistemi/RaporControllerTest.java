package com.example.hastaneSistemi;


import com.example.hastaneSistemi.model.Laborant;
import com.example.hastaneSistemi.model.Rapor;
import com.example.hastaneSistemi.service.LaborantService;
import com.example.hastaneSistemi.service.RaporService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;
import com.example.hastaneSistemi.controller.RaporController;
import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class RaporControllerTest {

    @Mock
    private RaporService raporService;

    @Mock
    private LaborantService laborantService;

    @InjectMocks
    private RaporController raporController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testCreateRapor_UniqueHastaTc_Success() {
        Rapor rapor = new Rapor();
        rapor.setHastaTc("12345678901");
        rapor.setHastaneKimlikNumarasi(123);

        Laborant laborant = new Laborant();
        when(laborantService.getLaborantByHastaneKimlikNo(rapor.getHastaneKimlikNumarasi())).thenReturn(laborant);
        when(raporService.isHastaTcUnique(rapor.getHastaTc())).thenReturn(true);
        when(raporService.getRaporCountByHastaneKimlikNo(rapor.getHastaneKimlikNumarasi())).thenReturn(0);
        when(raporService.saveRapor(rapor)).thenReturn(rapor);

        ResponseEntity<Rapor> response = raporController.createRapor(rapor);

        assertEquals(HttpStatus.CREATED, response.getStatusCode());
        assertEquals(rapor, response.getBody());
    }

    @Test
    public void testCreateRapor_NonUniqueHastaTc_BadRequest() {
        Rapor rapor = new Rapor();
        rapor.setHastaTc("12345678901");
        when(raporService.isHastaTcUnique(rapor.getHastaTc())).thenReturn(false);

        ResponseEntity<Rapor> response = raporController.createRapor(rapor);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testCreateRapor_LaborantNotFound_BadRequest() {
        Rapor rapor = new Rapor();
        rapor.setHastaTc("12345678901");
        rapor.setHastaneKimlikNumarasi(123);
        when(laborantService.getLaborantByHastaneKimlikNo(rapor.getHastaneKimlikNumarasi())).thenReturn(null);

        ResponseEntity<Rapor> response = raporController.createRapor(rapor);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testCreateRapor_MaxRaporReached_BadRequest() {
        Rapor rapor = new Rapor();
        rapor.setHastaTc("12345678901");
        rapor.setHastaneKimlikNumarasi(123);
        when(laborantService.getLaborantByHastaneKimlikNo(rapor.getHastaneKimlikNumarasi())).thenReturn(new Laborant());
        when(raporService.isHastaTcUnique(rapor.getHastaTc())).thenReturn(true);
        when(raporService.getRaporCountByHastaneKimlikNo(rapor.getHastaneKimlikNumarasi())).thenReturn(5);

        ResponseEntity<Rapor> response = raporController.createRapor(rapor);

        assertEquals(HttpStatus.BAD_REQUEST, response.getStatusCode());
        assertEquals(null, response.getBody());
    }

    @Test
    public void testGetAllRaporlar() {
        Rapor rapor1 = new Rapor();
        Rapor rapor2 = new Rapor();
        List<Rapor> raporList = Arrays.asList(rapor1, rapor2);
        when(raporService.getAllRaporlar()).thenReturn(raporList);

        List<Rapor> result = raporController.getAllRaporlar();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetRaporById() {
        Long id = 1L;
        Rapor rapor = new Rapor();
        rapor.setId(id);
        when(raporService.getRaporById(id)).thenReturn(rapor);

        Rapor result = raporController.getRaporById(id);

        assertEquals(id, result.getId());
    }

    @Test
    public void testUpdateRapor() {
        String dosyaNumarasi = "123456";
        Rapor updatedRapor = new Rapor();

        raporController.updateRapor(dosyaNumarasi, updatedRapor);

        verify(raporService, times(1)).updateRaporByDosyaNumarasi(dosyaNumarasi, updatedRapor);
    }

    @Test
    public void testDeleteRapor() {
        String dosyaNumarasi = "123456";

        raporController.deleteRapor(dosyaNumarasi);

        verify(raporService, times(1)).deleteRaporWithDosyaNumarasi(dosyaNumarasi);
    }
}
