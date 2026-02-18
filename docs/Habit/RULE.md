# Sistem Checklist Kebiasaan (Habit Tracking)

Ini adalah aturan untuk sistem checklist kebiasaan (habit tracking) yang akan diimplementasikan di aplikasi SI HEBAT.

## Kebiasaan yang di disable ketika sudah selesai melakukannya atau ketika sudah melewati waktu yang ditentukan :
- Bangun tidur (wajib di disable pada halaman dashboard ketika sudah selesai mengisi atau jika diatas jam 9 pagi)
- Tidur cepat (wajib di disable pada halaman dashboard ketika sudah selesai mengisi atau jika diatas jam 3 pagi)
- Menu agama (seperti sholat, dll) (wajib di disable pada halaman dashboard ketika sudah selesai mengisi atau jika sudah melewati waktu yang ditentukan)

## Ketika sistem sudah selesai menginput data kebiasaan user ke database :
- Jalankan program untuk menghitung kembali total XP dan Koin yang didapat oleh user dengan status approved atau hitung base coin dan xp nya saja
- Jalankan program untuk mengecek apakah user sudah mencapai level tertentu
- Berikan notif atau popup tentang xp dan koin yang didapat serta tampilkan animasi yang ada di folder public/Success-Animation/MedalSuccess.json baru bawahnya xp dan koin yang didapat, dan aberi tombol close atau oke yang minimalis

## Upload Foto
- Setiap agama ada upload foto (+10XP) (ACC Guru)
- Ketika user menginput kebiasaan foto akan terkirim ke database dengan status pending
- Guru akan mengecek foto dan mengubah status menjadi approved atau rejected
- Jika approved maka user akan mendapatkan +bonus xp atau koin yang di tentukan
- Jika rejected maka user tidak akan mendapatkan +bonus xp atau koin yang di tentukan
- Saat user menginput kebiasaan jika ada foto, foto tersebut akan discan dan diambi exif metadata, yaitu : created, modified, & location

# Daftar kebiasaan yang ada foto 
- Ibadah : Islam (Foto Masjid, Foto Baca Al-Qur'an)
- Ibadah : Kristen (Foto Gereja)
- Ibadah : Katolik (Foto Gereja)
- Ibadah : Lainnya (Foto Saat Sedang Melakukan Ibadah)
- Olahraga (Foto bukti bahwa memang sedang berolahraga)
- Belajar (Foto bukti bahwa memang sedang belajar)
- Makan : terkhusus jika mengisi makanan yang dimakaan -> tidak wajib
- Bermasyarakat : sangat wajib jika ada kegiatan
