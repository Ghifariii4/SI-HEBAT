import React from 'react';
import { Heart, Instagram, Mail, Phone, ExternalLink } from 'lucide-react';

const FooterSection = () => {
  const currentYear = new Date().getFullYear();

  return (
    <footer className="bg-zinc-900 text-zinc-400 pt-16 pb-8 border-t border-zinc-800">
      <div className="max-w-7xl mx-auto px-6 grid grid-cols-1 md:grid-cols-4 gap-12 mb-12">
        <div className="space-y-4">
          <h3 className="text-white font-bold text-xl flex items-center gap-2">
            <span className="w-8 h-8 bg-green-500 rounded-lg flex items-center justify-center text-zinc-900">S</span>
            SI-HEBAT
          </h3>
          <p className="text-sm leading-relaxed max-w-xs">
            Platform pembentukan karakter siswa SMKN 8 Jakarta untuk menciptakan generasi muda yang berintegritas dan kompeten.
          </p>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg">Tautan</h4>
          <ul className="space-y-2 text-sm">
            <li><a href="#" className="hover:text-green-500 transition-colors">Tentang Kami</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Visi Misi</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Galeri Kegiatan</a></li>
            <li><a href="#" className="hover:text-green-500 transition-colors">Hubungi Kami</a></li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg">Kontak</h4>
          <ul className="space-y-3 text-sm">
            <li className="flex items-center gap-3">
              <Phone className="w-4 h-4 text-green-500" />
              <span>(021) 7996383</span>
            </li>
            <li className="flex items-center gap-3">
              <Mail className="w-4 h-4 text-green-500" />
              <span>info@smkn8jakarta.sch.id</span>
            </li>
            <li className="flex items-center gap-3">
              <Instagram className="w-4 h-4 text-green-500" />
              <span>@smkn8jakarta</span>
            </li>
          </ul>
        </div>

        <div className="space-y-4">
          <h4 className="text-white font-bold text-lg">Lokasi</h4>
          <p className="text-sm leading-relaxed">
            Jl. Pejaten Raya, RT.7/RW.6,
            Pejaten Barat, Ps. Minggu,
            Kota Jakarta Selatan,
            DKI Jakarta 12510
          </p>
          <a
            href="https://maps.google.com/?q=SMKN+8+Jakarta"
            target="_blank"
            rel="noopener noreferrer"
            className="inline-flex items-center gap-2 text-green-500 hover:text-green-400 text-sm font-semibold mt-2 group"
          >
            Lihat di Peta
            <ExternalLink className="w-4 h-4 group-hover:translate-x-1 transition-transform" />
          </a>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-6 pt-8 border-t border-zinc-800 text-center text-sm flex flex-col md:flex-row justify-between items-center gap-4">
        <p>&copy; {currentYear} SMKN 8 Jakarta. All rights reserved.</p>
        <p className="flex items-center gap-1 opacity-75">
          Dibuat dengan <Heart className="w-4 h-4 text-red-500 fill-red-500" /> untuk Indonesia
        </p>
      </div>
    </footer>
  );
};

export default FooterSection;
