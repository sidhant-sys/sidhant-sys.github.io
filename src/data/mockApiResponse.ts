import { ItineraryApiResponse } from '../types/api';

// Mock API response based on the provided example
export const mockItineraryResponse: ItineraryApiResponse = {
  "id": "68beccdb8caa071934803d49",
  "from": "Mumbai",
  "to": "New York",
  "fromIata": "BOM",
  "toIata": "JFK",
  "numberOfTravellers": 1,
  "budget": 200000,
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
        "total_cost": 1756.72,
        "cost_breakdown": {
          "flights": 854.27,
          "hotels": 581.25,
          "activities": 39,
          "meals": 200,
          "commute": 82
        }
      },
      "flights": [
        {
          "flight_name": "AI 119",
          "flight_origin": "BOM",
          "flight_destination": "JFK",
          "flight_duration": "15h 45m",
          "flight_price": 854.27,
          "flight_date": "2025-10-01",
          "flight_time": "01:40"
        },
        {
          "flight_name": "AI 197",
          "flight_origin": "JFK",
          "flight_destination": "BOM",
          "flight_duration": "14h 55m",
          "flight_price": 854.27,
          "flight_date": "2025-10-18",
          "flight_time": "11:10"
        }
      ],
      "hotels": [
        {
          "hotel_name": "Budget Inn JFK",
          "hotel_address": "123 Mock Street, Unknown City",
          "hotel_room_type": "Standard Room",
          "hotel_hotel_class": "2",
          "hotel_price": 72.25,
          "hotel_check_in_date": "2025-10-01",
          "hotel_check_out_date": "2025-10-18"
        }
      ],
      "upsell": [
        {
          "upsell_type": "flight",
          "upsell_name": "Premium Economy Flight Upgrade",
          "upsell_price": 345.73,
          "upsell_benefits": [
            "More legroom",
            "Better meals"
          ],
          "upsell_description": "Upgrade your flight to premium economy for enhanced comfort.",
          "upsell_link": ""
        },
        {
          "upsell_type": "hotel",
          "upsell_name": "Mid-Range Hotel Upgrade",
          "upsell_price": 85,
          "upsell_benefits": [
            "Better amenities",
            "Improved location"
          ],
          "upsell_description": "Upgrade to a mid-range hotel for a more comfortable stay.",
          "upsell_link": ""
        }
      ],
      "days": [
        {
          "day": 1,
          "schedule": [
            {
              "type": "flight",
              "flight_name": "AI 119",
              "flight_origin": "BOM",
              "flight_destination": "JFK",
              "flight_duration": "15h 45m",
              "departure_time": "01:40",
              "arrival_time": "07:55",
              "price": ""
            },
            {
              "type": "commute",
              "from": "JFK Airport",
              "to": "Budget Inn JFK",
              "mode": "Taxi",
              "departure_time": "09:00",
              "arrival_time": "10:00",
              "price": 40
            },
            {
              "type": "hotel",
              "name": "Budget Inn JFK",
              "check_in_time": "11:00",
              "price": ""
            }
          ]
        },
        {
          "day": 2,
          "schedule": [
            {
              "type": "activity",
              "name": "London Theatre: Disney's Hercules",
              "description": null,
              "location": {
                "longitude": -0.1198823,
                "latitude": 51.5124056
              },
              "start_time": "14:00",
              "end_time": "17:00",
              "price": 39,
              "bookingUrl": "https://amadeus.booking.holibob.tech/product/ec359c7a-cb9d-431e-bf1a-39cd037a0bee"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 3,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "activity",
              "name": "Exploring New York",
              "start_time": "10:00",
              "end_time": "16:00",
              "price": 0,
              "details": "Explore famous New York landmarks"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 4,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "activity",
              "name": "Visit Museums",
              "start_time": "10:00",
              "end_time": "16:00",
              "price": 0,
              "details": "Visit popular museums"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 5,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "activity",
              "name": "Shopping",
              "start_time": "10:00",
              "end_time": "16:00",
              "price": 0,
              "details": "Enjoy shopping"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 6,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "commute",
              "from": "Budget Inn JFK",
              "to": "JFK Airport",
              "mode": "Taxi",
              "departure_time": "09:00",
              "arrival_time": "10:00",
              "price": 42
            }
          ]
        },
        {
          "day": 7,
          "schedule": [
            {
              "type": "flight",
              "flight_name": "AI 197",
              "flight_origin": "JFK",
              "flight_destination": "BOM",
              "flight_duration": "14h 55m",
              "departure_time": "11:10",
              "arrival_time": "11:35",
              "price": ""
            }
          ]
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
        "total_cost": 2761.72,
        "cost_breakdown": {
          "flights": 1225,
          "hotels": 1221.25,
          "activities": 39,
          "meals": 200,
          "commute": 76.47
        }
      },
      "flights": [
        {
          "flight_name": "6E MOCK123",
          "flight_origin": "BOM",
          "flight_destination": "JFK",
          "flight_duration": "8h 30m",
          "flight_price": 1200,
          "flight_date": "2025-10-01",
          "flight_time": "10:00"
        },
        {
          "flight_name": "6E MOCK123",
          "flight_origin": "JFK",
          "flight_destination": "BOM",
          "flight_duration": "8h 30m",
          "flight_price": 1200,
          "flight_date": "2025-10-18",
          "flight_time": "10:00"
        }
      ],
      "hotels": [
        {
          "hotel_name": "Grand JFK Hotel",
          "hotel_address": "123 Mock Street, Unknown City",
          "hotel_room_type": "Standard Room",
          "hotel_hotel_class": "4",
          "hotel_price": 157.25,
          "hotel_check_in_date": "2025-10-01",
          "hotel_check_out_date": "2025-10-18"
        }
      ],
      "upsell": [
        {
          "upsell_type": "flight",
          "upsell_name": "Business Class Flight Upgrade",
          "upsell_price": 2092.57,
          "upsell_benefits": [
            "Lie-flat seats",
            "Gourmet meals",
            "Lounge access"
          ],
          "upsell_description": "Experience ultimate luxury with a business class upgrade.",
          "upsell_link": ""
        },
        {
          "upsell_type": "hotel",
          "upsell_name": "Luxury Hotel Upgrade",
          "upsell_price": 140,
          "upsell_benefits": [
            "Premium amenities",
            "Exclusive services",
            "Top-notch location"
          ],
          "upsell_description": "Indulge in a luxurious stay at a premium hotel.",
          "upsell_link": ""
        }
      ],
      "days": [
        {
          "day": 1,
          "schedule": [
            {
              "type": "flight",
              "flight_name": "6E MOCK123",
              "flight_origin": "BOM",
              "flight_destination": "JFK",
              "flight_duration": "8h 30m",
              "departure_time": "10:00",
              "arrival_time": "18:30",
              "price": ""
            },
            {
              "type": "commute",
              "from": "JFK Airport",
              "to": "Grand JFK Hotel",
              "mode": "Taxi",
              "departure_time": "19:30",
              "arrival_time": "20:30",
              "price": 35
            },
            {
              "type": "hotel",
              "name": "Grand JFK Hotel",
              "check_in_time": "21:00",
              "price": ""
            }
          ]
        },
        {
          "day": 2,
          "schedule": [
            {
              "type": "activity",
              "name": "London Theatre: Disney's Hercules",
              "description": null,
              "location": {
                "longitude": -0.1198823,
                "latitude": 51.5124056
              },
              "start_time": "14:00",
              "end_time": "17:00",
              "price": 39,
              "bookingUrl": "https://amadeus.booking.holibob.tech/product/ec359c7a-cb9d-431e-bf1a-39cd037a0bee"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 3,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "activity",
              "name": "Exploring New York",
              "start_time": "10:00",
              "end_time": "16:00",
              "price": 0,
              "details": "Explore famous New York landmarks"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 4,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "activity",
              "name": "Visit Museums",
              "start_time": "10:00",
              "end_time": "16:00",
              "price": 0,
              "details": "Visit popular museums"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 5,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "activity",
              "name": "Shopping",
              "start_time": "10:00",
              "end_time": "16:00",
              "price": 0,
              "details": "Enjoy shopping"
            },
            {
              "type": "meal",
              "name": "Dinner at Local Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 50
            }
          ]
        },
        {
          "day": 6,
          "schedule": [
            {
              "type": "meal",
              "name": "Breakfast at hotel",
              "time": "08:00",
              "price": 20
            },
            {
              "type": "commute",
              "from": "Grand JFK Hotel",
              "to": "JFK Airport",
              "mode": "Taxi",
              "departure_time": "09:00",
              "arrival_time": "10:00",
              "price": 41.47
            }
          ]
        },
        {
          "day": 7,
          "schedule": [
            {
              "type": "flight",
              "flight_name": "6E MOCK123",
              "flight_origin": "JFK",
              "flight_destination": "BOM",
              "flight_duration": "8h 30m",
              "departure_time": "10:00",
              "arrival_time": "18:30",
              "price": ""
            }
          ]
        }
      ]
    },
    "luxury": {
      "overview": {
        "trip_type": "ENTERTAINMENT",
        "total_travellers": {
          "adults": 1,
          "kids": 0
        },
        "duration": "7 days, 6 nights",
        "total_cost": 4504.34,
        "cost_breakdown": {
          "flights": 3317.57,
          "hotels": 873.75,
          "activities": 39,
          "meals": 200,
          "commute": 74
        }
      },
      "flights": [
        {
          "flight_name": "AI 119",
          "flight_origin": "BOM",
          "flight_destination": "JFK",
          "flight_duration": "15h 45m",
          "flight_price": 3317.57,
          "flight_date": "2025-10-01",
          "flight_time": "01:40"
        },
        {
          "flight_name": "AI 1330/AI 2421",
          "flight_origin": "JFK",
          "flight_destination": "BOM",
          "flight_duration": "9h 20m",
          "flight_price": 3317.57,
          "flight_date": "2025-10-18",
          "flight_time": "10:00"
        }
      ],
      "hotels": [
        {
          "hotel_name": "Luxury Palace JFK",
          "hotel_address": "123 Mock Street, Unknown City",
          "hotel_room_type": "Standard Room",
          "hotel_hotel_class": "5",
          "hotel_price": 297.5,
          "hotel_check_in_date": "2025-10-01",
          "hotel_check_out_date": "2025-10-18"
        }
      ],
      "upsell": [
        {
          "upsell_type": "activity",
          "upsell_name": "Private City Tour",
          "upsell_price": 500,
          "upsell_benefits": [
            "Personalized experience",
            "Skip-the-line access"
          ],
          "upsell_description": "Enjoy a private tour of New York City with a dedicated guide.",
          "upsell_link": ""
        },
        {
          "upsell_type": "hotel",
          "upsell_name": "Suite Upgrade",
          "upsell_price": 1000,
          "upsell_benefits": [
            "More space",
            "Exclusive amenities",
            "Butler service"
          ],
          "upsell_description": "Upgrade to a luxurious suite for an unforgettable stay.",
          "upsell_link": ""
        }
      ],
      "days": []
    }
  },
  "flightResponse": {
    "business": [
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "disablePricing": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "paymentCardRequired": false,
        "lastTicketingDate": "2025-09-28",
        "numberOfBookableSeats": 2,
        "itineraries": [
          {
            "duration": "PT15H45M",
            "segments": [
              {
                "departure": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-10-01T01:40:00"
                },
                "arrival": {
                  "iataCode": "JFK",
                  "terminal": "4",
                  "at": "2025-10-01T07:55:00"
                },
                "carrierCode": "AI",
                "number": "119",
                "aircraft": {
                  "code": "77W"
                },
                "operating": {
                  "carrierCode": "AI"
                },
                "duration": "PT15H45M",
                "id": "10",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          },
          {
            "duration": "PT9H20M",
            "segments": [
              {
                "departure": {
                  "iataCode": "JFK",
                  "terminal": "4",
                  "at": "2025-10-18T10:00:00"
                },
                "arrival": {
                  "iataCode": "DEL",
                  "terminal": "3",
                  "at": "2025-10-18T23:00:00"
                },
                "carrierCode": "AI",
                "number": "1330",
                "aircraft": {
                  "code": "32N"
                },
                "operating": {
                  "carrierCode": "AI"
                },
                "duration": "PT3H30M",
                "id": "27",
                "numberOfStops": 0,
                "blacklistedInEU": false
              },
              {
                "departure": {
                  "iataCode": "DEL",
                  "terminal": "3",
                  "at": "2025-10-19T02:30:00"
                },
                "arrival": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-10-19T04:50:00"
                },
                "carrierCode": "AI",
                "number": "2421",
                "aircraft": {
                  "code": "32N"
                },
                "operating": {
                  "carrierCode": "AI"
                },
                "duration": "PT2H20M",
                "id": "28",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "USD",
          "total": "3317.57",
          "base": "2566.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "3317.57"
        },
        "pricingOptions": {
          "includedCheckedBagsOnly": true,
          "fareType": [
            "PUBLISHED"
          ],
          "refundableFare": false,
          "noRestrictionFare": false,
          "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
          "AI"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "USD",
              "total": "3317.57",
              "base": "2566.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "10",
                "cabin": "BUSINESS",
                "fareBasis": "ZA2CWSBO",
                "brandedFare": "BUSCLAS",
                "class": "Z",
                "isAllotment": false,
                "includedCheckedBags": {
                  "quantity": 2,
                  "weight": 0
                },
                "amenities": [
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": false,
                    "amenityType": "PRE_RESERVED_SEAT"
                  },
                  {
                    "description": "MEAL SERVICES",
                    "isChargeable": false,
                    "amenityType": "MEAL"
                  },
                  {
                    "description": "REFUNDABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "UPGRADE",
                    "isChargeable": true,
                    "amenityType": "UPGRADES"
                  },
                  {
                    "description": "FREE CHECKED BAGGAGE ALLOWANCE",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES"
                  }
                ]
              },
              {
                "segmentId": "27",
                "cabin": "BUSINESS",
                "fareBasis": "ZA2CWSBO",
                "brandedFare": "BUSCLAS",
                "class": "Z",
                "isAllotment": false,
                "includedCheckedBags": {
                  "quantity": 2,
                  "weight": 0
                },
                "amenities": [
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": false,
                    "amenityType": "PRE_RESERVED_SEAT"
                  },
                  {
                    "description": "MEAL SERVICES",
                    "isChargeable": false,
                    "amenityType": "MEAL"
                  },
                  {
                    "description": "REFUNDABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "UPGRADE",
                    "isChargeable": true,
                    "amenityType": "UPGRADES"
                  },
                  {
                    "description": "FREE CHECKED BAGGAGE ALLOWANCE",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES"
                  }
                ]
              },
              {
                "segmentId": "28",
                "cabin": "PREMIUM_ECONOMY",
                "fareBasis": "ZA2CWSBO",
                "brandedFare": "BUSCLAS",
                "class": "R",
                "isAllotment": false,
                "includedCheckedBags": {
                  "quantity": 2,
                  "weight": 0
                },
                "amenities": [
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": false,
                    "amenityType": "PRE_RESERVED_SEAT"
                  },
                  {
                    "description": "MEAL SERVICES",
                    "isChargeable": false,
                    "amenityType": "MEAL"
                  },
                  {
                    "description": "REFUNDABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "UPGRADE",
                    "isChargeable": true,
                    "amenityType": "UPGRADES"
                  },
                  {
                    "description": "FREE CHECKED BAGGAGE ALLOWANCE",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES"
                  }
                ]
              }
            ]
          }
        ]
      }
    ],
    "premium_economy": [
      {
        "type": "flight-offer",
        "id": "MOCK_PREMIUM_ECONOMY_119",
        "source": "GDS",
        "instantTicketingRequired": false,
        "disablePricing": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "paymentCardRequired": false,
        "lastTicketingDate": "2025-12-31",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "duration": "PT8H30M",
            "segments": [
              {
                "departure": {
                  "iataCode": "BOM",
                  "at": "2025-10-01T10:00:00"
                },
                "arrival": {
                  "iataCode": "JFK",
                  "at": "2025-10-01T18:30:00"
                },
                "carrierCode": "6E",
                "number": "MOCK123",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "6E"
                },
                "duration": "PT8H30M",
                "id": "1",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "USD",
          "total": "1200.00",
          "base": "1175.00",
          "fees": [
            {
              "amount": "25.00",
              "type": "SUPPLIER"
            }
          ],
          "grandTotal": "1225.00"
        },
        "pricingOptions": {
          "includedCheckedBagsOnly": true,
          "fareType": [
            "PUBLISHED"
          ],
          "refundableFare": false,
          "noRestrictionFare": false,
          "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
          "6E"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "USD",
              "total": "1200.00",
              "base": "1175.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "PREMIUM_ECONOMY",
                "fareBasis": "MOCK123",
                "brandedFare": "BASIC",
                "class": "W",
                "isAllotment": false,
                "includedCheckedBags": {
                  "quantity": 1,
                  "weight": 0
                }
              }
            ]
          }
        ]
      }
    ],
    "economy": [
      {
        "type": "flight-offer",
        "id": "1",
        "source": "GDS",
        "instantTicketingRequired": false,
        "disablePricing": false,
        "nonHomogeneous": false,
        "oneWay": false,
        "paymentCardRequired": false,
        "lastTicketingDate": "2025-10-01",
        "numberOfBookableSeats": 9,
        "itineraries": [
          {
            "duration": "PT15H45M",
            "segments": [
              {
                "departure": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-10-01T01:40:00"
                },
                "arrival": {
                  "iataCode": "JFK",
                  "terminal": "4",
                  "at": "2025-10-01T07:55:00"
                },
                "carrierCode": "AI",
                "number": "119",
                "aircraft": {
                  "code": "77W"
                },
                "operating": {
                  "carrierCode": "AI"
                },
                "duration": "PT15H45M",
                "id": "12",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          },
          {
            "duration": "PT14H55M",
            "segments": [
              {
                "departure": {
                  "iataCode": "JFK",
                  "terminal": "4",
                  "at": "2025-10-18T11:10:00"
                },
                "arrival": {
                  "iataCode": "BOM",
                  "terminal": "2",
                  "at": "2025-10-19T11:35:00"
                },
                "carrierCode": "AI",
                "number": "197",
                "aircraft": {
                  "code": "319"
                },
                "operating": {
                  "carrierCode": "AI"
                },
                "duration": "PT14H55M",
                "id": "35",
                "numberOfStops": 0,
                "blacklistedInEU": false
              }
            ]
          }
        ],
        "price": {
          "currency": "USD",
          "total": "854.27",
          "base": "415.00",
          "fees": [
            {
              "amount": "0.00",
              "type": "SUPPLIER"
            },
            {
              "amount": "0.00",
              "type": "TICKETING"
            }
          ],
          "grandTotal": "854.27",
          "additionalServices": [
            {
              "amount": "218.40",
              "type": "CHECKED_BAGS"
            }
          ]
        },
        "pricingOptions": {
          "includedCheckedBagsOnly": true,
          "fareType": [
            "PUBLISHED"
          ],
          "refundableFare": false,
          "noRestrictionFare": false,
          "noPenaltyFare": false
        },
        "validatingAirlineCodes": [
          "AI"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "USD",
              "total": "854.27",
              "base": "415.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "12",
                "cabin": "ECONOMY",
                "fareBasis": "SL2YXRBO",
                "brandedFare": "ECOVALU",
                "class": "S",
                "isAllotment": false,
                "includedCheckedBags": {
                  "quantity": 1,
                  "weight": 0
                },
                "amenities": [
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": false,
                    "amenityType": "PRE_RESERVED_SEAT"
                  },
                  {
                    "description": "MEAL SERVICES",
                    "isChargeable": false,
                    "amenityType": "MEAL"
                  },
                  {
                    "description": "REFUNDABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "UPGRADE",
                    "isChargeable": true,
                    "amenityType": "UPGRADES"
                  },
                  {
                    "description": "FREE CHECKED BAGGAGE ALLOWANCE",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES"
                  }
                ]
              },
              {
                "segmentId": "35",
                "cabin": "ECONOMY",
                "fareBasis": "UL2YXSBO",
                "brandedFare": "ECOVALU",
                "class": "U",
                "isAllotment": false,
                "includedCheckedBags": {
                  "quantity": 1,
                  "weight": 0
                },
                "amenities": [
                  {
                    "description": "PRE RESERVED SEAT ASSIGNMENT",
                    "isChargeable": false,
                    "amenityType": "PRE_RESERVED_SEAT"
                  },
                  {
                    "description": "MEAL SERVICES",
                    "isChargeable": false,
                    "amenityType": "MEAL"
                  },
                  {
                    "description": "REFUNDABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "CHANGEABLE TICKET",
                    "isChargeable": true,
                    "amenityType": "BRANDED_FARES"
                  },
                  {
                    "description": "UPGRADE",
                    "isChargeable": true,
                    "amenityType": "UPGRADES"
                  },
                  {
                    "description": "FREE CHECKED BAGGAGE ALLOWANCE",
                    "isChargeable": false,
                    "amenityType": "BRANDED_FARES"
                  }
                ]
              }
            ]
          }
        ]
      }
    ]
  },
  "hotelResponse": {
    "MID_RANGE": [
      {
        "offers": [
          {
            "checkOutDate": "2025-10-18",
            "price": {
              "total": "185.00",
              "taxes": [
                {
                  "amount": "27.75",
                  "code": "TOTAL_TAX",
                  "included": true,
                  "percentage": "15.00"
                }
              ],
              "currency": "USD",
              "base": "157.25"
            },
            "guests": {
              "adults": 1
            },
            "policies": {
              "cancellation": {
                "type": "FULL_STAY",
                "deadline": "2025-10-01"
              },
              "paymentType": "GUARANTEE"
            },
            "self": {
              "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_961"
            },
            "rateFamilyEstimated": {
              "type": "P",
              "code": "PRO"
            },
            "id": "MOCK_OFFER_961",
            "checkInDate": "2025-10-01",
            "rateCode": "RAC",
            "room": {
              "typeEstimated": {
                "category": "STANDARD_ROOM",
                "bedType": "KING",
                "beds": 1
              },
              "description": {
                "text": "Well-appointed rooms with modern amenities"
              },
              "type": "A1K"
            }
          }
        ],
        "hotel": {
          "address": {
            "cityName": "Unknown City",
            "countryCode": "XX",
            "lines": [
              "123 Mock Street, Unknown City"
            ]
          },
          "cityCode": "JFK",
          "name": "Grand JFK Hotel",
          "rating": "4-star",
          "hotelId": "MOCK_HOTEL_MID_RANGE_JFK"
        },
        "id": "MOCK_MID_RANGE_JFK_8961",
        "type": "hotel-offer"
      }
    ],
    "LUXURY": [
      {
        "offers": [
          {
            "checkOutDate": "2025-10-18",
            "price": {
              "total": "350.00",
              "taxes": [
                {
                  "amount": "52.50",
                  "code": "TOTAL_TAX",
                  "included": true,
                  "percentage": "15.00"
                }
              ],
              "currency": "USD",
              "base": "297.50"
            },
            "guests": {
              "adults": 1
            },
            "policies": {
              "cancellation": {
                "type": "FULL_STAY",
                "deadline": "2025-10-01"
              },
              "paymentType": "GUARANTEE"
            },
            "self": {
              "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_961"
            },
            "rateFamilyEstimated": {
              "type": "P",
              "code": "PRO"
            },
            "id": "MOCK_OFFER_961",
            "checkInDate": "2025-10-01",
            "rateCode": "RAC",
            "room": {
              "typeEstimated": {
                "category": "STANDARD_ROOM",
                "bedType": "KING",
                "beds": 1
              },
              "description": {
                "text": "Luxurious accommodations with premium services"
              },
              "type": "A1K"
            }
          }
        ],
        "hotel": {
          "address": {
            "cityName": "Unknown City",
            "countryCode": "XX",
            "lines": [
              "123 Mock Street, Unknown City"
            ]
          },
          "cityCode": "JFK",
          "name": "Luxury Palace JFK",
          "rating": "5-star",
          "hotelId": "MOCK_HOTEL_LUXURY_JFK"
        },
        "id": "MOCK_LUXURY_JFK_8961",
        "type": "hotel-offer"
      }
    ],
    "STANDARD": [
      {
        "offers": [
          {
            "checkOutDate": "2025-10-18",
            "price": {
              "total": "85.00",
              "taxes": [
                {
                  "amount": "12.75",
                  "code": "TOTAL_TAX",
                  "included": true,
                  "percentage": "15.00"
                }
              ],
              "currency": "USD",
              "base": "72.25"
            },
            "guests": {
              "adults": 1
            },
            "policies": {
              "cancellation": {
                "type": "FULL_STAY",
                "deadline": "2025-10-01"
              },
              "paymentType": "GUARANTEE"
            },
            "self": {
              "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_961"
            },
            "rateFamilyEstimated": {
              "type": "P",
              "code": "PRO"
            },
            "id": "MOCK_OFFER_961",
            "checkInDate": "2025-10-01",
            "rateCode": "RAC",
            "room": {
              "typeEstimated": {
                "category": "STANDARD_ROOM",
                "bedType": "KING",
                "beds": 1
              },
              "description": {
                "text": "Standard rooms with basic amenities"
              },
              "type": "A1K"
            }
          }
        ],
        "hotel": {
          "address": {
            "cityName": "Unknown City",
            "countryCode": "XX",
            "lines": [
              "123 Mock Street, Unknown City"
            ]
          },
          "cityCode": "JFK",
          "name": "Budget Inn JFK",
          "rating": "2-star",
          "hotelId": "MOCK_HOTEL_STANDARD_JFK"
        },
        "id": "MOCK_STANDARD_JFK_8960",
        "type": "hotel-offer"
      }
    ]
  },
  "activityResponse": {
    "ENTERTAINMENT": [
      {
        "images": [
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzMyNTIyNGI0LTM2MWMtNDA5Mi1iMDBlLWY2MTYxMjg1OTBhMSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzRmMGI4ZTNjLTVlYjQtNDBkZi1iMzM1LTMxMTFmNmYyNjc5YyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzFkMmNlOTc1LTAwYjYtNGIyZC1hMjYxLWM2NzYyMWZkZjk0YyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzM5ZmMwNTRjLTJhYWQtNGJjNC05OGZhLTNiMjk2NGE5MzdkNSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzU4MDIyN2EwLWJkNTYtNGExMi1hNjFmLTUwOTU1NTI3OTlkNCIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzZiNGYxZDMyLTU3NTAtNDJhOC05YzNiLWZiZmFlNzFhNTc3NSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0="
        ],
        "price": {
          "currency": "GBP",
          "amount": "39.0"
        },
        "bookingUrl": "https://amadeus.booking.holibob.tech/product/ec359c7a-cb9d-431e-bf1a-39cd037a0bee",
        "name": "London Theatre: Disney's Hercules",
        "description": null,
        "location": {
          "longitude": -0.1198823,
          "latitude": 51.5124056
        },
        "_source": "AMADEUS_API",
        "id": "139702724"
      }
    ],
    "_metadata": {
      "totalCategories": 0,
      "searchTimestamp": "2025-09-08T12:31:31.632924Z",
      "searchDurationMs": 2669,
      "currency": "USD",
      "searchLocation": {
        "latitude": 51.5074,
        "longitude": 0.1278,
        "radius": "25km"
      }
    }
  },
  "trackingId": null,
  "bookingStatus": null,
  "bookedClassType": null,
  "selectedItineraryType": null,
  "confirmationNumber": null,
  "bookingPdfUrl": null,
  "bookedAt": null,
  "passengerName": null,
  "passengerEmail": null,
  "passengerPhone": null,
  "specialRequests": null,
  "flightsBookStatus": false,
  "flightBookingResult": null,
  "hotelsBookStatus": false,
  "hotelBookingResult": null,
  "createdAt": "2025-09-08T18:02:27.311366",
  "updatedAt": "2025-09-08T18:02:27.311382",
  "booked": false
}
