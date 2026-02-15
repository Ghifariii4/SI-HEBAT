# WORKFLOW SISTEM
## TUNAS HEBAT – Jurnal 7 Kebiasaan Anak Indonesia Hebat

---

# 1. OVERVIEW SISTEM

Tunas Hebat adalah platform jurnal harian berbasis web yang menggabungkan:
- Pemantauan karakter siswa
- Gamifikasi (XP, Koin, Rank, Level)
- Sistem pengawasan kolaboratif (Siswa, Guru, Orang Tua)

Sistem berjalan dalam siklus harian dan siklus semester (180 hari).

---

# 2. ROLE & AUTENTIKASI

## 2.1 Siswa (Hero)

Login:
- Menggunakan NIS + Password

Alur:
1. Login
2. Masuk Dashboard
3. Melakukan check-in 7 habit
4. Upload bukti (jika diperlukan)
5. Sistem menghitung XP, Koin, Bintang
6. Progres tersimpan

Profil wajib:
- Nama lengkap
- Agama
- Guru Wali
- Orang Tua
- Ketua RT

---

## 2.2 Guru Wali (Supervisor)

Login:
- NIP (PNS) / Nama Lengkap (Honorer)

Alur:
1. Login
2. Melihat daftar siswa kelas
3. Memeriksa foto bukti
4. ACC / Tolak bonus poin
5. Kirim pesan via Mailbox

Wajib upload:
- Tanda tangan digital

---

## 2.3 Orang Tua (Mentor)

Register:
- Input NIS anak
- Sistem otomatis terhubung

Alur:
1. Login
2. Pantau progres anak
3. Tanda tangan laporan bulanan

---

# 3. WORKFLOW HARIAN SISWA

## 3.1 Bangun Pagi

Waktu valid: 02:00 – 09:00  
Tepat waktu:
- Weekday ≤ 07:00
- Weekend ≤ 06:00

Logic:
- Tepat waktu → +50 XP +50 Koin
- Telat → +25 XP
- Lewat 09:00 → 0 XP
- Aktivitas tambahan → +10 XP per aksi

---

## 3.2 Beribadah

Islam:
- 5 waktu @10 XP
- Bonus berjamaah +5 XP
- Sunnah +25 XP
- Puasa sunnah +100 XP

Agama lain:
- 3 waktu @25 XP

Bonus foto:
- +10 XP (menunggu ACC Guru)

---

## 3.3 Olahraga

Input:
- Jenis olahraga
- Durasi (5–120 menit)

Logic:
- Check-in → +20 XP
- +5 XP tiap 5 menit
- Maksimal 120 menit
- Bonus foto → +20 XP +20 Koin (ACC Guru)

---

## 3.4 Makan Sehat

Checklist:
- Karbo
- Lauk
- Sayur
- Buah

Logic:
- Lengkap → +25 XP
- Air minum → +5 XP per gelas (maks 8)
- Bonus foto → +10 XP

---

## 3.5 Gemar Belajar

Logic:
- Check-in → +20 XP
- Deskripsi → +15 XP
- Focus Mode (25 menit) → +10 XP
- Bonus foto → +15 XP

Teknologi:
- OCR untuk catatan
- Flashcard system

---

## 3.6 Sosial

Bersih lingkungan:
- +50 XP
- Wajib foto

Bersosialisasi:
- +50 XP
- Wajib deskripsi

---

## 3.7 Tidur Cepat

Target:
19:00 – 22:00

Logic:
- Tepat → +50 XP
- Lewat 22:00 → -1 XP tiap 6 menit
- Jika alasan tugas + bukti → XP normal
- Foto + deskripsi → +70 XP

---

# 4. SISTEM GAMIFIKASI

## 4.1 Mata Uang

- XP → naik level (1–100)
- Koin → beli item di Shop
- Bintang → Rank semester (maks 7/hari)
- Streak → multiplier konsistensi

---

## 4.2 Leveling System

Level 1–10 → 500 XP per level  
Level 11–30 → 1.000 XP  
Level 31–60 → 2.500 XP  
Level 61–100 → 5.000 XP  

---

## 4.3 Rank Semester (180 Hari)

Tier:
1. Tunas Pemula
2. Perintis Muda
3. Bintang Kelas
4. Siswa Teladan
5. Cendekiawan
6. Generasi Emas (800+ Bintang)

Reset:
- Rank turun proporsional tiap semester
- Tidak kembali ke nol

---

# 5. SISTEM VALIDASI

## 5.1 ACC Guru

Flow:
1. Siswa upload foto
2. XP dasar langsung masuk
3. Bonus foto tertahan
4. Guru ACC
5. Bonus dilepas

---

## 5.2 Laporan Bulanan

Generate otomatis setiap akhir bulan.

Berisi:
- Total XP
- Total Bintang
- Level
- Rank
- Grafik konsistensi

Tanda tangan:
- Guru Wali
- Orang Tua
- Ketua RT

---

# 6. SISTEM STREAK

Visualisasi api:
- 1–3 hari → Percikan
- 4–7 hari → Menyala
- 8–30 hari → Membara
- 31–100 hari → Api Biru
- 101–180 hari → Api Ungu

---

# 7. FLOW GLOBAL SISTEM

User Login
→ Check-in Habit
→ Sistem Hitung XP/Koin/Bintang
→ Simpan Log Harian
→ Jika ada Foto → Pending ACC
→ Update Level
→ Update Rank
→ Update Streak
→ Notifikasi ke Dashboard

---

# 8. SIKLUS SEMESTER

Hari ke-180:
- Hitung total Bintang
- Tentukan Rank akhir
- Turunkan Rank proporsional
- Reset Bintang
- XP & Level tetap

---

END OF WORKFLOW
