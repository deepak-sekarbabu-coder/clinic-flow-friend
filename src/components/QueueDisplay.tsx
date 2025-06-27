
import React from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { Clock, Users, AlertCircle } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  phone: string;
  appointmentType: string;
  status: 'waiting' | 'in-progress' | 'completed';
  checkInTime: string;
  queueNumber: number;
}

interface QueueDisplayProps {
  patients: Patient[];
}

const QueueDisplay = ({ patients }: QueueDisplayProps) => {
  const waitingPatients = patients.filter(p => p.status === 'waiting');
  const inProgressPatients = patients.filter(p => p.status === 'in-progress');
  const currentPatient = inProgressPatients[0];

  const getStatusColor = (status: string) => {
    switch (status) {
      case 'waiting': return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      case 'in-progress': return 'bg-blue-100 text-blue-800 border-blue-200';
      case 'completed': return 'bg-green-100 text-green-800 border-green-200';
      default: return 'bg-gray-100 text-gray-800 border-gray-200';
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

  return (
    <div className="space-y-6">
      {/* Current Patient Display */}
      <Card className="shadow-lg border-2 border-blue-200 bg-gradient-to-r from-blue-50 to-white">
        <CardHeader className="text-center">
          <CardTitle className="text-3xl font-bold text-blue-800 flex items-center justify-center gap-2">
            <AlertCircle className="h-8 w-8" />
            Now Serving
          </CardTitle>
        </CardHeader>
        <CardContent className="text-center">
          {currentPatient ? (
            <div className="space-y-4">
              <div className="text-6xl font-bold text-blue-600 animate-pulse">
                #{currentPatient.queueNumber}
              </div>
              <div className="text-xl font-semibold text-gray-800">
                {currentPatient.name}
              </div>
              <Badge className={getAppointmentTypeColor(currentPatient.appointmentType)}>
                {currentPatient.appointmentType.toUpperCase()}
              </Badge>
            </div>
          ) : (
            <div className="text-2xl text-gray-500">
              No patient currently being served
            </div>
          )}
        </CardContent>
      </Card>

      {/* Queue Statistics */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
        <Card className="bg-gradient-to-r from-yellow-50 to-orange-50 border-yellow-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-yellow-600" />
              <span className="font-semibold text-yellow-800">Waiting</span>
            </div>
            <div className="text-3xl font-bold text-yellow-600">
              {waitingPatients.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-blue-50 to-cyan-50 border-blue-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Clock className="h-5 w-5 text-blue-600" />
              <span className="font-semibold text-blue-800">In Progress</span>
            </div>
            <div className="text-3xl font-bold text-blue-600">
              {inProgressPatients.length}
            </div>
          </CardContent>
        </Card>

        <Card className="bg-gradient-to-r from-green-50 to-emerald-50 border-green-200">
          <CardContent className="p-4 text-center">
            <div className="flex items-center justify-center gap-2 mb-2">
              <Users className="h-5 w-5 text-green-600" />
              <span className="font-semibold text-green-800">Total Today</span>
            </div>
            <div className="text-3xl font-bold text-green-600">
              {patients.length}
            </div>
          </CardContent>
        </Card>
      </div>

      {/* Queue List */}
      <Card className="shadow-lg">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-gray-800 flex items-center gap-2">
            <Users className="h-5 w-5" />
            Current Queue ({waitingPatients.length} waiting)
          </CardTitle>
        </CardHeader>
        <CardContent>
          {waitingPatients.length > 0 ? (
            <div className="space-y-3">
              {waitingPatients.map((patient, index) => (
                <div 
                  key={patient.id} 
                  className="flex items-center justify-between p-4 bg-gradient-to-r from-gray-50 to-white rounded-lg border border-gray-200 hover:shadow-md transition-shadow"
                >
                  <div className="flex items-center gap-4">
                    <div className="text-2xl font-bold text-blue-600">
                      #{patient.queueNumber}
                    </div>
                    <div>
                      <div className="font-semibold text-gray-800">{patient.name}</div>
                      <div className="text-sm text-gray-600">
                        Checked in at {patient.checkInTime}
                      </div>
                    </div>
                  </div>
                  <div className="flex items-center gap-2">
                    <Badge className={getAppointmentTypeColor(patient.appointmentType)}>
                      {patient.appointmentType}
                    </Badge>
                    <Badge className={getStatusColor(patient.status)}>
                      Position: {index + 1}
                    </Badge>
                  </div>
                </div>
              ))}
            </div>
          ) : (
            <div className="text-center py-8 text-gray-500">
              No patients in queue
            </div>
          )}
        </CardContent>
      </Card>
    </div>
  );
};

export default QueueDisplay;
