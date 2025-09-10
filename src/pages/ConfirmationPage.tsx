import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, MapPin, Users, CreditCard, Download, Share2 } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { navigateToHome, navigateToItinerary } from '../utils/navigation';
import { mockItineraryResponse } from '../data/mockApiResponse';

// Confetti component
const Confetti: React.FC = () => {
  const [confetti, setConfetti] = useState<Array<{
    id: number;
    x: number;
    y: number;
    color: string;
    rotation: number;
    velocity: number;
  }>>([]);

  useEffect(() => {
    const colors = ['#3B82F6', '#10B981', '#F59E0B', '#EF4444', '#8B5CF6', '#EC4899'];
    const newConfetti = Array.from({ length: 50 }, (_, i) => ({
      id: i,
      x: Math.random() * window.innerWidth,
      y: -10,
      color: colors[Math.floor(Math.random() * colors.length)],
      rotation: Math.random() * 360,
      velocity: Math.random() * 3 + 2,
    }));
    setConfetti(newConfetti);

    const interval = setInterval(() => {
      setConfetti(prev => 
        prev.map(particle => ({
          ...particle,
          y: particle.y + particle.velocity,
          rotation: particle.rotation + 2,
        })).filter(particle => particle.y < window.innerHeight + 50)
      );
    }, 16);

    return () => clearInterval(interval);
  }, []);

  return (
    <div className="fixed inset-0 pointer-events-none z-50">
      {confetti.map(particle => (
        <div
          key={particle.id}
          className="absolute w-2 h-2 rounded-full"
          style={{
            left: particle.x,
            top: particle.y,
            backgroundColor: particle.color,
            transform: `rotate(${particle.rotation}deg)`,
            opacity: particle.y > window.innerHeight - 100 ? 0 : 1,
          }}
        />
      ))}
    </div>
  );
};

export const ConfirmationPage: React.FC = () => {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const [showConfetti, setShowConfetti] = useState(true);

  // Use mock data for now
  const apiResponse = mockItineraryResponse;
  const itinerary = apiResponse.generatedItinerary?.budgeted;

  useEffect(() => {
    // Hide confetti after 3 seconds
    const timer = setTimeout(() => setShowConfetti(false), 3000);
    return () => clearTimeout(timer);
  }, []);

  const handleDownloadItinerary = () => {
    // Implement download functionality
    console.log('Downloading itinerary...');
  };

  const handleShareItinerary = () => {
    // Implement share functionality
    if (navigator.share) {
      navigator.share({
        title: 'My Amazing Trip Itinerary',
        text: `Check out my trip to ${apiResponse.to}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {showConfetti && <Confetti />}
      
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-4xl font-bold text-gray-900 mb-4">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your amazing trip to <span className="font-semibold text-blue-600">{apiResponse.to}</span> has been successfully booked. 
            Get ready for an unforgettable adventure!
          </p>
        </div>

        {/* Trip Summary Card */}
        <Card className="mb-8 border-0 shadow-xl bg-white/80 backdrop-blur-sm">
          <CardContent className="p-8">
            <div className="grid md:grid-cols-2 gap-8">
              {/* Trip Details */}
              <div className="space-y-6">
                <div>
                  <h2 className="text-2xl font-bold text-gray-900 mb-4">Trip Summary</h2>
                  <div className="space-y-4">
                    <div className="flex items-center gap-3">
                      <MapPin className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Destination</p>
                        <p className="font-semibold text-gray-900">{apiResponse.to}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">{apiResponse.timeframe}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Users className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Travelers</p>
                        <p className="font-semibold text-gray-900">2 Adults</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <CreditCard className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Package</p>
                        <Badge className="bg-blue-100 text-blue-800 border-blue-200">
                          Budgeted Tier
                        </Badge>
                      </div>
                    </div>
                  </div>
                </div>
              </div>

              {/* Booking Details */}
              <div className="space-y-6">
                <div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4">Booking Details</h3>
                  <div className="space-y-4">
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Booking ID</span>
                      <span className="font-mono text-sm font-semibold text-gray-900">
                        #{id || 'TRP-2024-001'}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Confirmation Date</span>
                      <span className="font-semibold text-gray-900">
                        {new Date().toLocaleDateString()}
                      </span>
                    </div>
                    <div className="flex justify-between items-center py-2 border-b border-gray-100">
                      <span className="text-gray-600">Status</span>
                      <Badge className="bg-green-100 text-green-800 border-green-200">
                        Confirmed
                      </Badge>
                    </div>
                    <div className="flex justify-between items-center py-2">
                      <span className="text-gray-600">Total Amount</span>
                      <span className="text-xl font-bold text-gray-900">$2,450</span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Next Steps */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-blue-50 to-indigo-50">
          <CardContent className="p-6">
            <h3 className="text-xl font-bold text-gray-900 mb-4">What's Next?</h3>
            <div className="grid md:grid-cols-3 gap-4">
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-blue-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <Calendar className="w-6 h-6 text-blue-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Check Your Calendar</h4>
                <p className="text-sm text-gray-600">We've added your trip dates to your calendar</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <CreditCard className="w-6 h-6 text-green-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Payment Processed</h4>
                <p className="text-sm text-gray-600">Your payment has been successfully processed</p>
              </div>
              <div className="text-center p-4 bg-white rounded-lg shadow-sm">
                <div className="w-12 h-12 bg-purple-100 rounded-full flex items-center justify-center mx-auto mb-3">
                  <MapPin className="w-6 h-6 text-purple-600" />
                </div>
                <h4 className="font-semibold text-gray-900 mb-2">Travel Documents</h4>
                <p className="text-sm text-gray-600">Check your email for detailed travel documents</p>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <Button
            onClick={() => navigateToItinerary(navigate, id || 'default')}
            className="flex items-center gap-2 px-8 py-3 bg-blue-600 hover:bg-blue-700 text-white font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            View Full Itinerary
            <ArrowRight className="w-4 h-4" />
          </Button>
          
          <Button
            onClick={handleDownloadItinerary}
            variant="outline"
            className="flex items-center gap-2 px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            Download PDF
          </Button>
          
          <Button
            onClick={handleShareItinerary}
            variant="outline"
            className="flex items-center gap-2 px-8 py-3 border-2 border-gray-300 hover:border-gray-400 text-gray-700 font-semibold rounded-lg shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer"
          >
            <Share2 className="w-4 h-4" />
            Share Trip
          </Button>
        </div>

        {/* Footer */}
        <div className="text-center mt-12">
          <p className="text-gray-500 mb-4">
            Need help? Contact our support team at{' '}
            <a href="mailto:support@travelapp.com" className="text-blue-600 hover:text-blue-700 font-semibold">
              support@cleartrip.com
            </a>
          </p>
          <Button
            onClick={() => navigateToHome(navigate)}
            variant="ghost"
            className="text-gray-500 hover:text-gray-700 cursor-pointer"
          >
            ← Back to Home
          </Button>
        </div>
      </div>
    </div>
  );
};
