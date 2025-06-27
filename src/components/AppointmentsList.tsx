
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { Calendar, Clock, User, Phone, CheckCircle, X } from 'lucide-react';

interface Appointment {
  id: number;
  patientName: string;
  phone: string;
  appointmentType: string;
  date: string;
  time: string;
  status: 'scheduled' | 'completed' | 'cancelled';
}

interface AppointmentsListProps {
  appointments: Appointment[];
  onCompleteAppointment: (appointmentId: number) => void;
  onCancelAppointment: (appointmentId: number) => void;
  onCheckInFromAppointment: (appointment: Appointment) => void;
}

const AppointmentsList = ({ 
  appointments, 
  onCompleteAppointment, 
  onCancelAppointment,
  onCheckInFromAppointment 
}: AppointmentsListProps) => {
  const getStatusColor = (status: string) => {
    switch (status) {
      case 'scheduled': return 'bg-blue-100 text-blue-800';
      case 'completed': return 'bg-green-100 text-green-800';
      case 'cancelled': return 'bg-red-100 text-red-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const getAppointmentTypeColor = (type: string) => {
    switch (type) {
      case 'emergency': return 'bg-red-100 text-red-800';
      case 'consultation': return 'bg-blue-100 text-blue-800';
      case 'followup': return 'bg-green-100 text-green-800';
      case 'checkup': return 'bg-purple-100 text-purple-800';
      default: return 'bg-gray-100 text-gray-800';
    }
  };

  const formatDate = (dateString: string) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', { 
      weekday: 'short', 
      year: 'numeric', 
      month: 'short', 
      day: 'numeric' 
    });
  };

  const isToday = (dateString: string) => {
    const today = new Date().toDateString();
    const appointmentDate = new Date(dateString).toDateString();
    return today === appointmentDate;
  };

  const todayAppointments = appointments.filter(apt => isToday(apt.date));
  const upcomingAppointments = appointments.filter(apt => !isToday(apt.date) && new Date(apt.date) > new Date());

  return (
    <div className="space-y-6">
      {/* Today's Appointments */}
      <Card className="shadow-lg border-blue-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-blue-800 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Today's Appointments ({todayAppointments.filter(apt => apt.status === 'scheduled').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {todayAppointments.length > 0 ? (
            <div className="space-y-3">
              {todayAppointments.map((appointment) => (
                <div key={appointment.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                  <div className="flex items-center justify-between mb-3">
                    <div>
                      <div className="font-semibold text-gray-800 flex items-center gap-2">
                        <User className="h-4 w-4" />
                        {appointment.patientName}
                      </div>
                      <div className="text-sm text-gray-600 flex items-center gap-4 mt-1">
                        <span className="flex items-center gap-1">
                          <Phone className="h-3 w-3" />
                          {appointment.phone}
                        </span>
                        <span className="flex items-center gap-1">
                          <Clock className="h-3 w-3" />
                          {appointment.time}
                        </span>
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getAppointmentTypeColor(appointment.appointmentType)}>
                        {appointment.appointmentType}
                      </Badge>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                  
                  {appointment.status === 'scheduled' && (
                    <div className="flex gap-2">
                      <Button
                        size="sm"
                        onClick={() => onCheckInFromAppointment(appointment)}
                        className="bg-green-600 hover:bg-green-700 text-white"
                      >
                        Check In to Queue
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onCompleteAppointment(appointment.id)}
                        className="border-blue-300 text-blue-700 hover:bg-blue-50"
                      >
                        <CheckCircle className="h-4 w-4 mr-1" />
                        Complete
                      </Button>
                      <Button
                        size="sm"
                        variant="outline"
                        onClick={() => onCancelAppointment(appointment.id)}
                        className="border-red-300 text-red-700 hover:bg-red-50"
                      >
                        <X className="h-4 w-4 mr-1" />
                        Cancel
                      </Button>
                    </div>
                  )}
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No appointments scheduled for today
            </div>
          )}
        </CardContent>
      </Card>

      {/* Upcoming Appointments */}
      <Card className="shadow-lg border-green-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
            <Calendar className="h-5 w-5" />
            Upcoming Appointments ({upcomingAppointments.filter(apt => apt.status === 'scheduled').length})
          </CardTitle>
        </CardHeader>
        <CardContent>
          {upcomingAppointments.length > 0 ? (
            <div className="space-y-3">
              {upcomingAppointments.slice(0, 5).map((appointment) => (
                <div key={appointment.id} className="p-3 bg-green-50 rounded-lg border border-green-200">
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">{appointment.patientName}</div>
                      <div className="text-sm text-gray-600">
                        {formatDate(appointment.date)} at {appointment.time} • {appointment.phone}
                      </div>
                    </div>
                    <div className="flex items-center gap-2">
                      <Badge className={getAppointmentTypeColor(appointment.appointmentType)}>
                        {appointment.appointmentType}
                      </Badge>
                      <Badge className={getStatusColor(appointment.status)}>
                        {appointment.status}
                      </Badge>
                    </div>
                  </div>
                </div>
              ))}
              {upcomingAppointments.length > 5 && (
                <div className="text-center text-gray-500 text-sm">
                  ...and {upcomingAppointments.length - 5} more upcoming appointments
                </div>
              )}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No upcoming appointments scheduled
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default AppointmentsList;
