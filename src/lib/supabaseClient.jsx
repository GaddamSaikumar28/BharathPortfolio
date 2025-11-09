import { createClient } from '@supabase/supabase-js'

// IMPORTANT: Add your project URL and anon key here
const supabaseUrl = 'https://qxjzhtugsgpyvwhcomhi.supabase.co'
const supabaseKey = 'eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpc3MiOiJzdXBhYmFzZSIsInJlZiI6InF4anpodHVnc2dweXZ3aGNvbWhpIiwicm9sZSI6ImFub24iLCJpYXQiOjE3NjI1Nzg4NTksImV4cCI6MjA3ODE1NDg1OX0.vlKslwBD-2EYBAVVXrcQ4ViY5VwgPfQTrDnJAOoPE-w'

export const supabase = createClient(supabaseUrl, supabaseKey)