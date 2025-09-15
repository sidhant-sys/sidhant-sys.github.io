import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { CheckCircle, ArrowRight, Calendar, MapPin, Users, CreditCard, Download, Share2, FileText, Eye, Plane, Hotel } from 'lucide-react';
import { Button } from '../components/ui/button';
import { Card, CardContent } from '../components/ui/card';
import { Badge } from '../components/ui/badge';
import { Header } from '../components/Header';
import { navigateToHome, navigateToItinerary } from '../utils/navigation';
import { useItinerary } from '../contexts/ItineraryContext';
import { StackedFixedProvider, useStackedFixedContext } from '../contexts/StackedFixedContext';
import { getItineraryByTrackingId } from '../services/itineraryApi';

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
  const { apiResponse, setApiResponse } = useItinerary();
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Fetch itinerary data if not available in context (e.g., on page refresh)
  useEffect(() => {
    const fetchItineraryData = async () => {
      if (!apiResponse && id) {
        setIsLoading(true);
        setError(null);
        
        try {
          const response = await getItineraryByTrackingId(id);
          
          if (response.success && response.data) {
            setApiResponse(response.data);
          } else {
            setError(response.error || 'Failed to load itinerary');
          }
        } catch (err) {
          setError(err instanceof Error ? err.message : 'An unexpected error occurred');
        } finally {
          setIsLoading(false);
        }
      }
    };

    fetchItineraryData();
  }, [apiResponse, id, setApiResponse]);

  // Show loading state while fetching data
  if (isLoading || (!apiResponse && id)) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary mx-auto mb-4"></div>
          <p className="text-muted-foreground">Loading confirmation...</p>
        </div>
      </div>
    );
  }

  // Show error state if fetch failed
  if (error) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-red-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-red-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M12 9v2m0 4h.01m-6.938 4h13.856c1.54 0 2.502-1.667 1.732-2.5L13.732 4c-.77-.833-1.964-.833-2.732 0L3.732 16.5c-.77.833.192 2.5 1.732 2.5z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">Failed to Load Confirmation</h2>
          <p className="text-muted-foreground mb-4">{error}</p>
          <button
            onClick={() => {
              setError(null);
              if (id) {
                setApiResponse(null);
                // Trigger refetch
                setIsLoading(true);
              }
            }}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Try Again
          </button>
        </div>
      </div>
    );
  }

  // Show message if no ID provided and no data in context
  if (!apiResponse && !id) {
    return (
      <div className="min-h-screen bg-background flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 mx-auto mb-4 bg-gray-100 rounded-full flex items-center justify-center">
            <svg className="w-8 h-8 text-gray-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.172 16.172a4 4 0 015.656 0M9 12h6m-6-4h6m2 5.291A7.962 7.962 0 0112 15c-2.34 0-4.29-1.009-5.824-2.709M15 6.5a3 3 0 11-6 0 3 3 0 016 0z" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-foreground mb-2">No Confirmation Found</h2>
          <p className="text-muted-foreground mb-4">Please start by planning a trip from the home page.</p>
          <button
            onClick={() => navigateToHome(navigate)}
            className="px-4 py-2 bg-primary text-primary-foreground rounded-lg hover:bg-primary/90 transition-colors"
          >
            Go to Home
          </button>
        </div>
      </div>
    );
  }

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
        text: `Check out my trip to ${apiResponse?.to || 'your destination'}!`,
        url: window.location.href,
      });
    } else {
      navigator.clipboard.writeText(window.location.href);
      // Show toast notification
    }
  };

  // PDF handling functions - Make GET API calls to Amadeus CLTP
  const handleViewPDF = async (pdfUrl: string) => {
    console.log('View PDF clicked, URL:', pdfUrl);
    if (pdfUrl) {
      try {
        // Construct full URL with Amadeus CLTP domain
        const fullUrl = pdfUrl.startsWith('/') 
          ? `https://amadeus.cltp.in${pdfUrl}`
          : `https://amadeus.cltp.in/${pdfUrl}`;
        
        console.log('Making API call to:', fullUrl);
        
        // Make GET API call to view PDF
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf',
          },
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          window.open(url, '_blank');
          // Clean up the URL object after a delay
          setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } else {
          console.error('Failed to fetch PDF:', response.status);
          alert('Failed to load PDF. Please try again.');
        }
      } catch (error) {
        console.error('Error fetching PDF:', error);
        alert('Error loading PDF. Please check your connection.');
      }
    } else {
      console.log('No PDF URL available');
    }
  };

  const handleDownloadPDF = async (pdfUrl: string, filename: string) => {
    console.log('Download PDF clicked, URL:', pdfUrl, 'Filename:', filename);
    if (pdfUrl) {
      try {
        // Construct full URL with Amadeus CLTP domain
        const fullUrl = pdfUrl.startsWith('/') 
          ? `https://amadeus.cltp.in${pdfUrl}`
          : `https://amadeus.cltp.in/${pdfUrl}`;
        
        console.log('Making API call to:', fullUrl);
        
        // Make GET API call to download PDF
        const response = await fetch(fullUrl, {
          method: 'GET',
          headers: {
            'Accept': 'application/pdf',
          },
        });
        
        if (response.ok) {
          const blob = await response.blob();
          const url = window.URL.createObjectURL(blob);
          
          // Create download link
          const link = document.createElement('a');
          link.href = url;
          link.download = filename;
          document.body.appendChild(link);
          link.click();
          document.body.removeChild(link);
          
          // Clean up the URL object after a delay
          setTimeout(() => window.URL.revokeObjectURL(url), 1000);
        } else {
          console.error('Failed to download PDF:', response.status);
          alert('Failed to download PDF. Please try again.');
        }
      } catch (error) {
        console.error('Error downloading PDF:', error);
        alert('Error downloading PDF. Please check your connection.');
      }
    } else {
      console.log('No PDF URL available for download');
    }
  };

  // Debug logging
  console.log('API Response:', apiResponse);
  console.log('Flight Booking Result:', apiResponse?.flightBookingResult);
  console.log('Hotel Booking Result:', apiResponse?.hotelBookingResult);

  return (
    <StackedFixedProvider>
      <ConfirmationContent 
        showConfetti={showConfetti}
        navigate={navigate}
        apiResponse={apiResponse}
        id={id}
        handleViewPDF={handleViewPDF}
        handleDownloadPDF={handleDownloadPDF}
        handleDownloadItinerary={handleDownloadItinerary}
        handleShareItinerary={handleShareItinerary}
      />
    </StackedFixedProvider>
  );
};

const ConfirmationContent: React.FC<{
  showConfetti: boolean;
  navigate: any;
  apiResponse: any;
  id: string | undefined;
  handleViewPDF: (url: string) => void;
  handleDownloadPDF: (url: string, filename: string) => void;
  handleDownloadItinerary: () => void;
  handleShareItinerary: () => void;
}> = ({ 
  showConfetti, 
  navigate, 
  apiResponse, 
  id, 
  handleViewPDF, 
  handleDownloadPDF, 
  handleDownloadItinerary, 
  handleShareItinerary 
}) => {
  const { getContentPadding } = useStackedFixedContext();

  return (
    <div className="min-h-screen bg-gradient-to-br from-blue-50 via-white to-green-50">
      {showConfetti && <Confetti />}
      
      {/* Header */}
      <Header 
        showBackButton={true}
        onBackClick={() => navigateToHome(navigate)}
        title="Booking Confirmed"
      />
      
      {/* Dynamic top padding based on all fixed elements */}
      <div style={{ paddingTop: `${getContentPadding()}px` }}>
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        {/* Header */}
        <div className="text-center mb-12">
          <div className="inline-flex items-center justify-center w-20 h-20 bg-green-100 rounded-full mb-6 animate-pulse">
            <CheckCircle className="w-10 h-10 text-green-600" />
          </div>
          <h1 className="text-2xl font-bold text-gray-900 mb-4">
            Booking Confirmed! 🎉
          </h1>
          <p className="text-lg text-gray-600 max-w-2xl mx-auto">
            Your amazing trip to <span className="font-semibold text-blue-600">{apiResponse?.to || 'your destination'}</span> has been successfully booked. 
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
                        <p className="font-semibold text-gray-900">{apiResponse?.to || 'Destination'}</p>
                      </div>
                    </div>
                    <div className="flex items-center gap-3">
                      <Calendar className="w-5 h-5 text-blue-600" />
                      <div>
                        <p className="text-sm text-gray-500">Duration</p>
                        <p className="font-semibold text-gray-900">{apiResponse?.timeframe || 'Dates'}</p>
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

        {/* Booking Vouchers */}
        <Card className="mb-8 border-0 shadow-lg bg-gradient-to-r from-green-50 to-blue-50">
          <CardContent className="p-6">
            <div className="flex items-center gap-2 mb-6">
              <FileText className="w-6 h-6 text-green-600" />
              <h3 className="text-xl font-bold text-gray-900">Booking Vouchers</h3>
            </div>
            
            <div className="grid md:grid-cols-2 gap-6">
              {/* Flight Voucher */}
              {apiResponse?.flightBookingResult && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-blue-100 rounded-full flex items-center justify-center">
                      <Plane className="w-5 h-5 text-blue-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Flight Booking Voucher</h4>
                      {/* <p className="text-sm text-gray-500">Reference: {apiResponse.flightBookingResult.bookingReference || 'N/A'}</p> */}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewPDF(apiResponse.flightBookingResult?.pdfViewUrl || '')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Voucher
                    </Button>
                    <Button
                      onClick={() => handleDownloadPDF(
                        apiResponse.flightBookingResult?.pdfDownloadUrl || '',
                        `flight_voucher_${apiResponse.flightBookingResult?.bookingReference || 'CT'}.pdf`
                      )}
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}

              {/* Hotel Voucher */}
              {apiResponse?.hotelBookingResult && (
                <div className="bg-white rounded-xl p-6 shadow-sm border border-gray-100">
                  <div className="flex items-center gap-3 mb-4">
                    <div className="w-10 h-10 bg-purple-100 rounded-full flex items-center justify-center">
                      <Hotel className="w-5 h-5 text-purple-600" />
                    </div>
                    <div>
                      <h4 className="font-semibold text-gray-900">Hotel Booking Voucher</h4>
                      {/* <p className="text-sm text-gray-500">Reference: {apiResponse.hotelBookingResult.data?.bookingReference || 'N/A'}</p> */}
                    </div>
                  </div>
                  
                  <div className="flex gap-2">
                    <Button
                      onClick={() => handleViewPDF(apiResponse.hotelBookingResult?.pdfViewUrl || '')}
                      className="flex-1 bg-blue-600 hover:bg-blue-700 text-white cursor-pointer"
                    >
                      <Eye className="w-4 h-4 mr-2" />
                      View Voucher
                    </Button>
                    <Button
                      onClick={() => handleDownloadPDF(
                        apiResponse.hotelBookingResult?.pdfDownloadUrl || '',
                        `hotel_voucher_${apiResponse.hotelBookingResult?.data?.bookingReference || 'HT'}.pdf`
                      )}
                      variant="outline"
                      className="flex-1 border-blue-200 text-blue-600 hover:bg-blue-50 cursor-pointer"
                    >
                      <Download className="w-4 h-4 mr-2" />
                      Download
                    </Button>
                  </div>
                </div>
              )}
            </div>

            {/* No vouchers message */}
            {!apiResponse?.flightBookingResult && !apiResponse?.hotelBookingResult && (
              <div className="text-center py-8">
                <FileText className="w-12 h-12 text-gray-300 mx-auto mb-3" />
                <p className="text-gray-500">No booking vouchers available at this time.</p>
              </div>
            )}
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
        {/* <div className="flex flex-col sm:flex-row gap-4 justify-center">
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
        </div> */}

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
    </div>
  );
};
