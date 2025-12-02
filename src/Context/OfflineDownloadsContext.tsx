import React, { createContext, useContext, useEffect, useState, ReactNode } from 'react';
import AsyncStorage from '@react-native-async-storage/async-storage';

export interface Parcel {
  id: number;
  parcel_name: string;
  parcel_type: string;
  custom_parcel_location: string;
  latitude: number;
  longitude: number;
  location_name: string;
  soil_type: string;
  fertility_level: string;
  analysis_date: string;
  soil_image_url: string;
  moisture_percentage: string;
  acidity_ph: string;
}

interface OfflineDownloadsContextType {
  downloads: Parcel[];
  addDownload: (parcel: Parcel) => Promise<void>;
  removeDownload: (id: number) => Promise<void>;
  clearDownloads: () => Promise<void>;
  isDownloaded: (id: number) => boolean;
}

const OfflineDownloadsContext = createContext<OfflineDownloadsContextType | undefined>(undefined);

export const OfflineDownloadsProvider = ({ children }: { children: ReactNode }) => {
  const [downloads, setDownloads] = useState<Parcel[]>([]);

  const STORAGE_KEY = '@offline_downloads';

  // Load saved downloads from AsyncStorage on app start
  useEffect(() => {
    const loadDownloads = async () => {
      try {
        const stored = await AsyncStorage.getItem(STORAGE_KEY);
        if (stored) {
          setDownloads(JSON.parse(stored));
        }
      } catch (err) {
        console.error('Error loading offline downloads:', err);
      }
    };
    loadDownloads();
  }, []);

  // Save to AsyncStorage whenever downloads change
  const saveToStorage = async (data: Parcel[]) => {
    try {
      await AsyncStorage.setItem(STORAGE_KEY, JSON.stringify(data));
    } catch (err) {
      console.error('Error saving offline downloads:', err);
    }
  };

  const addDownload = async (parcel: Parcel) => {
    // Avoid duplicates
    const exists = downloads.some(item => item.id === parcel.id);
    if (!exists) {
      const updated = [...downloads, parcel];
      setDownloads(updated);
      await saveToStorage(updated);
    }
  };

  const removeDownload = async (id: number) => {
    const updated = downloads.filter(item => item.id !== id);
    setDownloads(updated);
    await saveToStorage(updated);
  };

  const clearDownloads = async () => {
    setDownloads([]);
    await AsyncStorage.removeItem(STORAGE_KEY);
  };

  const isDownloaded = (id: number) => downloads.some(item => item.id === id);

  return (
    <OfflineDownloadsContext.Provider
      value={{ downloads, addDownload, removeDownload, clearDownloads, isDownloaded }}
    >
      {children}
    </OfflineDownloadsContext.Provider>
  );
};

export const useOfflineDownloads = () => {
  const context = useContext(OfflineDownloadsContext);
  if (!context) {
    throw new Error('useOfflineDownloads must be used within an OfflineDownloadsProvider');
  }
  return context;
};
