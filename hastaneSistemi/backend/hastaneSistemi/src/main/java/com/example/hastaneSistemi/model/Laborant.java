package com.example.hastaneSistemi.model;

import javax.persistence.*;

@Entity
@Table(name = "laborants")
public class Laborant {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "adi")
    private String adi;

    @Column(name = "soyadi")
    private String soyadi;

    @Column(name = "hastane_kimlik_numarasi", unique = true)
    private int hastaneKimlikNumarasi;

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getAdi() {
        return adi;
    }

    public void setAdi(String adi) {
        this.adi = adi;
    }

    public String getSoyadi() {
        return soyadi;
    }

    public void setSoyadi(String soyadi) {
        this.soyadi = soyadi;
    }

    public int getHastaneKimlikNumarasi() {
        return hastaneKimlikNumarasi;
    }

    public void setHastaneKimlikNumarasi(int hastaneKimlikNumarasi) {
        this.hastaneKimlikNumarasi = hastaneKimlikNumarasi;
    }

    
    @Override
    public String toString() {
        return "Laborant{" +
                "id=" + id +
                ", adi='" + adi + '\'' +
                ", soyadi='" + soyadi + '\'' +
                ", hastaneKimlikNumarasi='" + hastaneKimlikNumarasi + '\'' +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Laborant laborant = (Laborant) o;

        return id != null ? id.equals(laborant.id) : laborant.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
