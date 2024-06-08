# Laboratuvar Raporlama Uygulaması

Bu proje, hastane raporlama işlemlerini kolaylaştırmak için geliştirilmiş bir fullstack uygulamasıdır.

## Özellikler

- **React**, **Mantine**, **Redux Toolkit (RTK) Query** kullanarak geliştirilmiş zengin bir ön-yüz (front-end).
- Kapsamlı **birim testleri** içermesi.
- Kullanıcıların **kullanıcı adı/parola** ile giriş yapabilmesi.
- Güçlü bir **yetkilendirme mekanizması** içermesi.

## Backend Kurulumu

Backend, **Java 17** kullanılarak Java Spring Boot ile geliştirilmiştir ve JPA gibi paketler Maven ile yönetilmektedir.

### Gereksinimler

- Java 17
- Maven (En son sürüm önerilir)

### Kurulum Adımları

1. Projeyi klonlayın:

    ```bash
    git clone [proje_linki]
    ```

2. Maven bağımlılıklarını yükleyin:

    ```bash
    mvn install
    ```

3. Uygulamayı çalıştırın:

    ```bash
    mvn spring-boot:run
    ```

    Uygulama varsayılan olarak `8080` portunda çalışacaktır.

## Frontend Kurulumu

Frontend, React mantığına uygun olarak **Redux Toolkit Query** kullanılarak geliştirilmiştir.

### Gereksinimler

- Node.js **10.8.1**
- npm **10.8.1**

### Kurulum Adımları

1. Frontend klasörüne gidin:

    ```bash
    cd frontend
    ```

2. Bağımlılıkları yükleyin:

    ```bash
    npm install
    ```

3. Uygulamayı çalıştırın:

    ```bash
    npm start
    ```

    Uygulama varsayılan olarak `3000` portunda çalışacaktır.

## Kullanım

Uygulamayı başlattıktan sonra, tarayıcınızda `localhost:3000` adresine giderek uygulamayı kullanmaya başlayabilirsiniz.


## Not:
H2 veritabanı kullanılmıştır ve rapor oluşturmadan önce laborant oluşturunuz.
