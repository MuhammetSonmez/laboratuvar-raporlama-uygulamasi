package com.example.hastaneSistemi.repository;
import org.springframework.data.jpa.repository.JpaRepository;
import com.example.hastaneSistemi.model.Laborant;
import java.util.List;


public interface LaborantRepository extends JpaRepository<Laborant, Long> {
    List<Laborant> findByAdiContainingAndSoyadiContaining(String adi, String soyadi);
    Laborant findByHastaneKimlikNumarasi(int hastaneKimlikNo);
    void deleteByHastaneKimlikNumarasi(int hastaneKimlikNumarasi);

}