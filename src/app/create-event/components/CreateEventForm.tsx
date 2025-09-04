"use client";

import React, { useState, useEffect } from 'react';
import { useForm } from 'react-hook-form';
import { yupResolver } from '@hookform/resolvers/yup';
import { createEventValidationSchema } from '@/app/create-event/validation/event.validation';
import { EventFormData, EVENT_CATEGORIES } from '@/app/types/event/event';
import { useEventStore } from '@/app/create-event/stores/EventStore';

interface CreateEventFormProps {
  onSuccess?: (event: any) => void;
  onCancel?: () => void;
}

const CreateEventForm: React.FC<CreateEventFormProps> = ({ onSuccess, onCancel }) => {
  const { 
    createNewEvent, 
    loading, 
    error, 
    success, 
    successMessage, 
    clearMessages 
  } = useEventStore();
  
  const [isFree, setIsFree] = useState(false);

  const {
    register,
    handleSubmit,
    formState: { errors },
    watch,
    setValue,
    reset: resetForm
  } = useForm<EventFormData>({
    resolver: yupResolver(createEventValidationSchema),
    defaultValues: {
      title: '',
      category: '',
      location: '',
      priceIdr: '0',
      startsAt: '',
      endsAt: '',
      quantity: '1',
      description: '',
      ticketTypes: '',
      isFree: false
    }
  });

  const watchedIsFree = watch('isFree');

  // Clear messages when component mounts
  useEffect(() => {
    clearMessages();
  }, [clearMessages]);

  // Handle success state
  useEffect(() => {
    if (success && successMessage) {
      // Form will be handled by parent component
      console.log('Event created successfully');
    }
  }, [success, successMessage]);

  const onSubmit = async (data: EventFormData) => {
    try {
      const newEvent = await createNewEvent(data);
      
      if (onSuccess) {
        onSuccess(newEvent);
      }
      
      // Reset form after success
      resetForm();
    } catch (err) {
      console.error('Error creating event:', err);
    }
  };

  const handleCancel = () => {
    resetForm();
    clearMessages();
    if (onCancel) {
      onCancel();
    }
  };

  return (
    <div className="max-w-2xl mx-auto p-6 bg-white rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Buat Event Baru</h2>
      
      {error && (
        <div className="mb-4 p-4 bg-red-100 border border-red-400 text-red-700 rounded">
          {error}
        </div>
      )}

      {success && successMessage && (
        <div className="mb-4 p-4 bg-green-100 border border-green-400 text-green-700 rounded">
          {successMessage}
        </div>
      )}

      <form onSubmit={handleSubmit(onSubmit)} className="space-y-6">
        {/* Title */}
        <div>
          <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-2">
            Judul Event *
          </label>
          <input
            type="text"
            id="title"
            {...register('title')}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan judul event"
          />
          {errors.title && (
            <p className="mt-1 text-sm text-red-600">{errors.title.message}</p>
          )}
        </div>

        {/* Category */}
        <div>
          <label htmlFor="category" className="block text-sm font-medium text-gray-700 mb-2">
            Kategori Event *
          </label>
          <select
            id="category"
            {...register('category')}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
          >
            <option value="">Pilih kategori</option>
            {EVENT_CATEGORIES.map((category) => (
              <option key={category.value} value={category.value}>
                {category.label}
              </option>
            ))}
          </select>
          {errors.category && (
            <p className="mt-1 text-sm text-red-600">{errors.category.message}</p>
          )}
        </div>

        {/* Location */}
        <div>
          <label htmlFor="location" className="block text-sm font-medium text-gray-700 mb-2">
            Lokasi Event *
          </label>
          <input
            type="text"
            id="location"
            {...register('location')}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan lokasi event"
          />
          {errors.location && (
            <p className="mt-1 text-sm text-red-600">{errors.location.message}</p>
          )}
        </div>

        {/* Price and Free Event */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="priceIdr" className="block text-sm font-medium text-gray-700 mb-2">
              Harga Tiket (IDR) *
            </label>
            <input
              type="number"
              id="priceIdr"
              {...register('priceIdr')}
              disabled={watchedIsFree}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent disabled:bg-gray-100"
              placeholder="0"
              min="0"
            />
            {errors.priceIdr && (
              <p className="mt-1 text-sm text-red-600">{errors.priceIdr.message}</p>
            )}
          </div>

          <div className="flex items-center">
            <input
              type="checkbox"
              id="isFree"
              {...register('isFree')}
              className="h-4 w-4 text-blue-600 focus:ring-blue-500 border-gray-300 rounded"
            />
            <label htmlFor="isFree" className="ml-2 block text-sm text-gray-700">
              Event Gratis
            </label>
          </div>
        </div>

        {/* Date and Time */}
        <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <label htmlFor="startsAt" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal & Waktu Mulai *
            </label>
            <input
              type="datetime-local"
              id="startsAt"
              {...register('startsAt')}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.startsAt && (
              <p className="mt-1 text-sm text-red-600">{errors.startsAt.message}</p>
            )}
          </div>

          <div>
            <label htmlFor="endsAt" className="block text-sm font-medium text-gray-700 mb-2">
              Tanggal & Waktu Selesai *
            </label>
            <input
              type="datetime-local"
              id="endsAt"
              {...register('endsAt')}
              className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            />
            {errors.endsAt && (
              <p className="mt-1 text-sm text-red-600">{errors.endsAt.message}</p>
            )}
          </div>
        </div>

        {/* Quantity */}
        <div>
          <label htmlFor="quantity" className="block text-sm font-medium text-gray-700 mb-2">
            Jumlah Tiket *
          </label>
          <input
            type="number"
            id="quantity"
            {...register('quantity')}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="1"
            min="1"
            max="10000"
          />
          {errors.quantity && (
            <p className="mt-1 text-sm text-red-600">{errors.quantity.message}</p>
          )}
        </div>

        {/* Ticket Types */}
        <div>
          <label htmlFor="ticketTypes" className="block text-sm font-medium text-gray-700 mb-2">
            Jenis Tiket *
          </label>
          <input
            type="text"
            id="ticketTypes"
            {...register('ticketTypes')}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="VIP,Regular,Gold"
          />
          <p className="mt-1 text-sm text-gray-500">
            Pisahkan jenis tiket dengan koma (contoh: VIP,Regular,Gold)
          </p>
          {errors.ticketTypes && (
            <p className="mt-1 text-sm text-red-600">{errors.ticketTypes.message}</p>
          )}
        </div>

        {/* Description */}
        <div>
          <label htmlFor="description" className="block text-sm font-medium text-gray-700 mb-2">
            Deskripsi Event *
          </label>
          <textarea
            id="description"
            {...register('description')}
            rows={4}
            className="w-full px-3 py-2 border border-gray-300 text-black rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-transparent"
            placeholder="Masukkan deskripsi lengkap event"
          />
          {errors.description && (
            <p className="mt-1 text-sm text-red-600">{errors.description.message}</p>
          )}
        </div>

        {/* Buttons */}
        <div className="flex justify-end space-x-4">
          <button
            type="button"
            onClick={handleCancel}
            className="px-6 py-2 border border-gray-300 text-black rounded-md text-gray-700 hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
            disabled={loading}
          >
            Batal
          </button>
          <button
            type="submit"
            disabled={loading}
            className="px-6 py-2 bg-blue-600 text-white rounded-md hover:bg-blue-700 text-black focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed"
          >
            {loading ? 'Membuat...' : 'Buat Event'}
          </button>
        </div>
      </form>
    </div>
  );
};

export default CreateEventForm;