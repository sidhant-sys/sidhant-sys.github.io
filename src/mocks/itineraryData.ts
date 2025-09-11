export const itineraryData = {
    "id": "68c1d7440c5bc213599ff83a",
    "from": "Mumbai",
    "to": "New York",
    "fromIata": "BOM",
    "toIata": "JFK",
    "numberOfTravellers": 1,
    "budget": 200000,
    "typeOfTrip": "ENTERTAINMENT",
    "timeframe": "8 days",
    "numberOfAdults": 1,
    "numberOfKids": 0,
    "generatedItinerary": {
      "budgeted": {
        "overview": {
          "trip_type": "Entertainment",
          "total_travellers": {
            "adults": 1,
            "kids": 0
          },
          "duration": "8 days, 7 nights",
          "total_cost": 2900,
          "cost_breakdown": {
            "flights": 854.07,
            "hotels": 595,
            "activities": 800,
            "meals": 450,
            "commute": 201
          }
        },
        "travel_intelligence": {
          "weather": {
            "expected_conditions": "Pleasant autumn weather, 10-18°C (50-65°F). Cool mornings/evenings, mild days. Chance of light rain.",
            "packing_tips": [
              "Layered clothing (sweaters, light jackets)",
              "Comfortable walking shoes are essential",
              "Compact umbrella/rain jacket",
              "Scarf for cooler evenings"
            ]
          },
          "travel_tips": {
            "local_customs": [
              "New Yorkers are generally fast-paced, walk on the right",
              "Tipping 15-20% is customary at restaurants and for services"
            ],
            "transportation": [
              "The NYC Subway is efficient and cost-effective; get a MetroCard",
              "Google Maps or Citymapper apps are invaluable for navigation",
              "Walking is often the best way to explore neighborhoods"
            ],
            "money_matters": [
              "Credit cards are widely accepted, but cash is useful for small vendors",
              "ATMs are readily available"
            ],
            "safety": [
              "Be aware of your surroundings, especially in crowded tourist areas",
              "Keep valuables secure",
              "Use licensed yellow cabs or ride-sharing apps (Uber/Lyft)"
            ]
          },
          "cultural_facts": {
            "highlights": [
              "New York City, often called 'The Big Apple', is a global hub for art, fashion, finance, and entertainment.",
              "Home to iconic landmarks like the Statue of Liberty, Empire State Building, and Times Square."
            ],
            "cuisine": [
              "NYC is a melting pot of global cuisines. Must-try: New York-style pizza, bagels, hot dogs from street carts, cheesecake.",
              "Explore diverse neighborhoods for authentic ethnic foods (e.g., Chinatown, Little Italy)."
            ],
            "fun_facts": [
              "NYC has more than 800 languages spoken, making it one of the most linguistically diverse cities in the world.",
              "Central Park is larger than two of the world's smallest countries: Monaco and Vatican City."
            ]
          },
          "current_events": {
            "seasonal_highlights": [
              "Early October is prime for fall foliage in Central Park and other green spaces.",
              "Many Broadway shows will be in full swing."
            ],
            "travel_notes": [
              "October is a popular month, expect crowds at major attractions. Book tickets in advance.",
              "Some outdoor festivals or markets might be active; check local listings."
            ]
          }
        },
        "flights": [
          {
            "type": "flight",
            "airline": "Air India",
            "departure_time": "01:40 AM (BOM)",
            "arrival_time": "07:55 AM (JFK)",
            "class": "Economy",
            "price": 854.07
          },
          {
            "type": "flight",
            "airline": "Air India",
            "departure_time": "10:00 AM (JFK)",
            "arrival_time": "08:30 AM (BOM, next day)",
            "class": "Economy",
            "price": 0,
            "note": "Return leg of the round trip flight"
          }
        ],
        "hotels": [
          {
            "type": "hotel",
            "name": "Budget Inn JFK",
            "room_type": "Standard Room (King Bed)",
            "price": 595,
            "amenities": [
              "Basic amenities",
              "Clean rooms"
            ]
          }
        ],
        "days": [
          {
            "day": 1,
            "daily_intelligence": {
              "weather": {
                "conditions": "Mild and partly cloudy, 15°C. Pleasant for arrival and light activities.",
                "recommendations": [
                  "Dress in layers as it might be cool in the morning.",
                  "Stay hydrated after the long flight."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Morning arrival is good to settle in before major crowds."
                ],
                "local_insights": [
                  "JFK Airport has good public transport links into the city."
                ],
                "cultural_notes": [
                  "New Yorkers appreciate efficiency, so have your transport tickets ready."
                ]
              },
              "highlights": {
                "must_see": [
                  "Times Square at night for a first impression"
                ],
                "food_recommendations": [
                  "Grab a classic NYC slice of pizza near your hotel"
                ],
                "hidden_gems": [
                  "Explore the smaller side streets around Times Square for unique shops."
                ]
              }
            },
            "schedule": [
              {
                "type": "flight",
                "airline": "Air India",
                "departure_time": "01:40 AM (BOM)",
                "arrival_time": "07:55 AM (JFK)",
                "class": "Economy",
                "price": 854.07
              },
              {
                "type": "commute",
                "from": "JFK Airport",
                "to": "Budget Inn JFK",
                "mode": "AirTrain to Subway (A or E line)",
                "departure_time": "09:00 AM",
                "arrival_time": "10:30 AM",
                "price": 10.75
              },
              {
                "type": "activity",
                "name": "Check-in & Freshen Up",
                "description": "Settle into your hotel and take some time to relax after the long flight.",
                "start_time": "10:30 AM",
                "end_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Local Deli",
                "cuisine": "American Deli",
                "description": "Classic New York sandwich and soup.",
                "time": "12:30 PM",
                "price": 15,
                "location": "Near Budget Inn JFK"
              },
              {
                "type": "activity",
                "name": "Explore Times Square & Broadway District",
                "description": "Immerse yourself in the dazzling lights and energy of Times Square. Enjoy street performers and window shopping.",
                "start_time": "2:30 PM",
                "end_time": "6:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Times Square",
                "to": "Hotel",
                "mode": "Subway",
                "departure_time": "6:15 PM",
                "arrival_time": "6:45 PM",
                "price": 2.9
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Joe Allen",
                "cuisine": "American",
                "description": "Casual American dining, known for its theater atmosphere.",
                "time": "7:30 PM",
                "price": 40,
                "location": "Theater District"
              }
            ]
          },
          {
            "day": 2,
            "daily_intelligence": {
              "weather": {
                "conditions": "Sunny and clear, 18°C. Perfect for walking and outdoor exploration.",
                "recommendations": [
                  "Sunscreen is advisable.",
                  "Enjoy the crisp autumn air."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visit Central Park early to experience its tranquility before crowds."
                ],
                "local_insights": [
                  "The Staten Island Ferry is free and offers great views of the Statue of Liberty."
                ],
                "cultural_notes": [
                  "Respect public spaces and do not litter."
                ]
              },
              "highlights": {
                "must_see": [
                  "Statue of Liberty from the ferry",
                  "Central Park's iconic spots"
                ],
                "food_recommendations": [
                  "Try a street vendor pretzel or hot dog in Central Park"
                ],
                "hidden_gems": [
                  "Shakespeare in the Park location in Central Park"
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Local Coffee Shop",
                "cuisine": "Coffee & Pastries",
                "description": "Grab a quick and affordable breakfast.",
                "time": "8:00 AM",
                "price": 10,
                "location": "Near hotel"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Battery Park (Staten Island Ferry Terminal)",
                "mode": "Subway",
                "departure_time": "9:00 AM",
                "arrival_time": "9:45 AM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Staten Island Ferry for Statue of Liberty View",
                "description": "Enjoy a free round-trip ferry ride past the Statue of Liberty and Ellis Island, offering stunning skyline views.",
                "start_time": "10:00 AM",
                "end_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Battery Park City Food Trucks",
                "cuisine": "Various Street Food",
                "description": "Affordable and diverse lunch options by the water.",
                "time": "12:30 PM",
                "price": 18,
                "location": "Battery Park City"
              },
              {
                "type": "commute",
                "from": "Battery Park City",
                "to": "Wall Street",
                "mode": "Walk",
                "departure_time": "1:30 PM",
                "arrival_time": "1:45 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Wall Street & Charging Bull",
                "description": "Walk through the financial district, see the New York Stock Exchange and the iconic Charging Bull statue.",
                "start_time": "1:45 PM",
                "end_time": "3:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Wall Street",
                "to": "Brooklyn Bridge",
                "mode": "Walk",
                "departure_time": "3:15 PM",
                "arrival_time": "3:45 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Walk the Brooklyn Bridge",
                "description": "Enjoy panoramic views of Manhattan and Brooklyn while walking across this historic landmark.",
                "start_time": "3:45 PM",
                "end_time": "5:30 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Brooklyn Bridge (Brooklyn side)",
                "to": "Hotel",
                "mode": "Subway",
                "departure_time": "5:45 PM",
                "arrival_time": "6:30 PM",
                "price": 2.9
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Xi'an Famous Foods",
                "cuisine": "Northern Chinese",
                "description": "Spicy, flavorful hand-ripped noodles and dumplings, a local favorite.",
                "time": "7:30 PM",
                "price": 20,
                "location": "Various locations across Manhattan, find nearest by hotel"
              }
            ]
          },
          {
            "day": 3,
            "daily_intelligence": {
              "weather": {
                "conditions": "Partly cloudy, 16°C. Good for indoor and outdoor activities.",
                "recommendations": [
                  "A light jacket might be useful in museums and cooler areas."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visit museums in the morning to beat the rush."
                ],
                "local_insights": [
                  "The High Line is a unique urban park built on old railway tracks."
                ],
                "cultural_notes": [
                  "Many museums offer free or 'pay-what-you-wish' days/hours."
                ]
              },
              "highlights": {
                "must_see": [
                  "Metropolitan Museum of Art's vast collections",
                  "Vibrant street art in Chelsea"
                ],
                "food_recommendations": [
                  "Chelsea Market offers a wide array of food stalls"
                ],
                "hidden_gems": [
                  "Enjoy people-watching and diverse art along The High Line."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Dunkin' Donuts",
                "cuisine": "American Fast Food",
                "description": "Coffee and a donut for a quick start.",
                "time": "8:30 AM",
                "price": 7,
                "location": "Near hotel"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "The Metropolitan Museum of Art (The Met)",
                "mode": "Subway",
                "departure_time": "9:15 AM",
                "arrival_time": "9:45 AM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "The Metropolitan Museum of Art (The Met)",
                "description": "Explore one of the world's largest and finest art museums. (Pay-what-you-wish for NY residents, general admission for others).",
                "start_time": "10:00 AM",
                "end_time": "1:00 PM",
                "price": 30
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Museum Cafe",
                "cuisine": "Casual American",
                "description": "Light lunch options within or near The Met.",
                "time": "1:15 PM",
                "price": 25,
                "location": "Inside/Near The Met"
              },
              {
                "type": "commute",
                "from": "The Met",
                "to": "Chelsea Market / High Line",
                "mode": "Subway",
                "departure_time": "2:30 PM",
                "arrival_time": "3:15 PM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Chelsea Market & The High Line",
                "description": "Discover artisan food vendors and shops at Chelsea Market, then stroll along The High Line, an elevated park with art installations and city views.",
                "start_time": "3:30 PM",
                "end_time": "6:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Chelsea Market",
                "to": "Hotel",
                "mode": "Subway",
                "departure_time": "6:15 PM",
                "arrival_time": "6:45 PM",
                "price": 2.9
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Los Tacos No. 1",
                "cuisine": "Mexican Street Food",
                "description": "Authentic and highly-rated tacos, a casual and lively spot.",
                "time": "7:30 PM",
                "price": 15,
                "location": "Chelsea Market or other locations"
              }
            ]
          },
          {
            "day": 4,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and possibly breezy, 14°C. Good for indoor activities and brisk walks.",
                "recommendations": [
                  "Wear a windproof jacket for the ferry ride and open areas."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Consider a morning walk through Grand Central before the commuter rush."
                ],
                "local_insights": [
                  "The New York Public Library often has interesting free exhibitions."
                ],
                "cultural_notes": [
                  "Be mindful of quiet zones in the library and other public institutions."
                ]
              },
              "highlights": {
                "must_see": [
                  "Grand Central Terminal's architecture",
                  "Bryant Park's urban oasis"
                ],
                "food_recommendations": [
                  "Grab a quick lunch from a food cart or cafe near Bryant Park"
                ],
                "hidden_gems": [
                  "Whispering Gallery in Grand Central Terminal"
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Pret A Manger",
                "cuisine": "Cafe",
                "description": "Freshly prepared sandwiches and coffee.",
                "time": "8:30 AM",
                "price": 12,
                "location": "Near hotel"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Grand Central Terminal",
                "mode": "Subway",
                "departure_time": "9:15 AM",
                "arrival_time": "9:45 AM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Grand Central Terminal Exploration",
                "description": "Admire the stunning architecture of this iconic transport hub, including the main concourse and celestial ceiling.",
                "start_time": "10:00 AM",
                "end_time": "11:30 AM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Grand Central Terminal",
                "to": "New York Public Library (Stephen A. Schwarzman Building)",
                "mode": "Walk",
                "departure_time": "11:45 AM",
                "arrival_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "New York Public Library",
                "description": "Explore the magnificent architecture and quiet reading rooms of this historic library. See the famous lion statues.",
                "start_time": "12:00 PM",
                "end_time": "1:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Bryant Park Cafe",
                "cuisine": "Casual American",
                "description": "Enjoy a relaxed lunch with views of Bryant Park.",
                "time": "1:30 PM",
                "price": 25,
                "location": "Bryant Park"
              },
              {
                "type": "activity",
                "name": "Stroll through Bryant Park",
                "description": "Relax in this urban oasis, watch people, and enjoy the seasonal activities.",
                "start_time": "2:30 PM",
                "end_time": "4:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Bryant Park",
                "to": "Flatiron Building & Madison Square Park",
                "mode": "Walk",
                "departure_time": "4:15 PM",
                "arrival_time": "4:45 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Flatiron Building & Madison Square Park",
                "description": "Admire the iconic Flatiron Building, then relax in Madison Square Park.",
                "start_time": "4:45 PM",
                "end_time": "5:30 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Madison Square Park",
                "to": "Hotel",
                "mode": "Subway",
                "departure_time": "5:45 PM",
                "arrival_time": "6:15 PM",
                "price": 2.9
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Shake Shack (Madison Square Park)",
                "cuisine": "American Fast Casual",
                "description": "Famous for its burgers, hot dogs, and shakes.",
                "time": "7:00 PM",
                "price": 20,
                "location": "Madison Square Park"
              }
            ]
          },
          {
            "day": 5,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cloudy with a chance of light rain, 12°C. Good for museums and indoor markets.",
                "recommendations": [
                  "Carry an umbrella or rain jacket today.",
                  "Indoor activities are prioritized."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visit the MoMA early for a less crowded experience."
                ],
                "local_insights": [
                  "SoHo is great for unique boutiques and independent shops."
                ],
                "cultural_notes": [
                  "Street performers in Washington Square Park are often very talented."
                ]
              },
              "highlights": {
                "must_see": [
                  "MoMA's modern art collection",
                  "Washington Square Park's vibrant atmosphere"
                ],
                "food_recommendations": [
                  "Explore the cafes and bakeries in Greenwich Village"
                ],
                "hidden_gems": [
                  "Discover small art galleries in SoHo."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Ess-a-Bagel",
                "cuisine": "New York Bagels",
                "description": "Authentic fresh bagels with a variety of spreads.",
                "time": "8:00 AM",
                "price": 10,
                "location": "Various locations, find nearest"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Museum of Modern Art (MoMA)",
                "mode": "Subway",
                "departure_time": "9:00 AM",
                "arrival_time": "9:30 AM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Museum of Modern Art (MoMA)",
                "description": "Explore masterpieces of modern and contemporary art from artists like Van Gogh, Picasso, Warhol, and more.",
                "start_time": "10:00 AM",
                "end_time": "1:00 PM",
                "price": 25
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Halal Guys Cart",
                "cuisine": "Middle Eastern Street Food",
                "description": "Famous New York street food – chicken/gyro over rice or falafel platter.",
                "time": "1:30 PM",
                "price": 10,
                "location": "Midtown, many locations"
              },
              {
                "type": "commute",
                "from": "MoMA",
                "to": "Washington Square Park / Greenwich Village",
                "mode": "Subway",
                "departure_time": "2:30 PM",
                "arrival_time": "3:00 PM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Washington Square Park & Greenwich Village",
                "description": "Enjoy the lively atmosphere of Washington Square Park, then wander through the charming streets of Greenwich Village, known for its bohemian history and cafes.",
                "start_time": "3:15 PM",
                "end_time": "6:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Greenwich Village",
                "to": "Hotel",
                "mode": "Subway",
                "departure_time": "6:15 PM",
                "arrival_time": "6:45 PM",
                "price": 2.9
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Bleecker Street Pizza",
                "cuisine": "New York Pizza",
                "description": "Award-winning, classic New York slice.",
                "time": "7:30 PM",
                "price": 10,
                "location": "Greenwich Village"
              }
            ]
          },
          {
            "day": 6,
            "daily_intelligence": {
              "weather": {
                "conditions": "Crisp autumn day, 17°C, mostly sunny. Ideal for outdoor adventures.",
                "recommendations": [
                  "Dress comfortably for a day of exploration and walking."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visit the Tenement Museum at opening for a poignant experience."
                ],
                "local_insights": [
                  "The Lower East Side is rich in immigrant history and unique eateries."
                ],
                "cultural_notes": [
                  "Consider the history and stories of the people who shaped these neighborhoods."
                ]
              },
              "highlights": {
                "must_see": [
                  "Tenement Museum's historical tours",
                  "Lively streets of Chinatown"
                ],
                "food_recommendations": [
                  "Dumplings in Chinatown, cannoli in Little Italy"
                ],
                "hidden_gems": [
                  "Small, independent shops in SoHo."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Russ & Daughters Cafe",
                "cuisine": "Jewish Appetizing",
                "description": "Classic New York bagels and lox (smoked salmon).",
                "time": "8:30 AM",
                "price": 20,
                "location": "Lower East Side"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Tenement Museum (Lower East Side)",
                "mode": "Subway",
                "departure_time": "9:30 AM",
                "arrival_time": "10:00 AM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Lower East Side Tenement Museum",
                "description": "Take a guided tour to experience the lives of immigrant families in historic tenement buildings (book in advance).",
                "start_time": "10:30 AM",
                "end_time": "12:00 PM",
                "price": 30
              },
              {
                "type": "commute",
                "from": "Tenement Museum",
                "to": "Chinatown",
                "mode": "Walk",
                "departure_time": "12:15 PM",
                "arrival_time": "12:45 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Nom Wah Tea Parlor",
                "cuisine": "Dim Sum",
                "description": "Historic spot for delicious dim sum and Chinese tea.",
                "time": "1:00 PM",
                "price": 25,
                "location": "Chinatown"
              },
              {
                "type": "activity",
                "name": "Explore Chinatown & Little Italy",
                "description": "Wander through the bustling streets of Chinatown, then head to Little Italy for a taste of its historic charm and shops.",
                "start_time": "2:30 PM",
                "end_time": "4:30 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Little Italy",
                "to": "SoHo",
                "mode": "Walk",
                "departure_time": "4:45 PM",
                "arrival_time": "5:15 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Shopping in SoHo",
                "description": "Window shop or browse the trendy boutiques and art galleries in the stylish SoHo neighborhood.",
                "start_time": "5:15 PM",
                "end_time": "6:30 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "SoHo",
                "to": "Hotel",
                "mode": "Subway",
                "departure_time": "6:45 PM",
                "arrival_time": "7:15 PM",
                "price": 2.9
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Rubirosa Pizza & Bar",
                "cuisine": "Italian",
                "description": "Cozy spot famous for its thin-crust pizza and Italian-American classics.",
                "time": "8:00 PM",
                "price": 40,
                "location": "Nolita (near SoHo/Little Italy)"
              }
            ]
          },
          {
            "day": 7,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and breezy, 13°C. Perfect for a final day of exploration and souvenir shopping.",
                "recommendations": [
                  "A warm scarf and jacket will be good for outdoor time."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visit the Top of the Rock in the late afternoon for sunset and night views."
                ],
                "local_insights": [
                  "Rockefeller Center offers great shopping and seasonal displays."
                ],
                "cultural_notes": [
                  "Take time to appreciate the grandeur of NYC's iconic buildings."
                ]
              },
              "highlights": {
                "must_see": [
                  "Top of the Rock for panoramic views",
                  "Rockefeller Center"
                ],
                "food_recommendations": [
                  "Enjoy a meal in the Rockefeller Center area"
                ],
                "hidden_gems": [
                  "The Channel Gardens at Rockefeller Center, often with seasonal floral displays."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Starbucks",
                "cuisine": "Coffee & Snacks",
                "description": "Familiar comfort for a busy day.",
                "time": "8:30 AM",
                "price": 8,
                "location": "Near hotel"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Rockefeller Center",
                "mode": "Subway",
                "departure_time": "9:30 AM",
                "arrival_time": "10:00 AM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Rockefeller Center & St. Patrick's Cathedral",
                "description": "Explore the iconic Rockefeller Center, then visit the stunning Gothic Revival St. Patrick's Cathedral.",
                "start_time": "10:15 AM",
                "end_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "5th Avenue Window Shopping",
                "description": "Stroll along the famous 5th Avenue, browsing high-end shops and enjoying the architectural grandeur.",
                "start_time": "12:00 PM",
                "end_time": "1:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Food Hall at Rockefeller Center",
                "cuisine": "Various",
                "description": "Diverse and convenient options for a quick lunch.",
                "time": "1:15 PM",
                "price": 20,
                "location": "Rockefeller Center"
              },
              {
                "type": "activity",
                "name": "Top of the Rock Observation Deck",
                "description": "Enjoy spectacular 360-degree views of New York City, including Central Park and the Empire State Building.",
                "start_time": "2:30 PM",
                "end_time": "4:00 PM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Souvenir Shopping / Last-Minute Exploration",
                "description": "Spend some time picking up souvenirs or revisit a favorite spot.",
                "start_time": "4:15 PM",
                "end_time": "6:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Midtown",
                "to": "Hotel",
                "mode": "Subway",
                "departure_time": "6:15 PM",
                "arrival_time": "6:45 PM",
                "price": 2.9
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Ellen's Stardust Diner",
                "cuisine": "American",
                "description": "Lively diner with singing waitstaff, a fun, classic NYC experience.",
                "time": "7:30 PM",
                "price": 35,
                "location": "Theater District"
              }
            ]
          },
          {
            "day": 8,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and cloudy, 10°C. Suitable for departure.",
                "recommendations": [
                  "Ensure all belongings are packed, prepare for transit."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Plan airport transfer with buffer time."
                ],
                "local_insights": [
                  "Check flight status before heading to the airport."
                ],
                "cultural_notes": [
                  "Leave early for JFK, traffic can be unpredictable."
                ]
              },
              "highlights": {
                "must_see": [
                  "N/A - Departure day"
                ],
                "food_recommendations": [
                  "Grab a quick breakfast before leaving the hotel"
                ],
                "hidden_gems": [
                  "N/A"
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Grab-and-Go",
                "cuisine": "Light Breakfast",
                "description": "Quick bite before check-out.",
                "time": "7:00 AM",
                "price": 5,
                "location": "Hotel"
              },
              {
                "type": "activity",
                "name": "Hotel Check-out",
                "description": "Finalize check-out procedures.",
                "start_time": "8:00 AM",
                "end_time": "8:30 AM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Budget Inn JFK",
                "to": "JFK Airport Terminal 4",
                "mode": "Subway & AirTrain",
                "departure_time": "8:30 AM",
                "arrival_time": "10:00 AM",
                "price": 10.75
              },
              {
                "type": "activity",
                "name": "Airport Security & Boarding",
                "description": "Proceed through security and to your departure gate.",
                "start_time": "10:00 AM",
                "end_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "flight",
                "airline": "Air India",
                "departure_time": "10:00 AM (JFK)",
                "arrival_time": "08:30 AM (BOM, next day)",
                "class": "Economy",
                "price": 0,
                "note": "Return leg of the round trip flight"
              }
            ]
          }
        ],
        "upsell": [
          {
            "type": "hotel",
            "name": "Grand JFK Hotel",
            "upgrade_cost": 700,
            "benefits": [
              "Larger, more comfortable room (King Bed)",
              "4-star amenities and service",
              "Potentially better location with easier access to attractions",
              "Enhanced comfort for your stay"
            ]
          },
          {
            "type": "flight",
            "name": "Premium Economy Round Trip (e.g., IndiGo/Mock Airline)",
            "upgrade_cost": 1800,
            "benefits": [
              "Wider seats and more legroom",
              "Improved meal service",
              "Priority boarding and check-in",
              "More comfortable long-haul journey"
            ]
          },
          {
            "type": "activity",
            "name": "Guided Central Park Bike Tour",
            "upgrade_cost": 60,
            "benefits": [
              "Explore Central Park's highlights efficiently with an expert guide",
              "Includes bike rental",
              "Discover hidden gems and learn about the park's history"
            ]
          }
        ]
      },
      "premium": {
        "overview": {
          "trip_type": "Entertainment",
          "total_travellers": {
            "adults": 1,
            "kids": 0
          },
          "duration": "8 days, 7 nights",
          "total_cost": 6500,
          "cost_breakdown": {
            "flights": 2600,
            "hotels": 1295,
            "activities": 1600,
            "meals": 700,
            "commute": 305
          }
        },
        "travel_intelligence": {
          "weather": {
            "expected_conditions": "Pleasant autumn weather, 10-18°C (50-65°F). Cool mornings/evenings, mild days. Chance of light rain.",
            "packing_tips": [
              "Stylish layers for varying temperatures",
              "Comfortable yet fashionable walking shoes",
              "Quality umbrella or light rain jacket",
              "Versatile scarf or pashmina"
            ]
          },
          "travel_tips": {
            "local_customs": [
              "Reservations are highly recommended for popular restaurants and Broadway shows.",
              "Tipping 18-20% is standard for good service."
            ],
            "transportation": [
              "Consider private transfers for airport to hotel for convenience.",
              "Subway is still efficient for city travel; taxis/ride-shares for shorter distances or late nights."
            ],
            "money_matters": [
              "Credit cards are universally accepted at premium establishments.",
              "Some smaller shops or food carts may prefer cash."
            ],
            "safety": [
              "New York is generally safe, but maintain awareness in crowded tourist areas.",
              "Utilize hotel concierge for trusted recommendations."
            ]
          },
          "cultural_facts": {
            "highlights": [
              "NYC's theater district, Broadway, is the pinnacle of live entertainment.",
              "The city's diverse neighborhoods offer unique cultural experiences, from art galleries to jazz clubs."
            ],
            "cuisine": [
              "Beyond pizza and bagels, explore Michelin-starred restaurants, diverse ethnic eateries, and trendy foodie hotspots.",
              "Brunch is a cherished weekend ritual."
            ],
            "fun_facts": [
              "The Empire State Building has its own zip code.",
              "More movies and TV shows are filmed in NYC than any other city in the world."
            ]
          },
          "current_events": {
            "seasonal_highlights": [
              "Fall festivals and harvest events might be ongoing.",
              "New Broadway shows typically open in the fall season."
            ],
            "travel_notes": [
              "Book popular attractions, dining, and shows well in advance for best availability, especially in October.",
              "Check for any specific exhibition openings at major museums."
            ]
          }
        },
        "flights": [
          {
            "type": "flight",
            "airline": "IndiGo",
            "departure_time": "10:00 AM (BOM)",
            "arrival_time": "06:30 PM (JFK)",
            "class": "Premium Economy",
            "price": 1200
          },
          {
            "type": "flight",
            "airline": "Mock Premium Airline",
            "departure_time": "10:00 AM (JFK)",
            "arrival_time": "08:30 AM (BOM, next day)",
            "class": "Premium Economy",
            "price": 1400,
            "note": "Placeholder for return Premium Economy flight as actual data was not provided for a round trip. Price estimated to fit budget allocation."
          }
        ],
        "hotels": [
          {
            "type": "hotel",
            "name": "Grand JFK Hotel",
            "room_type": "Standard Room (King Bed)",
            "price": 1295,
            "amenities": [
              "Well-appointed rooms",
              "Modern amenities",
              "4-star rating"
            ]
          }
        ],
        "days": [
          {
            "day": 1,
            "daily_intelligence": {
              "weather": {
                "conditions": "Mild and partly cloudy, 15°C. Good for evening strolls.",
                "recommendations": [
                  "A light jacket will be comfortable for evening activities."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Arriving mid-afternoon allows for smooth check-in and an evening out."
                ],
                "local_insights": [
                  "Private transfers offer a comfortable and quick way from JFK to Manhattan."
                ],
                "cultural_notes": [
                  "Embrace the city's energy, but also take time to observe its unique rhythm."
                ]
              },
              "highlights": {
                "must_see": [
                  "Vibrant energy of Times Square"
                ],
                "food_recommendations": [
                  "Enjoy a classic New York steakhouse experience"
                ],
                "hidden_gems": [
                  "Discover a speakeasy bar in the Theater District."
                ]
              }
            },
            "schedule": [
              {
                "type": "flight",
                "airline": "IndiGo",
                "departure_time": "10:00 AM (BOM)",
                "arrival_time": "06:30 PM (JFK)",
                "class": "Premium Economy",
                "price": 1200
              },
              {
                "type": "commute",
                "from": "JFK Airport",
                "to": "Grand JFK Hotel",
                "mode": "Private Car Transfer",
                "departure_time": "07:30 PM",
                "arrival_time": "08:30 PM",
                "price": 80
              },
              {
                "type": "activity",
                "name": "Hotel Check-in & Freshen Up",
                "description": "Settle into your premium hotel room and relax after your flight.",
                "start_time": "08:30 PM",
                "end_time": "09:30 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Keens Steakhouse",
                "cuisine": "American Steakhouse",
                "description": "Historic New York institution known for its mutton chop and classic ambiance.",
                "time": "10:00 PM",
                "price": 100,
                "location": "Midtown West"
              }
            ]
          },
          {
            "day": 2,
            "daily_intelligence": {
              "weather": {
                "conditions": "Sunny and crisp, 18°C. Excellent for city exploration.",
                "recommendations": [
                  "Wear comfortable shoes for walking around downtown."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visiting the 9/11 Memorial in the morning offers a contemplative atmosphere."
                ],
                "local_insights": [
                  "The Freedom Tower offers incredible panoramic views."
                ],
                "cultural_notes": [
                  "Be respectful and quiet at the 9/11 Memorial and Museum."
                ]
              },
              "highlights": {
                "must_see": [
                  "9/11 Memorial & Museum",
                  "One World Observatory"
                ],
                "food_recommendations": [
                  "Upscale dining in the Financial District"
                ],
                "hidden_gems": [
                  "Oculus transportation hub for unique architecture and shopping."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Breakfast / Local Cafe",
                "cuisine": "American Breakfast",
                "description": "Enjoy a leisurely breakfast at the hotel or a nearby upscale cafe.",
                "time": "8:30 AM",
                "price": 30,
                "location": "Grand JFK Hotel or nearby"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "9/11 Memorial & Museum",
                "mode": "Subway / Taxi",
                "departure_time": "9:30 AM",
                "arrival_time": "10:00 AM",
                "price": 15
              },
              {
                "type": "activity",
                "name": "9/11 Memorial & Museum",
                "description": "Visit the poignant memorial pools and the powerful museum dedicated to the events of 9/11.",
                "start_time": "10:15 AM",
                "end_time": "1:00 PM",
                "price": 30
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Le District",
                "cuisine": "French Market & Bistro",
                "description": "Upscale French market and dining experience with various stations.",
                "time": "1:30 PM",
                "price": 50,
                "location": "Brookfield Place, near WTC"
              },
              {
                "type": "activity",
                "name": "One World Observatory",
                "description": "Ascend to the top of One World Trade Center for breathtaking 360-degree views of the city.",
                "start_time": "2:45 PM",
                "end_time": "4:15 PM",
                "price": 45
              },
              {
                "type": "commute",
                "from": "One World Observatory",
                "to": "Wall Street / Charging Bull",
                "mode": "Walk",
                "departure_time": "4:30 PM",
                "arrival_time": "4:45 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Financial District & Charging Bull",
                "description": "Walk through the historic Financial District, see the New York Stock Exchange and the iconic Charging Bull.",
                "start_time": "4:45 PM",
                "end_time": "5:45 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Financial District",
                "to": "Hotel",
                "mode": "Taxi",
                "departure_time": "6:00 PM",
                "arrival_time": "6:30 PM",
                "price": 25
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "The Dead Rabbit",
                "cuisine": "Irish Pub / Cocktails",
                "description": "Award-winning pub known for its cocktails and elevated pub fare.",
                "time": "7:30 PM",
                "price": 70,
                "location": "Financial District"
              }
            ]
          },
          {
            "day": 3,
            "daily_intelligence": {
              "weather": {
                "conditions": "Partly cloudy, 16°C. Ideal for sightseeing and a show.",
                "recommendations": [
                  "A stylish outer layer for the evening is recommended."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Book Broadway show tickets well in advance for desired seating."
                ],
                "local_insights": [
                  "The Empire State Building offers unique views, especially at night."
                ],
                "cultural_notes": [
                  "Broadway theater etiquette includes arriving early and silencing phones."
                ]
              },
              "highlights": {
                "must_see": [
                  "Empire State Building views",
                  "A captivating Broadway show"
                ],
                "food_recommendations": [
                  "Pre-theater dinner in the Theater District"
                ],
                "hidden_gems": [
                  "Visit the lobby of the Chrysler Building for Art Deco architecture."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Zabar's Cafe",
                "cuisine": "Deli & Coffee",
                "description": "Classic Upper West Side deli for bagels, coffee, and pastries.",
                "time": "8:30 AM",
                "price": 25,
                "location": "Upper West Side"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Empire State Building",
                "mode": "Walk / Subway",
                "departure_time": "9:30 AM",
                "arrival_time": "9:45 AM",
                "price": 5
              },
              {
                "type": "activity",
                "name": "Empire State Building Observation Deck",
                "description": "Visit the iconic Empire State Building for classic New York City views. Opt for a faster entry pass.",
                "start_time": "10:00 AM",
                "end_time": "11:30 AM",
                "price": 50
              },
              {
                "type": "commute",
                "from": "Empire State Building",
                "to": "Herald Square (Macy's)",
                "mode": "Walk",
                "departure_time": "11:45 AM",
                "arrival_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Macy's Herald Square",
                "description": "Browse the flagship department store, one of the world's largest.",
                "start_time": "12:00 PM",
                "end_time": "1:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Eataly Flatiron",
                "cuisine": "Italian Market & Restaurant",
                "description": "Authentic Italian dishes, pasta, and gourmet market experience.",
                "time": "1:30 PM",
                "price": 45,
                "location": "Flatiron District"
              },
              {
                "type": "commute",
                "from": "Eataly Flatiron",
                "to": "Theater District",
                "mode": "Subway",
                "departure_time": "2:45 PM",
                "arrival_time": "3:15 PM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Relax & Pre-Theater Drinks",
                "description": "Enjoy some downtime before your evening show, perhaps with a cocktail.",
                "start_time": "3:30 PM",
                "end_time": "5:30 PM",
                "price": 30
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Bond 45",
                "cuisine": "Italian",
                "description": "Upscale Italian dining in the Theater District, perfect for pre-show.",
                "time": "5:45 PM",
                "price": 75,
                "location": "Theater District"
              },
              {
                "type": "activity",
                "name": "Broadway Show",
                "description": "Experience the magic of a live Broadway performance (e.g., 'The Lion King' or 'Hamilton').",
                "start_time": "7:00 PM",
                "end_time": "10:00 PM",
                "price": 180
              }
            ]
          },
          {
            "day": 4,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and possibly breezy, 14°C. Enjoy a mix of indoor art and outdoor park.",
                "recommendations": [
                  "A warm scarf for the breezy parts of Central Park."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visiting MoMA at opening helps avoid the largest crowds."
                ],
                "local_insights": [
                  "Central Park offers many activities, from rowing to simply relaxing."
                ],
                "cultural_notes": [
                  "Museum gift shops are great for unique souvenirs."
                ]
              },
              "highlights": {
                "must_see": [
                  "MoMA's collection of modern art",
                  "Central Park's iconic landscapes"
                ],
                "food_recommendations": [
                  "Upscale cafe lunch near MoMA or Central Park"
                ],
                "hidden_gems": [
                  "The Conservatory Garden in Central Park."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Le Pain Quotidien",
                "cuisine": "Belgian Bakery & Cafe",
                "description": "Organic, rustic bread and fresh breakfast items.",
                "time": "8:30 AM",
                "price": 25,
                "location": "Midtown"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Museum of Modern Art (MoMA)",
                "mode": "Walk",
                "departure_time": "9:30 AM",
                "arrival_time": "9:45 AM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Museum of Modern Art (MoMA)",
                "description": "Immerse yourself in world-renowned modern and contemporary art.",
                "start_time": "10:00 AM",
                "end_time": "1:00 PM",
                "price": 30
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "The Modern",
                "cuisine": "Modern American (2 Michelin stars)",
                "description": "Elegant fine dining with views of MoMA's sculpture garden.",
                "time": "1:15 PM",
                "price": 80,
                "location": "Within MoMA"
              },
              {
                "type": "commute",
                "from": "MoMA",
                "to": "Central Park",
                "mode": "Walk",
                "departure_time": "2:45 PM",
                "arrival_time": "3:00 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Central Park Exploration & Carriage Ride",
                "description": "Stroll through Central Park, visit iconic spots like Bethesda Terrace, Bow Bridge, and enjoy a relaxing horse-drawn carriage ride.",
                "start_time": "3:00 PM",
                "end_time": "5:30 PM",
                "price": 100
              },
              {
                "type": "commute",
                "from": "Central Park (near 59th St)",
                "to": "Hotel",
                "mode": "Walk / Taxi",
                "departure_time": "5:45 PM",
                "arrival_time": "6:15 PM",
                "price": 15
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Tavern on the Green",
                "cuisine": "American",
                "description": "Iconic Central Park restaurant with a beautiful setting and classic American fare.",
                "time": "7:30 PM",
                "price": 90,
                "location": "Central Park"
              }
            ]
          },
          {
            "day": 5,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cloudy with a chance of light rain, 12°C. Excellent day for indoor cultural experiences.",
                "recommendations": [
                  "Carry an umbrella.",
                  "Indoor activities are perfectly suited for this weather."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "The Met can take hours; plan your sections to visit."
                ],
                "local_insights": [
                  "The Guggenheim is a unique architectural marvel, inside and out."
                ],
                "cultural_notes": [
                  "The Upper East Side is known for its elegant architecture and museums."
                ]
              },
              "highlights": {
                "must_see": [
                  "The Met's vast collections",
                  "Guggenheim Museum's spiral design"
                ],
                "food_recommendations": [
                  "High-end cafe or bistro in the Upper East Side"
                ],
                "hidden_gems": [
                  "Stroll along Museum Mile, admiring the historic mansions."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Sarabeth's",
                "cuisine": "American Bakery & Cafe",
                "description": "Famous for its brunch and fresh-baked goods.",
                "time": "8:30 AM",
                "price": 35,
                "location": "Upper East Side"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "The Metropolitan Museum of Art (The Met)",
                "mode": "Subway",
                "departure_time": "9:30 AM",
                "arrival_time": "10:00 AM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "The Metropolitan Museum of Art (The Met) - Highlights Tour",
                "description": "Explore one of the world's greatest art museums. Consider a guided tour or focus on specific collections.",
                "start_time": "10:15 AM",
                "end_time": "1:15 PM",
                "price": 30
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "The Wright at the Guggenheim",
                "cuisine": "Modern American",
                "description": "Sleek restaurant with an artful setting, located within the Guggenheim Museum.",
                "time": "1:45 PM",
                "price": 55,
                "location": "Guggenheim Museum"
              },
              {
                "type": "commute",
                "from": "The Met",
                "to": "Guggenheim Museum",
                "mode": "Walk",
                "departure_time": "1:30 PM",
                "arrival_time": "1:45 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Guggenheim Museum",
                "description": "Experience the unique spiral architecture of Frank Lloyd Wright and its impressive collection of modern art.",
                "start_time": "3:00 PM",
                "end_time": "5:00 PM",
                "price": 25
              },
              {
                "type": "commute",
                "from": "Guggenheim Museum",
                "to": "Hotel",
                "mode": "Taxi",
                "departure_time": "5:15 PM",
                "arrival_time": "5:45 PM",
                "price": 20
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Daniel",
                "cuisine": "Contemporary French (2 Michelin stars)",
                "description": "An exquisite culinary journey in a refined setting, embodying French haute cuisine.",
                "time": "7:30 PM",
                "price": 150,
                "location": "Upper East Side"
              }
            ]
          },
          {
            "day": 6,
            "daily_intelligence": {
              "weather": {
                "conditions": "Crisp autumn day, 17°C, mostly sunny. Ideal for exploring unique neighborhoods.",
                "recommendations": [
                  "Dress fashionably for the trendy areas of SoHo and Greenwich Village."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "SoHo is best explored in the late morning before peak crowds."
                ],
                "local_insights": [
                  "Greenwich Village offers fantastic live music and comedy clubs in the evening."
                ],
                "cultural_notes": [
                  "Explore the side streets of these neighborhoods for local charm."
                ]
              },
              "highlights": {
                "must_see": [
                  "Shopping in SoHo's boutiques",
                  "Atmosphere of Washington Square Park"
                ],
                "food_recommendations": [
                  "Brunch in Greenwich Village, then an artisanal coffee"
                ],
                "hidden_gems": [
                  "The Jefferson Market Garden, a serene public garden."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Balthazar",
                "cuisine": "French Brasserie",
                "description": "Popular SoHo spot for classic French breakfast and brunch.",
                "time": "9:00 AM",
                "price": 40,
                "location": "SoHo"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "SoHo",
                "mode": "Subway / Taxi",
                "departure_time": "10:00 AM",
                "arrival_time": "10:30 AM",
                "price": 15
              },
              {
                "type": "activity",
                "name": "SoHo Shopping & Galleries",
                "description": "Explore the cobblestone streets of SoHo, known for its cast-iron architecture, high-end boutiques, and art galleries.",
                "start_time": "10:45 AM",
                "end_time": "1:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Jack's Wife Freda",
                "cuisine": "Mediterranean-American",
                "description": "Trendy spot for flavorful and photogenic dishes.",
                "time": "1:30 PM",
                "price": 40,
                "location": "SoHo / Greenwich Village"
              },
              {
                "type": "commute",
                "from": "SoHo",
                "to": "Greenwich Village",
                "mode": "Walk",
                "departure_time": "2:45 PM",
                "arrival_time": "3:00 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Greenwich Village & Washington Square Park",
                "description": "Wander through the historic, bohemian streets of Greenwich Village, visit Washington Square Park, and discover charming cafes and bookstores.",
                "start_time": "3:00 PM",
                "end_time": "6:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Greenwich Village",
                "to": "Hotel",
                "mode": "Taxi",
                "departure_time": "6:15 PM",
                "arrival_time": "6:45 PM",
                "price": 20
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Carbone",
                "cuisine": "Italian-American",
                "description": "An opulent and highly sought-after restaurant offering a retro Italian-American dining experience.",
                "time": "8:00 PM",
                "price": 120,
                "location": "Greenwich Village"
              }
            ]
          },
          {
            "day": 7,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and breezy, 13°C. Perfect for a final day of iconic views and relaxation.",
                "recommendations": [
                  "A warm outer layer is essential for the Top of the Rock observation deck."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Visit the Top of the Rock in the late afternoon for optimal lighting and sunset views."
                ],
                "local_insights": [
                  "Enjoy the vibrant atmosphere of Columbus Circle and Lincoln Center."
                ],
                "cultural_notes": [
                  "Broadway offers many matinee shows if you want a second experience."
                ]
              },
              "highlights": {
                "must_see": [
                  "Top of the Rock panoramic views",
                  "Lincoln Center's performing arts venues"
                ],
                "food_recommendations": [
                  "Dinner near Lincoln Center or Columbus Circle"
                ],
                "hidden_gems": [
                  "The Time Warner Center shops and restaurants at Columbus Circle."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Breakfast",
                "cuisine": "American",
                "description": "Convenient breakfast at your hotel.",
                "time": "8:30 AM",
                "price": 30,
                "location": "Grand JFK Hotel"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Lincoln Center",
                "mode": "Subway / Walk",
                "departure_time": "9:30 AM",
                "arrival_time": "10:00 AM",
                "price": 10
              },
              {
                "type": "activity",
                "name": "Lincoln Center for the Performing Arts",
                "description": "Explore the iconic campus of Lincoln Center, home to the Metropolitan Opera, New York Philharmonic, and more.",
                "start_time": "10:15 AM",
                "end_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Lincoln Center",
                "to": "Columbus Circle",
                "mode": "Walk",
                "departure_time": "12:15 PM",
                "arrival_time": "12:30 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Per Se",
                "cuisine": "French/New American (3 Michelin stars)",
                "description": "One of New York's most prestigious restaurants, offering exquisite tasting menus and views of Central Park.",
                "time": "1:00 PM",
                "price": 100,
                "location": "Time Warner Center, Columbus Circle"
              },
              {
                "type": "activity",
                "name": "Shopping & Exploration at Columbus Circle",
                "description": "Browse the shops at the Time Warner Center and enjoy the bustling atmosphere of Columbus Circle.",
                "start_time": "2:30 PM",
                "end_time": "4:00 PM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Columbus Circle",
                "to": "Top of the Rock (Rockefeller Center)",
                "mode": "Subway",
                "departure_time": "4:15 PM",
                "arrival_time": "4:30 PM",
                "price": 2.9
              },
              {
                "type": "activity",
                "name": "Top of the Rock Observation Deck (Sunset/Night View)",
                "description": "Revisit or experience the Top of the Rock for stunning sunset and night views of the city lights.",
                "start_time": "4:45 PM",
                "end_time": "6:30 PM",
                "price": 50
              },
              {
                "type": "commute",
                "from": "Rockefeller Center",
                "to": "Hotel",
                "mode": "Walk",
                "departure_time": "6:45 PM",
                "arrival_time": "7:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Totto Ramen",
                "cuisine": "Japanese Ramen",
                "description": "Cozy, popular spot for authentic and flavorful ramen.",
                "time": "8:00 PM",
                "price": 35,
                "location": "Midtown West"
              }
            ]
          },
          {
            "day": 8,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and cloudy, 10°C. Suitable for departure.",
                "recommendations": [
                  "Ensure all belongings are packed, prepare for transit."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Allow ample time for airport transfer and check-in procedures."
                ],
                "local_insights": [
                  "Consider arranging a late check-out if your flight is much later in the day."
                ],
                "cultural_notes": [
                  "Confirm your flight status and terminal before heading to JFK."
                ]
              },
              "highlights": {
                "must_see": [
                  "N/A - Departure day"
                ],
                "food_recommendations": [
                  "Enjoy a final New York breakfast before heading to the airport"
                ],
                "hidden_gems": [
                  "N/A"
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Breakfast",
                "cuisine": "American",
                "description": "Final breakfast at your premium hotel.",
                "time": "8:00 AM",
                "price": 30,
                "location": "Grand JFK Hotel"
              },
              {
                "type": "activity",
                "name": "Leisure & Final Packing",
                "description": "Enjoy a relaxed morning, finish packing, and double-check your belongings.",
                "start_time": "9:00 AM",
                "end_time": "10:00 AM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Hotel Check-out",
                "description": "Complete check-out procedures at the hotel.",
                "start_time": "10:00 AM",
                "end_time": "10:30 AM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Grand JFK Hotel",
                "to": "JFK Airport",
                "mode": "Private Car Transfer",
                "departure_time": "10:45 AM",
                "arrival_time": "11:45 AM",
                "price": 80
              },
              {
                "type": "activity",
                "name": "Airport Security & Departure",
                "description": "Proceed through security, enjoy lounge access (if available with your ticket), and prepare for boarding.",
                "start_time": "12:00 PM",
                "end_time": "1:30 PM",
                "price": 0
              },
              {
                "type": "flight",
                "airline": "Mock Premium Airline",
                "departure_time": "10:00 AM (JFK)",
                "arrival_time": "08:30 AM (BOM, next day)",
                "class": "Premium Economy",
                "price": 1400,
                "note": "Placeholder for return Premium Economy flight as actual data was not provided for a round trip."
              }
            ]
          }
        ],
        "upsell": [
          {
            "type": "hotel",
            "name": "Luxury Palace JFK",
            "upgrade_cost": 1155,
            "benefits": [
              "5-star luxury accommodations",
              "Exceptional service and amenities",
              "Spacious and elegantly furnished rooms",
              "Enhanced comfort and prestige"
            ]
          },
          {
            "type": "flight",
            "name": "Business Class Round Trip (e.g., Air Canada/Lufthansa)",
            "upgrade_cost": 900,
            "benefits": [
              "Lie-flat seats for superior comfort on long-haul flights",
              "Gourmet dining and premium beverage service",
              "Dedicated lounge access at airports",
              "Seamless travel experience with priority services"
            ]
          },
          {
            "type": "activity",
            "name": "Private Broadway Backstage Tour",
            "upgrade_cost": 300,
            "benefits": [
              "Exclusive behind-the-scenes look at a Broadway theater",
              "Learn about the history and magic of Broadway from an insider",
              "More personal and in-depth experience"
            ]
          }
        ]
      },
      "luxury": {
        "overview": {
          "trip_type": "Entertainment",
          "total_travellers": {
            "adults": 1,
            "kids": 0
          },
          "duration": "8 days, 7 nights",
          "total_cost": 14500,
          "cost_breakdown": {
            "flights": 3585.77,
            "hotels": 2450,
            "activities": 4500,
            "meals": 3200,
            "commute": 764.23
          }
        },
        "travel_intelligence": {
          "weather": {
            "expected_conditions": "Pleasant autumn weather, 10-18°C (50-65°F). Cool mornings/evenings, mild days. Chance of light rain.",
            "packing_tips": [
              "Designer layers for various social engagements",
              "High-quality, comfortable walking shoes and elegant evening wear",
              "Premium umbrella or trench coat",
              "Cashmere scarf or designer accessories"
            ]
          },
          "travel_tips": {
            "local_customs": [
              "Concierge services at luxury hotels are invaluable for reservations and bespoke experiences.",
              "Tipping is expected for all service providers, often at a higher rate for exceptional service."
            ],
            "transportation": [
              "Utilize private chauffeured services for all transfers for ultimate comfort and discretion.",
              "Helicopter transfers for specific events can be arranged."
            ],
            "money_matters": [
              "Most luxury establishments prefer card payments, but cash can be useful for small discretionary tips.",
              "Currency exchange can be arranged by hotel concierge."
            ],
            "safety": [
              "New York is largely safe, but private security details can be arranged for added peace of mind.",
              "Always use vetted service providers."
            ]
          },
          "cultural_facts": {
            "highlights": [
              "NYC is a global epicenter of arts, luxury fashion, and gourmet dining.",
              "Access to exclusive experiences, private viewings, and celebrity chef encounters."
            ],
            "cuisine": [
              "Indulge in Michelin-starred dining, private chef experiences, and exclusive culinary events.",
              "Explore the city's top cocktail bars and speakeasies."
            ],
            "fun_facts": [
              "New York City has the highest number of billionaires in any city worldwide.",
              "The city's luxury real estate market is among the most expensive globally."
            ]
          },
          "current_events": {
            "seasonal_highlights": [
              "Exclusive fall fashion events or art gallery openings may be underway.",
              "High-profile concerts or theatrical premieres could coincide with your visit."
            ],
            "travel_notes": [
              "Private access and reservations are paramount for a seamless luxury experience; book far in advance.",
              "Be aware of any high-profile events that may affect traffic or availability of services."
            ]
          }
        },
        "flights": [
          {
            "type": "flight",
            "airline": "AC / LH (Air Canada / Lufthansa)",
            "departure_time": "01:30 AM (BOM)",
            "arrival_time": "10:47 PM (JFK)",
            "class": "Business",
            "price": 3585.77,
            "stops": "2 (MUC, YYZ)"
          },
          {
            "type": "flight",
            "airline": "LH (Lufthansa)",
            "departure_time": "05:30 PM (JFK)",
            "arrival_time": "11:50 PM (BOM, next day)",
            "class": "Business",
            "price": 0,
            "stops": "1 (MUC)",
            "note": "Return leg of the round trip flight"
          }
        ],
        "hotels": [
          {
            "type": "hotel",
            "name": "Luxury Palace JFK",
            "room_type": "Standard Room (King Bed)",
            "price": 2450,
            "amenities": [
              "Luxurious accommodations",
              "Premium services",
              "5-star rating",
              "King bed"
            ]
          }
        ],
        "days": [
          {
            "day": 1,
            "daily_intelligence": {
              "weather": {
                "conditions": "Mild and clear, 15°C. Pleasant for a late arrival and fine dining.",
                "recommendations": [
                  "A chic coat will be ideal for evening attire."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Arriving via business class offers a more relaxed start to your journey."
                ],
                "local_insights": [
                  "Private car services streamline airport transfers, especially after a long flight."
                ],
                "cultural_notes": [
                  "New York's luxury dining scene requires reservations, often weeks in advance."
                ]
              },
              "highlights": {
                "must_see": [
                  "Experience the unparalleled service of a 5-star hotel"
                ],
                "food_recommendations": [
                  "Michelin-starred dining for your arrival evening"
                ],
                "hidden_gems": [
                  "Discover your hotel's exclusive bar or lounge."
                ]
              }
            },
            "schedule": [
              {
                "type": "flight",
                "airline": "AC / LH",
                "departure_time": "01:30 AM (BOM)",
                "arrival_time": "10:47 PM (JFK)",
                "class": "Business",
                "price": 3585.77
              },
              {
                "type": "commute",
                "from": "JFK Airport",
                "to": "Luxury Palace JFK",
                "mode": "Private Chauffeur Service (Mercedes S-Class)",
                "departure_time": "11:30 PM",
                "arrival_time": "12:30 AM (Day 2)",
                "price": 180
              },
              {
                "type": "activity",
                "name": "Private Hotel Check-in & Relaxation",
                "description": "Seamless check-in experience with personal assistance. Settle into your luxurious room.",
                "start_time": "12:30 AM (Day 2)",
                "end_time": "1:30 AM (Day 2)",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "In-Room Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet International",
                "description": "Enjoy a curated late-night meal from your hotel's fine dining menu in the comfort of your room.",
                "time": "1:30 AM (Day 2)",
                "price": 100,
                "location": "Luxury Palace JFK"
              }
            ]
          },
          {
            "day": 2,
            "daily_intelligence": {
              "weather": {
                "conditions": "Sunny and crisp, 18°C. Ideal for exploring and enjoying outdoor views.",
                "recommendations": [
                  "Light, elegant outerwear will be suitable for the day."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Private guided tours offer unparalleled insight and efficiency."
                ],
                "local_insights": [
                  "Lower Manhattan has some of NYC's most exclusive boutiques."
                ],
                "cultural_notes": [
                  "The 9/11 Memorial provides a powerful, respectful experience; dress appropriately."
                ]
              },
              "highlights": {
                "must_see": [
                  "9/11 Memorial & Museum",
                  "One World Observatory (VIP access)"
                ],
                "food_recommendations": [
                  "Lunch at a high-end restaurant in Battery Park City"
                ],
                "hidden_gems": [
                  "Private viewing of art collections in the financial district."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet Breakfast",
                "description": "A refined breakfast experience at your hotel, featuring fresh, local ingredients.",
                "time": "9:00 AM",
                "price": 70,
                "location": "Luxury Palace JFK"
              },
              {
                "type": "commute",
                "from": "Luxury Palace JFK",
                "to": "9/11 Memorial & Museum",
                "mode": "Private Car",
                "departure_time": "10:30 AM",
                "arrival_time": "11:00 AM",
                "price": 50
              },
              {
                "type": "activity",
                "name": "Private Guided Tour of 9/11 Memorial & Museum",
                "description": "A private docent-led tour offering an intimate and in-depth understanding of the events of 9/11 and its aftermath.",
                "start_time": "11:15 AM",
                "end_time": "2:00 PM",
                "price": 350
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Manhatta",
                "cuisine": "New American",
                "description": "Elegant dining with stunning panoramic views of Manhattan from the 60th floor.",
                "time": "2:30 PM",
                "price": 150,
                "location": "Financial District"
              },
              {
                "type": "activity",
                "name": "VIP Access One World Observatory",
                "description": "Skip-the-line access and a personalized experience at the tallest building in the Western Hemisphere, offering unparalleled views.",
                "start_time": "4:00 PM",
                "end_time": "5:30 PM",
                "price": 80
              },
              {
                "type": "commute",
                "from": "One World Observatory",
                "to": "Hotel",
                "mode": "Private Car",
                "departure_time": "5:45 PM",
                "arrival_time": "6:15 PM",
                "price": 50
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "The Grill",
                "cuisine": "Classic American",
                "description": "An exquisite experience at one of NYC's most iconic and luxurious restaurants, known for its opulent setting and exceptional service.",
                "time": "8:00 PM",
                "price": 300,
                "location": "Midtown East"
              }
            ]
          },
          {
            "day": 3,
            "daily_intelligence": {
              "weather": {
                "conditions": "Partly cloudy, 16°C. Perfect for enjoying a show and upscale experiences.",
                "recommendations": [
                  "Formal or cocktail attire will be suitable for the evening's entertainment."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "VIP access ensures a smooth experience at popular attractions."
                ],
                "local_insights": [
                  "Broadway offers private boxes for an exclusive viewing experience."
                ],
                "cultural_notes": [
                  "Many luxury establishments have a dress code; check in advance."
                ]
              },
              "highlights": {
                "must_see": [
                  "VIP experience at the Empire State Building",
                  "A premium Broadway show from the best seats"
                ],
                "food_recommendations": [
                  "Fine dining in the Theater District"
                ],
                "hidden_gems": [
                  "Enjoy a bespoke cocktail at a hidden upscale bar."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet Breakfast",
                "description": "Indulge in a luxurious breakfast delivered to your room or at the hotel's fine dining restaurant.",
                "time": "9:00 AM",
                "price": 70,
                "location": "Luxury Palace JFK"
              },
              {
                "type": "commute",
                "from": "Luxury Palace JFK",
                "to": "Empire State Building",
                "mode": "Private Car",
                "departure_time": "10:30 AM",
                "arrival_time": "10:45 AM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Empire State Building - VIP Express Entry",
                "description": "Enjoy expedited access to the Empire State Building's observation decks, bypassing queues for a seamless experience.",
                "start_time": "11:00 AM",
                "end_time": "12:30 PM",
                "price": 100
              },
              {
                "type": "commute",
                "from": "Empire State Building",
                "to": "Midtown Shopping",
                "mode": "Walk",
                "departure_time": "12:45 PM",
                "arrival_time": "1:00 PM",
                "price": 0
              },
              {
                "type": "activity",
                "name": "Luxury Shopping on Fifth Avenue",
                "description": "A personalized shopping experience with a private stylist at high-end boutiques like Saks Fifth Avenue, Tiffany & Co., and Bergdorf Goodman.",
                "start_time": "1:00 PM",
                "end_time": "3:30 PM",
                "price": 500
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Bergdorf Goodman Restaurant",
                "cuisine": "Upscale American",
                "description": "Chic dining with views of Central Park, perfect for a luxurious lunch.",
                "time": "3:30 PM",
                "price": 120,
                "location": "Fifth Avenue"
              },
              {
                "type": "commute",
                "from": "Fifth Avenue",
                "to": "Hotel",
                "mode": "Private Car",
                "departure_time": "5:00 PM",
                "arrival_time": "5:15 PM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Pre-Theater Dinner & Drinks",
                "description": "Enjoy a sophisticated dinner and cocktails at a high-end restaurant before your Broadway show.",
                "start_time": "6:00 PM",
                "end_time": "7:30 PM",
                "price": 200
              },
              {
                "type": "activity",
                "name": "Broadway Show - Premium Seating",
                "description": "Experience a top Broadway production from the best seats in the house (e.g., Orchestra Center, Front Mezzanine).",
                "start_time": "8:00 PM",
                "end_time": "10:30 PM",
                "price": 350
              },
              {
                "type": "meal",
                "meal_type": "dessert",
                "restaurant_name": "The Blue Bar at The Algonquin Hotel",
                "cuisine": "Cocktails & Desserts",
                "description": "Enjoy a classic cocktail and dessert in a historic literary haunt.",
                "time": "10:45 PM",
                "price": 70,
                "location": "Theater District"
              }
            ]
          },
          {
            "day": 4,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and possibly breezy, 14°C. Ideal for indoor art and outdoor views.",
                "recommendations": [
                  "A fashionable jacket will be suitable for the day's activities."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Enjoy an exclusive early-morning museum visit for a private experience."
                ],
                "local_insights": [
                  "Central Park offers private walking tours or even horse-drawn carriage tours for a luxurious experience."
                ],
                "cultural_notes": [
                  "Many art galleries in Chelsea require appointments for private viewings."
                ]
              },
              "highlights": {
                "must_see": [
                  "Private tour of MoMA",
                  "Central Park (personalized tour)"
                ],
                "food_recommendations": [
                  "Fine dining with a view of Central Park"
                ],
                "hidden_gems": [
                  "Visit a private art dealer in Chelsea for unique pieces."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet Breakfast",
                "description": "Begin your day with an exquisite breakfast at the hotel.",
                "time": "9:00 AM",
                "price": 70,
                "location": "Luxury Palace JFK"
              },
              {
                "type": "commute",
                "from": "Luxury Palace JFK",
                "to": "Museum of Modern Art (MoMA)",
                "mode": "Private Car",
                "departure_time": "10:00 AM",
                "arrival_time": "10:15 AM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Private Early Access Tour of MoMA",
                "description": "Enjoy a private guided tour of the Museum of Modern Art before public opening hours, offering an exclusive and intimate viewing of masterpieces.",
                "start_time": "10:30 AM",
                "end_time": "12:30 PM",
                "price": 500
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "The Modern (2 Michelin Stars)",
                "cuisine": "Modern American",
                "description": "An elegant dining experience overlooking MoMA's sculpture garden, with a refined tasting menu.",
                "time": "1:00 PM",
                "price": 200,
                "location": "MoMA"
              },
              {
                "type": "commute",
                "from": "MoMA",
                "to": "Central Park",
                "mode": "Private Car",
                "departure_time": "2:45 PM",
                "arrival_time": "3:00 PM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Private Horse-Drawn Carriage Tour of Central Park",
                "description": "Experience Central Park's beauty and iconic landmarks from a private, luxurious horse-drawn carriage, with a knowledgeable driver.",
                "start_time": "3:15 PM",
                "end_time": "4:45 PM",
                "price": 250
              },
              {
                "type": "activity",
                "name": "Leisure Time / Hotel Spa Treatment",
                "description": "Enjoy some personal time or indulge in a rejuvenating spa treatment at your luxury hotel.",
                "start_time": "5:00 PM",
                "end_time": "7:00 PM",
                "price": 250
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Le Bernardin (3 Michelin Stars)",
                "cuisine": "French Seafood",
                "description": "One of the world's most acclaimed seafood restaurants, offering an exquisite and unforgettable culinary journey.",
                "time": "8:00 PM",
                "price": 400,
                "location": "Midtown West"
              }
            ]
          },
          {
            "day": 5,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cloudy with a chance of light rain, 12°C. Excellent day for indoor cultural experiences.",
                "recommendations": [
                  "A sophisticated umbrella is recommended.",
                  "Indoor activities are perfectly suited for this weather."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "The Met can take hours; a private guide maximizes efficiency and provides deeper insights."
                ],
                "local_insights": [
                  "The Upper East Side is renowned for its exclusive galleries and antique shops."
                ],
                "cultural_notes": [
                  "Private viewings can be arranged for high-value art pieces."
                ]
              },
              "highlights": {
                "must_see": [
                  "Private tour of The Met",
                  "Exclusive art gallery visit"
                ],
                "food_recommendations": [
                  "High-end dining in the Upper East Side"
                ],
                "hidden_gems": [
                  "Visit a private collector's showroom by appointment."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet Breakfast",
                "description": "Start your day with a luxurious breakfast experience.",
                "time": "9:00 AM",
                "price": 70,
                "location": "Luxury Palace JFK"
              },
              {
                "type": "commute",
                "from": "Luxury Palace JFK",
                "to": "The Metropolitan Museum of Art (The Met)",
                "mode": "Private Car",
                "departure_time": "10:00 AM",
                "arrival_time": "10:20 AM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Private Guided Tour of The Met",
                "description": "A personalized tour of The Metropolitan Museum of Art, tailored to your interests in art, history, or specific collections.",
                "start_time": "10:30 AM",
                "end_time": "1:30 PM",
                "price": 400
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Cafe Boulud",
                "cuisine": "Contemporary French",
                "description": "Elegant Upper East Side restaurant offering sophisticated French cuisine by Daniel Boulud.",
                "time": "2:00 PM",
                "price": 180,
                "location": "Upper East Side"
              },
              {
                "type": "commute",
                "from": "Cafe Boulud",
                "to": "Upper East Side Art Galleries",
                "mode": "Private Car",
                "departure_time": "3:45 PM",
                "arrival_time": "4:00 PM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Exclusive Upper East Side Gallery Visits",
                "description": "Arrange private viewings at select high-end art galleries in the Upper East Side, curated to your artistic preferences.",
                "start_time": "4:00 PM",
                "end_time": "6:00 PM",
                "price": 600
              },
              {
                "type": "commute",
                "from": "Upper East Side",
                "to": "Hotel",
                "mode": "Private Car",
                "departure_time": "6:15 PM",
                "arrival_time": "6:30 PM",
                "price": 40
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Per Se (3 Michelin Stars)",
                "cuisine": "New American/French",
                "description": "An unparalleled culinary experience with breathtaking views of Central Park, offering a nine-course tasting menu.",
                "time": "8:00 PM",
                "price": 600,
                "location": "Columbus Circle"
              }
            ]
          },
          {
            "day": 6,
            "daily_intelligence": {
              "weather": {
                "conditions": "Crisp autumn day, 17°C, mostly sunny. Ideal for unique urban exploration.",
                "recommendations": [
                  "Comfortable yet stylish attire for walking and unique experiences."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "A morning helicopter tour provides clear views before the day gets hazy."
                ],
                "local_insights": [
                  "The Meatpacking District offers a blend of historic charm and modern luxury."
                ],
                "cultural_notes": [
                  "New York's fashion and design districts are often hidden gems."
                ]
              },
              "highlights": {
                "must_see": [
                  "Private helicopter tour of Manhattan",
                  "Shopping in SoHo's designer boutiques"
                ],
                "food_recommendations": [
                  "Brunch in the Meatpacking District"
                ],
                "hidden_gems": [
                  "Discover a private tailor or bespoke shoemaker in the area."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet Breakfast",
                "description": "Enjoy a sumptuous breakfast at your luxury hotel.",
                "time": "8:30 AM",
                "price": 70,
                "location": "Luxury Palace JFK"
              },
              {
                "type": "commute",
                "from": "Hotel",
                "to": "Heliport (Downtown Manhattan)",
                "mode": "Private Car",
                "departure_time": "9:30 AM",
                "arrival_time": "9:50 AM",
                "price": 50
              },
              {
                "type": "activity",
                "name": "Private Helicopter Tour of Manhattan",
                "description": "Experience breathtaking aerial views of Manhattan's skyline, Statue of Liberty, and iconic landmarks on an exclusive private helicopter tour.",
                "start_time": "10:15 AM",
                "end_time": "11:00 AM",
                "price": 1000
              },
              {
                "type": "commute",
                "from": "Heliport",
                "to": "SoHo",
                "mode": "Private Car",
                "departure_time": "11:15 AM",
                "arrival_time": "11:35 AM",
                "price": 50
              },
              {
                "type": "activity",
                "name": "Personalized Shopping in SoHo & Meatpacking District",
                "description": "A tailored shopping experience with a fashion consultant, exploring exclusive boutiques and designer showrooms in SoHo and the trendy Meatpacking District.",
                "start_time": "11:45 AM",
                "end_time": "2:00 PM",
                "price": 500
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "Pastis",
                "cuisine": "French Brasserie",
                "description": "A stylish and lively French bistro in the Meatpacking District, a popular spot for lunch.",
                "time": "2:15 PM",
                "price": 120,
                "location": "Meatpacking District"
              },
              {
                "type": "commute",
                "from": "Meatpacking District",
                "to": "Hotel",
                "mode": "Private Car",
                "departure_time": "3:45 PM",
                "arrival_time": "4:15 PM",
                "price": 50
              },
              {
                "type": "activity",
                "name": "Rest & Prepare for Evening",
                "description": "Enjoy downtime at the hotel or a leisurely stroll near your accommodation.",
                "start_time": "4:15 PM",
                "end_time": "6:30 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Eleven Madison Park (3 Michelin Stars)",
                "cuisine": "Modern American",
                "description": "An iconic dining experience in a grand art deco space, known for its innovative tasting menus and impeccable service.",
                "time": "7:30 PM",
                "price": 600,
                "location": "Flatiron District"
              }
            ]
          },
          {
            "day": 7,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and breezy, 13°C. Perfect for a final day of iconic views and relaxation.",
                "recommendations": [
                  "A warm outer layer is essential for the Top of the Rock observation deck."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Consider a late checkout or luggage storage for a relaxed final day."
                ],
                "local_insights": [
                  "Enjoy a final luxurious brunch before your flight."
                ],
                "cultural_notes": [
                  "New York offers many high-end bars for a final toast."
                ]
              },
              "highlights": {
                "must_see": [
                  "Top of the Rock (VIP Experience)",
                  "Exclusive rooftop bar for a farewell drink"
                ],
                "food_recommendations": [
                  "Gourmet brunch at a top New York establishment"
                ],
                "hidden_gems": [
                  "Discover a private lounge for a quiet evening."
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet Breakfast",
                "description": "Enjoy a final, lavish breakfast at your hotel.",
                "time": "9:00 AM",
                "price": 70,
                "location": "Luxury Palace JFK"
              },
              {
                "type": "activity",
                "name": "Leisurely Morning & Packing",
                "description": "Enjoy the comforts of your hotel, perhaps a final visit to the hotel's amenities, and complete any last-minute packing.",
                "start_time": "10:00 AM",
                "end_time": "12:00 PM",
                "price": 0
              },
              {
                "type": "meal",
                "meal_type": "lunch",
                "restaurant_name": "ABC Kitchen",
                "cuisine": "New American, Farm-to-Table",
                "description": "Trendy and elegant restaurant known for its seasonal, organic ingredients and stylish ambiance.",
                "time": "12:30 PM",
                "price": 150,
                "location": "Flatiron District"
              },
              {
                "type": "commute",
                "from": "ABC Kitchen",
                "to": "Top of the Rock (Rockefeller Center)",
                "mode": "Private Car",
                "departure_time": "2:00 PM",
                "arrival_time": "2:20 PM",
                "price": 40
              },
              {
                "type": "activity",
                "name": "Top of the Rock - VIP Experience",
                "description": "Enjoy express access and concierge service at the Top of the Rock, providing unparalleled views of Manhattan.",
                "start_time": "2:30 PM",
                "end_time": "4:00 PM",
                "price": 100
              },
              {
                "type": "activity",
                "name": "Farewell Cocktails at an Exclusive Rooftop Bar",
                "description": "Enjoy sophisticated cocktails at one of NYC's premier rooftop bars (e.g., The Peninsula Rooftop) with stunning city views.",
                "start_time": "4:30 PM",
                "end_time": "6:00 PM",
                "price": 150
              },
              {
                "type": "commute",
                "from": "Rooftop Bar",
                "to": "Hotel",
                "mode": "Private Car",
                "departure_time": "6:15 PM",
                "arrival_time": "6:30 PM",
                "price": 40
              },
              {
                "type": "meal",
                "meal_type": "dinner",
                "restaurant_name": "Marea (2 Michelin Stars)",
                "cuisine": "Italian Seafood",
                "description": "An exquisite coastal Italian dining experience, renowned for its fresh seafood and elegant ambiance.",
                "time": "7:30 PM",
                "price": 350,
                "location": "Columbus Circle"
              }
            ]
          },
          {
            "day": 8,
            "daily_intelligence": {
              "weather": {
                "conditions": "Cool and cloudy, 10°C. Suitable for departure.",
                "recommendations": [
                  "Ensure all belongings are packed, prepare for transit."
                ]
              },
              "daily_tips": {
                "best_times": [
                  "Allow generous time for airport transfer and check-in for international business class flights."
                ],
                "local_insights": [
                  "Utilize the business class lounge at JFK for comfort before your flight."
                ],
                "cultural_notes": [
                  "Confirm your flight details and terminal well in advance."
                ]
              },
              "highlights": {
                "must_see": [
                  "N/A - Departure day"
                ],
                "food_recommendations": [
                  "Enjoy a final gourmet breakfast at the hotel"
                ],
                "hidden_gems": [
                  "N/A"
                ]
              }
            },
            "schedule": [
              {
                "type": "meal",
                "meal_type": "breakfast",
                "restaurant_name": "Hotel Dining (Luxury Palace JFK)",
                "cuisine": "Gourmet Breakfast",
                "description": "A final exquisite breakfast at your luxury hotel.",
                "time": "8:00 AM",
                "price": 70,
                "location": "Luxury Palace JFK"
              },
              {
                "type": "activity",
                "name": "Hotel Check-out & Final Preparations",
                "description": "Complete check-out procedures and ensure all personal belongings are accounted for.",
                "start_time": "9:00 AM",
                "end_time": "10:00 AM",
                "price": 0
              },
              {
                "type": "commute",
                "from": "Luxury Palace JFK",
                "to": "JFK Airport Terminal 1",
                "mode": "Private Chauffeur Service",
                "departure_time": "11:30 AM",
                "arrival_time": "12:30 PM",
                "price": 180
              },
              {
                "type": "activity",
                "name": "Business Class Check-in & Lounge Access",
                "description": "Enjoy expedited check-in and relax in the airline's exclusive business class lounge with amenities before your flight.",
                "start_time": "12:30 PM",
                "end_time": "3:30 PM",
                "price": 0
              },
              {
                "type": "flight",
                "airline": "LH (Lufthansa)",
                "departure_time": "05:30 PM (JFK)",
                "arrival_time": "11:50 PM (BOM, next day)",
                "class": "Business",
                "price": 0,
                "note": "Return leg of the round trip flight"
              }
            ]
          }
        ],
        "upsell": [
          {
            "type": "hotel",
            "name": "Luxury Palace JFK - Suite Upgrade",
            "upgrade_cost": 2500,
            "benefits": [
              "Spacious and opulent suite with separate living area",
              "Panoramic city views",
              "Dedicated butler service",
              "Access to executive lounge and exclusive amenities"
            ]
          },
          {
            "type": "flight",
            "name": "First Class Round Trip (e.g., Emirates/Etihad)",
            "upgrade_cost": 5000,
            "benefits": [
              "Private suite with lie-flat bed, personal mini-bar, and fine dining on demand",
              "Onboard shower (A380) or private cabin experience",
              "Exclusive ground services, including private transfers and dedicated lounge access",
              "Unparalleled luxury and comfort for your journey"
            ]
          },
          {
            "type": "activity",
            "name": "Private Chef's Tasting Menu Experience",
            "upgrade_cost": 1500,
            "benefits": [
              "Enjoy a bespoke tasting menu prepared by a renowned New York chef at a private location or exclusive dining room",
              "Personalized culinary journey with wine pairings",
              "Intimate and unforgettable gastronomic experience"
            ]
          }
        ]
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
          "lastTicketingDate": "2025-09-17",
          "numberOfBookableSeats": 9,
          "itineraries": [
            {
              "duration": "PT30H47M",
              "segments": [
                {
                  "departure": {
                    "iataCode": "BOM",
                    "terminal": "2",
                    "at": "2025-10-01T01:30:00"
                  },
                  "arrival": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-01T06:15:00"
                  },
                  "carrierCode": "AC",
                  "number": "9585",
                  "aircraft": {
                    "code": "359"
                  },
                  "operating": {
                    "carrierCode": "LH"
                  },
                  "duration": "PT8H15M",
                  "id": "12",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                },
                {
                  "departure": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-01T11:50:00"
                  },
                  "arrival": {
                    "iataCode": "YYZ",
                    "terminal": "1",
                    "at": "2025-10-01T14:55:00"
                  },
                  "carrierCode": "AC",
                  "number": "837",
                  "aircraft": {
                    "code": "333"
                  },
                  "operating": {
                    "carrierCode": "AC"
                  },
                  "duration": "PT9H5M",
                  "id": "13",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                },
                {
                  "departure": {
                    "iataCode": "YYZ",
                    "terminal": "1",
                    "at": "2025-10-01T20:55:00"
                  },
                  "arrival": {
                    "iataCode": "JFK",
                    "terminal": "7",
                    "at": "2025-10-01T22:47:00"
                  },
                  "carrierCode": "AC",
                  "number": "8556",
                  "aircraft": {
                    "code": "E75"
                  },
                  "operating": {},
                  "duration": "PT1H52M",
                  "id": "14",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                }
              ]
            },
            {
              "duration": "PT20H50M",
              "segments": [
                {
                  "departure": {
                    "iataCode": "JFK",
                    "terminal": "1",
                    "at": "2025-10-08T17:30:00"
                  },
                  "arrival": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-09T07:30:00"
                  },
                  "carrierCode": "LH",
                  "number": "411",
                  "aircraft": {
                    "code": "388"
                  },
                  "operating": {
                    "carrierCode": "LH"
                  },
                  "duration": "PT8H",
                  "id": "21",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                },
                {
                  "departure": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-09T12:30:00"
                  },
                  "arrival": {
                    "iataCode": "BOM",
                    "terminal": "2",
                    "at": "2025-10-09T23:50:00"
                  },
                  "carrierCode": "LH",
                  "number": "766",
                  "aircraft": {
                    "code": "359"
                  },
                  "operating": {
                    "carrierCode": "LH"
                  },
                  "duration": "PT7H50M",
                  "id": "22",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                }
              ]
            }
          ],
          "price": {
            "currency": "USD",
            "total": "3585.77",
            "base": "2320.00",
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
            "grandTotal": "3585.77"
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
            "AC"
          ],
          "travelerPricings": [
            {
              "travelerId": "1",
              "fareOption": "STANDARD",
              "travelerType": "ADULT",
              "price": {
                "currency": "USD",
                "total": "3585.77",
                "base": "2320.00"
              },
              "fareDetailsBySegment": [
                {
                  "segmentId": "12",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "EXECLOW",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "COMPLIMENTARY MEAL",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "BASIC SEAT",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "CHANGEABLE TICKET",
                      "isChargeable": true,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "POINT ACCRUAL",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "13",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "EXECLOW",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "COMPLIMENTARY MEAL",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "BASIC SEAT",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "CHANGEABLE TICKET",
                      "isChargeable": true,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "POINT ACCRUAL",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "14",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "EXECLOW",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "COMPLIMENTARY MEAL",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "BASIC SEAT",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "CHANGEABLE TICKET",
                      "isChargeable": true,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "POINT ACCRUAL",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "21",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "BUSSAVER",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "SNACK",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "COMPLIMENTARY FOOD AND BEV",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BOARDING",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BAGGAGE",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY SECURITY",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "STANDARD SEAT RESERVATION",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "22",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "BUSSAVER",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "SNACK",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "COMPLIMENTARY FOOD AND BEV",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BOARDING",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BAGGAGE",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY SECURITY",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "STANDARD SEAT RESERVATION",
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
          "id": "MOCK_PREMIUM_ECONOMY_447",
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
          "numberOfBookableSeats": 1,
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
                  "id": "9",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                }
              ]
            },
            {
              "duration": "PT13H",
              "segments": [
                {
                  "departure": {
                    "iataCode": "JFK",
                    "terminal": "4",
                    "at": "2025-10-08T10:00:00"
                  },
                  "arrival": {
                    "iataCode": "DEL",
                    "terminal": "3",
                    "at": "2025-10-08T23:00:00"
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
                  "id": "12",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                },
                {
                  "departure": {
                    "iataCode": "DEL",
                    "terminal": "3",
                    "at": "2025-10-09T06:05:00"
                  },
                  "arrival": {
                    "iataCode": "BOM",
                    "terminal": "2",
                    "at": "2025-10-09T08:30:00"
                  },
                  "carrierCode": "AI",
                  "number": "2975",
                  "aircraft": {
                    "code": "32N"
                  },
                  "operating": {
                    "carrierCode": "AI"
                  },
                  "duration": "PT2H25M",
                  "id": "13",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                }
              ]
            }
          ],
          "price": {
            "currency": "USD",
            "total": "854.07",
            "base": "413.00",
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
            "grandTotal": "854.07",
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
                "total": "854.07",
                "base": "413.00"
              },
              "fareDetailsBySegment": [
                {
                  "segmentId": "9",
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
                  "segmentId": "12",
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
                },
                {
                  "segmentId": "13",
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
              "checkOutDate": "2025-10-08",
              "price": {
                "total": "185.00",
                "taxes": [
                  {
                    "included": true,
                    "percentage": "15.00",
                    "amount": "27.75",
                    "code": "TOTAL_TAX"
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
                  "deadline": "2025-10-01",
                  "type": "FULL_STAY"
                },
                "paymentType": "GUARANTEE"
              },
              "self": {
                "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_796"
              },
              "rateFamilyEstimated": {
                "code": "PRO",
                "type": "P"
              },
              "id": "MOCK_OFFER_796",
              "checkInDate": "2025-10-01",
              "rateCode": "RAC",
              "room": {
                "typeEstimated": {
                  "beds": 1,
                  "category": "STANDARD_ROOM",
                  "bedType": "KING"
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
          "id": "MOCK_MID_RANGE_JFK_796",
          "type": "hotel-offer"
        }
      ],
      "LUXURY": [
        {
          "offers": [
            {
              "checkOutDate": "2025-10-08",
              "price": {
                "total": "350.00",
                "taxes": [
                  {
                    "included": true,
                    "percentage": "15.00",
                    "amount": "52.50",
                    "code": "TOTAL_TAX"
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
                  "deadline": "2025-10-01",
                  "type": "FULL_STAY"
                },
                "paymentType": "GUARANTEE"
              },
              "self": {
                "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_796"
              },
              "rateFamilyEstimated": {
                "code": "PRO",
                "type": "P"
              },
              "id": "MOCK_OFFER_796",
              "checkInDate": "2025-10-01",
              "rateCode": "RAC",
              "room": {
                "typeEstimated": {
                  "beds": 1,
                  "category": "STANDARD_ROOM",
                  "bedType": "KING"
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
          "id": "MOCK_LUXURY_JFK_796",
          "type": "hotel-offer"
        }
      ],
      "STANDARD": [
        {
          "offers": [
            {
              "checkOutDate": "2025-10-08",
              "price": {
                "total": "85.00",
                "taxes": [
                  {
                    "included": true,
                    "percentage": "15.00",
                    "amount": "12.75",
                    "code": "TOTAL_TAX"
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
                  "deadline": "2025-10-01",
                  "type": "FULL_STAY"
                },
                "paymentType": "GUARANTEE"
              },
              "self": {
                "href": "https://api.amadeus.com/v3/shopping/hotel-offers/MOCK_OFFER_795"
              },
              "rateFamilyEstimated": {
                "code": "PRO",
                "type": "P"
              },
              "id": "MOCK_OFFER_795",
              "checkInDate": "2025-10-01",
              "rateCode": "RAC",
              "room": {
                "typeEstimated": {
                  "beds": 1,
                  "category": "STANDARD_ROOM",
                  "bedType": "KING"
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
          "id": "MOCK_STANDARD_JFK_793",
          "type": "hotel-offer"
        }
      ]
    },
    "activityResponse": {
      "ENTERTAINMENT": [
        {
          "images": [
            "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzFkMmNlOTc1LTAwYjYtNGIyZC1hMjYxLWM2NzYyMWZkZjk0YyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
            "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzU4MDIyN2EwLWJkNTYtNGExMi1hNjFmLTUwOTU1NTI3OTlkNCIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
            "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzRmMGI4ZTNjLTVlYjQtNDBkZi1iMzM1LTMxMTFmNmYyNjc5YyIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
            "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzM5ZmMwNTRjLTJhYWQtNGJjNC05OGZhLTNiMjk2NGE5MzdkNSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
            "https://images.holibob.tech/eyJrZXkiOiJwcm9kdWN0SW1hZ2VzLzMyNTIyNGI0LTM2MWMtNDA5Mi1iMDBlLWY2MTYxMjg1OTBhMSIsImVkaXRzIjp7InJlc2l6ZSI6eyJmaXQiOiJjb3ZlciIsIndpZHRoIjoxOTIwLCJoZWlnaHQiOjEwODB9fX0=",
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
            "latitude": 51.5124056,
            "longitude": -0.1198823
          },
          "_source": "AMADEUS_API",
          "id": "139702724"
        }
      ],
      "_metadata": {
        "searchDurationMs": 3014,
        "currency": "USD",
        "searchLocation": {
          "radius": "25km",
          "latitude": 51.5074,
          "longitude": 0.1278
        },
        "totalCategories": 0,
        "searchTimestamp": "2025-09-10T19:50:53.812658Z"
      }
    },
    "trackingId": "asd123qwdas123",
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
      "ticketingDeadline": "2025-09-16T20:21:30.076094330",
      "gracePeriod": "6 days",
      "instructions": "Complete payment within 6 days to issue tickets",
      "note": "Ready for real Amadeus API - requires Gson dependency for JsonObject",
      "totalPrice": {
        "total": "3585.77",
        "currency": "USD",
        "base": "2320.00"
      },
      "amadeusRequestSize": 6908,
      "errorType": "UNEXPECTED_API_ERROR",
      "ticketingRequired": true,
      "requestSentToAmadeus": true,
      "nextSteps": "Use real flight offers from search for actual bookings",
      "bookingReference": "CT690076",
      "createdAt": "2025-09-10T20:21:30.076249235",
      "paymentRequired": true,
      "bookingType": "HOLD",
      "pdfPath": "booking-pdfs/flight_booking_CT690076_1757535690076.pdf",
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
          "id": "1",
          "source": "GDS",
          "instantTicketingRequired": false,
          "disablePricing": false,
          "nonHomogeneous": false,
          "oneWay": false,
          "paymentCardRequired": false,
          "lastTicketingDate": "2025-09-17",
          "numberOfBookableSeats": 9,
          "itineraries": [
            {
              "duration": "PT30H47M",
              "segments": [
                {
                  "departure": {
                    "iataCode": "BOM",
                    "terminal": "2",
                    "at": "2025-10-01T01:30:00"
                  },
                  "arrival": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-01T06:15:00"
                  },
                  "carrierCode": "AC",
                  "number": "9585",
                  "aircraft": {
                    "code": "359"
                  },
                  "operating": {
                    "carrierCode": "LH"
                  },
                  "duration": "PT8H15M",
                  "id": "12",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                },
                {
                  "departure": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-01T11:50:00"
                  },
                  "arrival": {
                    "iataCode": "YYZ",
                    "terminal": "1",
                    "at": "2025-10-01T14:55:00"
                  },
                  "carrierCode": "AC",
                  "number": "837",
                  "aircraft": {
                    "code": "333"
                  },
                  "operating": {
                    "carrierCode": "AC"
                  },
                  "duration": "PT9H5M",
                  "id": "13",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                },
                {
                  "departure": {
                    "iataCode": "YYZ",
                    "terminal": "1",
                    "at": "2025-10-01T20:55:00"
                  },
                  "arrival": {
                    "iataCode": "JFK",
                    "terminal": "7",
                    "at": "2025-10-01T22:47:00"
                  },
                  "carrierCode": "AC",
                  "number": "8556",
                  "aircraft": {
                    "code": "E75"
                  },
                  "operating": {},
                  "duration": "PT1H52M",
                  "id": "14",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                }
              ]
            },
            {
              "duration": "PT20H50M",
              "segments": [
                {
                  "departure": {
                    "iataCode": "JFK",
                    "terminal": "1",
                    "at": "2025-10-08T17:30:00"
                  },
                  "arrival": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-09T07:30:00"
                  },
                  "carrierCode": "LH",
                  "number": "411",
                  "aircraft": {
                    "code": "388"
                  },
                  "operating": {
                    "carrierCode": "LH"
                  },
                  "duration": "PT8H",
                  "id": "21",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                },
                {
                  "departure": {
                    "iataCode": "MUC",
                    "terminal": "2",
                    "at": "2025-10-09T12:30:00"
                  },
                  "arrival": {
                    "iataCode": "BOM",
                    "terminal": "2",
                    "at": "2025-10-09T23:50:00"
                  },
                  "carrierCode": "LH",
                  "number": "766",
                  "aircraft": {
                    "code": "359"
                  },
                  "operating": {
                    "carrierCode": "LH"
                  },
                  "duration": "PT7H50M",
                  "id": "22",
                  "numberOfStops": 0,
                  "blacklistedInEU": false
                }
              ]
            }
          ],
          "price": {
            "currency": "USD",
            "total": "3585.77",
            "base": "2320.00",
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
            "grandTotal": "3585.77"
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
            "AC"
          ],
          "travelerPricings": [
            {
              "travelerId": "1",
              "fareOption": "STANDARD",
              "travelerType": "ADULT",
              "price": {
                "currency": "USD",
                "total": "3585.77",
                "base": "2320.00"
              },
              "fareDetailsBySegment": [
                {
                  "segmentId": "12",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "EXECLOW",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "COMPLIMENTARY MEAL",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "BASIC SEAT",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "CHANGEABLE TICKET",
                      "isChargeable": true,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "POINT ACCRUAL",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "13",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "EXECLOW",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "COMPLIMENTARY MEAL",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "BASIC SEAT",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "CHANGEABLE TICKET",
                      "isChargeable": true,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "POINT ACCRUAL",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "14",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "EXECLOW",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "COMPLIMENTARY MEAL",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "BASIC SEAT",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "CHANGEABLE TICKET",
                      "isChargeable": true,
                      "amenityType": "BRANDED_FARES"
                    },
                    {
                      "description": "POINT ACCRUAL",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "21",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "BUSSAVER",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "SNACK",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "COMPLIMENTARY FOOD AND BEV",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BOARDING",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BAGGAGE",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY SECURITY",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "STANDARD SEAT RESERVATION",
                      "isChargeable": false,
                      "amenityType": "BRANDED_FARES"
                    }
                  ]
                },
                {
                  "segmentId": "22",
                  "cabin": "BUSINESS",
                  "fareBasis": "PNCS7R",
                  "brandedFare": "BUSSAVER",
                  "class": "P",
                  "isAllotment": false,
                  "includedCheckedBags": {
                    "quantity": 2,
                    "weight": 0
                  },
                  "amenities": [
                    {
                      "description": "SNACK",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "COMPLIMENTARY FOOD AND BEV",
                      "isChargeable": false,
                      "amenityType": "MEAL"
                    },
                    {
                      "description": "PRIORITY CHECK IN",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BOARDING",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY BAGGAGE",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "PRIORITY SECURITY",
                      "isChargeable": false,
                      "amenityType": "TRAVEL_SERVICES"
                    },
                    {
                      "description": "STANDARD SEAT RESERVATION",
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
      "pnr": "CT690076",
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
          "timestamp": "2025-09-10T20:21:30.181222118Z",
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
            "reference": "7O7E2V"
          }
        ],
        "providerConfirmationId": "PVR90180",
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
        "id": "7O7E2V",
        "checkOut": {
          "date": "2025-09-13",
          "time": "11:00"
        }
      },
      "pdfPath": "booking-pdfs/hotel_booking_7O7E2V_1757535690182.pdf",
      "_metadata": {
        "originalOfferId": "MOCK_LUXURY_JFK_796",
        "dataSource": "FALLBACK_SYSTEM",
        "bookingMethod": "GUARANTEE_POLICY",
        "responseGenerated": "2025-09-10T20:21:30.181252103Z"
      }
    },
    "createdAt": "2025-09-10T19:53:40.426",
    "updatedAt": "2025-09-10T20:21:30.272",
    "booked": false
  }