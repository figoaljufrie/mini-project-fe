import * as yup from 'yup';

// Validation schema untuk create event form
export const createEventValidationSchema = yup.object().shape({
  title: yup
    .string()
    .required('Judul event wajib diisi')
    .min(5, 'Judul event minimal 5 karakter')
    .max(100, 'Judul event maksimal 100 karakter'),

  category: yup
    .string()
    .required('Kategori event wajib dipilih')
    .oneOf([
      'Workshop', 'Conference', 'Seminar', 'Concert', 
      'Sports', 'Exhibition', 'Festival', 'Networking', 
      'Training', 'Other'
    ], 'Kategori event tidak valid'),

  location: yup
    .string()
    .required('Lokasi event wajib diisi')
    .min(3, 'Lokasi event minimal 3 karakter')
    .max(200, 'Lokasi event maksimal 200 karakter'),

  priceIdr: yup
    .string()
    .required('Harga tiket wajib diisi')
    .test('is-number', 'Harga harus berupa angka', (value) => {
      if (!value) return false;
      const num = Number(value);
      return !isNaN(num) && num >= 0;
    })
    .test('min-price', 'Harga minimal Rp 0', (value) => {
      if (!value) return false;
      const num = Number(value);
      return num >= 0;
    }),

  startsAt: yup
    .string()
    .required('Tanggal dan waktu mulai wajib diisi')
    .test('is-future', 'Tanggal mulai harus di masa depan', (value) => {
      if (!value) return false;
      const startDate = new Date(value);
      const now = new Date();
      return startDate > now;
    }),

  endsAt: yup
    .string()
    .required('Tanggal dan waktu selesai wajib diisi')
    .test('is-after-start', 'Tanggal selesai harus setelah tanggal mulai', function(value) {
      const { startsAt } = this.parent;
      if (!value || !startsAt) return false;
      const startDate = new Date(startsAt);
      const endDate = new Date(value);
      return endDate > startDate;
    }),

  quantity: yup
    .string()
    .required('Jumlah tiket wajib diisi')
    .test('is-number', 'Jumlah tiket harus berupa angka', (value) => {
      if (!value) return false;
      const num = Number(value);
      return !isNaN(num) && num > 0;
    })
    .test('min-quantity', 'Jumlah tiket minimal 1', (value) => {
      if (!value) return false;
      const num = Number(value);
      return num >= 1;
    })
    .test('max-quantity', 'Jumlah tiket maksimal 10000', (value) => {
      if (!value) return false;
      const num = Number(value);
      return num <= 10000;
    }),

  description: yup
    .string()
    .required('Deskripsi event wajib diisi')
    .min(20, 'Deskripsi event minimal 20 karakter')
    .max(1000, 'Deskripsi event maksimal 1000 karakter'),

  ticketTypes: yup
    .string()
    .required('Jenis tiket wajib diisi')
    .min(2, 'Jenis tiket minimal 2 karakter')
    .max(100, 'Jenis tiket maksimal 100 karakter')
    .test('valid-format', 'Format jenis tiket tidak valid (contoh: VIP,Regular)', (value) => {
      if (!value) return false;
      // Check if it contains valid characters and commas
      const validFormat = /^[A-Za-z0-9\s,]+$/.test(value);
      return validFormat;
    }),

  isFree: yup
    .boolean()
    .required('Status gratis/berbayar wajib dipilih')
});