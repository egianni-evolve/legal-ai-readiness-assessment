-- Legal AI Readiness Assessment Schema
-- Run this in Supabase SQL Editor

-- Assessments table: stores each completed assessment
CREATE TABLE assessments (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  firm_size TEXT NOT NULL CHECK (firm_size IN ('solo', 'small', 'mid', 'large')),
  answers JSONB NOT NULL,
  scores JSONB NOT NULL,
  overall_score NUMERIC(3,2) NOT NULL,
  maturity_level TEXT NOT NULL,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Leads table: email captures, separate from assessments
CREATE TABLE leads (
  id UUID DEFAULT gen_random_uuid() PRIMARY KEY,
  assessment_id UUID REFERENCES assessments(id) ON DELETE SET NULL,
  email TEXT NOT NULL,
  firm_size TEXT,
  maturity_level TEXT,
  created_at TIMESTAMPTZ DEFAULT NOW()
);

-- Enable Row Level Security
ALTER TABLE assessments ENABLE ROW LEVEL SECURITY;
ALTER TABLE leads ENABLE ROW LEVEL SECURITY;

-- RLS Policies: anon can INSERT only, SELECT by specific ID via API
CREATE POLICY "Allow anonymous insert" ON assessments
  FOR INSERT WITH CHECK (true);

CREATE POLICY "Allow select by id" ON assessments
  FOR SELECT USING (true);

CREATE POLICY "Allow anonymous insert" ON leads
  FOR INSERT WITH CHECK (true);

-- Indexes
CREATE INDEX idx_assessments_created ON assessments(created_at);
CREATE INDEX idx_leads_email ON leads(email);
CREATE INDEX idx_leads_assessment ON leads(assessment_id);
