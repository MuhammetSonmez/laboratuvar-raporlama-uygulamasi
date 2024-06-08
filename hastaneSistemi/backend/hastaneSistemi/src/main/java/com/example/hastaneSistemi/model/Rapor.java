package com.example.hastaneSistemi.model;

import javax.persistence.*;
import java.util.Date;

@Entity
@Table(name = "raporlar")
public class Rapor {

    @Id
    @GeneratedValue(strategy = GenerationType.IDENTITY)
    private Long id;

    @Column(name = "dosya_numarasi", unique = true)
    private String dosyaNumarasi;

    @Column(name = "hasta_adi")
    private String hastaAdi;

    @Column(name = "hasta_soyadi")
    private String hastaSoyadi;

    @Column(name = "hasta_tc")
    private String hastaTc;

    @Column(name = "tani_basligi")
    private String taniBasligi;

    @Column(name = "tani_detaylari")
    private String taniDetaylari;

    @Column(name = "verilme_tarihi")
    private Date verilmeTarihi;

    @Lob
    @Column(name = "fotograf_url")
    private byte[] fotografUrl;


    @Column(name = "hastaneKimlikNumarasi")
    private int hastaneKimlikNumarasi;


    public int getHastaneKimlikNumarasi() {
        return hastaneKimlikNumarasi;
    }

    public void setHastaneKimlikNumarasi(int hastaneKimlikNumarasi) {
        this.hastaneKimlikNumarasi = hastaneKimlikNumarasi;
    }

    public Long getId() {
        return id;
    }

    public void setId(Long id) {
        this.id = id;
    }

    public String getDosyaNumarasi() {
        return dosyaNumarasi;
    }

    public void setDosyaNumarasi(String dosyaNumarasi) {
        this.dosyaNumarasi = dosyaNumarasi;
    }

    public String getHastaAdi() {
        return hastaAdi;
    }

    public void setHastaAdi(String hastaAdi) {
        this.hastaAdi = hastaAdi;
    }

    public String getHastaSoyadi() {
        return hastaSoyadi;
    }

    public void setHastaSoyadi(String hastaSoyadi) {
        this.hastaSoyadi = hastaSoyadi;
    }

    public String getHastaTc() {
        return hastaTc;
    }

    public void setHastaTc(String hastaTc) {
        this.hastaTc = hastaTc;
    }

    public String getTaniBasligi() {
        return taniBasligi;
    }

    public void setTaniBasligi(String taniBasligi) {
        this.taniBasligi = taniBasligi;
    }

    public String getTaniDetaylari() {
        return taniDetaylari;
    }

    public void setTaniDetaylari(String taniDetaylari) {
        this.taniDetaylari = taniDetaylari;
    }

    public Date getVerilmeTarihi() {
        return verilmeTarihi;
    }

    public void setVerilmeTarihi(Date verilmeTarihi) {
        this.verilmeTarihi = verilmeTarihi;
    }

    public byte[] getFotografUrl() {
        return fotografUrl;
    }

    public void setFotografUrl(byte[] fotografUrl) {
        this.fotografUrl = fotografUrl;
    }


    @Override
    public String toString() {
        return "Rapor{" +
                "id=" + id +
                ", dosyaNumarasi='" + dosyaNumarasi + '\'' +
                ", hastaAdi='" + hastaAdi + '\'' +
                ", hastaSoyadi='" + hastaSoyadi + '\'' +
                ", hastaTc='" + hastaTc + '\'' +
                ", tanıBasligi='" + taniBasligi + '\'' +
                ", tanıDetayları='" + taniDetaylari + '\'' +
                ", verilmeTarihi=" + verilmeTarihi +
                ", fotografUrl='" + fotografUrl + '\'' +
                ", laborant=" + hastaneKimlikNumarasi +
                '}';
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;

        Rapor rapor = (Rapor) o;

        return id != null ? id.equals(rapor.id) : rapor.id == null;
    }

    @Override
    public int hashCode() {
        return id != null ? id.hashCode() : 0;
    }
}
