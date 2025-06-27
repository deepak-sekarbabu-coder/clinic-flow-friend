
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Clock, User, Phone, Calendar } from 'lucide-react';

interface PatientCheckInProps {
  onCheckIn: (patient: any) => void;
}

const PatientCheckIn = ({ onCheckIn }: PatientCheckInProps) => {
  const [formData, setFormData] = useState({
    name: '',
    phone: '',
    appointmentType: '',
    appointmentTime: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.name && formData.phone && formData.appointmentType) {
      const patient = {
        id: Date.now(),
        ...formData,
        status: 'waiting',
        checkInTime: new Date().toLocaleTimeString(),
        queueNumber: Math.floor(Math.random() * 900) + 100
      };
      onCheckIn(patient);
      setFormData({ name: '', phone: '', appointmentType: '', appointmentTime: '' });
    }
  };

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-blue-100">
      <CardHeader className="text-center bg-gradient-to-r from-blue-50 to-green-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-blue-800 flex items-center justify-center gap-2">
          <User className="h-6 w-6" />
          Patient Check-In
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="name" className="text-sm font-medium text-gray-700">Full Name</Label>
            <Input
              id="name"
              placeholder="Enter your full name"
              value={formData.name}
              onChange={(e) => setFormData({ ...formData, name: e.target.value })}
              className="border-blue-200 focus:border-blue-400"
              required
            />
          </div>
          
          <div className="space-y-2">
            <Label htmlFor="phone" className="text-sm font-medium text-gray-700">Phone Number</Label>
            <div className="relative">
              <Phone className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="phone"
                placeholder="Enter phone number"
                value={formData.phone}
                onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                className="pl-10 border-blue-200 focus:border-blue-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Appointment Type</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}>
              <SelectTrigger className="border-blue-200 focus:border-blue-400">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-blue-200">
                <SelectItem value="consultation">General Consultation</SelectItem>
                <SelectItem value="followup">Follow-up Visit</SelectItem>
                <SelectItem value="checkup">Regular Check-up</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="time" className="text-sm font-medium text-gray-700">Preferred Time (Optional)</Label>
            <div className="relative">
              <Clock className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="time"
                type="time"
                value={formData.appointmentTime}
                onChange={(e) => setFormData({ ...formData, appointmentTime: e.target.value })}
                className="pl-10 border-blue-200 focus:border-blue-400"
              />
            </div>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-blue-600 to-green-600 hover:from-blue-700 hover:to-green-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Check In to Queue
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default PatientCheckIn;
