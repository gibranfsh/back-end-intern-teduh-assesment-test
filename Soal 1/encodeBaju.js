// Soal 1 Backend Assessment Test - Teduh
// By Gibran Fasha Ghazanfar


/*
    CATATAN :
    Untuk soal yang pertama, yaitu yang membuat fungsi encodeBaju, soal tersebut sepertinya
    sangat rancu untuk nilai-nilai yang dimiliki oleh masing-masing abjad sehingga saya akan
    berasumsi dan mengikuti aturan bahwasanya abjad-abjad pada string 'TEDUHASYIK' memiliki nilai secara berturut-turut
    0, 1, 2, 3, 4, 5, 6, 7, 8, 9 sehingga abjad 'T' akan bernilai 0, abjad 'E' akan bernilai 1,
    abjad 'D' akan bernilai 2, abjad 'U' akan bernilai 3, abjad 'H' akan bernilai 4, dan seterusnya...

    ASUMSI INPUTAN :
    Batas harga jual HARUS KURANG DARI harga jual ideal dan harga yang ditawar
    pelanggan TIDAK LEBIH DARI harga jual ideal.

    Batas harga jual dan harga jual ideal adalah string yang hanya terdiri
    dari huruf 'T', 'E', 'D', 'U', 'H', 'A', 'S', 'Y', 'I', 'K'.
*/

function encodeBaju(batasHargaJual, hargaJualIdeal, hargaDitawarPelanggan) {
    // Objek dengan key-value pair antara abjad dengan nilainya berdasarkan aturan encoding
    const kodeObj = {
        'T': 0, 'E': 1, 'D': 2, 'U': 3, 'H': 4,
        'A': 5, 'S': 6, 'Y': 7, 'I': 8, 'K': 9
    };

    // Menetapkan hasil encode batasHargaJual sebelum dikalikan dengan 1000
    let encodedBatasHargaJualPrefix = 0;
    for (const abjad of batasHargaJual) {
        encodedBatasHargaJualPrefix = encodedBatasHargaJualPrefix * 10 + kodeObj[abjad];
    }

    // Menetapkan hasil encode hargaJualIdeal sebelum dikalikan dengan 1000
    let encodedHargaJualIdealPrefix = 0;
    for (const abjad of hargaJualIdeal) {
        encodedHargaJualIdealPrefix = encodedHargaJualIdealPrefix * 10 + kodeObj[abjad];
    }

    // Mengalikan hasil encode batasHargaJual dan hargaJualIdeal dengan 1000
    const encodedBatasHargaJual = encodedBatasHargaJualPrefix * 1000;
    const encodedHargaJualIdeal = encodedHargaJualIdealPrefix * 1000;

    // Mengembalikan hasil pengondisian hargaDitawarPelanggan, return berupa string
    if (hargaDitawarPelanggan < encodedBatasHargaJual) {
        return "REJECT, belum balik modal nih!";
    } else if (hargaDitawarPelanggan >= encodedBatasHargaJual && hargaDitawarPelanggan < encodedHargaJualIdeal) {
        return "ACCEPT, terima kasih sudah berbelanja";
    } else { // Asumsi hanya ada kemungkinan hargaDitawarPelanggan == encodedHargaJualIdeal
        return "GOOD, customer terbaik gak pake nawar"
    }
};

// Contoh penggunaan fungsi encodeBaju
console.log(encodeBaju("AT", "YH", 70000)); // ACCEPT, terima kasih sudah berbelanja
console.log(encodeBaju("ESH", "DTT", 150000)); // REJECT, belum balik modal nih! 
console.log(encodeBaju("DET", "DHT", 240000)); // GOOD, customer terbaik gak pake nawar