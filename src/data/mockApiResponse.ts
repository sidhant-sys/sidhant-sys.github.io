import { ItineraryApiResponse } from '../types/api';

// Mock API response based on the provided example
export const mockItineraryResponse: ItineraryApiResponse = {
  "id": "68bf29b95d72232d61dbba55",
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
        "total_cost": 2358.72,
        "cost_breakdown": {
          "flights": 854.27,
          "hotels": 517.5,
          "activities": 39,
          "meals": 450,
          "commute": 497.95
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
          "flight_price": 0,
          "flight_date": "2025-10-18",
          "flight_time": "11:10"
        }
      ],
      "hotels": [
        {
          "hotel_name": "Budget Inn JFK",
          "hotel_address": "123 Mock Street, Unknown City, XX",
          "hotel_room_type": "Standard Room with King Bed",
          "hotel_hotel_class": "2-star",
          "hotel_price": 517.5,
          "hotel_check_in_date": "2025-10-01",
          "hotel_check_out_date": "2025-10-18"
        }
      ],
      "upsell": [
        {
          "upsell_type": "hotel",
          "upsell_name": "Upgrade to Grand JFK Hotel",
          "upsell_price": 1125,
          "upsell_benefits": [
            "Upgrade to a 4-star hotel with better amenities and services."
          ],
          "upsell_description": "Enjoy a more comfortable stay at the Grand JFK Hotel.",
          "upsell_link": null
        },
        {
          "upsell_type": "flight",
          "upsell_name": "Upgrade to Premium Economy",
          "upsell_price": 370.73,
          "upsell_benefits": [
            "More legroom and comfortable seating"
          ],
          "upsell_description": "Enjoy a more comfortable flight with extra legroom and amenities.",
          "upsell_link": null
        }
      ],
      "days": [
        {
          "day": 1,
          "schedule": [
            {
              "type": "flight",
              "flight_name": "AI 119",
              "from": "BOM",
              "to": "JFK",
              "departure_time": "01:40",
              "arrival_time": "07:55",
              "price": 854.27
            },
            {
              "type": "commute",
              "from": "JFK Airport",
              "to": "Budget Inn JFK",
              "mode": "Taxi",
              "departure_time": "09:00",
              "arrival_time": "10:00",
              "price": 50
            },
            {
              "type": "hotel",
              "name": "Budget Inn JFK",
              "check_in": "10:00"
            }
          ]
        },
        {
          "day": 2,
          "schedule": [
            {
              "type": "activity",
              "name": "London Theatre: Disney's Hercules",
              "location": {
                "longitude": -0.1198823,
                "latitude": 51.5124056
              },
              "description": null,
              "start_time": "14:00",
              "end_time": "17:00",
              "price": 39
            }
          ]
        },
        {
          "day": 3,
          "schedule": [
            {
              "type": "meal",
              "name": "Lunch at Local Diner",
              "location": "Near Hotel",
              "time": "13:00",
              "price": 50
            }
          ]
        },
        {
          "day": 4,
          "schedule": [
            {
              "type": "meal",
              "name": "Dinner at Budget Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 60
            }
          ]
        },
        {
          "day": 5,
          "schedule": [
            {
              "type": "commute",
              "from": "Hotel",
              "to": "Times Square",
              "mode": "Subway",
              "departure_time": "10:00",
              "arrival_time": "11:00",
              "price": 5.95
            },
            {
              "type": "activity",
              "name": "Explore Times Square",
              "start_time": "11:00",
              "end_time": "14:00",
              "price": 0
            }
          ]
        },
        {
          "day": 6,
          "schedule": [
            {
              "type": "commute",
              "from": "Hotel",
              "to": "Central Park",
              "mode": "Subway",
              "departure_time": "10:00",
              "arrival_time": "11:00",
              "price": 5.95
            },
            {
              "type": "activity",
              "name": "Explore Central Park",
              "start_time": "11:00",
              "end_time": "17:00",
              "price": 0
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
              "departure_time": "07:00",
              "arrival_time": "08:00",
              "price": 50
            },
            {
              "type": "flight",
              "flight_name": "AI 197",
              "from": "JFK",
              "to": "BOM",
              "departure_time": "11:10",
              "arrival_time": "11:35",
              "price": 0
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
        "total_cost": 3629.72,
        "cost_breakdown": {
          "flights": 1225,
          "hotels": 1125,
          "activities": 39,
          "meals": 742.77,
          "commute": 497.95
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
        }
      ],
      "hotels": [
        {
          "hotel_name": "Grand JFK Hotel",
          "hotel_address": "123 Mock Street, Unknown City, XX",
          "hotel_room_type": "Standard Room with King Bed",
          "hotel_hotel_class": "4-star",
          "hotel_price": 1125,
          "hotel_check_in_date": "2025-10-01",
          "hotel_check_out_date": "2025-10-18"
        }
      ],
      "upsell": [
        {
          "upsell_type": "hotel",
          "upsell_name": "Upgrade to Luxury Palace JFK",
          "upsell_price": 2100,
          "upsell_benefits": [
            "Upgrade to a 5-star hotel with premium amenities and services."
          ],
          "upsell_description": "Indulge in a luxurious stay at the Luxury Palace JFK with top-notch amenities and personalized service.",
          "upsell_link": null
        },
        {
          "upsell_type": "flight",
          "upsell_name": "Upgrade to Business Class",
          "upsell_price": 1175,
          "upsell_benefits": [
            "Lie-flat seats, gourmet meals, and exclusive lounge access"
          ],
          "upsell_description": "Experience the ultimate comfort and service in Business Class with lie-flat seats, gourmet meals, and exclusive lounge access.",
          "upsell_link": null
        }
      ],
      "days": [
        {
          "day": 1,
          "schedule": [
            {
              "type": "flight",
              "flight_name": "6E MOCK123",
              "from": "BOM",
              "to": "JFK",
              "departure_time": "10:00",
              "arrival_time": "18:30",
              "price": 1200
            },
            {
              "type": "commute",
              "from": "JFK Airport",
              "to": "Grand JFK Hotel",
              "mode": "Taxi",
              "departure_time": "19:30",
              "arrival_time": "20:30",
              "price": 50
            },
            {
              "type": "hotel",
              "name": "Grand JFK Hotel",
              "check_in": "20:30"
            }
          ]
        },
        {
          "day": 2,
          "schedule": [
            {
              "type": "activity",
              "name": "London Theatre: Disney's Hercules",
              "location": {
                "longitude": -0.1198823,
                "latitude": 51.5124056
              },
              "description": null,
              "start_time": "14:00",
              "end_time": "17:00",
              "price": 39
            }
          ]
        },
        {
          "day": 3,
          "schedule": [
            {
              "type": "meal",
              "name": "Lunch at Mid-Range Restaurant",
              "location": "Near Hotel",
              "time": "13:00",
              "price": 75
            }
          ]
        },
        {
          "day": 4,
          "schedule": [
            {
              "type": "meal",
              "name": "Dinner at Premium Restaurant",
              "location": "Near Hotel",
              "time": "19:00",
              "price": 100
            }
          ]
        },
        {
          "day": 5,
          "schedule": [
            {
              "type": "commute",
              "from": "Hotel",
              "to": "Times Square",
              "mode": "Subway",
              "departure_time": "10:00",
              "arrival_time": "11:00",
              "price": 5.95
            },
            {
              "type": "activity",
              "name": "Explore Times Square",
              "start_time": "11:00",
              "end_time": "14:00",
              "price": 0
            }
          ]
        },
        {
          "day": 6,
          "schedule": [
            {
              "type": "commute",
              "from": "Hotel",
              "to": "Central Park",
              "mode": "Subway",
              "departure_time": "10:00",
              "arrival_time": "11:00",
              "price": 5.95
            },
            {
              "type": "activity",
              "name": "Explore Central Park",
              "start_time": "11:00",
              "end_time": "17:00",
              "price": 0
            }
          ]
        },
        {
          "day": 7,
          "schedule": [
            {
              "type": "commute",
              "from": "Grand JFK Hotel",
              "to": "JFK Airport",
              "mode": "Taxi",
              "departure_time": "07:00",
              "arrival_time": "08:00",
              "price": 50
            },
            {
              "type": "flight",
              "flight_name": "AI 197",
              "from": "JFK",
              "to": "BOM",
              "departure_time": "11:10",
              "arrival_time": "11:35",
              "price": 0
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
        "total_cost": 5204.72,
        "cost_breakdown": {
          "flights": 2400,
          "hotels": 2100,
          "activities": 39,
          "meals": 168.77,
          "commute": 497.95
        }
      },
      "flights": [
        {
          "flight_name": "EK MOCK123",
          "flight_origin": "BOM",
          "flight_destination": "JFK",
          "flight_duration": "8h 30m",
          "flight_price": 2400,
          "flight_date": "2025-10-01",
          "flight_time": "10:00"
        }
      ],
      "hotels": [
        {
          "hotel_name": "Luxury Palace JFK",
          "hotel_address": "123 Mock Street, Unknown City, XX",
          "hotel_room_type": "Standard Room with King Bed",
          "hotel_hotel_class": "5-star",
          "hotel_price": 2100,
          "hotel_check_in_date": "2025-10-01",
          "hotel_check_out_date": "2025-10-18"
        }
      ],
      "upsell": [
        {
          "upsell_type": "hotel",
          "upsell_name": "Upgrade to a Suite",
          "upsell_price": 1500,
          "upsell_benefits": [
            "Enjoy a spacious suite with separate living and sleeping areas, premium amenities and personalized service."
          ],
          "upsell_description": "Experience ultimate luxury in a suite at the Luxury Palace JFK.",
          "upsell_link": null
        },
        {
          "upsell_type": "activity",
          "upsell_name": "Private Broadway Show Experience",
          "upsell_price": 500,
          "upsell_benefits": [
            "Enjoy a private box at a Broadway show with dedicated service and champagne."
          ],
          "upsell_description": "Elevate your entertainment experience with a private Broadway show experience.",
          "upsell_link": null
        }
      ],
      "days": [
        {
          "day": 1,
          "schedule": [
            {
              "type": "flight",
              "flight_name": "EK MOCK123",
              "from": "BOM",
              "to": "JFK",
              "departure_time": "10:00",
              "arrival_time": "18:30",
              "price": 2400
            },
            {
              "type": "commute",
              "from": "JFK Airport",
              "to": "Luxury Palace JFK",
              "mode": "Taxi",
              "departure_time": "19:30",
              "arrival_time": "20:30",
              "price": 50
            },
            {
              "type": "hotel",
              "name": "Luxury Palace JFK",
              "check_in": "20:30"
            }
          ]
        },
        {
          "day": 2,
          "schedule": [
            {
              "type": "activity",
              "name": "London Theatre: Disney's Hercules",
              "location": {
                "longitude": -0.1198823,
                "latitude": 51.5124056
              },
              "description": null,
              "start_time": "14:00",
              "end_time": "17:00",
              "price": 39
            }
          ]
        },
        {
          "day": 3,
          "schedule": [
            {
              "type": "meal",
              "name": "Lunch at Fine Dining Restaurant",
              "location": "Near Hotel",
              "time": "13:00",
              "price": 100
            }
          ]
        },
        {
          "day": 4,
          "schedule": [
            {
              "type": "meal",
              "name": "Dinner at Luxury Restaurant",
              "location": "Manhattan",
              "time": "19:00",
              "price": 150
            }
          ]
        },
        {
          "day": 5,
          "schedule": [
            {
              "type": "commute",
              "from": "Hotel",
              "to": "Times Square",
              "mode": "Subway",
              "departure_time": "10:00",
              "arrival_time": "11:00",
              "price": 5.95
            },
            {
              "type": "activity",
              "name": "Explore Times Square",
              "start_time": "11:00",
              "end_time": "14:00",
              "price": 0
            }
          ]
        },
        {
          "day": 6,
          "schedule": [
            {
              "type": "commute",
              "from": "Hotel",
              "to": "Central Park",
              "mode": "Subway",
              "departure_time": "10:00",
              "arrival_time": "11:00",
              "price": 5.95
            },
            {
              "type": "activity",
              "name": "Explore Central Park",
              "start_time": "11:00",
              "end_time": "17:00",
              "price": 0
            }
          ]
        },
        {
          "day": 7,
          "schedule": [
            {
              "type": "commute",
              "from": "Luxury Palace JFK",
              "to": "JFK Airport",
              "mode": "Taxi",
              "departure_time": "07:00",
              "arrival_time": "08:00",
              "price": 50
            },
            {
              "type": "flight",
              "flight_name": "AI 197",
              "from": "JFK",
              "to": "BOM",
              "departure_time": "11:10",
              "arrival_time": "11:35",
              "price": 0
            }
          ]
        }
      ]
    }
  },
  "flightResponse": {
    "business": [
      {
        "type": "flight-offer",
        "id": "MOCK_BUSINESS_8225",
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
                "carrierCode": "EK",
                "number": "MOCK123",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "EK"
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
          "total": "2400.00",
          "base": "2375.00",
          "fees": [
            {
              "amount": "25.00",
              "type": "SUPPLIER"
            }
          ],
          "grandTotal": "2425.00"
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
          "EK"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "USD",
              "total": "2400.00",
              "base": "2375.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "BUSINESS",
                "fareBasis": "MOCK123",
                "brandedFare": "BASIC",
                "class": "J",
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
    "premium_economy": [
      {
        "type": "flight-offer",
        "id": "MOCK_PREMIUM_ECONOMY_8299",
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
              "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_58"
            },
            "rateFamilyEstimated": {
              "type": "P",
              "code": "PRO"
            },
            "id": "MOCK_OFFER_58",
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
        "id": "MOCK_MID_RANGE_JFK_7058",
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
              "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_58"
            },
            "rateFamilyEstimated": {
              "type": "P",
              "code": "PRO"
            },
            "id": "MOCK_OFFER_58",
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
        "id": "MOCK_LUXURY_JFK_7058",
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
              "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_57"
            },
            "rateFamilyEstimated": {
              "type": "P",
              "code": "PRO"
            },
            "id": "MOCK_OFFER_57",
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
        "id": "MOCK_STANDARD_JFK_7057",
        "type": "hotel-offer"
      }
    ]
  },
  "activityResponse": {
    "ENTERTAINMENT": [
      {
        "images": [
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzZiNGYxZDMyLTU3NTAtNDJhOC05YzNiLWZiZmFlNzFhNTc3NSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzFkMmNlOTc1LTAwYjYtNGIyZC1hMjYxLWM2NzYyMWZkZjk0YyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzU4MDIyN2EwLWJkNTYtNGExMi1hNjFmLTUwOTU1NTI3OTlkNCIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzRmMGI4ZTNjLTVlYjQtNDBkZi1iMzM1LTMxMTFmNmYyNjc5YyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzMyNTIyNGI0LTM2MWMtNDA5Mi1iMDBlLWY2MTYxMjg1OTBhMSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
          "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzM5ZmMwNTRjLTJhYWQtNGJjNC05OGZhLTNiMjk2NGE5MzdkNSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0="
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
      "searchLocation": {
        "latitude": 51.5074,
        "longitude": 0.1278,
        "radius": "25km"
      },
      "totalCategories": 0,
      "searchTimestamp": "2025-09-08T19:07:43.400176230Z",
      "searchDurationMs": 6341,
      "currency": "USD"
    }
  },
  "trackingId": "Asdasdasdasdasd",
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
  "flightsBookStatus": true,
  "flightBookingResult": {
    "ticketingDeadline": "2025-09-16T07:31:23.053481349",
    "gracePeriod": "6 days",
    "instructions": "Complete payment within 6 days to issue tickets",
    "note": "Ready for real Amadeus API - requires Gson dependency for JsonObject",
    "totalPrice": {
      "total": "2400.00",
      "currency": "USD",
      "base": "2375.00"
    },
    "amadeusRequestSize": 2389,
    "errorType": "UNEXPECTED_API_ERROR",
    "ticketingRequired": true,
    "requestSentToAmadeus": true,
    "nextSteps": "Use real flight offers from search for actual bookings",
    "bookingReference": "CT483053",
    "createdAt": "2025-09-10T07:31:23.053600540",
    "paymentRequired": true,
    "bookingType": "HOLD",
    "pdfPath": "booking-pdfs/flight_booking_CT483053_1757489483053.pdf",
    "realApiAttempted": true,
    "bookingStatus": "TICKETING_PENDING",
    "instantTicketing": false,
    "amadeusError": "[400]\nThis attribute must be a number",
    "pdfGenerated": true,
    "flightOrderId": "eJzTd9f3NjIwNDa%2BMjY1NgVCAAAAczEF%2FQ%3D%3D",
    "contactEmail": "booking@cleartrip.com",
    "message": "Flight booking successful - PNR created, ticketing pending",
    "flightOffers": [
      {
        "type": "flight-offer",
        "id": "MOCK_BUSINESS_8225",
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
                "carrierCode": "EK",
                "number": "MOCK123",
                "aircraft": {
                  "code": "320"
                },
                "operating": {
                  "carrierCode": "EK"
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
          "total": "2400.00",
          "base": "2375.00",
          "fees": [
            {
              "amount": "25.00",
              "type": "SUPPLIER"
            }
          ],
          "grandTotal": "2425.00"
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
          "EK"
        ],
        "travelerPricings": [
          {
            "travelerId": "1",
            "fareOption": "STANDARD",
            "travelerType": "ADULT",
            "price": {
              "currency": "USD",
              "total": "2400.00",
              "base": "2375.00"
            },
            "fareDetailsBySegment": [
              {
                "segmentId": "1",
                "cabin": "BUSINESS",
                "fareBasis": "MOCK123",
                "brandedFare": "BASIC",
                "class": "J",
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
    "pnr": "CT483053",
    "contactPhone": "9876543210",
    "holdMode": true,
    "apiIntegrationStatus": "WORKING - SSL and Auth successful"
  },
  "hotelsBookStatus": true,
  "hotelBookingResult": {
    "pdfGenerated": true,
    "data": {
      "roomQuantity": 1,
      "policies": {
        "cancellation": {
          "type": "FULL_STAY",
          "deadline": "2025-09-11"
        },
        "guarantee": {
          "acceptedPayments": {
            "creditCards": [
              "VI",
              "MC",
              "AX"
            ],
            "methods": [
              "CREDIT_CARD",
              "AGENCY_ACCOUNT"
            ]
          }
        },
        "paymentType": "GUARANTEE"
      },
      "confirmation": {
        "timestamp": "2025-09-10T07:31:23.169180746Z",
        "status": "CONFIRMED",
        "source": "AMADEUS_API"
      },
      "type": "hotel-booking",
      "rateCode": "RAC",
      "room": {
        "typeEstimated": {
          "bedType": "KING",
          "beds": 1,
          "category": "SUITE"
        },
        "description": {
          "text": "Luxurious suite with premium amenities and city view"
        },
        "type": "STANDARD"
      },
      "roomStatus": "RESERVED",
      "checkIn": {
        "date": "2025-09-11",
        "time": "15:00"
      },
      "price": {
        "total": "350.00",
        "base": "297.50",
        "currency": "USD",
        "fees": [
          {
            "amount": "10.50",
            "description": "Service fee",
            "type": "SERVICE"
          }
        ],
        "taxes": [
          {
            "code": "CITY_TAX",
            "included": true,
            "percentage": "12.00",
            "amount": "42.00"
          }
        ]
      },
      "associatedRecords": [
        {
          "originSystemCode": "GDS",
          "reference": "Z7NXVT"
        }
      ],
      "providerConfirmationId": "PVR83168",
      "guests": [
        {
          "phone": "+1-555-123-4567",
          "title": "MR",
          "firstName": "GUEST",
          "lastName": "USER",
          "email": "guest@example.com"
        }
      ],
      "hotel": {
        "contact": {
          "phone": "+1-555-HOTEL-1",
          "email": "reservations@luxurypalacejfk.com"
        },
        "hotelId": "HTL_LUXURY_JFK",
        "address": {
          "cityName": "Unknown City",
          "countryCode": "XX",
          "lines": [
            "123 Luxury Palace JFK Street"
          ]
        },
        "rating": "5-star",
        "cityCode": "JFK",
        "name": "Luxury Palace JFK"
      },
      "bookingStatus": "CONFIRMED",
      "id": "Z7NXVT",
      "checkOut": {
        "date": "2025-09-13",
        "time": "11:00"
      }
    },
    "pdfPath": "booking-pdfs/hotel_booking_Z7NXVT_1757489483170.pdf",
    "_metadata": {
      "originalOfferId": "MOCK_LUXURY_JFK_7058",
      "dataSource": "FALLBACK_SYSTEM",
      "bookingMethod": "GUARANTEE_POLICY",
      "responseGenerated": "2025-09-10T07:31:23.169228643Z"
    }
  },
  "createdAt": "2025-09-08T19:08:41.923",
  "updatedAt": "2025-09-10T07:31:23.281",
  "booked": false
}
