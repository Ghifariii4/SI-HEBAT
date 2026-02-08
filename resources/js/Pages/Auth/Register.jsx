import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Register() {
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nama_lengkap: '',
    email: '',
    nis_anak: '',
    password: '',
    password_confirmation: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);

    // Simple validation
    const newErrors = {};
    if (!formData.nama_lengkap) newErrors.nama_lengkap = 'Nama lengkap wajib diisi';
    if (!formData.email) newErrors.email = 'Email wajib diisi';
    if (!formData.nis_anak) newErrors.nis_anak = 'NIS anak wajib diisi';
    if (!formData.password || formData.password.length < 8) newErrors.password = 'Password minimal 8 karakter';
    if (formData.password !== formData.password_confirmation) newErrors.password_confirmation = 'Password tidak sesuai';

    setErrors(newErrors);

    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    // TODO: Send to backend API
    // For now, just redirect to login
    setTimeout(() => {
      navigate('/login');
      setLoading(false);
    }, 1000);
  };

  const InputField = ({ label, type = 'text', placeholder, value, onChange, error }) => (
    <div className="space-y-2">
      <label className="text-sm font-semibold text-gray-700">{label}</label>
      <input
        type={type}
        placeholder={placeholder}
        value={value}
        onChange={onChange}
        className={`w-full px-4 py-3 rounded-xl border-2 focus:outline-none focus:ring-2 focus:ring-green-500 transition ${
          error ? 'border-red-500' : 'border-gray-300'
        }`}
      />
      {error && <p className="text-xs text-red-500">{error}</p>}
    </div>
  );

  return (
    <div className="min-h-screen relative flex items-center justify-center px-4 py-8">
      {/* Background */}
      <div
        className="absolute inset-0 bg-cover bg-center"
        style={{ backgroundImage: "url('/images/smkn8senja.png')" }}
      />
      <div className="absolute inset-0 bg-black/60 backdrop-blur-sm" />

      {/* Card */}
      <motion.div
        className="relative z-10 w-full max-w-md bg-white/95 backdrop-blur-xl rounded-3xl shadow-2xl p-8"
        initial={{ opacity: 0, scale: 0.9 }}
        animate={{ opacity: 1, scale: 1 }}
        transition={{ duration: 0.3 }}
      >
        {/* Header */}
        <div className="text-center mb-8">
          <h1 className="text-4xl font-extrabold bg-gradient-to-r from-green-600 to-emerald-600 bg-clip-text text-transparent">
            Si Hebat
          </h1>
          <p className="text-gray-600 text-sm mt-2">
            Daftar sebagai orangtua dan pantau anak
          </p>
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          <InputField
            label="Nama Lengkap"
            placeholder="Masukkan nama lengkap Anda"
            value={formData.nama_lengkap}
            onChange={(e) => setFormData({...formData, nama_lengkap: e.target.value})}
            error={errors.nama_lengkap}
          />

          <InputField
            label="Email Aktif"
            type="email"
            placeholder="email@contoh.com"
            value={formData.email}
            onChange={(e) => setFormData({...formData, email: e.target.value})}
            error={errors.email}
          />

          <InputField
            label="NIS Anak"
            placeholder="Masukkan NIS anak Anda"
            value={formData.nis_anak}
            onChange={(e) => setFormData({...formData, nis_anak: e.target.value})}
            error={errors.nis_anak}
          />

          <InputField
            label="Password"
            type="password"
            placeholder="Minimal 8 karakter"
            value={formData.password}
            onChange={(e) => setFormData({...formData, password: e.target.value})}
            error={errors.password}
          />

          <InputField
            label="Konfirmasi Password"
            type="password"
            placeholder="Ketik ulang password"
            value={formData.password_confirmation}
            onChange={(e) => setFormData({...formData, password_confirmation: e.target.value})}
            error={errors.password_confirmation}
          />

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Mendaftar...' : 'Buat Akun'}
          </motion.button>
        </form>

        {/* Login Link */}
        <p className="text-sm text-center text-gray-600 mt-6">
          Sudah punya akun?
          <Link href="/login" className="text-green-600 font-semibold ml-1 hover:underline">
            Masuk di sini
          </Link>
        </p>

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-gray-600 text-sm hover:text-green-600 transition">
            ← Kembali ke beranda
          </Link>
        </div>
      </motion.div>
    </div>
  );
}
