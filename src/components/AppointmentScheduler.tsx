
import React, { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Input } from '@/components/ui/input';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Label } from '@/components/ui/label';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Calendar, Clock, User, Phone } from 'lucide-react';

interface Appointment {
  id: number;
  patientName: string;
  phone: string;
  appointmentType: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface AppointmentSchedulerProps {
  onScheduleAppointment: (appointment: Appointment) => void;
}

const AppointmentScheduler = ({ onScheduleAppointment }: AppointmentSchedulerProps) => {
  const [formData, setFormData] = useState({
    patientName: '',
    phone: '',
    appointmentType: '',
    date: '',
    time: ''
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (formData.patientName && formData.phone && formData.appointmentType && formData.date && formData.time) {
      const appointment: Appointment = {
        id: Date.now(),
        patientName: formData.patientName,
        phone: formData.phone,
        appointmentType: formData.appointmentType,
        date: formData.date,
        time: formData.time,
        status: 'scheduled'
      };
      onScheduleAppointment(appointment);
      setFormData({ patientName: '', phone: '', appointmentType: '', date: '', time: '' });
    }
  };

  const timeSlots = [
    '09:00', '09:30', '10:00', '10:30', '11:00', '11:30',
    '14:00', '14:30', '15:00', '15:30', '16:00', '16:30'
  ];

  const today = new Date().toISOString().split('T')[0];

  return (
    <Card className="w-full max-w-md mx-auto shadow-lg border-green-100">
      <CardHeader className="text-center bg-gradient-to-r from-green-50 to-blue-50 rounded-t-lg">
        <CardTitle className="text-2xl font-bold text-green-800 flex items-center justify-center gap-2">
          <Calendar className="h-6 w-6" />
          Schedule Appointment
        </CardTitle>
      </CardHeader>
      <CardContent className="p-6">
        <form onSubmit={handleSubmit} className="space-y-4">
          <div className="space-y-2">
            <Label htmlFor="patientName" className="text-sm font-medium text-gray-700">Patient Name</Label>
            <div className="relative">
              <User className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="patientName"
                placeholder="Enter patient name"
                value={formData.patientName}
                onChange={(e) => setFormData({ ...formData, patientName: e.target.value })}
                className="pl-10 border-green-200 focus:border-green-400"
                required
              />
            </div>
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
                className="pl-10 border-green-200 focus:border-green-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Appointment Type</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, appointmentType: value })}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="Select appointment type" />
              </SelectTrigger>
              <SelectContent className="bg-white border-green-200">
                <SelectItem value="consultation">General Consultation</SelectItem>
                <SelectItem value="followup">Follow-up Visit</SelectItem>
                <SelectItem value="checkup">Regular Check-up</SelectItem>
                <SelectItem value="emergency">Emergency</SelectItem>
              </SelectContent>
            </Select>
          </div>

          <div className="space-y-2">
            <Label htmlFor="date" className="text-sm font-medium text-gray-700">Date</Label>
            <div className="relative">
              <Calendar className="absolute left-3 top-3 h-4 w-4 text-gray-400" />
              <Input
                id="date"
                type="date"
                min={today}
                value={formData.date}
                onChange={(e) => setFormData({ ...formData, date: e.target.value })}
                className="pl-10 border-green-200 focus:border-green-400"
                required
              />
            </div>
          </div>

          <div className="space-y-2">
            <Label className="text-sm font-medium text-gray-700">Time Slot</Label>
            <Select onValueChange={(value) => setFormData({ ...formData, time: value })}>
              <SelectTrigger className="border-green-200 focus:border-green-400">
                <SelectValue placeholder="Select time slot" />
              </SelectTrigger>
              <SelectContent className="bg-white border-green-200">
                {timeSlots.map((time) => (
                  <SelectItem key={time} value={time}>
                    <div className="flex items-center gap-2">
                      <Clock className="h-4 w-4" />
                      {time}
                    </div>
                  </SelectItem>
                ))}
              </SelectContent>
            </Select>
          </div>

          <Button 
            type="submit" 
            className="w-full bg-gradient-to-r from-green-600 to-blue-600 hover:from-green-700 hover:to-blue-700 text-white font-semibold py-3 rounded-lg transition-all duration-200 transform hover:scale-[1.02]"
          >
            Schedule Appointment
          </Button>
        </form>
      </CardContent>
    </Card>
  );
};

export default AppointmentScheduler;
