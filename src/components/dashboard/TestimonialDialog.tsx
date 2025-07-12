import React, { useState, useEffect } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Label } from '@/components/ui/label';
import { Textarea } from '@/components/ui/textarea';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle } from '@/components/ui/dialog';
import { supabase } from '@/integrations/supabase/client';
import { toast } from '@/hooks/use-toast';

interface Testimonial {
  id: string;
  client_name: string;
  project_title: string;
  rating: number;
  testimonial: string;
  active: boolean;
}

interface TestimonialDialogProps {
  open: boolean;
  onOpenChange: (open: boolean) => void;
  testimonial?: Testimonial | null;
  onSave: () => void;
}

const TestimonialDialog: React.FC<TestimonialDialogProps> = ({
  open,
  onOpenChange,
  testimonial,
  onSave,
}) => {
  const [formData, setFormData] = useState({
    client_name: '',
    project_title: '',
    rating: '5',
    testimonial: '',
    active: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    if (testimonial) {
      setFormData({
        client_name: testimonial.client_name || '',
        project_title: testimonial.project_title || '',
        rating: testimonial.rating?.toString() || '5',
        testimonial: testimonial.testimonial || '',
        active: testimonial.active ?? true,
      });
    } else {
      setFormData({
        client_name: '',
        project_title: '',
        rating: '5',
        testimonial: '',
        active: true,
      });
    }
  }, [testimonial]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      const testimonialData = {
        client_name: formData.client_name,
        project_title: formData.project_title || null,
        rating: parseInt(formData.rating),
        testimonial: formData.testimonial,
        active: formData.active,
      };

      if (testimonial) {
        // Update existing testimonial
        const { error } = await supabase
          .from('testimonials')
          .update(testimonialData)
          .eq('id', testimonial.id);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Testimonial updated successfully',
        });
      } else {
        // Create new testimonial
        const { error } = await supabase
          .from('testimonials')
          .insert(testimonialData);

        if (error) throw error;

        toast({
          title: 'Success',
          description: 'Testimonial created successfully',
        });
      }

      onSave();
    } catch (error) {
      console.error('Error saving testimonial:', error);
      toast({
        title: 'Error',
        description: 'Failed to save testimonial',
        variant: 'destructive',
      });
    } finally {
      setLoading(false);
    }
  };

  const handleInputChange = (field: string, value: string | boolean) => {
    setFormData(prev => ({ ...prev, [field]: value }));
  };

  return (
    <Dialog open={open} onOpenChange={onOpenChange}>
      <DialogContent className="sm:max-w-[500px]">
        <DialogHeader>
          <DialogTitle>
            {testimonial ? 'Edit Testimonial' : 'Add New Testimonial'}
          </DialogTitle>
          <DialogDescription>
            {testimonial ? 'Update testimonial details' : 'Create a new customer testimonial'}
          </DialogDescription>
        </DialogHeader>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="grid grid-cols-2 gap-4">
            <div className="space-y-2">
              <Label htmlFor="client_name">Client Name</Label>
              <Input
                id="client_name"
                value={formData.client_name}
                onChange={(e) => handleInputChange('client_name', e.target.value)}
                placeholder="Client name"
                required
              />
            </div>
            <div className="space-y-2">
              <Label htmlFor="project_title">Project Title</Label>
              <Input
                id="project_title"
                value={formData.project_title}
                onChange={(e) => handleInputChange('project_title', e.target.value)}
                placeholder="Project title (optional)"
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label htmlFor="rating">Rating</Label>
            <Select value={formData.rating} onValueChange={(value) => handleInputChange('rating', value)}>
              <SelectTrigger>
                <SelectValue />
              </SelectTrigger>
              <SelectContent>
                <SelectItem value="1">1 Star</SelectItem>
                <SelectItem value="2">2 Stars</SelectItem>
                <SelectItem value="3">3 Stars</SelectItem>
                <SelectItem value="4">4 Stars</SelectItem>
                <SelectItem value="5">5 Stars</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="testimonial">Testimonial</Label>
            <Textarea
              id="testimonial"
              value={formData.testimonial}
              onChange={(e) => handleInputChange('testimonial', e.target.value)}
              placeholder="Customer testimonial"
              rows={4}
              required
            />
          </div>

          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              id="active"
              checked={formData.active}
              onChange={(e) => handleInputChange('active', e.target.checked)}
              className="rounded border-gray-300"
            />
            <Label htmlFor="active">Active (visible on website)</Label>
          </div>

          <DialogFooter>
            <Button type="button" variant="outline" onClick={() => onOpenChange(false)}>
              Cancel
            </Button>
            <Button type="submit" disabled={loading}>
              {loading ? 'Saving...' : testimonial ? 'Update Testimonial' : 'Create Testimonial'}
            </Button>
          </DialogFooter>
        </form>
      </DialogContent>
    </Dialog>
  );
};

export default TestimonialDialog;