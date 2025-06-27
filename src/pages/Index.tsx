
import React, { useState } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { SidebarProvider, SidebarTrigger, SidebarInset } from '@/components/ui/sidebar';
import { AppSidebar } from '@/components/AppSidebar';
import PatientCheckIn from '@/components/PatientCheckIn';
import QueueDisplay from '@/components/QueueDisplay';
import StaffPanel from '@/components/StaffPanel';
import AppointmentScheduler from '@/components/AppointmentScheduler';
import AppointmentsList from '@/components/AppointmentsList';
import { Stethoscope, Menu } from 'lucide-react';

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
  const [activeTab, setActiveTab] = useState('display');

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

  const renderContent = () => {
    switch (activeTab) {
      case 'display':
        return <QueueDisplay patients={patients} />;
      case 'checkin':
        return (
          <div className="flex justify-center">
            <PatientCheckIn onCheckIn={handleCheckIn} />
          </div>
        );
      case 'staff':
        return (
          <StaffPanel 
            patients={patients}
            onCallNext={handleCallNext}
            onCompletePatient={handleCompletePatient}
          />
        );
      case 'schedule':
        return (
          <div className="flex justify-center">
            <AppointmentScheduler onScheduleAppointment={handleScheduleAppointment} />
          </div>
        );
      case 'appointments':
        return (
          <AppointmentsList 
            appointments={appointments}
            onCompleteAppointment={handleCompleteAppointment}
            onCancelAppointment={handleCancelAppointment}
            onCheckInFromAppointment={handleCheckInFromAppointment}
          />
        );
      default:
        return <QueueDisplay patients={patients} />;
    }
  };

  return (
    <SidebarProvider>
      <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50 flex w-full">
        <AppSidebar activeTab={activeTab} onTabChange={setActiveTab} />
        
        <SidebarInset className="flex-1">
          <div className="container mx-auto px-4 py-6 max-w-7xl">
            {/* Header with Mobile Menu Toggle */}
            <div className="flex items-center gap-4 mb-6">
              <SidebarTrigger className="md:hidden" />
              <Card className="flex-1 shadow-lg bg-gradient-to-r from-blue-600 to-green-600 text-white border-0">
                <CardHeader className="text-center py-4">
                  <CardTitle className="text-2xl md:text-4xl font-bold flex items-center justify-center gap-3">
                    <Stethoscope className="h-6 w-6 md:h-10 md:w-10" />
                    MedFlow Queue Manager
                  </CardTitle>
                  <p className="text-blue-100 text-sm md:text-lg mt-2">
                    Streamline your clinic operations with smart queue management and appointments
                  </p>
                </CardHeader>
              </Card>
            </div>

            {/* Main Content */}
            <div className="space-y-6">
              {renderContent()}
            </div>

            {/* Footer */}
            <Card className="mt-8 bg-gray-50 border-gray-200">
              <CardContent className="text-center py-4">
                <p className="text-gray-600 text-sm">
                  MedFlow Queue Manager - Efficient healthcare queue management and appointment system
                </p>
              </CardContent>
            </Card>
          </div>
        </SidebarInset>
      </div>
    </SidebarProvider>
  );
};

export default Index;
