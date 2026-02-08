<<<<<<< HEAD
import { useState } from 'react';
import { useNavigate, Link } from 'react-router-dom';
import { motion } from 'framer-motion';

export default function Login() {
  const navigate = useNavigate();
  const [role, setRole] = useState('siswa');
  const [guruType, setGuruType] = useState('pns');
  const [loading, setLoading] = useState(false);
  const [formData, setFormData] = useState({
    nis: '',
    nip: '',
    nama_lengkap: '',
    email: '',
    password: '',
  });
  const [errors, setErrors] = useState({});

  const handleSubmit = async (e) => {
    e.preventDefault();
    setLoading(true);
    
    // Simple validation
    const newErrors = {};
    if (!formData.password) newErrors.password = 'Password wajib diisi';
    
    if (role === 'siswa' && !formData.nis) newErrors.nis = 'NIS wajib diisi';
    if (role === 'guru' && guruType === 'pns' && !formData.nip) newErrors.nip = 'NIP wajib diisi';
    if (role === 'guru' && guruType === 'honorer' && !formData.nama_lengkap) newErrors.nama_lengkap = 'Nama lengkap wajib diisi';
    if (role === 'orangtua' && !formData.email) newErrors.email = 'Email wajib diisi';
    
    setErrors(newErrors);
    
    if (Object.keys(newErrors).length > 0) {
      setLoading(false);
      return;
    }

    // TODO: Send to backend API
    // For now, just navigate to dashboard
    setTimeout(() => {
      navigate('/'); // Placeholder - akan diganti dengan dashboard route
      setLoading(false);
    }, 1000);
  };

  const handleRoleChange = (newRole) => {
    setRole(newRole);
    setData('role', newRole);
  };

  const RoleButton = ({ value, label }) => (
    <motion.button
      type="button"
      onClick={() => handleRoleChange(value)}
      className={`py-3 px-4 rounded-xl font-semibold transition-all duration-300 ${
        role === value
          ? 'bg-green-600 text-white shadow-lg'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );

  const ToggleButton = ({ active, onClick, label }) => (
    <motion.button
      type="button"
      onClick={onClick}
      className={`flex-1 py-2 px-3 rounded-xl font-semibold transition-all duration-300 ${
        active
          ? 'bg-yellow-400 text-black shadow-md'
          : 'bg-gray-200 text-gray-700 hover:bg-gray-300'
      }`}
      whileHover={{ scale: 1.05 }}
      whileTap={{ scale: 0.95 }}
    >
      {label}
    </motion.button>
  );

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
            Masuk dan mulai jadi anak Indonesia hebat
          </p>
        </div>

        {/* Role Selector */}
        <div className="grid grid-cols-3 gap-2 mb-8">
          <RoleButton value="siswa" label="Siswa" />
          <RoleButton value="guru" label="Guru" />
          <RoleButton value="orangtua" label="Orangtua" />
        </div>

        {/* Form */}
        <form onSubmit={handleSubmit} className="space-y-5">
          {/* SISWA */}
          {role === 'siswa' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <InputField
                label="NIS (Nomor Induk Siswa)"
                placeholder="Masukkan NIS Anda"
                value={formData.nis}
                onChange={(e) => setFormData({...formData, nis: e.target.value})}
                error={errors.nis}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
              />
            </motion.div>
          )}

          {/* GURU */}
          {role === 'guru' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              {/* Toggle PNS / Honorer */}
              <div className="flex gap-2">
                <ToggleButton
                  active={guruType === 'pns'}
                  onClick={() => setGuruType('pns')}
                  label="PNS"
                />
                <ToggleButton
                  active={guruType === 'honorer'}
                  onClick={() => setGuruType('honorer')}
                  label="Honorer"
                />
              </div>

              {guruType === 'pns' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <InputField
                    label="NIP"
                    placeholder="Masukkan NIP Anda"
                    value={formData.nip}
                    onChange={(e) => setFormData({...formData, nip: e.target.value})}
                    error={errors.nip}
                  />
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    error={errors.password}
                  />
                </motion.div>
              )}

              {guruType === 'honorer' && (
                <motion.div
                  initial={{ opacity: 0 }}
                  animate={{ opacity: 1 }}
                  transition={{ duration: 0.2 }}
                  className="space-y-5"
                >
                  <InputField
                    label="Nama Lengkap"
                    placeholder="Masukkan nama lengkap"
                    value={formData.nama_lengkap}
                    onChange={(e) => setFormData({...formData, nama_lengkap: e.target.value})}
                    error={errors.nama_lengkap}
                  />
                  <InputField
                    label="Password"
                    type="password"
                    placeholder="Masukkan password"
                    value={formData.password}
                    onChange={(e) => setFormData({...formData, password: e.target.value})}
                    error={errors.password}
                  />
                </motion.div>
              )}
            </motion.div>
          )}

          {/* ORANGTUA */}
          {role === 'orangtua' && (
            <motion.div
              initial={{ opacity: 0, y: 10 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ duration: 0.2 }}
              className="space-y-5"
            >
              <InputField
                label="Email Terdaftar"
                type="email"
                placeholder="email@contoh.com"
                value={formData.email}
                onChange={(e) => setFormData({...formData, email: e.target.value})}
                error={errors.email}
              />
              <InputField
                label="Password"
                type="password"
                placeholder="Masukkan password"
                value={formData.password}
                onChange={(e) => setFormData({...formData, password: e.target.value})}
                error={errors.password}
              />
            </motion.div>
          )}

          {/* Submit Button */}
          <motion.button
            type="submit"
            disabled={loading}
            className="w-full bg-gradient-to-r from-green-600 to-emerald-600 hover:from-green-700 hover:to-emerald-700 text-white py-3 px-4 rounded-xl font-bold transition-all duration-300 shadow-lg hover:shadow-xl disabled:opacity-50"
            whileHover={{ scale: 1.02 }}
            whileTap={{ scale: 0.98 }}
          >
            {loading ? 'Memproses...' : 'Masuk'}
          </motion.button>
        </form>

        {/* Register Link - Hanya untuk Orangtua */}
        {role === 'orangtua' && (
          <motion.p
            className="text-sm text-center text-gray-600 mt-6"
            initial={{ opacity: 0 }}
            animate={{ opacity: 1 }}
            transition={{ duration: 0.3 }}
          >
            Belum punya akun?
            <Link href="/register" className="text-green-600 font-semibold ml-1 hover:underline">
              Daftar sekarang
            </Link>
          </motion.p>
        )}

        {/* Back to Home */}
        <div className="text-center mt-4">
          <Link href="/" className="text-gray-600 text-sm hover:text-green-600 transition">
            ← Kembali ke beranda
          </Link>
        </div>
      </motion.div>
    </div>
  );
=======
import Checkbox from '@/Components/Checkbox';
import InputError from '@/Components/InputError';
import InputLabel from '@/Components/InputLabel';
import PrimaryButton from '@/Components/PrimaryButton';
import TextInput from '@/Components/TextInput';
import GuestLayout from '@/Layouts/GuestLayout';
import { Head, Link, useForm } from '@inertiajs/react';

export default function Login({ status, canResetPassword }) {
    const { data, setData, post, processing, errors, reset } = useForm({
        email: '',
        password: '',
        remember: false,
    });

    const submit = (e) => {
        e.preventDefault();

        post(route('login'), {
            onFinish: () => reset('password'),
        });
    };

    return (
        <GuestLayout>
            <Head title="Log in" />

            {status && (
                <div className="mb-4 text-sm font-medium text-green-600">
                    {status}
                </div>
            )}

            <form onSubmit={submit}>
                <div>
                    <InputLabel htmlFor="email" value="Email" />

                    <TextInput
                        id="email"
                        type="email"
                        name="email"
                        value={data.email}
                        className="mt-1 block w-full"
                        autoComplete="username"
                        isFocused={true}
                        onChange={(e) => setData('email', e.target.value)}
                    />

                    <InputError message={errors.email} className="mt-2" />
                </div>

                <div className="mt-4">
                    <InputLabel htmlFor="password" value="Password" />

                    <TextInput
                        id="password"
                        type="password"
                        name="password"
                        value={data.password}
                        className="mt-1 block w-full"
                        autoComplete="current-password"
                        onChange={(e) => setData('password', e.target.value)}
                    />

                    <InputError message={errors.password} className="mt-2" />
                </div>

                <div className="mt-4 block">
                    <label className="flex items-center">
                        <Checkbox
                            name="remember"
                            checked={data.remember}
                            onChange={(e) =>
                                setData('remember', e.target.checked)
                            }
                        />
                        <span className="ms-2 text-sm text-gray-600">
                            Remember me
                        </span>
                    </label>
                </div>

                <div className="mt-4 flex items-center justify-end">
                    {canResetPassword && (
                        <Link
                            href={route('password.request')}
                            className="rounded-md text-sm text-gray-600 underline hover:text-gray-900 focus:outline-none focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2"
                        >
                            Forgot your password?
                        </Link>
                    )}

                    <PrimaryButton className="ms-4" disabled={processing}>
                        Log in
                    </PrimaryButton>
                </div>
            </form>
        </GuestLayout>
    );
>>>>>>> 24cc638 (Initial setup: Laravel Sail, React, Inertia, and Shadcn UI)
}
