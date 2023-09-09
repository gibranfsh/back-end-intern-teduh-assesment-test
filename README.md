
# Backend Developer Intern Assessment Test Answer! [Teduh Logo](https://static.wixstatic.com/media/a4c498_e220472ce37b4e1fb772c7ba6005377b~mv2.png/v1/fill/w_42,h_42,al_c,q_85,usm_0.66_1.00_0.01,enc_auto/logo.png)
#### by Gibran Fasha Ghazanfar

Selamat datang di repositori ini! Repositori ini berisikan implementasi dari soal-soal pada assessment test Backend Developer Intern di Teduh. Berikut ini adalah dokumentasi mengenai repositori ini.

## Deskripsi

Repositori ini mencakup hasil pembuatan fungsi encodeBaju dan juga hasil pembuatan MongoDB query untuk beberapa kasus yang diberikan.

## Daftar Isi

- [Soal 1: Sistem Pengodean Toko Baju](#soal-1-sistem-pengodean-toko-baju)
- [Soal 2: Menggunakan MongoDB Query untuk Beberapa Collections](#soal-2-menghitung-average-rating)

## Soal 1: Sistem Pengodean Toko Baju

Pada soal ini, saya mengimplementasikan sebuah sistem pengodean untuk menginformasikan batas harga jual dan harga jual ideal baju-baju di Toko Baju Teduh Karya. Fungsi ini saya implementasikan menggunakan bahasa pemrograman JavaScript (Node.js).

### Contoh Penggunaan Fungsi

Anda dapat menggunakan fungsi `encodeBaju` untuk menghitung hasil berdasarkan aturan encoding yang diberikan. Contoh penggunaan:

```javascript
console.log(encodeBaju("AT", "YH", 70000)); // ACCEPT, terima kasih sudah berbelanja
console.log(encodeBaju("ESH", "DTT", 150000)); // REJECT, belum balik modal nih! 
console.log(encodeBaju("DET", "DHT", 240000)); // GOOD, customer terbaik gak pake nawar
```

### Cara menjalankan encodeBaju.js

**Catatan 1 :** Pastikan Anda memiliki Node.js yang terinstal di sistem Anda sebelum melanjutkan.

**Catatan 2 :**
Untuk soal yang pertama, yaitu yang membuat fungsi encodeBaju, soal tersebut sepertinya
sangat rancu untuk nilai-nilai yang dimiliki oleh masing-masing abjad sehingga saya akan
berasumsi dan mengikuti aturan bahwasanya abjad-abjad pada string 'TEDUHASYIK' memiliki nilai secara berturut-turut 0, 1, 2, 3, 4, 5, 6, 7, 8, 9 sehingga abjad 'T' akan bernilai 0, abjad 'E' akan bernilai 1, abjad 'D' akan bernilai 2, abjad 'U' akan bernilai 3, abjad 'H' akan bernilai 4, dan seterusnya...

**Aturan Input Parameter :**
Batas harga jual HARUS KURANG DARI harga jual ideal dan harga yang ditawar
pelanggan TIDAK LEBIH DARI harga jual ideal. Batas harga jual dan harga jual ideal adalah string yang hanya terdiri dari huruf 'T', 'E', 'D', 'U', 'H', 'A', 'S', 'Y', 'I', 'K'.

#### Langkah 1: Clone Repositori

Clone repositori GitHub ini dengan perintah berikut:

```shell
git clone https://github.com/gibranfsh/back-end-intern-teduh-assesment-test.git
```

#### Langkah 2: Masuk ke Direktori Repositori

Masuk ke direktori repositori yang baru saja Anda klon dengan perintah:

```shell
cd back-end-intern-teduh-assesment-test
```

#### Langkah 3: Run fungsi `encodeBaju.js`

Fungsi encodeBaju.js sudah dapat dijalankan, Anda bisa mengatur batasHargaJual, hargaJualIdeal, dan hargaDitawarPelanggan sesuka hati Anda.

```shell
node encodeBaju.js
```

Dengan kode default, hasilnya akan tampak seperti ini

```shell
ACCEPT, terima kasih sudah berbelanja
REJECT, belum balik modal nih!       
GOOD, customer terbaik gak pake nawar
```

## Soal 2: Menggunakan MongoDB Query untuk Mendapatkan Respons yang Berisi Psikolog dengan Review-reviewnya beserta Average Rating untuk Masing-masing Psikolog

Pada soal ini, saya membuat sebuah query MongoDB untuk menghitung average rating dari beberapa psikolog beserta review-reviewnya. Saya sudah menguji coba data-data (documents) yang diberikan pada soal dengan mengujicobanya secara langsung dengan membuat database serta collection Psikolog dan Review beserta data-datanya (documents) pada MongoDB. Lalu, saya mencoba dan membuat query menggunakan MongoDB Compass pada MongoDB Shell-nya.

**Catatan :** Jika Anda ingin melihat hasil screenshot ketika saya menjalankan query ini pada MongoDB Shell, Anda bisa membuka file `hasilQueryMongoDB.pdf` yang sudah saya push ke dalam repositori ini, file tersebut terletak di dalam folder `Soal 2`.

Untuk query yang saya buat adalah sebagai berikut :

```shell
db.Psikolog.aggregate([
    {
        $lookup: {
            from: "Review",
            localField: "_id",
            foreignField: "psikolog_id",
            as: "reviews"
        }
    },
    {
        $unwind: "$reviews"
    },
    {
        $group: {
            _id: {
                psikolog_id: "$_id",
                name: "$name"
            },
            reviews: { $push: "$reviews" },
            avgRating: { $avg: "$reviews.rating" }
        }
    },
    {
        $project: {
            _id: 0,
            psikolog_id: "$_id.psikolog_id",
            name: "$_id.name",
            reviews: 1,
            average_rating: "$avgRating"
        }
    }
])
```

Jika, query tersebut dijalankan, outputnya adalah seperti ini, namun untuk atribut `_id`, mungkin berbeda dengan yang ada di soal karena ketika menginput data ke dalam database, atribut `_id` dibuatkan secara otomatis.

```shell
{
  reviews: [
    {
      _id: ObjectId("64fc387e8c4b2cc3ae1b5891"),
      psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba0"),
      rating: 4,
      message: 'Penjelasannya enak banget'
    },
    {
      _id: ObjectId("64fc387e8c4b2cc3ae1b5894"),
      psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba0"),
      rating: 5,
      message: 'Informatif dan edukatif'
    }
  ],
  psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba0"),
  name: 'Rafly Ario Bayu',
  average_rating: 4.5
},
{
  reviews: [
    {
      _id: ObjectId("64fc387e8c4b2cc3ae1b5892"),
      psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba1"),
      rating: 5,
      message: 'Ngena banget dan bikin pengen konsul lagi deh'
    },
    {
      _id: ObjectId("64fc387e8c4b2cc3ae1b5896"),
      psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba1"),
      rating: 3,
      message: 'Ada pertanyaan aku yg blm kejawab, but so far aku like kok'
    }
  ],
  psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba1"),
  name: 'Nur Dhifa Azzahra',
  average_rating: 4
},
{
  reviews: [
    {
      _id: ObjectId("64fc387e8c4b2cc3ae1b5892"),
      psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba1"),
      rating: 5,
      message: 'Ngena banget dan bikin pengen konsul lagi deh'
    },
    {
      _id: ObjectId("64fc387e8c4b2cc3ae1b5896"),
      psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba1"),
      rating: 3,
      message: 'Ada pertanyaan aku yg blm kejawab, but so far aku like kok'
    }
  ],
  psikolog_id: ObjectId("64f9f22a7842ff572c0e7ba1"),
  name: 'Nur Dhifa Azzahra',
  average_rating: 4
}
```

### Penjelasan Query MongoDB

#### 1. $lookup:

**Tujuan:** `$lookup` digunakan untuk menggabungkan dokumen dari dua collection yang berbeda, dalam hal ini "Psikolog" dan "Review", berdasarkan kondisi yang diberikan.

**Penggunaan di Sini:** Dalam query ini, `$lookup` digunakan untuk mencocokkan `psikolog_id` dalam collection "Psikolog" dengan `_id` dalam collection "Review" sehingga kita dapat menggabungkan review dengan psikolog yang bersangkutan.

#### 2. $unwind:

**Tujuan:** `$unwind` digunakan untuk mengurai array dokumen yang ada dalam suatu field sehingga kita dapat menjalankan operasi-operasi agregasi lebih lanjut pada setiap dokumen dalam array tersebut.

**Penggunaan di Sini:** Setelah operasi `lookup`, data review akan berada dalam array reviews. Kita menggunakan `$unwind` untuk memecah array ini menjadi dokumen-dokumen terpisah, yang akan memungkinkan kita untuk menghitung average rating pada tahap selanjutnya.

#### 3. $group:
**Tujuan:** `$group` digunakan untuk mengelompokkan dokumen berdasarkan kriteria tertentu dan melakukan operasi agregasi pada kelompok-kelompok tersebut.

**Penggunaan di Sini:** Kita mengelompokkan dokumen berdasarkan `psikolog_id` dan `name` untuk menciptakan kelompok yang berisi semua review dan nama psikolog yang bersangkutan. Selanjutnya, kita menghitung average rating (avgRating) dalam kelompok ini dengan `$avg`.

#### 4. $project:

**Tujuan:** `$project` digunakan untuk memilih kolom-kolom tertentu dalam dokumen, mengubah nama kolom, atau membuat kolom-kolom baru.

**Penggunaan di Sini:** Kita menggunakan `$project` untuk memformat hasil keluaran query agar sesuai dengan format yang diinginkan. Kita menghilangkan `_id` yang ada, mengubah nama field `_id.psikolog_id` menjadi `psikolog_id`, dan membuat field baru `average_rating` untuk menyimpan average rating.

## Penutup
Terima kasih telah mengunjungi repositori ini! Semoga hasil implementasi fungsi encodeBaju dan query MongoDB pada repositori ini dapat memberikan gambaran yang baik.

Jika Anda memiliki pertanyaan atau masukan lebih lanjut, jangan ragu untuk menghubungi saya. Semua feedback dan saran akan sangat saya hargai. Terima kasih!

**Gibran Fasha Ghazanfar**