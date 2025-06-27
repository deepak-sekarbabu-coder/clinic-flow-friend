
import React from 'react';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, CheckCircle, Clock, AlertTriangle } from 'lucide-react';

interface Patient {
  id: number;
  name: string;
  phone: string;
  appointmentType: string;
  status: 'waiting' | 'in-progress' | 'completed';
  checkInTime: string;
  queueNumber: number;
}

interface StaffPanelProps {
  patients: Patient[];
  onCallNext: () => void;
  onCompletePatient: (patientId: number) => void;
}

const StaffPanel = ({ patients, onCallNext, onCompletePatient }: StaffPanelProps) => {
  const waitingPatients = patients.filter(p => p.status === 'waiting');
  const inProgressPatients = patients.filter(p => p.status === 'in-progress');
  const completedToday = patients.filter(p => p.status === 'completed').length;

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
      {/* Staff Actions */}
      <Card className="shadow-lg bg-gradient-to-r from-green-50 to-blue-50 border-green-200">
        <CardHeader>
          <CardTitle className="text-xl font-bold text-green-800 flex items-center gap-2">
            <Clock className="h-5 w-5" />
            Staff Controls
          </CardTitle>
        </CardHeader>
        <CardContent className="space-y-4">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <Button 
              onClick={onCallNext}
              disabled={waitingPatients.length === 0}
              className="bg-blue-600 hover:bg-blue-700 text-white font-semibold py-3 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02]"
            >
              <ArrowRight className="h-4 w-4" />
              Call Next Patient
            </Button>
            
            {inProgressPatients.map((patient) => (
              <Button
                key={patient.id}
                onClick={() => onCompletePatient(patient.id)}
                className="bg-green-600 hover:bg-green-700 text-white font-semibold py-3 flex items-center justify-center gap-2 transition-all duration-200 transform hover:scale-[1.02]"
              >
                <CheckCircle className="h-4 w-4" />
                Complete #{patient.queueNumber}
              </Button>
            ))}
          </div>
          
          <div className="text-sm text-gray-600 text-center">
            {waitingPatients.length} patients waiting • {completedToday} completed today
          </div>
        </CardContent>
      </Card>

      {/* Current Patient */}
      {inProgressPatients.length > 0 && (
        <Card className="shadow-lg border-blue-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-blue-800 flex items-center gap-2">
              <AlertTriangle className="h-5 w-5" />
              Currently Serving
            </CardTitle>
          </CardHeader>
          <CardContent>
            {inProgressPatients.map((patient) => (
              <div key={patient.id} className="p-4 bg-blue-50 rounded-lg border border-blue-200">
                <div className="flex items-center justify-between">
                  <div>
                    <div className="text-xl font-bold text-blue-800">
                      #{patient.queueNumber} - {patient.name}
                    </div>
                    <div className="text-sm text-gray-600">
                      Phone: {patient.phone} • Checked in: {patient.checkInTime}
                    </div>
                  </div>
                  <Badge className={getAppointmentTypeColor(patient.appointmentType)}>
                    {patient.appointmentType.toUpperCase()}
                  </Badge>
                </div>
              </div>
            ))}
          </CardContent>
        </Card>
      )}

      {/* Next in Queue */}
      {waitingPatients.length > 0 && (
        <Card className="shadow-lg border-yellow-200">
          <CardHeader>
            <CardTitle className="text-lg font-bold text-yellow-800 flex items-center gap-2">
              <Clock className="h-5 w-5" />
              Next in Queue
            </CardTitle>
          </CardHeader>
          <CardContent>
            <div className="space-y-3">
              {waitingPatients.slice(0, 3).map((patient, index) => (
                <div 
                  key={patient.id}
                  className={`p-3 rounded-lg border ${index === 0 ? 'bg-yellow-50 border-yellow-200' : 'bg-gray-50 border-gray-200'}`}
                >
                  <div className="flex items-center justify-between">
                    <div>
                      <div className="font-semibold text-gray-800">
                        #{patient.queueNumber} - {patient.name}
                      </div>
                      <div className="text-sm text-gray-600">
                        {patient.phone} • Position: {index + 1}
                      </div>
                    </div>
                    <Badge className={getAppointmentTypeColor(patient.appointmentType)}>
                      {patient.appointmentType}
                    </Badge>
                  </div>
                </div>
              ))}
              {waitingPatients.length > 3 && (
                <div className="text-center text-gray-500 text-sm">
                  ...and {waitingPatients.length - 3} more patients waiting
                </div>
              )}
            </div>
          </CardContent>
        </Card>
      )}
    </div>
  );
};

export default StaffPanel;
