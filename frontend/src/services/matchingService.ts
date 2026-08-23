import { StudentProfile } from '../types/profile';
import { Scholarship, FactorScores, EligibilityStatus } from '../types/scholarship';

export function calculateDeterministicMatch(profile: StudentProfile, scholarship: Scholarship): {
  matchScore: number;
  eligibilityStatus: EligibilityStatus;
  factorScores: FactorScores;
  matchingReasons: string[];
  missingRequirements: string[];
} {
  const matchingReasons: string[] = [];
  const missingRequirements: string[] = [];

  let courseMatch = 100;
  if (scholarship.eligibleCourses && scholarship.eligibleCourses.length > 0) {
    const isCourseEligible = scholarship.eligibleCourses.some(c =>
      c.toLowerCase() === 'all courses' ||
      profile.academic.course.toLowerCase().includes(c.toLowerCase()) ||
      c.toLowerCase().includes(profile.academic.course.toLowerCase())
    );
    if (isCourseEligible) {
      matchingReasons.push(`Your ${profile.academic.course} course is fully eligible for this scheme.`);
    } else {
      courseMatch = 0;
      missingRequirements.push(`COURSE MISMATCH: Scheme requires ${scholarship.eligibleCourses.join(', ')}. Your course is ${profile.academic.course}.`);
    }
  }

  let academicMatch = 100;
  const userCgpaInPercent = profile.academic.cgpa * 10;
  const userScoreToCompare = Math.max(userCgpaInPercent, profile.academic.class12Percentage);
  const minReq = scholarship.minimumPercentageOrCGPA;

  if (minReq > 0) {
    if (minReq <= 10.0) {
      if (profile.academic.cgpa >= minReq) {
        matchingReasons.push(`Your CGPA (${profile.academic.cgpa}) meets the minimum required ${minReq}.`);
      } else {
        academicMatch = Math.max(0, Math.round((profile.academic.cgpa / minReq) * 100));
        missingRequirements.push(`ACADEMIC CRITERIA: Requires minimum CGPA ${minReq}. Your CGPA is ${profile.academic.cgpa}.`);
      }
    } else {
      if (userScoreToCompare >= minReq) {
        matchingReasons.push(`Your academic score (${userScoreToCompare.toFixed(1)}%) satisfies the ${minReq}% benchmark.`);
      } else {
        academicMatch = Math.max(0, Math.round((userScoreToCompare / minReq) * 100));
        missingRequirements.push(`ACADEMIC CRITERIA: Requires minimum ${minReq}%. Your score is ${userScoreToCompare.toFixed(1)}%.`);
      }
    }
  }

  let incomeMatch = 100;
  if (scholarship.maximumFamilyIncome > 0 && scholarship.maximumFamilyIncome < 10000000) {
    if (profile.financial.annualFamilyIncome <= scholarship.maximumFamilyIncome) {
      matchingReasons.push(`Your annual family income (₹${(profile.financial.annualFamilyIncome / 100000).toFixed(1)} Lakhs) is within the ₹${(scholarship.maximumFamilyIncome / 100000).toFixed(1)} Lakhs ceiling.`);
    } else {
      incomeMatch = Math.max(0, Math.round((scholarship.maximumFamilyIncome / profile.financial.annualFamilyIncome) * 100));
      missingRequirements.push(`INCOME EXCEEDED: Scheme ceiling is ₹${(scholarship.maximumFamilyIncome / 100000).toFixed(1)} Lakhs. Your family income is ₹${(profile.financial.annualFamilyIncome / 100000).toFixed(1)} Lakhs.`);
    }
  }

  let domicileMatch = 100;
  if (scholarship.domicileRequirements && scholarship.domicileRequirements.toLowerCase() !== 'all india' && scholarship.domicileRequirements.toLowerCase() !== 'none' && scholarship.domicileRequirements.toLowerCase() !== 'indian resident') {
    const isDomicileMatched = scholarship.domicileRequirements.toLowerCase().includes(profile.financial.domicileState.toLowerCase());
    if (isDomicileMatched) {
      matchingReasons.push(`Your ${profile.financial.domicileState} domicile matches the state requirements.`);
    } else {
      domicileMatch = 30;
      missingRequirements.push(`DOMICILE RESTRICTION: Scheme restricted to ${scholarship.domicileRequirements}. Your domicile state is ${profile.financial.domicileState}.`);
    }
  }

  let categoryMatch = 100;
  if (scholarship.genderRequirements && scholarship.genderRequirements.toLowerCase() !== 'all') {
    if (scholarship.genderRequirements.toLowerCase().includes(profile.financial.gender.toLowerCase())) {
      matchingReasons.push(`Gender eligibility (${profile.financial.gender}) matched.`);
    } else {
      categoryMatch = 0;
      missingRequirements.push(`GENDER RESTRICTION: Scheme restricted to ${scholarship.genderRequirements} applicants.`);
    }
  }

  let documentReadiness = 80;
  if (scholarship.requiredDocuments.some(d => d.toLowerCase().includes('income')) && !profile.financial.incomeCertificateAvailable) {
    documentReadiness -= 20;
    missingRequirements.push(`DOCUMENT MISSING: Valid Income Certificate needed for application verification.`);
  }
  if (scholarship.requiredDocuments.some(d => d.toLowerCase().includes('domicile')) && !profile.financial.domicileCertificateAvailable) {
    documentReadiness -= 20;
    missingRequirements.push(`DOCUMENT MISSING: State Domicile Certificate required.`);
  }

  const overallScore = Math.round(
    courseMatch * 0.25 +
    academicMatch * 0.25 +
    incomeMatch * 0.20 +
    domicileMatch * 0.15 +
    categoryMatch * 0.10 +
    documentReadiness * 0.05
  );

  let eligibilityStatus: EligibilityStatus = 'eligible';
  if (courseMatch === 0 || categoryMatch === 0 || overallScore < 60) {
    eligibilityStatus = 'ineligible';
  } else if (overallScore < 85 || missingRequirements.length > 0) {
    eligibilityStatus = 'partial';
  }

  return {
    matchScore: overallScore,
    eligibilityStatus,
    factorScores: {
      courseMatch,
      academicMatch,
      incomeMatch,
      domicileMatch,
      categoryMatch,
      documentReadiness
    },
    matchingReasons,
    missingRequirements
  };
}
