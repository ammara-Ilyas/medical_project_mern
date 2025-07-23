import DoctorsManager from '@/components/widgets/admin/DoctorsManager';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Manage Doctors | Admin Panel',
  description: 'Admin panel for managing doctors. Add, update, and view all doctors in the system.',
};

export default function DoctorsPage() {
  return <DoctorsManager />;
} 