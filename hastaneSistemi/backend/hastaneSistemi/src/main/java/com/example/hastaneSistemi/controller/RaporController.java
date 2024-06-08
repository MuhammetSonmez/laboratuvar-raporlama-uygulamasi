package com.example.hastaneSistemi.controller;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.ResponseEntity;
import org.springframework.web.bind.annotation.*;

import com.example.hastaneSistemi.model.Laborant;
import com.example.hastaneSistemi.model.Rapor;
import com.example.hastaneSistemi.service.LaborantService;
import com.example.hastaneSistemi.service.RaporService;
import org.springframework.http.HttpStatus;

import java.util.List;

@RestController
@RequestMapping("/api/raporlar")
public class RaporController {
    private int MAX_RAPOR_SAYISI = 5;

    @Autowired
    private RaporService raporService;

    @Autowired
    private LaborantService laborantService;

    @GetMapping
    public List<Rapor> getAllRaporlar() {
        return raporService.getAllRaporlar();
    }

    @GetMapping("/{id}")
    public Rapor getRaporById(@PathVariable Long id) {
        return raporService.getRaporById(id);
    }

    
    @PostMapping
    public ResponseEntity<Rapor> createRapor(@RequestBody Rapor rapor) {
        if (raporService.isHastaTcUnique(rapor.getHastaTc())) {
            int hastaneKimlikNumarasi = rapor.getHastaneKimlikNumarasi();
            int raporSayisi = raporService.getRaporCountByHastaneKimlikNo(hastaneKimlikNumarasi);
            Laborant laborant = laborantService.getLaborantByHastaneKimlikNo(hastaneKimlikNumarasi);
            
            if (laborant == null || raporSayisi >= MAX_RAPOR_SAYISI) {
                return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); 
            }
    
            Rapor createdRapor = raporService.saveRapor(rapor);
            return ResponseEntity.status(HttpStatus.CREATED).body(createdRapor);
        } else {
            return ResponseEntity.status(HttpStatus.BAD_REQUEST).body(null); 
        }
    }
    


    
    @PutMapping("/updateByDosyaNumarasi/{dosyaNumarasi}")
    public void updateRapor(@PathVariable String dosyaNumarasi, @RequestBody Rapor updatedRapor){
        raporService.updateRaporByDosyaNumarasi(dosyaNumarasi, updatedRapor);
    }        
    
    
    @DeleteMapping("/{dosyaNumarasi}")
    public void deleteRapor(@PathVariable String dosyaNumarasi) {
        raporService.deleteRaporWithDosyaNumarasi(dosyaNumarasi);
    }

    @GetMapping("/search")
    public List<Rapor> searchRapor(@RequestParam(required = false) String hastaAdi,
                                   @RequestParam(required = false) String hastaSoyadi,
                                   @RequestParam(required = false) String hastaTc,
                                   @RequestParam(required = false) String laborantAdi,
                                   @RequestParam(required = false) String laborantSoyadi) {
        return raporService.searchRapor(hastaAdi, hastaSoyadi, hastaTc, laborantAdi, laborantSoyadi);
    }
    

    @GetMapping("/sort")
    public List<Rapor> sortRaporByDate() {
        return raporService.sortByDate();
    }

    @GetMapping("/sortByDateNewest")
    public List<Rapor> sortByDateNewest(){
        return raporService.sortByDateNewest();
    }
}
