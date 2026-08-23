# ScholarPath — PostgreSQL & Supabase Database Architecture

This document defines the relational database schema architecture for persistent production deployment.

```sql
-- 1. Users Table
CREATE TABLE users (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    email VARCHAR(255) UNIQUE NOT NULL,
    full_name VARCHAR(255) NOT NULL,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 2. Student Profiles Table
CREATE TABLE student_profiles (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    university VARCHAR(255) NOT NULL,
    institution_type VARCHAR(100) NOT NULL,
    course VARCHAR(100) NOT NULL,
    branch VARCHAR(100) NOT NULL,
    current_year VARCHAR(50) NOT NULL,
    current_semester VARCHAR(50) NOT NULL,
    cgpa NUMERIC(4, 2) NOT NULL,
    class10_percentage NUMERIC(5, 2) NOT NULL,
    class12_percentage NUMERIC(5, 2) NOT NULL,
    graduation_year INT NOT NULL,
    domicile_state VARCHAR(100) NOT NULL,
    annual_family_income NUMERIC(12, 2) NOT NULL,
    income_certificate_available BOOLEAN DEFAULT FALSE,
    domicile_certificate_available BOOLEAN DEFAULT FALSE,
    category VARCHAR(50) NOT NULL,
    gender VARCHAR(20) NOT NULL,
    disability_status BOOLEAN DEFAULT FALSE,
    udid_available BOOLEAN DEFAULT FALSE,
    completeness_score INT DEFAULT 0,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 3. Scholarships Master Table
CREATE TABLE scholarships (
    id VARCHAR(100) PRIMARY KEY,
    name VARCHAR(255) NOT NULL,
    provider VARCHAR(255) NOT NULL,
    scheme_type VARCHAR(100) NOT NULL,
    source_type VARCHAR(50) NOT NULL,
    official_source_name VARCHAR(255) NOT NULL,
    official_url TEXT NOT NULL,
    description TEXT NOT NULL,
    amount NUMERIC(12, 2) NOT NULL,
    currency VARCHAR(10) DEFAULT 'INR',
    academic_year VARCHAR(20) NOT NULL,
    deadline DATE NOT NULL,
    location VARCHAR(100) NOT NULL,
    minimum_percentage_or_cgpa NUMERIC(5, 2) DEFAULT 0,
    maximum_family_income NUMERIC(12, 2) DEFAULT 0,
    domicile_requirements VARCHAR(255),
    category_requirements VARCHAR(255),
    gender_requirements VARCHAR(50),
    disability_requirements VARCHAR(255),
    is_verified BOOLEAN DEFAULT TRUE,
    source_trust_level INT DEFAULT 95,
    risk_score INT DEFAULT 0,
    risk_level VARCHAR(20) DEFAULT 'low',
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 4. Scholarship Eligibility Rules Table
CREATE TABLE scholarship_eligibility_rules (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scholarship_id VARCHAR(100) REFERENCES scholarships(id) ON DELETE CASCADE,
    rule_type VARCHAR(50) NOT NULL,
    rule_value TEXT NOT NULL,
    weight NUMERIC(4, 2) DEFAULT 1.00
);

-- 5. Applications Table
CREATE TABLE applications (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    user_id UUID REFERENCES users(id) ON DELETE CASCADE,
    scholarship_id VARCHAR(100) REFERENCES scholarships(id) ON DELETE CASCADE,
    status VARCHAR(50) NOT NULL DEFAULT 'draft',
    completion_percentage INT DEFAULT 0,
    version INT DEFAULT 1,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP,
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);

-- 6. Safety Assessments Table
CREATE TABLE safety_assessments (
    id UUID PRIMARY KEY DEFAULT gen_random_uuid(),
    scholarship_id VARCHAR(100) REFERENCES scholarships(id) ON DELETE CASCADE,
    risk_score INT NOT NULL,
    risk_level VARCHAR(20) NOT NULL,
    reasoning TEXT NOT NULL,
    recommended_action TEXT NOT NULL,
    checked_at TIMESTAMP WITH TIME ZONE DEFAULT CURRENT_TIMESTAMP
);
```
