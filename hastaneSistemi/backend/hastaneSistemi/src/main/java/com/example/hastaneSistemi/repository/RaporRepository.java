package com.example.hastaneSistemi.repository;

import org.springframework.data.jpa.repository.JpaRepository;

import com.example.hastaneSistemi.model.Rapor;
import java.util.List;


public interface RaporRepository extends JpaRepository<Rapor, Long> {
    List<Rapor> findByHastaAdiContainingAndHastaSoyadiContaining(String hastaAdi, String hastaSoyadi);
    List<Rapor> findByHastaTcContaining(String hastaTc);
    List<Rapor> findAllByOrderByVerilmeTarihiAsc();
    List<Rapor> findAllByOrderByVerilmeTarihiDesc();
    Rapor findByDosyaNumarasi(String dosyaNumarasi);
    int countByHastaneKimlikNumarasi(int hastaneKimlikNo);
    boolean existsByHastaTc(String hastaTc);
    

}

