import { StudentProfile } from '../types/profile';
import { mockDefaultProfile } from '../mocks/profilesMock';
import { isMockMode } from './api/config';
import { apiRequest } from './api/client';
import { getStorageItem, setStorageItem } from '../lib/storage';

const PROFILE_KEY = 'scholarpath_user_profile';

export async function fetchUserProfile(): Promise<StudentProfile> {
  if (isMockMode()) {
    return getStorageItem<StudentProfile>(PROFILE_KEY, mockDefaultProfile);
  }
  return apiRequest<StudentProfile>('/profile');
}

export async function updateUserProfile(profile: StudentProfile): Promise<StudentProfile> {
  const score = calculateProfileScore(profile);
  const updated = { ...profile, completenessScore: score, updatedAt: new Date().toISOString() };
  if (isMockMode()) {
    setStorageItem(PROFILE_KEY, updated);
    return updated;
  }
  return apiRequest<StudentProfile>('/profile', {
    method: 'PUT',
    body: JSON.stringify(updated),
  });
}

function calculateProfileScore(profile: StudentProfile): number {
  let points = 0;
  if (profile.academic.fullName) points += 10;
  if (profile.academic.university) points += 10;
  if (profile.academic.course) points += 10;
  if (profile.academic.branch) points += 10;
  if (profile.academic.cgpa > 0) points += 15;
  if (profile.financial.domicileState) points += 10;
  if (profile.financial.annualFamilyIncome > 0) points += 10;
  if (profile.interests.length > 0) points += 10;
  if (profile.skills.length > 0) points += 10;
  if (profile.achievements.length > 0) points += 5;
  return Math.min(points, 100);
}
