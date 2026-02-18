# SISTEM VALIDASI WAKTU & RULE CHECKLIST IBADAH

Dokumen ini mengatur:
- Batas waktu input ibadah
- Batas jumlah per hari
- Validasi hari tertentu
- Integrasi foto
- Anti exploit system

Semua waktu menggunakan WIB (default sistem).
Waktu dibuat dalam rentang ideal (bukan mengikuti jadwal harian dinamis).

---

# ISLAM

## 1. Sholat Wajib (5 Waktu)

Setiap waktu hanya bisa dicentang 1x per hari.
Tidak bisa dicentang jika sudah masuk waktu sholat berikutnya.

### Subuh
05.00 – 06.00

### Dzuhur
12.00 – 15.00

### Ashar
15.10 – 16.30

### Maghrib
18.00 – 19.00

### Isya
19.00 – 21.30

RULE:
- Jika waktu Ashar sudah masuk → Dzuhur otomatis terkunci.
- Jika waktu Isya sudah lewat → tidak bisa input Maghrib.
- Tidak bisa mengisi 2 waktu sekaligus di luar jamnya.

---

## 2. Sholat Sunnah

### Dhuha
06.15 – 10.00
Max 1x per hari

### Tahajud
03.00 – 04.45
Max 1x per hari

### Witir
19.30 – 23.59
Max 1x per hari
Hanya bisa dicentang jika Isya sudah dicentang

---

## 3. Puasa

### Puasa Senin-Kamis
Hanya bisa dicentang:
- Hari Senin
- Hari Kamis

Auto lock di hari lain

Max 1x per hari

---

### Puasa Daud
Bisa dicentang selang-seling
System menyimpan:
- Jika hari ini puasa → besok otomatis tidak bisa

Max 1x per hari
Tidak bisa digabung dengan Senin-Kamis

---

## 4. Baca Al-Qur'an
00.00 – 23.59
Max 1x input utama
Bonus halaman dihitung dalam satu sesi

---

## 5. Foto Masjid

- Hanya bisa upload jika checklist Sholat dicentang
- Max 1 foto per hari
- Hanya berlaku untuk 1 waktu sholat
- Wajib centang "Jamaah"
- +10 XP jika ACC Guru

## 6. Untuk perempuan yang haid (Islam):

Aktifkan toggle: “Sedang Haid”

Saat aktif:

- Sholat wajib otomatis nonaktif
- Sholat sunnah nonaktif
- Puasa nonaktif

Tidak dianggap bolos / tidak memutus streak

Bisa diganti dengan ibadah alternatif:

- Dzikir → 15 XP
- Doa → 20 XP
- Baca buku tafsir / kajian → 20 XP
- Sedekah / kebaikan → 25 XP

Penting :
- Tidak ada penalti
- Tidak bisa disalahgunakan (max 7 hari berturut-turut, misalnya)
- Wajib upload foto di setiap kegiatan (ACC Guru)

Untuk agama lain umumnya tidak ada kewajiban ritual yang gugur karena haid, jadi tidak perlu sistem khusus.

---

# ✝️ KRISTEN (PROTESTAN)

## 1. Doa Pagi
04.00 – 09.00
Max 1x

## 2. Doa Malam
18.00 – 23.59
Max 1x

## 3. Membaca Alkitab
00.00 – 23.59
Max 1x

## 4. Renungan
00.00 – 23.59
Max 1x

## 5. Ibadah Gereja
Hanya:
Hari Minggu
06.00 – 12.00

Max 1x per minggu

Jika upload foto gereja:
+10 XP (ACC Guru)

---

# ✝️ KATOLIK

## 1. Doa Pagi
04.00 – 09.00

## 2. Doa Malam
18.00 – 23.59

## 3. Membaca Kitab Suci
00.00 – 23.59

## 4. Rosario / Devosi
17.00 – 22.00

## 5. Misa
Hari Minggu:
06.00 – 12.00

Atau misa harian:
16.00 – 20.00

Max 1x per hari

Jika upload foto gereja:
+10 XP (ACC Guru)

---

# 🕉 HINDU

## Tri Sandhya

Pagi:
06.00 – 08.00

Siang:
12.00 – 13.30

Sore:
18.00 – 19.30

Masing-masing 1x

## Sembahyang di Pura
06.00 – 18.00
Max 1x per hari
+10 XP jika foto (ACC Guru)

---

# BUDDHA

## Puja Bakti Pagi
05.00 – 08.00

## Puja Bakti Malam
18.00 – 21.00

## Meditasi
00.00 – 23.59
Max 1x utama

## Puja di Vihara
Hari bebas
06.00 – 20.00
Max 1x per hari
+10 XP jika foto (ACC Guru)

---

# KONGHUCU

## Sembahyang Tian
06.00 – 09.00

## Penghormatan Leluhur
17.00 – 20.00

## Ibadah Bersama
Hari tertentu (event)
06.00 – 12.00

Foto tempat ibadah:
+10 XP (ACC Guru)
Max 1x per hari

---

# GLOBAL RULES

1. Max XP harian tetap mengikuti sistem balancing utama
2. Max 1 foto per hari per user
3. Foto harus sesuai aktivitas
4. Jika waktu lewat → checklist terkunci
5. Tidak bisa input aktivitas di masa lalu
6. Semua waktu mengikuti server time
7. ACC Guru diperlukan untuk validasi foto

---

# TUJUAN SISTEM

- Mencegah farming XP
- Melatih disiplin waktu
- Membiasakan ibadah tepat waktu
- Menjaga fairness antar agama
