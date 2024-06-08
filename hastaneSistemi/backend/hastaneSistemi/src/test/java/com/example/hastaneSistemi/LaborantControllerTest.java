package com.example.hastaneSistemi;


import com.example.hastaneSistemi.controller.LaborantController;
import com.example.hastaneSistemi.model.Laborant;
import com.example.hastaneSistemi.service.LaborantService;
import org.junit.jupiter.api.BeforeEach;
import org.junit.jupiter.api.Test;
import org.mockito.InjectMocks;
import org.mockito.Mock;
import org.mockito.MockitoAnnotations;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;

import java.util.Arrays;
import java.util.List;

import static org.junit.jupiter.api.Assertions.assertEquals;
import static org.mockito.Mockito.*;

public class LaborantControllerTest {

    @Mock
    private LaborantService laborantService;

    @InjectMocks
    private LaborantController laborantController;

    @BeforeEach
    public void setUp() {
        MockitoAnnotations.openMocks(this);
    }

    @Test
    public void testGetAllLaborants() {
        Laborant laborant1 = new Laborant();
        Laborant laborant2 = new Laborant();
        List<Laborant> laborantList = Arrays.asList(laborant1, laborant2);

        when(laborantService.getAllLaborants()).thenReturn(laborantList);

        List<Laborant> result = laborantController.getAllLaborants();

        assertEquals(2, result.size());
    }

    @Test
    public void testGetLaborantById() {
        Long id = 1L;
        Laborant laborant = new Laborant();
        laborant.setId(id);

        when(laborantService.getLaborantById(id)).thenReturn(laborant);

        Laborant result = laborantController.getLaborantById(id);

        assertEquals(id, result.getId());
    }

    @Test
    public void testCreateLaborant() {
        Laborant laborant = new Laborant();

        when(laborantService.saveLaborant(laborant)).thenReturn(laborant);

        Laborant result = laborantController.createLaborant(laborant);

        assertEquals(laborant, result);
    }

    @Test
    public void testUpdateLaborant() {
        int hastaneKimlikNumarasi = 12345;
        Laborant laborant = new Laborant();

        when(laborantService.getLaborantByHastaneKimlikNo(hastaneKimlikNumarasi)).thenReturn(laborant);
        when(laborantService.updateLaborantByHastaneKimlikNumarasi(hastaneKimlikNumarasi, laborant)).thenReturn(laborant);

        ResponseEntity<?> result = laborantController.updateLaborant(hastaneKimlikNumarasi, laborant);

        assertEquals(HttpStatus.OK, result.getStatusCode());
    }

    @Test
    public void testDeleteLaborant() {
        int hastaneKimlikNumarasi = 12345;

        laborantController.deleteLaborant(hastaneKimlikNumarasi);

        verify(laborantService, times(1)).deleteLaborantWithHastaneKimlikNumarasi(hastaneKimlikNumarasi);
    }
}
