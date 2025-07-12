import React, { useEffect, useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { supabase } from '@/integrations/supabase/client';
import { Building2, MessageSquare, Users, Star } from 'lucide-react';

const DashboardStats = () => {
  const [stats, setStats] = useState({
    totalProjects: 0,
    totalInquiries: 0,
    totalUsers: 0,
    totalTestimonials: 0,
  });

  useEffect(() => {
    fetchStats();
  }, []);

  const fetchStats = async () => {
    try {
      const [projects, inquiries, users, testimonials] = await Promise.all([
        supabase.from('projects').select('id', { count: 'exact' }),
        supabase.from('contact_inquiries').select('id', { count: 'exact' }),
        supabase.from('profiles').select('id', { count: 'exact' }),
        supabase.from('testimonials').select('id', { count: 'exact' }),
      ]);

      setStats({
        totalProjects: projects.count || 0,
        totalInquiries: inquiries.count || 0,
        totalUsers: users.count || 0,
        totalTestimonials: testimonials.count || 0,
      });
    } catch (error) {
      console.error('Error fetching stats:', error);
    }
  };

  const statCards = [
    {
      title: 'Total Projects',
      value: stats.totalProjects,
      icon: Building2,
      color: 'text-blue-600',
    },
    {
      title: 'Contact Inquiries',
      value: stats.totalInquiries,
      icon: MessageSquare,
      color: 'text-green-600',
    },
    {
      title: 'Registered Users',
      value: stats.totalUsers,
      icon: Users,
      color: 'text-purple-600',
    },
    {
      title: 'Testimonials',
      value: stats.totalTestimonials,
      icon: Star,
      color: 'text-yellow-600',
    },
  ];

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      {statCards.map((stat, index) => (
        <Card key={index}>
          <CardHeader className="flex flex-row items-center justify-between space-y-0 pb-2">
            <CardTitle className="text-sm font-medium text-muted-foreground">
              {stat.title}
            </CardTitle>
            <stat.icon className={`h-4 w-4 ${stat.color}`} />
          </CardHeader>
          <CardContent>
            <div className="text-2xl font-bold">{stat.value}</div>
          </CardContent>
        </Card>
      ))}
    </div>
  );
};

export default DashboardStats;