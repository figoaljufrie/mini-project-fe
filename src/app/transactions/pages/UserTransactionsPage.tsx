import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createTransactionValidationSchema } from '@/app/transactions/validation/transaction.validation';
import { useCreateTransaction } from '@/app/transactions/components/CreateTransactionForm';
import { TransactionFormData } from '@/app/types/transaction/transaction';

interface CreateTransactionFormProps {
  eventId?: number;
  onSuccess?: (transaction: any) => void;
  onCancel?: () => void;
}

const CreateTransactionForm: React.FC<CreateTransactionFormProps> = ({ 
  eventId, 
  onSuccess, 
  onCancel 
}) => {
  const { createTransaction, loading, error, success, reset } = useCreateTransaction();

  const {
    register,
    handleSubmit,
    formState: { errors },
    setValue
  } = useForm<TransactionFormData>({
    resolver: yupResolver(createTransactionValidationSchema),
    defaultValues: {
      eventId: eventId?.toString() || '',
      couponId: '',
      pointsUsed: ''
    }
  });

  // Set eventId jika diberikan sebagai prop
  useEffect(() => {
    if (eventId) {
      setValue('eventId', eventId.toString());
    }
  }, [eventId, setValue]);

  const onSubmit = async (data: TransactionFormData) => {
    try {
      const newTransaction = await createTransaction(data);
      
      if (onSuccess) {
        onSuccess(newTransaction);
      }
    } catch (err) {
      console.error('Error creating transaction:', err);
    }
  };

  const handleCancel = () => {
    reset();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="max-w-md mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-xl font-bold text-gray-800 mb-6">Buat Transaksi</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          Transaksi berhasil dibuat!
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-4">
        {/* Event ID */}
        <div>
          <label htmlFor="eventId" className="block text-sm font-medium text-gray-700 mb-2">
            Event ID *
          </label>
          <input
            type="number"
            id="eventId"
            {...register('eventId')}
            disabled={!!eventId}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
            placeholder="Masukkan Event ID"
          />
          {errors.eventId && (
            <p className="mt-1 text-sm text-red-600">{errors.eventId.message}</p>
          )}
        </div>

        {/* Coupon ID */}
        <div>
          <label htmlFor="couponId" className="block text-sm font-medium text-gray-700 mb-2">
            Coupon ID (Opsional)
          </label>
          <input
            type="number"
            id="couponId"
            {...register('couponId')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan Coupon ID"
          />
          {errors.couponId && (
            <p className="mt-1 text-sm text-red-600">{errors.couponId.message}</p>
          )}
        </div>

        {/* Points Used */}
        <div>
          <label htmlFor="pointsUsed" className="block text-sm font-medium text-gray-700 mb-2">
            Points Used (Opsional)
          </label>
          <input
            type="number"
            id="pointsUsed"
            {...register('pointsUsed')}
            className="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan jumlah points"
            min="0"
          />
          {errors.pointsUsed && (
            <p className="mt-1 text-sm text-red-600">{errors.pointsUsed.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-4 py-2 border border-gray-300 rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-4 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Membuat...' : 'Buat Transaksi'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateTransactionForm;