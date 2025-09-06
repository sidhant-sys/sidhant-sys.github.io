import { ItineraryApiResponse } from '../types/api';

// Mock API response based on the provided example
export const mockItineraryResponse: ItineraryApiResponse = {
  "id": "68bc875a178d760720083dfe",
  "from": "Mumbai",
  "to": "New York",
  "fromIata": "BOM",
  "toIata": "JFK",
  "numberOfTravellers": 1,
  "budget": 200000.0,
  "typeOfTrip": "ENTERTAINMENT",
  "timeframe": "7 days",
  "numberOfAdults": 1,
  "numberOfKids": 0,
  "generatedItinerary": {
    "budgeted": {
      "overview": {
        "trip_type": "ENTERTAINMENT",
        "total_travellers": {
          "adults": 1,
          "kids": 0
        },
        "duration": "7 days, 6 nights",
        "total_cost": 7739.7,
        "cost_breakdown": {
          "flights": 4476.67,
          "hotels": 433.5,
          "activities": 73.0,
          "meals": 600,
          "commute": 2156.53
        }
      },
      "days": [
        {
          "day": 1,
          "schedule": [
            {
              "type": "flight",
              "airline": "AI",
              "departure_time": "01:40 AM",
              "arrival_time": "07:55 AM",
              "class": "Economy",
              "price": 4476.67
            },
            {
              "type": "commute",
              "from": "JFK Airport",
              "to": "Budget Inn JFK",
              "mode": "Taxi",
              "departure_time": "08:15 AM",
              "arrival_time": "09:00 AM",
              "price": 50
            },
            {
              "type": "hotel",
              "name": "Budget Inn JFK",
              "check_in": "09:00 AM",
              "price": 85.0,
              "amenities": ["Standard rooms with basic amenities"]
            }
          ]
        },
        {
          "day": 2,
          "schedule": [
            {
              "type": "activity",
              "name": "Live Music Venue",
              "description": "Experience local music scene",
              "start_time": "07:00 PM",
              "end_time": "10:00 PM",
              "price": 35.0
            },
            {
              "type": "meal",
              "name": "Dinner",
              "location": "Local Restaurant near venue",
              "price": 50,
              "time": "10:30 PM"
            }
          ]
        },
        {
          "day": 3,
          "schedule": [
            {
              "type": "activity",
              "name": "Comedy Show Experience",
              "description": "Laugh out loud with local comedians",
              "start_time": "08:00 PM",
              "end_time": "10:00 PM",
              "price": 28
            },
            {
              "type": "meal",
              "name": "Dinner",
              "location": "Local Restaurant near venue",
              "price": 50,
              "time": "10:30 PM"
            }
          ]
        },
        {
          "day": 4,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast",
              "location": "Hotel",
              "price": 20,
              "time": "8:00 AM"
            }
          ]
        },
        {
          "day": 5,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast",
              "location": "Hotel",
              "price": 20,
              "time": "8:00 AM"
            }
          ]
        },
        {
          "day": 6,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast",
              "location": "Hotel",
              "price": 20,
              "time": "8:00 AM"
            }
          ]
        },
        {
          "day": 7,
          "schedule": [
            {
              "type": "commute",
              "from": "Budget Inn JFK",
              "to": "JFK Airport",
              "mode": "Taxi",
              "departure_time": "08:00 AM",
              "arrival_time": "08:45 AM",
              "price": 50
            },
            {
              "type": "flight",
              "airline": "AI",
              "departure_time": "11:10 AM",
              "arrival_time": "11:35 AM (+1 day)",
              "class": "Economy",
              "price": 4476.67
            }
          ]
        }
      ],
      "upsell": [
        {
          "type": "flight",
          "name": "Premium Economy to Virgin Atlantic",
          "upgrade_cost": 3665.67,
          "benefits": ["More legroom", "Better meals", "Priority boarding"]
        },
        {
          "type": "hotel",
          "name": "Grand JFK Hotel",
          "upgrade_cost": 100,
          "benefits": ["4-star amenities", "Upgraded room", "Better location"]
        }
      ]
    },
    "premium": {
      "overview": {
        "trip_type": "ENTERTAINMENT",
        "total_travellers": {
          "adults": 1,
          "kids": 0
        },
        "duration": "7 days, 6 nights",
        "total_cost": 10700.44,
        "cost_breakdown": {
          "flights": 7749.0,
          "hotels": 1117.5,
          "activities": 73.0,
          "meals": 600,
          "commute": 1160.94
        }
      },
      "days": [],
      "upsell": []
    },
    "luxury": {
      "overview": {
        "trip_type": "ENTERTAINMENT",
        "total_travellers": {
          "adults": 1,
          "kids": 0
        },
        "duration": "7 days, 6 nights",
        "total_cost": 14157.11,
        "cost_breakdown": {
          "flights": 10325.58,
          "hotels": 1785,
          "activities": 73.0,
          "meals": 900,
          "commute": 1073.53
        }
      },
      "days": [],
      "upsell": []
    }
  },
  "createdAt": "2025-09-07T00:41:22.926108",
  "updatedAt": "2025-09-07T00:41:22.926184"
};
