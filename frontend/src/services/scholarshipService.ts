import { Scholarship, ScholarshipFilterState } from '../types/scholarship';
import { INDIAN_SCHOLARSHIPS_DATA } from '../data/scholarships';
import { isMockMode } from './api/config';
import { apiRequest } from './api/client';
import { getStorageItem, setStorageItem } from '../lib/storage';
import { fetchUserProfile } from './profileService';
import { calculateDeterministicMatch } from './matchingService';

const SAVED_SCHOLARSHIPS_KEY = 'scholarpath_saved_scholarships';

export async function fetchScholarships(filters?: Partial<ScholarshipFilterState>): Promise<Scholarship[]> {
  if (isMockMode()) {
    const userProfile = await fetchUserProfile();
    let result = INDIAN_SCHOLARSHIPS_DATA.map(s => {
      const match = calculateDeterministicMatch(userProfile, s);
      return {
        ...s,
        matchScore: match.matchScore,
        eligibilityStatus: match.eligibilityStatus,
        factorScores: match.factorScores,
        matchingReasons: match.matchingReasons,
        missingRequirements: match.missingRequirements
      };
    });

    if (!filters) return result;

    if (filters.search) {
      const q = filters.search.toLowerCase();
      result = result.filter(s =>
        s.name.toLowerCase().includes(q) ||
        s.provider.toLowerCase().includes(q) ||
        s.description.toLowerCase().includes(q) ||
        s.eligibleCourses.some(c => c.toLowerCase().includes(q))
      );
    }

    if (filters.category && filters.category !== 'all') {
      result = result.filter(s => s.categories.includes(filters.category!));
    }
    if (filters.sourceType && filters.sourceType !== 'all') {
      result = result.filter(s => s.sourceType === filters.sourceType);
    }
    if (filters.riskLevel && filters.riskLevel !== 'all') {
      result = result.filter(s => s.riskLevel === filters.riskLevel);
    }
    if (filters.eligibilityStatus && filters.eligibilityStatus !== 'all') {
      result = result.filter(s => s.eligibilityStatus === filters.eligibilityStatus);
    }
    if (filters.minAmount) {
      result = result.filter(s => s.amount >= filters.minAmount!);
    }

    if (filters.sortBy === 'amount') {
      result.sort((a, b) => b.amount - a.amount);
    } else if (filters.sortBy === 'deadline') {
      result.sort((a, b) => new Date(a.deadline).getTime() - new Date(b.deadline).getTime());
    } else {
      result.sort((a, b) => (b.matchScore || 0) - (a.matchScore || 0));
    }

    return result;
  }

  return apiRequest<Scholarship[]>('/scholarships');
}

export async function fetchScholarshipById(id: string): Promise<Scholarship | null> {
  const all = await fetchScholarships();
  const found = all.find(s => s.id === id);
  return found || null;
}

export function getSavedScholarshipIds(): string[] {
  return getStorageItem<string[]>(SAVED_SCHOLARSHIPS_KEY, ['sch_nsp_central_sector_2026', 'sch_reliance_foundation_ug_2026']);
}

export function toggleSaveScholarship(id: string): string[] {
  const current = getSavedScholarshipIds();
  const exists = current.includes(id);
  const updated = exists ? current.filter(itemId => itemId !== id) : [...current, id];
  setStorageItem(SAVED_SCHOLARSHIPS_KEY, updated);
  return updated;
}
