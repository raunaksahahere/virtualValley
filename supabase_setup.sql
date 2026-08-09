-- SUPABASE SETUP SCRIPT FOR WEBSITE SUBSCRIPTIONS
-- Run this script in your Supabase SQL Editor

-- 1. Customers Table
CREATE TABLE IF NOT EXISTS public.customers (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT UNIQUE NOT NULL,
    phone TEXT,
    business_name TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 2. Website Packages / Plans Table
CREATE TABLE IF NOT EXISTS public.website_packages (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL UNIQUE,
    price DECIMAL(10,2) NOT NULL,
    currency TEXT DEFAULT 'INR',
    features JSONB,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Insert Default Packages
INSERT INTO public.website_packages (name, price, features)
VALUES 
    ('Starter', 2499.00, '["Up to 6 Premium Pages", "Custom .com Domain", "City-Level SEO", "Mobile Responsive", "SSL Certificate", "Free Hosting", "Admin Panel", "WhatsApp Integrated Contact Form", "1 Website Maintenance Every Month", "Email Support"]'),
    ('Growth', 3999.00, '["Everything in Starter", "Up to 10 Premium Pages", "State-Level SEO", "Premium UI/UX", "Smooth Premium Animations", "Booking Forms", "Email + WhatsApp Forms", "Basic Ecommerce", "Speed Optimization", "Two Maintenance Sessions Per Month", "Priority Support"]'),
    ('Scale', 7499.00, '["Up to 15 Premium Pages", "National SEO", "AI Chatbot", "Advanced Admin Dashboard", "Ecommerce", "Payment Gateway Integration", "Blog / CMS", "Weekly Website Maintenance", "Monthly SEO Reports", "Priority Technical Support", "Dedicated Account Manager"]')
ON CONFLICT (name) DO NOTHING;

-- 3. Website Enquiries Table (Used by the Contact Form)
CREATE TABLE IF NOT EXISTS public.website_enquiries (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    name TEXT NOT NULL,
    email TEXT NOT NULL,
    phone TEXT NOT NULL,
    business_name TEXT NOT NULL,
    business_type TEXT NOT NULL,
    selected_plan TEXT NOT NULL,
    message TEXT,
    status TEXT DEFAULT 'New', -- New, Contacted, Converted, Lost
    notes TEXT,
    sales_executive TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 4. Subscriptions Table
CREATE TABLE IF NOT EXISTS public.subscriptions (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    customer_id UUID REFERENCES public.customers(id) ON DELETE CASCADE,
    package_id UUID REFERENCES public.website_packages(id) ON DELETE RESTRICT,
    status TEXT DEFAULT 'Active', -- Active, Paused, Cancelled
    start_date TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    next_billing_date TIMESTAMP WITH TIME ZONE,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- 5. Maintenance Schedule Table
CREATE TABLE IF NOT EXISTS public.maintenance_schedule (
    id UUID PRIMARY KEY DEFAULT uuid_generate_v4(),
    subscription_id UUID REFERENCES public.subscriptions(id) ON DELETE CASCADE,
    scheduled_date DATE NOT NULL,
    status TEXT DEFAULT 'Pending', -- Pending, In Progress, Completed
    tasks_performed TEXT,
    report_url TEXT,
    created_at TIMESTAMP WITH TIME ZONE DEFAULT NOW(),
    updated_at TIMESTAMP WITH TIME ZONE DEFAULT NOW()
);

-- Set up row level security (RLS) policies
-- Note: Assuming you are using service_role key on the backend, RLS can be bypassed.
-- But we can add basic read access for public if needed. Currently keeping it private.
ALTER TABLE public.customers ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_packages ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.website_enquiries ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.subscriptions ENABLE ROW LEVEL SECURITY;
ALTER TABLE public.maintenance_schedule ENABLE ROW LEVEL SECURITY;

-- If you want the website_packages to be readable by anyone (e.g. for dynamic pricing on frontend)
CREATE POLICY "Enable read access for all users" ON public.website_packages FOR SELECT USING (true);
