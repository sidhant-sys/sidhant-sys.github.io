import React, { useState, useEffect } from 'react';
import { 
  Sparkles, 
  Mic, 
  ArrowRight, 
  Globe,
  Clock,
  Shield,
  Zap,
  MessageCircle,
  Briefcase,
  Mountain,
  Users
} from 'lucide-react';
import { Button } from './ui/button';
import { Card, CardContent } from './ui/card';
import { Header } from './Header';
import { useAppLogic } from '../hooks/useAppLogic';
import { useAppState } from '../hooks/useAppState';
import { useTrackingPolling } from '../hooks/useTrackingPolling';
import { Footer } from './Footer';
import { TypingText } from './TypingText';
import { useNavigate } from 'react-router-dom';
import { navigateToItinerary } from '../utils/navigation';
import { useItinerary } from '../contexts/ItineraryContext';

const DirectVoiceHomePage: React.FC = () => {
  const navigate = useNavigate();
  const [showChatInterface, setShowChatInterface] = useState(false);
  const [isWidgetOpen, setIsWidgetOpen] = useState(false);
  const { setApiResponse } = useItinerary();
  
  // Use proper state management
  const {
    messages,
    userRequest,
    selectedTier,
    currentStep,
    layoutMode,
    bookedItems,
    itinerary,
    destination,
    dates,
    setMessages,
    setUserRequest,
    setSelectedTier,
    setCurrentStep,
    setLayoutMode,
    setBookedItems,
    setItinerary,
    setDestination,
    setDates
  } = useAppState();
  
  const {
    handleVoiceInput,
    handleToggleListening
  } = useAppLogic({
    setMessages,
    setUserRequest,
    setSelectedTier,
    setCurrentStep,
    setLayoutMode,
    setBookedItems,
    setItinerary,
    setDestination,
    setDates
  });

  // Set up polling for tracking ID changes
  const {
    isPolling,
    isGeneratingItinerary,
    hasGeneratedItinerary,
    showSuccessMessage,
    dismissSuccessMessage
  } = useTrackingPolling({
    enabled: true,
    onItineraryGenerated: (data) => {
      // Store the API response in context
      setApiResponse(data);
      
      // Navigate to itinerary view with the actual itinerary ID from API response
      if (data && data.id) {
        navigateToItinerary(navigate, data.id);
      } else {
        console.error('No itinerary ID found in API response:', data);
        // Fallback to default if no ID is found
        navigate('/itinerary/default/view');
      }
    },
    onItineraryGenerationStart: () => {
      // Handle the start of itinerary generation
      console.log('Itinerary generation started');
    }
  });

  // Load ElevenLabs ConvAI widget script
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://unpkg.com/@elevenlabs/convai-widget-embed';
    script.async = true;
    script.type = 'text/javascript';
    document.head.appendChild(script);

    // Add global ElevenLabs widget to body
    const globalWidget = document.createElement('elevenlabs-convai');
    globalWidget.setAttribute('agent-id', 'agent_2901k4f0hzs4fg3t25wevecgpdgc');
    globalWidget.style.display = 'none';
    document.body.appendChild(globalWidget);

    // Add CSS to position ElevenLabs popup
    const style = document.createElement('style');
    style.textContent = `
      /* Position the ElevenLabs popup */
      elevenlabs-convai iframe {
        position: fixed !important;
        top: 50% !important;
        left: 50% !important;
        transform: translate(-50%, -50%) !important;
        width: 400px !important;
        height: 600px !important;
        z-index: 1001 !important;
        border: 1px solid #e5e7eb !important;
        border-radius: 12px !important;
        box-shadow: 0 10px 25px -5px rgba(0, 0, 0, 0.1), 0 10px 10px -5px rgba(0, 0, 0, 0.04) !important;
      }
    `;
    document.head.appendChild(style);

    return () => {
      const existingScript = document.querySelector('script[src="https://unpkg.com/@elevenlabs/convai-widget-embed"]');
      if (existingScript) {
        document.head.removeChild(existingScript);
      }
      const existingStyle = document.querySelector('style');
      if (existingStyle && existingStyle.textContent?.includes('elevenlabs-convai')) {
        document.head.removeChild(existingStyle);
      }
      const existingWidget = document.querySelector('elevenlabs-convai');
      if (existingWidget) {
        document.body.removeChild(existingWidget);
      }
    };
  }, []);

  // Handle messages from the ConvAI widget
  useEffect(() => {
    const handleMessage = (event: MessageEvent) => {
      if (event.data && event.data.type === 'convai-message') {
        const message = event.data.message;
        if (message && typeof message === 'string') {
          handleVoiceInput(message);
        }
      }
    };

    window.addEventListener('message', handleMessage);
    return () => window.removeEventListener('message', handleMessage);
  }, [handleVoiceInput]);

  // Function to close ElevenLabs widget
  const closeElevenLabsWidget = () => {
    const existingWidget = document.querySelector('elevenlabs-convai');
    if (existingWidget) {
      existingWidget.remove();
      setIsWidgetOpen(false);
    }
  };

  // Expose the close function globally so other components can use it
  useEffect(() => {
    (window as any).closeElevenLabsWidget = closeElevenLabsWidget;
    return () => {
      delete (window as any).closeElevenLabsWidget;
    };
  }, []);

  const handleStartVoiceRecording = () => {
    // Create and trigger ElevenLabs widget
    const createAndTriggerWidget = () => {
      // Remove any existing widget
      const existingWidget = document.querySelector('elevenlabs-convai');
      if (existingWidget) {
        existingWidget.remove();
      }

      // Create new widget
      const widget = document.createElement('elevenlabs-convai');
      widget.setAttribute('agent-id', 'agent_2901k4f0hzs4fg3t25wevecgpdgc');
      document.body.appendChild(widget);

      // Trigger the widget after a short delay
      setTimeout(() => {
        const clickEvent = new MouseEvent('click', {
          view: window,
          bubbles: true,
          cancelable: true
        });
        widget.dispatchEvent(clickEvent);
        setIsWidgetOpen(true);
      }, 100);
    };

    createAndTriggerWidget();
    handleToggleListening();
  };

  const features = [
    {
      icon: <Zap className="w-6 h-6" />,
      title: "AI-Powered Planning",
      description: "Advanced AI creates personalized itineraries that match your preferences, budget, and travel style"
    },
    {
      icon: <Clock className="w-6 h-6" />,
      title: "Instant Responses",
      description: "Get quick, accurate answers to travel questions and real-time itinerary updates"
    },
    {
      icon: <Globe className="w-6 h-6" />,
      title: "Global Coverage",
      description: "Access to destinations worldwide with local insights and recommendations"
    },
    {
      icon: <Shield className="w-6 h-6" />,
      title: "Secure & Reliable",
      description: "Your travel data is protected with enterprise-grade security and privacy"
    }
  ];

  const useCases = [
    {
      title: "Family Vacations",
      description: "Plan perfect family trips with kid-friendly activities and family-friendly accommodations",
      icon: <Users className="w-8 h-8 text-blue-600" />,
      color: "bg-blue-50 border-blue-200"
    },
    {
      title: "Business Travel",
      description: "Efficient business trip planning with meeting schedules and corporate accommodations",
      icon: <Briefcase className="w-8 h-8 text-green-600" />,
      color: "bg-green-50 border-green-200"
    },
    {
      title: "Adventure Travel",
      description: "Discover thrilling adventures and outdoor activities tailored to your adventure level",
      icon: <Mountain className="w-8 h-8 text-purple-600" />,
      color: "bg-purple-50 border-purple-200"
    },
    {
      title: "Cultural Exploration",
      description: "Immerse yourself in local culture with authentic experiences and historical sites",
      icon: <Globe className="w-8 h-8 text-orange-600" />,
      color: "bg-orange-50 border-orange-200"
    }
  ];

  const stats = [
    { number: "50K+", label: "Happy Travelers" },
    { number: "100+", label: "Countries Covered" },
    { number: "99.9%", label: "Uptime" },
    { number: "4.9/5", label: "User Rating" }
  ];

  // Show loading screen when generating itinerary
  if (isGeneratingItinerary) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="animate-spin rounded-full h-16 w-16 border-b-2 border-blue-600 mx-auto mb-4"></div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 font-circular">Generating Your Itinerary</h2>
          <p className="text-gray-600 font-circular">Please wait while we create your personalized travel plan...</p>
        </div>
      </div>
    );
  }

  // Show success message if available
  if (showSuccessMessage) {
    return (
      <div className="min-h-screen bg-white flex items-center justify-center">
        <div className="text-center">
          <div className="w-16 h-16 bg-green-100 rounded-full flex items-center justify-center mx-auto mb-4">
            <svg className="w-8 h-8 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M5 13l4 4L19 7" />
            </svg>
          </div>
          <h2 className="text-xl font-semibold text-gray-900 mb-2 font-circular">Request Received!</h2>
          <p className="text-gray-600 mb-4 font-circular">We're now generating your personalized itinerary...</p>
          <Button onClick={dismissSuccessMessage} variant="outline">
            Continue
          </Button>
        </div>
      </div>
    );
  }

  if (showChatInterface) {
    return (
      <div className="min-h-screen bg-white ">
        {/* Header */}
        <Header 
          showBackButton={true}
          onBackClick={() => setShowChatInterface(false)}
          title="AI Travel Assistant"
        />

        {/* Chat Messages */}
        <div className="max-w-4xl mx-auto px-4 py-8">
          <div className="space-y-6">
            {/* User Message */}
            <div className="flex justify-end">
              <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-md">
                <p className="text-sm">I'd like to plan a trip to Japan for next month</p>
              </div>
            </div>

            {/* AI Response */}
            <div className="flex justify-start">
              <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md max-w-md">
                <p className="text-sm">Great choice! Japan is amazing in spring. I'm creating a personalized itinerary for you with cherry blossom viewing, cultural experiences, and local cuisine. Let me suggest some amazing experiences...</p>
                <p className="text-xs text-gray-500 mt-2">AI Travel Assistant</p>
              </div>
            </div>
          </div>
        </div>
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-white">
      {/* Header */}
      <Header />
      
      {/* Hero Section */}
      <section className="relative overflow-hidden bg-gradient-to-br from-blue-50 via-white to-indigo-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-16 lg:py-24">
          <div className="grid grid-cols-1 lg:grid-cols-2 gap-12 items-center">
            {/* Left Section - CTA */}
            <div className="text-left">
              {/* Badge */}
              <div className="inline-flex items-center gap-2 px-4 py-2 bg-blue-100 text-blue-800 rounded-full text-sm font-medium mb-8">
                <Sparkles className="w-4 h-4" />
                AI-Powered Travel Planning
              </div>

              {/* Main Headline */}
              <h1 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 leading-tight font-circular">
                Ready to build your
                <span className="block bg-gradient-to-r from-blue-600 to-indigo-600 bg-clip-text text-transparent">
                  AI Powered Itinerary?
                </span>
              </h1>

              {/* Subtitle */}
              <p className="text-xl text-gray-600 mb-8 leading-relaxed font-circular min-h-[1.5rem]">
                <TypingText 
                  text="Create and customize your travel itinerary in minutes."
                  speed={40}
                  delay={800}
                  showCursor={true}
                  cursorBlinkSpeed={500}
                />
              </p>

              {/* CTA Button */}
              <Button
                onClick={handleStartVoiceRecording}
                disabled={isWidgetOpen}
                className="bg-blue-600 hover:bg-blue-700 text-white px-8 py-4 text-lg font-semibold rounded-xl shadow-lg hover:shadow-xl transition-all duration-200 cursor-pointer disabled:opacity-50 disabled:cursor-not-allowed"
              >
                {isWidgetOpen ? (
                  <>
                    <MessageCircle className="w-5 h-5 mr-2" />
                    Chat is open
                  </>
                ) : (
                  <>
                    Let's start
                    <ArrowRight className="w-5 h-5 ml-2" />
                  </>
                )}
              </Button>
            </div>

            {/* Right Section - Chatbot Interface Demo */}
            <div className="relative">
              <Card className="shadow-2xl border-0 bg-white overflow-hidden">
                <CardContent className="p-0">
                  {/* Chatbot Header */}
                  <div className="bg-blue-600 px-6 py-4 flex items-center justify-between">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-white/20 rounded-full flex items-center justify-center">
                        <Mic className="w-5 h-5 text-white" />
                      </div>
                      <div>
                        <h3 className="text-white font-semibold">AI Travel Assistant</h3>
                        {/* <div className="flex items-center gap-2">
                          <div className="w-2 h-2 bg-green-400 rounded-full"></div>
                          <span className="text-blue-100 text-sm">24/7 Online</span>
                        </div> */}
                      </div>
                    </div>
                    <div className="w-6 h-6 bg-white/20 rounded flex items-center justify-center">
                      <ArrowRight className="w-4 h-4 text-white" />
                    </div>
                  </div>

                  {/* Chat Messages */}
                  <div className="p-6 space-y-4 border border-gray-200" style={{borderBottomLeftRadius: '16px', borderBottomRightRadius: '16px'}}>
                    {/* User Message */}
                    <div className="flex justify-end">
                      <div className="bg-blue-600 text-white px-4 py-3 rounded-2xl rounded-br-md max-w-xs">
                        <p className="text-sm">I'd like to schedule a trip to Paris</p>
                      </div>
                    </div>

                    {/* AI Response */}
                    <div className="flex justify-start">
                      <div className="bg-gray-100 text-gray-900 px-4 py-3 rounded-2xl rounded-bl-md max-w-xs">
                        <p className="text-sm">Paris is perfect! I'm creating a personalized itinerary with the Eiffel Tower, Louvre, and local cafes. Shall I book it for you?</p>
                        <p className="text-xs text-gray-500 mt-1">AI Travel Assistant</p>
                      </div>
                    </div>
                  </div>
                </CardContent>
              </Card>
            </div>
          </div>
        </div>

        {/* Background Elements */}
        <div className="absolute top-20 left-10 w-20 h-20 bg-blue-200 rounded-full opacity-20 animate-pulse"></div>
        <div className="absolute top-40 right-20 w-16 h-16 bg-indigo-200 rounded-full opacity-30 animate-pulse delay-1000"></div>
        <div className="absolute bottom-20 left-1/4 w-12 h-12 bg-purple-200 rounded-full opacity-25 animate-pulse delay-2000"></div>
      </section>

      {/* Features Section */}
      <section className="py-16 lg:py-24">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 font-circular">
              Why Choose Our AI Travel Assistant?
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-circular">
              Experience the future of travel planning with cutting-edge AI technology 
              that understands your needs and preferences.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-4">
            {features.map((feature, index) => (
              <Card key={index} className="border-0 shadow-lg hover:shadow-xl transition-all duration-300 cursor-pointer group">
                <CardContent className="p-8 text-center">
                  <div className="w-16 h-16 flex items-center justify-center mx-auto mb-6 group-hover:bg-blue-200 transition-colors">
                    <div className="text-blue-600">
                      {feature.icon}
                    </div>
                  </div>
                  <h3 className="text-xl font-bold text-gray-900 mb-4 font-circular">
                    {feature.title}
                  </h3>
                  <p className="text-gray-600 leading-relaxed font-circular">
                    {feature.description}
                  </p>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Use Cases Section */}
      <section className="py-16 lg:py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl lg:text-2xl font-bold text-gray-900 mb-6 font-circular">
              Perfect for Every Traveler
            </h2>
            <p className="text-xl text-gray-600 max-w-3xl mx-auto font-circular">
              Whether you're planning a family vacation, business trip, or adventure getaway, 
              our AI assistant adapts to your unique travel style.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8 mt-6">
            {useCases.map((useCase, index) => (
              <Card key={index} className={`border-2 ${useCase.color} hover:shadow-lg transition-all duration-300 cursor-pointer group`}>
                <CardContent className="p-8">
                  <div className="flex items-start gap-6">
                    <div className="flex-shrink-0">
                      {useCase.icon}
                    </div>
                    <div>
                      <h3 className="text-md font-bold text-gray-900 mb-4 font-circular">
                        {useCase.title}
                      </h3>
                      <p className="text-gray-600 leading-relaxed font-circular">
                        {useCase.description}
                      </p>
                    </div>
                  </div>
                </CardContent>
              </Card>
            ))}
          </div>
        </div>
      </section>

      {/* Stats Section */}
      <section className="py-16 lg:py-24 bg-gradient-to-r from-blue-600 to-indigo-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center mb-16">
            <h2 className="text-xl lg:text-2xl font-bold text-white mb-6 font-circular">
              Trusted by Travelers Worldwide
            </h2>
            <p className="text-md font-circular text-white">
              Join thousands of travelers who have discovered the joy of AI-powered trip planning.
            </p>
          </div>

          <div className="grid grid-cols-2 lg:grid-cols-4 gap-8 mt-6">
            {stats.map((stat, index) => (
              <div key={index} className="text-center">
                <div className="text-xl lg:text-2xl font-bold text-white mb-2">
                  {stat.number}
                </div>
                <div className="text-white font-medium">
                  {stat.label}
                </div>
              </div>
            ))}
          </div>
          <div style={{marginTop: '48px'}}><Footer  /></div>
        </div>
      </section>
    </div>
  );
};

export default DirectVoiceHomePage;
