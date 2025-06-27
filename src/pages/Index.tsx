
import React, { useState } from 'react';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import PatientCheckIn from '@/components/PatientCheckIn';
import QueueDisplay from '@/components/QueueDisplay';
import StaffPanel from '@/components/StaffPanel';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import AppointmentsList from '@/components/AppointmentsList';
import { Stethoscope, Users, Settings, Monitor, Calendar, CalendarCheck } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  phone: string;
  appointmentType: string;
  status: 'waiting' | 'in-progress' | 'completed';
  checkInTime: string;
  queueNumber: number;
}

interface Appointment {
  id: number;
  patientName: string;
  phone: string;
  appointmentType: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

const Index = () => {
  const [patients, setPatients] = useState<Patient[]>([]);
  const [appointments, setAppointments] = useState<Appointment[]>([]);

  const handleCheckIn = (patient: Patient) => {
    setPatients(prev => [...prev, patient]);
  };

  const handleScheduleAppointment = (appointment: Appointment) => {
    setAppointments(prev => [...prev, appointment]);
  };

  const handleCompleteAppointment = (appointmentId: number) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'completed' as const } : apt
      )
    );
  };

  const handleCancelAppointment = (appointmentId: number) => {
    setAppointments(prev => 
      prev.map(apt => 
        apt.id === appointmentId ? { ...apt, status: 'cancelled' as const } : apt
      )
    );
  };

  const handleCheckInFromAppointment = (appointment: Appointment) => {
    const patient: Patient = {
      id: Date.now(),
      name: appointment.patientName,
      phone: appointment.phone,
      appointmentType: appointment.appointmentType,
      status: 'waiting',
      checkInTime: new Date().toLocaleTimeString(),
      queueNumber: Math.floor(Math.random() * 900) + 100
    };
    handleCheckIn(patient);
  };

  const handleCallNext = () => {
    setPatients(prev => {
      const waitingPatients = prev.filter(p => p.status === 'waiting');
      if (waitingPatients.length === 0) return prev;
      
      const nextPatient = waitingPatients[0];
      return prev.map(p => 
        p.id === nextPatient.id ? { ...p, status: 'in-progress' as const } : p
      );
    });
  };

  const handleCompletePatient = (patientId: number) => {
    setPatients(prev => 
      prev.map(p => 
        p.id === patientId ? { ...p, status: 'completed' as const } : p
      )
    );
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      <div className="container mx-auto px-4 py-6 max-w-7xl">
        {/* Header */}
        <Card className="mb-6 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
          <CardHeader className="text-center">
            <CardTitle className="text-4xl font-bold flex items-center justify-center gap-3">
              <Stethoscope className="h-10 w-10" />
              MedFlow Queue Manager
            </CardTitle>
            <p className="text-blue-100 text-lg mt-2">
              Streamline your clinic operations with smart queue management and appointments
            </p>
          </CardHeader>
        </Card>

        {/* Main Content */}
        <Tabs defaultValue="display" className="space-y-6">
          <TabsList className="grid w-full grid-cols-5 h-14 bg-white shadow-md rounded-lg">
            <TabsTrigger 
              value="display" 
              className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-blue-600 data-[state=active]:text-white"
            >
              <Monitor className="h-4 w-4" />
              Queue Display
            </TabsTrigger>
            <TabsTrigger 
              value="checkin" 
              className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-green-600 data-[state=active]:text-white"
            >
              <Users className="h-4 w-4" />
              Patient Check-In
            </TabsTrigger>
            <TabsTrigger 
              value="staff" 
              className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-purple-600 data-[state=active]:text-white"
            >
              <Settings className="h-4 w-4" />
              Staff Panel
            </TabsTrigger>
            <TabsTrigger 
              value="schedule" 
              className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-orange-600 data-[state=active]:text-white"
            >
              <Calendar className="h-4 w-4" />
              Schedule
            </TabsTrigger>
            <TabsTrigger 
              value="appointments" 
              className="flex items-center gap-2 text-base font-medium data-[state=active]:bg-teal-600 data-[state=active]:text-white"
            >
              <CalendarCheck className="h-4 w-4" />
              Appointments
            </TabsTrigger>
          </TabsList>

          <TabsContent value="display" className="space-y-6">
            <QueueDisplay patients={patients} />
          </TabsContent>

          <TabsContent value="checkin" className="space-y-6">
            <div className="flex justify-center">
              <PatientCheckIn onCheckIn={handleCheckIn} />
            </div>
          </TabsContent>

          <TabsContent value="staff" className="space-y-6">
            <StaffPanel 
              patients={patients}
              onCallNext={handleCallNext}
              onCompletePatient={handleCompletePatient}
            />
          </TabsContent>

          <TabsContent value="schedule" className="space-y-6">
            <div className="flex justify-center">
              <AppointmentScheduler onScheduleAppointment={handleScheduleAppointment} />
            </div>
          </TabsContent>

          <TabsContent value="appointments" className="space-y-6">
            <AppointmentsList 
              appointments={appointments}
              onCompleteAppointment={handleCompleteAppointment}
              onCancelAppointment={handleCancelAppointment}
              onCheckInFromAppointment={handleCheckInFromAppointment}
            />
          </TabsContent>
        </Tabs>

        {/* Footer */}
        <Card className="mt-8 bg-gray-50 border-gray-200">
          <CardContent className="text-center py-4">
            <p className="text-gray-600 text-sm">
              MedFlow Queue Manager - Efficient healthcare queue management and appointment system
            </p>
          </CardContent>
        </Card>
      </div>
    </div>
  );
};

export default Index;
