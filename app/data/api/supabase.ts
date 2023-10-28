
import { createClient } from '@supabase/supabase-js'

const supabaseUrl = 'https://vwmoyrzfdsnrmjyecllh.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InZ3bW95cnpmZHNucm1qeWVjbGxoIiwicm9sZSI6ImFub24iLCJpYXQiOjE2OTc5ODI1MDAsImV4cCI6MjAxMzU1ODUwMH0.OdGVLiyzjNqGCLr8earXs5K-KkgOzQV6YI4tFspwORo'
export const supabase = createClient(supabaseUrl, supabaseKey)