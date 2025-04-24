/** @type {import('tailwindcss').Config} */
export default {
  content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
  theme: {
    extend: {
      colors: {
        primary: {
          50: '#EDEDFC',
          100: '#D0D0F7',
          200: '#A1A0EE',
          300: '#7371E5',
          400: '#4640DE', // Main primary color
          500: '#2D28B8',
          600: '#221E93',
          700: '#18156E',
          800: '#0F0D49',
          900: '#070624',
        },
        success: {
          50: '#E7F7EE',
          100: '#D0EFE0',
          200: '#A1DFC1',
          300: '#73D0A1',
          400: '#44C282',
          500: '#25A263',
          600: '#1C824F',
          700: '#14613B',
          800: '#0C4127',
          900: '#052014',
        },
        warning: {
          50: '#FEF5E7',
          100: '#FDEBD0',
          200: '#FAD7A0',
          300: '#F8C371',
          400: '#F6AF41',
          500: '#E08D0C',
          600: '#B37109',
          700: '#865507',
          800: '#593804',
          900: '#2C1C02',
        },
        neutral: {
          50: '#F9FAFB',
          100: '#F3F4F6',
          200: '#E5E7EB',
          300: '#D1D5DB',
          400: '#9CA3AF',
          500: '#6B7280',
          600: '#4B5563',
          700: '#374151',
          800: '#1F2937',
          900: '#111827',
        },
      },
      fontFamily: {
        sans: ['Inter', 'sans-serif'],
      },
      boxShadow: {
        'card': '0px 12px 24px -4px rgba(16, 24, 40, 0.08)',
      },
      borderRadius: {
        'card': '16px',
      },
    },
  },
  plugins: [],
};