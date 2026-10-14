import { z } from 'zod';

export const SERVICE_OPTIONS = [
  { id: 'web', label: 'Web development & ecommerce' },
  { id: 'growth', label: 'SEO & digital growth' },
  { id: 'ai', label: 'AI & automation' },
  { id: 'crm', label: 'CRM & data integration' },
  { id: 'data', label: 'Analytics & reporting' },
  { id: 'accessibility', label: 'Accessibility & inclusion' },
  { id: 'support', label: 'Maintenance & support' },
];

const serviceIds = SERVICE_OPTIONS.map((service) => service.id);
const phonePattern = /^[+\d()\-\s]{7,30}$/;
const websitePattern = /^(https?:\/\/)?(?:www\.)?(?:[a-z0-9](?:[a-z0-9-]{0,61}[a-z0-9])?\.)+[a-z]{2,}(?::\d{2,5})?(?:[/?#][^\s]*)?$/i;

export const leadSchema = z.object({
  name: z.string().trim().min(2, 'Please enter your full name.').max(120, 'Name is too long.'),
  email: z.string().trim().toLowerCase().email('Please enter a valid work email.').max(180, 'Email is too long.'),
  phone: z.string().trim().max(30, 'Phone number is too long.').refine((value) => !value || phonePattern.test(value), 'Please enter a valid phone number.').optional().or(z.literal('')),
  company: z.string().trim().max(140, 'Company name is too long.').optional().or(z.literal('')),
  website: z.string().trim().max(240, 'Website is too long.').refine((value) => !value || websitePattern.test(value), 'Please enter a valid website address.').optional().or(z.literal('')),
  service: z.string().refine((value) => serviceIds.includes(value), 'Please choose a service.'),
  message: z.string().trim().min(20, 'Please share at least a little context.').max(3000, 'Message is too long.'),
  consent: z.literal(true, { error: 'Please confirm that we may use these details to respond.' }),
  honeypot: z.string().max(0, 'Invalid submission.').optional().or(z.literal('')),
  turnstileToken: z.string().max(4096).optional().or(z.literal('')),
  sourcePage: z.string().max(120).optional().or(z.literal('')),
});

export function getServiceLabel(id) {
  return SERVICE_OPTIONS.find((service) => service.id === id)?.label || '';
}

