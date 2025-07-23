import AddDoctorForm from '@/components/widgets/admin/AddDoctorForm';
import type { Metadata } from 'next';

export const metadata: Metadata = {
  title: 'Add Doctor | Admin Panel',
  description: 'Add a new doctor to the system from the admin panel.',
};

export default function AddDoctorPage() {
  return (
    <div className="flex justify-center items-center min-h-screen bg-gray-50 p-4">
      <AddDoctorForm />
    </div>
  );
} 