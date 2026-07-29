import Vehicle from '../../src/models/Vehicle';

/**
 * Seeds the in-memory test database with a diverse set of test vehicles
 * for filtering, searching, and purchasing integration tests.
 */
export async function seedTestVehicles() {
  // Clear any existing vehicles to ensure a clean slate
  await Vehicle.deleteMany({});

  const testVehicles = [
    {
      make: 'Toyota',
      model: 'Camry',
      year: 2023,
      category: 'Sedan',
      price: 25000,
      quantity: 5,
      description: 'Reliable family sedan',
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/toyota-camry.jpg',
    },
    {
      make: 'Ford',
      model: 'Mustang',
      year: 2022,
      category: 'Coupe',
      price: 45000,
      quantity: 3,
      description: 'Sporty muscle car',
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/ford-mustang.jpg',
    },
    {
      make: 'Tesla',
      model: 'Model Y',
      year: 2024,
      category: 'SUV',
      price: 52000,
      quantity: 4,
      description: 'All-electric modern SUV',
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/tesla-model-y.jpg',
    },
    {
      make: 'Honda',
      model: 'Civic',
      year: 2021,
      category: 'Sedan',
      price: 20000,
      quantity: 2,
      description: 'Compact fuel-efficient car',
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/honda-civic.jpg',
    },
    {
      make: 'Chevrolet',
      model: 'Tahoe',
      year: 2023,
      category: 'SUV',
      price: 65000,
      quantity: 0, // 0 stock vehicle specifically for testing out-of-stock/purchase validation
      description: 'Full-size family SUV currently sold out',
      imageUrl: 'https://res.cloudinary.com/demo/image/upload/chevy-tahoe.jpg',
    },
  ];

  const createdVehicles = await Vehicle.insertMany(testVehicles);
  
  // Return an easily accessible map or list of IDs for your tests to use
  return {
    camryId: createdVehicles[0]._id.toString(),
    mustangId: createdVehicles[1]._id.toString(),
    modelYId: createdVehicles[2]._id.toString(),
    civicId: createdVehicles[3]._id.toString(),
    outOfStockId: createdVehicles[4]._id.toString(),
  };
}