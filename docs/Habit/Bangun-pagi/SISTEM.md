# Dokumentasi Sistem Kebiasaan: Bangun Pagi

Dokumen ini menjelaskan logika sistem poin, mekanisme anti-cheat, dan alur kerja untuk kebiasaan "Bangun Pagi" dalam aplikasi SI-HEBAT.

## 1. Jadwal & Alokasi Poin (XP & Koin)

Sistem memberikan penghargaan (reward) berupa XP (Experience Points) dan Koin berdasarkan waktu siswa melakukan *check-in* di pagi hari. Semakin awal siswa bangun, semakin besar poin yang didapatkan.

| Rentang Waktu (WIB) | Base XP | Koin | Status Visual |
| :--- | :---: | :---: | :--- |
| **03:00 - 05:00** | 50 | 50 | Tepat Waktu (Sangat Pagi) |
| **05:00 - 05:30** | 40 | 40 | Tepat Waktu |
| **05:30 - 06:00** | 30 | 30 | Tepat Waktu |
| **06:00 - 07:00** | 20 | 20 | Tepat Waktu (Batas Akhir) |
| **07:00 - 08:00** | 10 | 10 | Terlambat |
| **08:00 - 09:00** | 5 | 5 | Terlambat (Sangat Siang) |
| **> 09:00 / < 03:00** | 0 | 0 | Sesi Ditutup |

## 2. Sistem Bonus Aktivitas

Siswa dapat menambahkan hingga **3 rencana aktivitas** pagi untuk mendapatkan poin tambahan.

- **Reward**: setiap 1 aktivitas yang valid bernilai **+10 XP**.
- **Maksimal Bonus**: **+30 XP** (untuk 3 aktivitas).
- **Contoh**: Siswa bangun jam 04:30 (50 XP) dan menulis 3 aktivitas (+30 XP), maka total XP yang didapatkan adalah **80 XP**.

## 3. Mekanisme Anti-Cheat & Validasi

Untuk menjaga integritas data dan kejujuran siswa, sistem menerapkan beberapa lapisan keamanan:

1.  **Server-Side Time Validation**: Sistem tidak menggunakan waktu dari perangkat siswa (yang bisa dimanipulasi), melainkan menggunakan waktu nyata dari server (`Carbon::now()`).
2.  **Repetition Guard**: Siswa hanya diperbolehkan melakukan *check-in* sebanyak **1 kali per hari**. Jika mencoba menginput ulang, sistem akan menolak.
3.  **Status Pending**: Setiap inputan secara default berstatus **`pending`**. Poin tidak akan langsung ditambahkan ke profil utama siswa sampai divalidasi oleh Guru atau Admin (jika sistem approval diaktifkan).
4.  **Transaction Lock**: Menggunakan database transaction (`lockForUpdate`) untuk mencegah pengisian ganda yang terjadi secara bersamaan (race condition).

## 4. Alur Kerja Teknis

1.  **Frontend (`Bangun.jsx`)**:
    - Menampilkan jam digital real-time.
    - Menghitung estimasi poin secara dinamis untuk memberikan feedback visual ke siswa.
    - Mengirimkan daftar aktivitas ke backend.
2.  **Backend (`HabitWakeupController.php`)**:
    - Melakukan validasi waktu server.
    - Melakukan pengecekan duplikasi harian.
    - Menghitung poin akhir (Base + Bonus).
    - Menyimpan data ke tabel `habit_logs` dan `habit_log_details`.
3.  **Output**:
    - Memberikan respon berupa total XP & Koin yang didapatkan.
    - Menampilkan animasi selebrasi (Confetti) jika berhasil.

---
*Dokumen ini diperbarui secara berkala mengikuti perubahan logic pada source code.*
