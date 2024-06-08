package com.example.hastaneSistemi.controller;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.hastaneSistemi.model.Laborant;
import com.example.hastaneSistemi.service.LaborantService;

import java.util.List;

@RestController
@RequestMapping("/api/laborants")
public class LaborantController {

    @Autowired
    private LaborantService laborantService;

    @GetMapping
    public List<Laborant> getAllLaborants() {
        return laborantService.getAllLaborants();
    }
    

    @GetMapping("/{id}")
    public Laborant getLaborantById(@PathVariable Long id) {
        return laborantService.getLaborantById(id);
    }

    @PostMapping
    public Laborant createLaborant(@RequestBody Laborant laborant) {
        return laborantService.saveLaborant(laborant);
    }

    @PutMapping("/updateByHastaneKimlikNumarasi/{hastaneKimlikNumarasi}")
    public ResponseEntity<?> updateLaborant(@PathVariable int hastaneKimlikNumarasi, @RequestBody Laborant laborant) {
        Laborant existingLaborant = laborantService.getLaborantByHastaneKimlikNo(hastaneKimlikNumarasi);
        if (existingLaborant == null) {
            return ResponseEntity.status(HttpStatus.NOT_FOUND).body("Laborant bulunamadı");
        }
    
        Laborant updatedLaborant = laborantService.updateLaborantByHastaneKimlikNumarasi(hastaneKimlikNumarasi, laborant);
    
        if (updatedLaborant != null) {
            return ResponseEntity.ok().body(updatedLaborant);
        } else {
            return ResponseEntity.status(HttpStatus.INTERNAL_SERVER_ERROR).body("Laborant güncellenirken bir hata oluştu");
        }
    }
    

    @DeleteMapping("/{hastaneKimlikNumarasi}")
    public void deleteLaborant(@PathVariable int hastaneKimlikNumarasi) {
        laborantService.deleteLaborantWithHastaneKimlikNumarasi(hastaneKimlikNumarasi);
    }


}
