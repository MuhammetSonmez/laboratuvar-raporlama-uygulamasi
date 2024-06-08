package com.example.hastaneSistemi.service;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hastaneSistemi.model.Laborant;
import com.example.hastaneSistemi.model.Rapor;
import com.example.hastaneSistemi.repository.LaborantRepository;
import com.example.hastaneSistemi.repository.RaporRepository;

import java.util.Collections;
import java.util.List;

@Service
public class RaporService {
    @Autowired
    private RaporRepository raporRepository;
    @Autowired
    private LaborantRepository laborantRepository;
    public boolean isHastaTcUnique(String hastaTc) {
        System.out.println(!raporRepository.existsByHastaTc(hastaTc));
        return !raporRepository.existsByHastaTc(hastaTc);
    }
    public List<Rapor> getAllRaporlar() {
        return raporRepository.findAll();
    }

    public Rapor getRaporById(Long id) {
        return raporRepository.findById(id).orElse(null);
    }

    public Rapor saveRapor(Rapor rapor) {
        return raporRepository.save(rapor);
    }

    public void deleteRapor(Long id) {
        raporRepository.deleteById(id);
    }

    public void deleteRaporWithDosyaNumarasi(String dosyaNumarasi){
        Rapor rapor = raporRepository.findByDosyaNumarasi(dosyaNumarasi);
        if (rapor != null){
            raporRepository.deleteById(rapor.getId());
        }
    }

    public List<Rapor> searchRapor(String hastaAdi, String hastaSoyadi, String hastaTc, String laborantAdi, String laborantSoyadi) {
        List<Laborant> laborantList = laborantRepository.findByAdiContainingAndSoyadiContaining(laborantAdi, laborantSoyadi);
        
        if (laborantList.isEmpty()) {
            return Collections.emptyList();
        }

        return raporRepository.findByHastaAdiContainingAndHastaSoyadiContaining(hastaAdi, hastaSoyadi);
    }
    public int getRaporCountByHastaneKimlikNo(int hastaneKimlikNo) {
        return raporRepository.countByHastaneKimlikNumarasi(hastaneKimlikNo);
    }
    
    @Transactional
    public Rapor updateRaporByDosyaNumarasi(String dosyaNumarasi, Rapor updatedRapor) {
        Rapor rapor = raporRepository.findByDosyaNumarasi(dosyaNumarasi);
        if (rapor != null) {
            rapor.setHastaAdi(updatedRapor.getHastaAdi());
            rapor.setHastaSoyadi(updatedRapor.getHastaSoyadi());
            rapor.setHastaTc(updatedRapor.getHastaTc());
            rapor.setHastaneKimlikNumarasi(updatedRapor.getHastaneKimlikNumarasi());
            rapor.setVerilmeTarihi(updatedRapor.getVerilmeTarihi());
            rapor.setFotografUrl(updatedRapor.getFotografUrl());
            return raporRepository.save(rapor);
        }
        return null;
    }
    

    public List<Rapor> sortByDate() {
        return raporRepository.findAllByOrderByVerilmeTarihiAsc();
    }
    public List<Rapor> sortByDateNewest(){
        return raporRepository.findAllByOrderByVerilmeTarihiDesc();
    }
    public Rapor getRaporByDosyaNumarasi(String dosyaNumarasi) {
        return raporRepository.findByDosyaNumarasi(dosyaNumarasi);
    }
    
    
}
