package com.example.hastaneSistemi.service;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;
import org.springframework.transaction.annotation.Transactional;

import com.example.hastaneSistemi.model.Laborant;
import com.example.hastaneSistemi.repository.LaborantRepository;

import java.util.List;

@Service
public class LaborantService {

    @Autowired
    private LaborantRepository laborantRepository;

    public List<Laborant> getAllLaborants() {
        return laborantRepository.findAll();
    }
    public Laborant getLaborantByHastaneKimlikNumarasi(int hastaneKimlikNumarasi) {
        return laborantRepository.findByHastaneKimlikNumarasi(hastaneKimlikNumarasi);
    }

    public Laborant getLaborantById(Long id) {
        return laborantRepository.findById(id).orElse(null);
    }

    public Laborant saveLaborant(Laborant laborant) {
        return laborantRepository.save(laborant);
    }

    public void deleteLaborant(Long id) {
        laborantRepository.deleteById(id);
    }

    @Transactional
    public void deleteLaborantWithHastaneKimlikNumarasi(int hastaneKimlikNumarasi) {
        laborantRepository.deleteByHastaneKimlikNumarasi(hastaneKimlikNumarasi);
    }

    
    @Transactional
    public Laborant updateLaborantByHastaneKimlikNumarasi(int hastaneKimlikNumarasi, Laborant updatedLaborant) {
        Laborant laborant = laborantRepository.findByHastaneKimlikNumarasi(hastaneKimlikNumarasi);
        if (laborant != null) {
            laborant.setAdi(updatedLaborant.getAdi());
            laborant.setSoyadi(updatedLaborant.getSoyadi());
            return laborantRepository.save(laborant);
        }
        return null;
    }


    public Laborant getLaborantByHastaneKimlikNo(int hastaneKimlikNo) {
        return laborantRepository.findByHastaneKimlikNumarasi(hastaneKimlikNo);
    }



}
