export interface User {
  id: string;
  name: string;
  email: string;
  phone: string;
  role: 'student' | 'owner';
  college?: string; // For students
  address?: string;
  createdAt: Date;
}