const mongoose = require('mongoose');
const bcrypt = require('bcryptjs');
const dotenv = require('dotenv');
dotenv.config();

const User = require('./models/User');
const Contact = require('./models/Contact');

const seed = async () => {
  try {
    await mongoose.connect(process.env.MONGO_URI);
    console.log('MongoDB Connected for seeding...');

    // Create Users
    const existingUser = await User.findOne({ email: 'john@sahara.com' });
    const existingAdmin = await User.findOne({ email: 'admin@sahara.com' });

    let user, admin;

    if (!existingUser) {
      user = await User.create({
        name: 'John Doe',
        email: 'john@sahara.com',
        password: 'password123',
        role: 'user'
      });
      console.log('Created user: john@sahara.com');
    } else {
      user = existingUser;
      console.log('User john@sahara.com already exists');
    }

    if (!existingAdmin) {
      admin = await User.create({
        name: 'Admin User',
        email: 'admin@sahara.com',
        password: 'admin123',
        role: 'admin'
      });
      console.log('Created admin: admin@sahara.com');
    } else {
      admin = existingAdmin;
      console.log('Admin admin@sahara.com already exists');
    }

    // Create Contacts for john
    const contacts = [
      {
        name: 'Elena Rossi',
        phone: '9876543210',
        email: 'elena.rossi@company.com',
        address: '42 Sunset Boulevard, Mumbai, Maharashtra',
        company: 'Rossi Marketing',
        title: 'Marketing Director',
        tags: ['work'],
        notes: 'Met at the TechSummit conference. Interested in collaboration on the Q3 campaign.',
        createdBy: user._id
      },
      {
        name: 'Julian Thorne',
        phone: '9123456789',
        email: 'julian.thorne@design.com',
        address: '128 Golden Hour Lane, Bangalore, Karnataka',
        company: 'Arid Design Lab',
        title: 'Creative Director',
        tags: ['work', 'friend'],
        notes: 'Great designer, collaborated on the Sahara project. Prefers warm minimalist style.',
        createdBy: user._id
      },
      {
        name: 'Aria Vane',
        phone: '8765432109',
        email: 'aria.vane@techflow.io',
        address: '56 Innovation Park, Hyderabad, Telangana',
        company: 'TechFlow Solutions',
        title: 'Senior Engineer',
        tags: ['work'],
        notes: 'Full-stack developer. Expert in React and Node.js. Available for freelance.',
        createdBy: user._id
      },
      {
        name: 'Marcus Chen',
        phone: '7654321098',
        email: 'marcus.chen@startup.com',
        address: '12 Startup Lane, Delhi, NCR',
        company: 'TechFlow',
        title: 'CEO',
        tags: ['work', 'emergency'],
        notes: 'CEO of TechFlow. Key decision maker for the enterprise contract.',
        createdBy: user._id
      },
      {
        name: 'Priya Sharma',
        phone: '6543210987',
        email: 'priya.sharma@gmail.com',
        address: '88 Lake View Apartments, Kolkata, West Bengal',
        company: '',
        title: '',
        tags: ['family'],
        notes: 'Cousin from Kolkata. Birthday: March 15.',
        createdBy: user._id
      },
      {
        name: 'Rahul Mehta',
        phone: '5432109876',
        email: 'rahul.mehta@college.edu',
        address: 'Haldia Institute of Technology, Haldia, West Bengal',
        company: 'HIT',
        title: 'Professor',
        tags: ['work', 'friend'],
        notes: 'College professor, great mentor. Research interest in AI/ML.',
        createdBy: user._id
      },
      {
        name: 'Sneha Patel',
        phone: '4321098765',
        email: 'sneha.patel@healthcare.org',
        address: '23 Medical Center Road, Pune, Maharashtra',
        company: 'City Hospital',
        title: 'Doctor',
        tags: ['emergency', 'family'],
        notes: 'Family doctor. Available on weekends for consultations.',
        createdBy: user._id
      },
      {
        name: 'David Wilson',
        phone: '3210987654',
        email: 'david.wilson@agency.com',
        address: '9 Creative Hub, Chennai, Tamil Nadu',
        company: 'Wilson Creative Agency',
        title: 'Brand Strategist',
        tags: ['work'],
        notes: 'Partner agency for branding work. Excellent portfolio.',
        createdBy: user._id
      },
      {
        name: 'Ananya Das',
        phone: '2109876543',
        email: 'ananya.das@outlook.com',
        address: '15 Green Park, Jaipur, Rajasthan',
        company: '',
        title: '',
        tags: ['friend'],
        notes: 'School friend. Currently living in Jaipur. Loves photography.',
        createdBy: user._id
      },
      {
        name: 'Vikram Singh',
        phone: '1098765432',
        email: 'vikram.singh@legal.in',
        address: '77 Law Chambers, Lucknow, Uttar Pradesh',
        company: 'Singh & Associates',
        title: 'Legal Advisor',
        tags: ['work', 'emergency'],
        notes: 'Trusted legal advisor. Handles business contracts and compliance.',
        createdBy: user._id
      }
    ];

    // Only add contacts if user has none
    const existingCount = await Contact.countDocuments({ createdBy: user._id });
    if (existingCount === 0) {
      // Stagger createdAt dates for chart data
      const now = new Date();
      for (let i = 0; i < contacts.length; i++) {
        const daysAgo = Math.floor(Math.random() * 180); // spread across 6 months
        const date = new Date(now);
        date.setDate(date.getDate() - daysAgo);
        contacts[i].createdAt = date;
      }
      await Contact.insertMany(contacts);
      console.log(`Created ${contacts.length} contacts for john@sahara.com`);
    } else {
      console.log(`User already has ${existingCount} contacts, skipping.`);
    }

    console.log('\n========================================');
    console.log('  SEED DATA CREATED SUCCESSFULLY!');
    console.log('========================================');
    console.log('\n  Login Credentials:');
    console.log('  ---------------------------------');
    console.log('  Regular User:');
    console.log('    Email:    john@sahara.com');
    console.log('    Password: password123');
    console.log('  ---------------------------------');
    console.log('  Admin User:');
    console.log('    Email:    admin@sahara.com');
    console.log('    Password: admin123');
    console.log('  ---------------------------------\n');

    process.exit(0);
  } catch (err) {
    console.error('Seeding failed:', err.message);
    process.exit(1);
  }
};

seed();
