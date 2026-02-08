import defaultTheme from 'tailwindcss/defaultTheme';
import forms from '@tailwindcss/forms';

/** @type {import('tailwindcss').Config} */
export default {
    content: [
        './vendor/laravel/framework/src/Illuminate/Pagination/resources/views/*.blade.php',
        './storage/framework/views/*.php',
        './resources/views/**/*.blade.php',
        './resources/js/**/*.jsx',
    ],
    darkMode: 'class',
    theme: {
        extend: {
            fontFamily: {
                sans: ['Inter', ...defaultTheme.fontFamily.sans],
            },
            animation: {
                'float': 'float 3s ease-in-out infinite',
                'float-slow': 'floatSlow 8s ease-in-out infinite',
                'glow': 'glow 4s ease-in-out infinite',
            },
            keyframes: {
                float: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(-20px)' },
                },
                floatSlow: {
                    '0%, 100%': { transform: 'translateY(0px)' },
                    '50%': { transform: 'translateY(30px)' },
                },
                glow: {
                    '0%, 100%': { transform: 'scale(1)' },
                    '50%': { transform: 'scale(1.1)' },
                },
            },
            colors: {
                primary: {
                    50: '#f0fdf4',
                    100: '#dcfce7',
                    200: '#bbf7d0',
                    300: '#86efac',
                    400: '#4ade80',
                    500: '#22c55e',
                    600: '#16a34a',
                    700: '#15803d',
                    800: '#166534',
                    900: '#145231',
                    950: '#0c2818',
                },
            },
            boxShadow: {
                'soft': '0 4px 6px rgba(0, 0, 0, 0.07)',
                'soft-lg': '0 10px 15px rgba(0, 0, 0, 0.1)',
                'soft-xl': '0 20px 25px rgba(0, 0, 0, 0.1)',
            },
        },
    },
    plugins: [forms],
};
