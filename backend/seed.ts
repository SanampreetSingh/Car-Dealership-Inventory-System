import mongoose from 'mongoose';
import bcrypt from 'bcryptjs';
import dotenv from 'dotenv';

import { User } from './src/models/User';
import Vehicle from './src/models/Vehicle';

// Load environment variables
dotenv.config();

const seedDatabase = async () => {
  try {
    // 1. Connect to MongoDB
    const mongoURI = process.env.MONGO_URI || 'mongodb://localhost:27017/dealership';
    await mongoose.connect(mongoURI);
    console.log('Connected to MongoDB for seeding...');

    // 2. Clear existing data to prevent duplicate index errors
    await User.deleteMany({});
    await Vehicle.deleteMany({});
    console.log('Cleared existing users and vehicles.');

    // 3. Create Users (1 Admin, 1 Regular User)
    const salt = await bcrypt.genSalt(10);
    const adminPassword = await bcrypt.hash('admin123', salt);
    const userPassword = await bcrypt.hash('user123', salt);

    const users = [
      {
        name: 'Admin User',
        email: 'admin@dealership.com',
        password: adminPassword,
        role: 'admin',
      },
      {
        name: 'Test User',
        email: 'user@dealership.com',
        password: userPassword,
        role: 'user',
      },
    ];

    await User.insertMany(users);
    console.log('Admin and User accounts seeded successfully.');

    // 4. Create 30 Vehicles (Localized for INR, using highly reliable Unsplash CDN images)
    const vehicles = [
      // SUVs
      { 
        make: 'Mahindra', model: 'Thar', category: 'SUV', price: 1750000, quantity: 5, year: 2023, 
        description: 'The Mahindra Thar is the ultimate lifestyle 4x4 off-roader, designed to conquer any terrain with ease. Featuring a rugged ladder-frame chassis, a shift-on-the-fly four-wheel-drive system, and premium water-resistant interiors, it perfectly blends modern comforts with raw capability.', 
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' // Rugged off-roader
      },
      { 
        make: 'Mahindra', model: 'XUV700', category: 'SUV', price: 2200000, quantity: 8, year: 2024, 
        description: 'Experience the pinnacle of luxury and technology with the XUV700. This premium SUV boasts level-2 ADAS features, a massive panoramic skyroof, and a seamless dual-screen infotainment setup. Powered by refined mStallion and mHawk engines, it delivers an exhilarating drive every time.', 
        imageUrl: 'https://images.unsplash.com/photo-1519681393784-d120267933ba?auto=format&fit=crop&w=800&q=80' // Dark premium SUV
      },
      { 
        make: 'Tata', model: 'Safari', category: 'SUV', price: 2400000, quantity: 4, year: 2023, 
        description: 'Reclaim your life with the all-new Tata Safari, a flagship 7-seater SUV built for grand adventures. It offers plush stadium seating, an advanced ESP terrain response system, and a commanding road presence that turns heads wherever it goes.', 
        imageUrl: 'https://images.unsplash.com/photo-1583121274602-3e2820c69888?auto=format&fit=crop&w=800&q=80' // Large silver SUV
      },
      { 
        make: 'Tata', model: 'Harrier', category: 'SUV', price: 2100000, quantity: 6, year: 2023, 
        description: 'Born of legendary Land Rover pedigree, the Tata Harrier is a bold and dynamic 5-seater SUV. Its striking IMPACT 2.0 design language is complemented by a Kryotec diesel engine and luxurious ventilated seats for maximum driving pleasure.', 
        imageUrl: 'https://images.unsplash.com/photo-1609521263047-f8f205293f24?auto=format&fit=crop&w=800&q=80' // Sporty SUV
      },
      { 
        make: 'Hyundai', model: 'Creta', category: 'SUV', price: 1500000, quantity: 12, year: 2024, 
        description: 'The Hyundai Creta continues to rule the urban SUV segment with its sensuous sportiness and tech-loaded cabin. Enjoy features like a smart panoramic sunroof, Bose premium sound system, and multiple powertrain options tailored for both city commutes and highway cruising.', 
        imageUrl: 'https://images.unsplash.com/photo-1568605117036-5fe5e7bab0b7?auto=format&fit=crop&w=800&q=80' // Clean white SUV/Crossover
      },
      { 
        make: 'Kia', model: 'Seltos', category: 'SUV', price: 1600000, quantity: 10, year: 2023, 
        description: 'Unleash your bolder side with the Kia Seltos. This highly sought-after SUV features an aggressive front grille, a driver-centric cockpit with a 10.25-inch touchscreen, and robust safety features, making it a standout choice for modern drivers.', 
        imageUrl: 'https://images.unsplash.com/photo-1621007947382-bb3c3994e3fd?auto=format&fit=crop&w=800&q=80' // Aggressive red SUV
      },
      { 
        make: 'Toyota', model: 'Fortuner', category: 'SUV', price: 4500000, quantity: 3, year: 2024, 
        description: 'The Toyota Fortuner remains the undisputed king of its segment, offering dominant road presence and bulletproof reliability. With its powerful 2.8L diesel engine, plush leather interiors, and formidable 4x4 capabilities, it is built to outlast any journey.', 
        imageUrl: 'https://images.unsplash.com/photo-1590362891991-f776e747a588?auto=format&fit=crop&w=800&q=80' // Large dominant SUV
      },
      
      // Sedans
      { 
        make: 'Honda', model: 'City', category: 'Sedan', price: 1400000, quantity: 15, year: 2023, 
        description: 'The Honda City is an iconic sedan that has defined elegance and reliability for generations. It offers class-leading cabin space, a smooth i-VTEC engine, and advanced Honda Sensing safety technology for a peaceful and luxurious commute.', 
        imageUrl: 'https://images.unsplash.com/photo-1549317661-bd32c8ce0db2?auto=format&fit=crop&w=800&q=80' // Elegant sedan
      },
      { 
        make: 'Hyundai', model: 'Verna', category: 'Sedan', price: 1550000, quantity: 7, year: 2024, 
        description: 'Step into the future with the all-new Hyundai Verna, featuring a radical fastback design and a blistering turbo-petrol engine. Its spacious, driver-focused interior is equipped with switchable infotainment controls and segment-first heated and ventilated seats.', 
        imageUrl: 'https://images.unsplash.com/photo-1552519507-da3b142c6e3d?auto=format&fit=crop&w=800&q=80' // Sporty sedan
      },
      { 
        make: 'Volkswagen', model: 'Virtus', category: 'Sedan', price: 1650000, quantity: 5, year: 2023, 
        description: 'Experience the thrill of German engineering with the Volkswagen Virtus. This dynamic sedan combines a timeless, elegant design with a TSI engine that delivers exhilarating performance without compromising on safety or everyday practicality.', 
        imageUrl: 'https://images.unsplash.com/photo-1616422285623-13ff0162193c?auto=format&fit=crop&w=800&q=80' // Red sedan
      },
      { 
        make: 'Skoda', model: 'Slavia', category: 'Sedan', price: 1600000, quantity: 6, year: 2023, 
        description: 'The Skoda Slavia brings European class and sophistication to the Indian sedan market. Boasting the highest ground clearance in its class, premium crystalline design elements, and a cavernous boot, it is the perfect companion for long family road trips.', 
        imageUrl: 'https://images.unsplash.com/photo-1580273916550-e323be2ae537?auto=format&fit=crop&w=800&q=80' // Premium blue sedan
      },
      { 
        make: 'Maruti Suzuki', model: 'Ciaz', category: 'Sedan', price: 1100000, quantity: 8, year: 2022, 
        description: 'The Maruti Suzuki Ciaz offers a perfect blend of space, comfort, and unmatched fuel efficiency. Its elegant chrome-accented exterior and smart hybrid technology make it a highly practical choice for both chauffeur-driven owners and daily drivers.', 
        imageUrl: 'https://images.unsplash.com/photo-1494976388531-d1058494cdd8?auto=format&fit=crop&w=800&q=80' // Classic silver sedan
      },

      // Hatchbacks
      { 
        make: 'Maruti Suzuki', model: 'Swift', category: 'Hatchback', price: 750000, quantity: 20, year: 2024, 
        description: 'The Maruti Suzuki Swift is a legendary hatchback known for its sporty dynamics and peppy K-series engine. Its lightweight HEARTECT platform ensures nimble handling in city traffic, while the driver-oriented cabin keeps you engaged on every drive.', 
        imageUrl: 'https://images.unsplash.com/photo-1617814076367-b759c7d7e738?auto=format&fit=crop&w=800&q=80' // Sporty hatchback
      },
      { 
        make: 'Maruti Suzuki', model: 'Baleno', category: 'Hatchback', price: 950000, quantity: 18, year: 2023, 
        description: 'Redefine your urban commute with the Maruti Suzuki Baleno, a premium hatchback that offers loads of space and advanced tech. Featuring a heads-up display, a 360-degree camera, and exceptional fuel economy, it is designed for the smart, modern buyer.', 
        imageUrl: 'https://images.unsplash.com/photo-1537984822441-cff330075342?auto=format&fit=crop&w=800&q=80' // Blue premium hatch
      },
      { 
        make: 'Hyundai', model: 'i20', category: 'Hatchback', price: 1050000, quantity: 14, year: 2024, 
        description: 'The Hyundai i20 sets the benchmark for premium hatchbacks with its striking parametric dynamics and a highly sophisticated cabin. Packed with connected car features and an electric sunroof, it delivers a luxurious experience in a compact footprint.', 
        imageUrl: 'https://images.unsplash.com/photo-1541899481282-d53bffe3c35d?auto=format&fit=crop&w=800&q=80' // Sleek modern hatch
      },
      { 
        make: 'Tata', model: 'Altroz', category: 'Hatchback', price: 850000, quantity: 10, year: 2023, 
        description: 'Drive with absolute peace of mind in the Tata Altroz, India\'s safest hatchback with a 5-star Global NCAP rating. Its laser-cut design, 90-degree opening doors, and premium acoustic sound system make it both practical and stylish.', 
        imageUrl: 'https://images.unsplash.com/photo-1595821035070-df8d8d32d67d?auto=format&fit=crop&w=800&q=80' // Golden/Yellow hatch
      },
      
      // Electric Vehicles (EV)
      { 
        make: 'Tata', model: 'Nexon EV', category: 'EV', price: 1650000, quantity: 8, year: 2024, 
        description: 'Join the electric revolution with the Tata Nexon EV, India\'s best-selling zero-emission SUV. Offering a thrilling instant torque response, multiple driving modes, and a long-range battery pack, it completely eliminates range anxiety for city and highway usage.', 
        imageUrl: 'https://images.unsplash.com/photo-1593941707882-a5bba14938c7?auto=format&fit=crop&w=800&q=80' // Futuristic electric look
      },
      { 
        make: 'Tata', model: 'Punch EV', category: 'EV', price: 1250000, quantity: 12, year: 2024, 
        description: 'The Tata Punch EV is a smart, ultra-compact electric SUV built on a dedicated acti.ev architecture. It delivers peppy performance, smart regenerative braking, and a surprising amount of interior space, making it the ultimate urban runabout.', 
        imageUrl: 'https://images.unsplash.com/photo-1560958089-b8a1929cea89?auto=format&fit=crop&w=800&q=80' // Compact electric
      },
      { 
        make: 'MG', model: 'Comet EV', category: 'EV', price: 850000, quantity: 5, year: 2023, 
        description: 'Navigate congested city streets with ease in the MG Comet EV. This futuristic, ultra-compact smart car features a tech-forward dual-screen setup, easy maneuverability, and an incredibly low running cost for the daily commuter.', 
        imageUrl: 'https://images.unsplash.com/photo-1518987048-93e29699e79a?auto=format&fit=crop&w=800&q=80' // Small city EV
      },
      { 
        make: 'BYD', model: 'Atto 3', category: 'EV', price: 3400000, quantity: 4, year: 2023, 
        description: 'The BYD Atto 3 is a premium electric SUV that blends futuristic aesthetics with revolutionary Blade Battery technology. It offers an exceptional driving range, a quirky gym-inspired interior design, and lightning-fast charging capabilities.', 
        imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80' // Premium blue EV SUV
      },

      // Luxury / Premium
      { 
        make: 'Mercedes-Benz', model: 'C-Class', category: 'Luxury', price: 6000000, quantity: 2, year: 2024, 
        description: 'Often referred to as the \'baby S-Class\', the Mercedes-Benz C-Class offers unparalleled luxury and cutting-edge technology. From its stunning portrait infotainment screen to the mild-hybrid powertrain, every detail is crafted for executive comfort.', 
        imageUrl: 'https://images.unsplash.com/photo-1617531653332-bd46c24f2068?auto=format&fit=crop&w=800&q=80' // Mercedes luxury
      },
      { 
        make: 'BMW', model: '3 Series', category: 'Luxury', price: 6200000, quantity: 3, year: 2023, 
        description: 'The BMW 3 Series remains the ultimate driving machine, offering a perfect 50:50 weight distribution and razor-sharp handling. Its driver-focused cockpit, powerful TwinPower turbo engine, and aggressive styling make it a true enthusiast\'s dream.', 
        imageUrl: 'https://images.unsplash.com/photo-1555215695-3004980ad54e?auto=format&fit=crop&w=800&q=80' // BMW front profile
      },
      { 
        make: 'Audi', model: 'A4', category: 'Luxury', price: 5500000, quantity: 2, year: 2023, 
        description: 'The Audi A4 combines understated elegance with highly sophisticated technology. Featuring the renowned Quattro system, an intuitive Virtual Cockpit, and whisper-quiet cabin acoustics, it delivers a deeply refined driving experience.', 
        imageUrl: 'https://images.unsplash.com/photo-1606152421802-db97b9c7a11b?auto=format&fit=crop&w=800&q=80' // Audi luxury
      },
      { 
        make: 'Volvo', model: 'XC40', category: 'Luxury', price: 4800000, quantity: 2, year: 2024, 
        description: 'Prioritize your family\'s well-being with the Volvo XC40, widely recognized as one of the safest compact luxury SUVs. It boasts an eco-friendly mild-hybrid engine, a minimalist Scandinavian interior, and an advanced suite of active safety features.', 
        imageUrl: 'https://images.unsplash.com/photo-1629897048514-3dd74142ffcb?auto=format&fit=crop&w=800&q=80' // Minimalist premium SUV
      },
      
      // MUV / MPV
      { 
        make: 'Toyota', model: 'Innova Crysta', category: 'MPV', price: 2300000, quantity: 6, year: 2023, 
        description: 'The Toyota Innova Crysta is the undisputed king of the MPV segment, celebrated for its bulletproof reliability and unmatched comfort. Whether for large families or fleet operators, its spacious cabin and robust diesel engine are legendary.', 
        imageUrl: 'https://images.unsplash.com/photo-1559416523-140ddc3d238c?auto=format&fit=crop&w=800&q=80' // Large family vehicle
      },
      { 
        make: 'Maruti Suzuki', model: 'Ertiga', category: 'MPV', price: 1100000, quantity: 15, year: 2023, 
        description: 'The Maruti Suzuki Ertiga is India\'s favorite affordable 7-seater, offering smart hybrid technology and a versatile, spacious interior. Its easy drivability and low maintenance costs make it the perfect choice for large families on a budget.', 
        imageUrl: 'https://images.unsplash.com/photo-1605559424843-9e4c228bf1c2?auto=format&fit=crop&w=800&q=80' // Clean white MPV/Estate
      },
      { 
        make: 'Kia', model: 'Carens', category: 'MPV', price: 1400000, quantity: 8, year: 2024, 
        description: 'The Kia Carens is a revolutionary recreational vehicle that redefines the 7-seater segment. It offers a premium, lounge-like cabin, one-touch tumble seats, and a plethora of safety features including 6 airbags as standard across all variants.', 
        imageUrl: 'https://images.unsplash.com/photo-1622185135505-2d795003994a?auto=format&fit=crop&w=800&q=80' // Modern multi-purpose vehicle
      },
      
      // Compact SUVs
      { 
        make: 'Maruti Suzuki', model: 'Brezza', category: 'SUV', price: 1150000, quantity: 18, year: 2023, 
        description: 'The Maruti Suzuki Brezza is a highly trusted compact SUV that perfectly balances muscular design with excellent fuel efficiency. Equipped with a peppy engine, an electric sunroof, and smart hybrid tech, it is a practical and stylish family car.', 
        imageUrl: 'https://images.unsplash.com/photo-1549399542-7e3f8b79c341?auto=format&fit=crop&w=800&q=80' // Compact urban SUV
      },
      { 
        make: 'Tata', model: 'Nexon', category: 'SUV', price: 1200000, quantity: 22, year: 2024, 
        description: 'The Tata Nexon continues to dominate the compact SUV space with its bold, futuristic styling and reassuring 5-star safety rating. Its punchy turbo engines and premium interior features like ventilated seats make it a compelling package.', 
        imageUrl: 'https://images.unsplash.com/photo-1619682817481-e994891cd1f5?auto=format&fit=crop&w=800&q=80' // Bold blue compact SUV
      },
      { 
        make: 'Hyundai', model: 'Venue', category: 'SUV', price: 1100000, quantity: 14, year: 2023, 
        description: 'Stay connected on the go with the Hyundai Venue, a smart compact SUV designed for the urban jungle. With its responsive DCT gearbox, multiple driving modes, and Bluelink connected tech, it offers an agile and engaging drive.', 
        imageUrl: 'https://images.unsplash.com/photo-1533473359331-0135ef1b58bf?auto=format&fit=crop&w=800&q=80' // Smart compact crossover
      }
    ];

    await Vehicle.insertMany(vehicles);
    console.log(`Successfully seeded ${vehicles.length} vehicles.`);

    console.log('\n--- Seeding Complete ---');
    console.log('Admin Login: admin@dealership.com / admin123');
    console.log('User Login:  user@dealership.com / user123');
    
    process.exit();
  } catch (error) {
    console.error('Error seeding data:', error);
    process.exit(1);
  }
};

seedDatabase();