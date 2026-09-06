import React, { createContext, useContext, useState, useEffect } from 'react';
import { api } from '../services/api';

const BookingContext = createContext(null);

export const BookingProvider = ({ children }) => {
  const [blockedDates, setBlockedDates] = useState([]);
  const [packages, setPackages] = useState({ weekend: [], weekday: [], all: [] });
  const [loadingDates, setLoadingDates] = useState(true);
  const [lastCreatedBooking, setLastCreatedBooking] = useState(null);

  const fetchBlockedDates = async () => {
    try {
      const data = await api.getBlockedDates();
      if (data.success) {
        setBlockedDates(data.blockedDates || []);
      }
    } catch (err) {
      console.error('Failed to load blocked dates:', err);
    } finally {
      setLoadingDates(false);
    }
  };

  const fetchPackages = async () => {
    try {
      const data = await api.getPackages();
      if (data.success) {
        setPackages(data.packages);
      }
    } catch (err) {
      console.error('Failed to load packages:', err);
    }
  };

  useEffect(() => {
    fetchBlockedDates();
    fetchPackages();
  }, []);

  return (
    <BookingContext.Provider
      value={{
        blockedDates,
        packages,
        loadingDates,
        lastCreatedBooking,
        setLastCreatedBooking,
        refreshBlockedDates: fetchBlockedDates
      }}
    >
      {children}
    </BookingContext.Provider>
  );
};

export const useBooking = () => {
  const context = useContext(BookingContext);
  if (!context) {
    throw new Error('useBooking must be used within a BookingProvider');
  }
  return context;
};
