import React, { createContext, useContext, useState, useEffect } from 'react';
import { Scholarship, ScholarshipFilterState } from '../types/scholarship';
import { fetchScholarships, getSavedScholarshipIds, toggleSaveScholarship } from '../services/scholarshipService';

interface ScholarshipContextType {
  scholarships: Scholarship[];
  savedIds: string[];
  isLoading: boolean;
  filters: ScholarshipFilterState;
  setFilters: React.Dispatch<React.SetStateAction<ScholarshipFilterState>>;
  toggleSave: (id: string) => void;
  refreshScholarships: () => Promise<void>;
}

const defaultFilters: ScholarshipFilterState = {
  search: '',
  category: 'all',
  sourceType: 'all',
  state: 'all',
  course: 'all',
  minAmount: 0,
  maxAmount: 5000000,
  maxIncome: 10000000,
  riskLevel: 'all',
  eligibilityStatus: 'all',
  sortBy: 'match',
};

const ScholarshipContext = createContext<ScholarshipContextType | undefined>(undefined);

export const ScholarshipProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [scholarships, setScholarships] = useState<Scholarship[]>([]);
  const [savedIds, setSavedIds] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(true);
  const [filters, setFilters] = useState<ScholarshipFilterState>(defaultFilters);

  const loadData = async () => {
    setIsLoading(true);
    try {
      const data = await fetchScholarships(filters);
      setScholarships(data);
      setSavedIds(getSavedScholarshipIds());
    } catch (error) {
      console.error('Failed to fetch scholarships:', error);
    } finally {
      setIsLoading(false);
    }
  };

  useEffect(() => {
    loadData();
  }, [filters]);

  const toggleSave = (id: string) => {
    const updated = toggleSaveScholarship(id);
    setSavedIds(updated);
  };

  return (
    <ScholarshipContext.Provider
      value={{
        scholarships,
        savedIds,
        isLoading,
        filters,
        setFilters,
        toggleSave,
        refreshScholarships: loadData,
      }}
    >
      {children}
    </ScholarshipContext.Provider>
  );
};

export const useScholarships = () => {
  const context = useContext(ScholarshipContext);
  if (!context) {
    throw new Error('useScholarships must be used within a ScholarshipProvider');
  }
  return context;
};
