# SpeakWise - AI-Powered Speech Coach

SpeakWise is a comprehensive full-stack web application that serves as a personal speech coach, allowing users to record their voice, receive AI-driven analysis, and track their improvement over time through a dynamic, engaging, and personalized interface.

## 🚀 Features

### Core Functionality
- **User Authentication**: Secure sign-up and login with JWT token management
- **Theme Toggle**: Seamless switching between light and dark themes
- **Performance Studio**: Live recording with real-time waveform visualization
- **Analysis Dashboard**: Comprehensive speech analysis with interactive charts
- **Progress Tracker**: Historical data visualization and improvement tracking

### Performance Studio
- Real-time audio recording with microphone access
- Dynamic "Vocal Orb" visualizer that pulses with voice volume
- Particle effects that react to speech patterns
- Audio playback and re-recording capabilities
- Professional recording tips and guidance

### Analysis Dashboard
- Overall performance scoring (0-100)
- Interactive transcript with filler word highlighting
- Multiple chart visualizations:
  - Speedometer gauge for speaking pace
  - Bar chart for filler word analysis
  - Radar chart for multi-parameter scoring
- AI-generated feedback and recommendations
- Strengths and areas for improvement identification

### Progress Tracker
- Historical performance data visualization
- Filterable metrics and time ranges
- Line charts showing improvement over time
- Session history with detailed reports
- Progress statistics and trends

## 🛠️ Technology Stack

### Frontend
- **React 18** with Vite for fast development
- **Tailwind CSS** for responsive styling with dark mode support
- **React Router** for client-side routing
- **Recharts** for data visualization
- **Zustand** for state management
- **Lucide React** for icons
- **Axios** for API communication

### Backend
- **Node.js** with Express framework
- **MongoDB** with Mongoose ODM
- **JWT** for stateless authentication
- **bcryptjs** for password hashing
- **Multer** for file uploads
- **Express Validator** for input validation

### AI/Speech Processing
- Currently uses **mocked analysis** for demonstration
- Designed for future integration with Python AI microservice
- Realistic speech analysis data generation

## 📁 Project Structure

```
SpeakWise/
├── client/                 # React frontend
│   ├── src/
│   │   ├── components/     # React components
│   │   │   ├── auth/      # Authentication components
│   │   │   ├── layout/    # Layout components
│   │   │   ├── studio/    # Performance Studio
│   │   │   ├── analysis/   # Analysis Dashboard
│   │   │   └── progress/   # Progress Tracker
│   │   ├── store/         # Zustand stores
│   │   ├── utils/         # Utility functions
│   │   └── main.jsx       # App entry point
│   ├── package.json
│   └── vite.config.js
├── server/                # Node.js backend
│   ├── models/           # Mongoose models
│   ├── routes/           # API routes
│   ├── middleware/       # Custom middleware
│   ├── uploads/          # File uploads directory
│   ├── package.json
│   └── index.js          # Server entry point
├── package.json          # Root package.json
└── README.md
```

## 🚀 Getting Started

### Prerequisites
- Node.js (v16 or higher)
- MongoDB (local installation or MongoDB Atlas)
- npm or yarn package manager

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd SpeakWise
   ```

2. **Install all dependencies**
   ```bash
   npm run install-all
   ```

3. **Set up environment variables**
   ```bash
   # Copy the example environment file
   cp server/env.example server/.env
   
   # Edit server/.env with your configuration
   PORT=5000
   MONGODB_URI=mongodb+srv://ayush23chaudhary:JbmiDXSwZsvJBfIH@client.y5s93z3.mongodb.net/speakwise
   JWT_SECRET=your_super_secret_jwt_key_here
   NODE_ENV=development
   ```

4. **Test Database Connection**
   ```bash
   # Test MongoDB Atlas connection
   cd server
   npm run test-db
   ```

5. **Run the application**
   ```bash
   # Start both client and server concurrently
   npm run dev
   
   # Or start them separately:
   # Terminal 1: npm run server
   # Terminal 2: npm run client
   ```

6. **Access the application**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 📱 Usage

### First Time Setup
1. Navigate to http://localhost:3000
2. Create a new account or sign in
3. Allow microphone permissions when prompted

### Recording a Speech
1. Go to the **Performance Studio** tab
2. Click "Start Recording" and speak for 30-60 seconds
3. Click "Stop Recording" when finished
4. Review your recording and click "Stop & Analyze"

### Viewing Analysis
1. After analysis, you'll be redirected to the **Analysis Dashboard**
2. Review your overall score and detailed metrics
3. Click on highlighted filler words in the transcript
4. Explore charts showing your performance across different parameters

### Tracking Progress
1. Visit the **Progress Tracker** tab
2. View your improvement over time with interactive charts
3. Filter by different metrics and time ranges
4. Click on individual sessions to view detailed reports

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/register` - Create new user account
- `POST /api/auth/login` - Authenticate user
- `GET /api/auth/me` - Get current user info

### Speech Analysis
- `POST /api/speech/analyze` - Upload and analyze audio file
- `GET /api/speech/history` - Get user's analysis history
- `GET /api/speech/report/:id` - Get specific analysis report

## 🎨 Customization

### Themes
The application supports both light and dark themes. The theme toggle is located in the navigation bar and persists across sessions.

### Styling
All styling is done with Tailwind CSS. You can customize colors, spacing, and components by modifying the `tailwind.config.js` file.

### Mock Analysis
The current implementation uses realistic mock data for speech analysis. To integrate real AI analysis:

1. Replace the `generateMockAnalysis()` function in `server/routes/speech.js`
2. Integrate with your preferred speech analysis service
3. Update the analysis data structure as needed

## 🔮 Future Enhancements

### Planned Features
- **Gamification**: Points, badges, and leaderboards
- **Real-Time Feedback**: WebSocket-based live feedback during recording
- **Community Hub**: Practice sessions with other users
- **Multilingual Support**: Analysis in different languages
- **Real AI Integration**: Python microservice for actual speech analysis
- **Mobile App**: React Native version for mobile devices

### Technical Improvements
- **Performance Optimization**: Code splitting and lazy loading
- **Testing**: Comprehensive test suite with Jest and React Testing Library
- **CI/CD**: Automated deployment pipeline
- **Monitoring**: Application performance monitoring
- **Security**: Enhanced security measures and rate limiting

## 🐛 Troubleshooting

### Common Issues

**Microphone Access Denied**
- Ensure you're using HTTPS in production
- Check browser permissions for microphone access
- Try refreshing the page and allowing permissions again

**MongoDB Connection Issues**
- Verify MongoDB is running locally or your Atlas connection string is correct
- Check the MONGODB_URI in your .env file
- Ensure network connectivity to MongoDB

**Audio Recording Issues**
- Check browser compatibility (Chrome, Firefox, Safari supported)
- Ensure microphone is not being used by another application
- Try using a different browser

**Build Issues**
- Clear node_modules and reinstall: `rm -rf node_modules && npm install`
- Check Node.js version compatibility
- Ensure all environment variables are properly set

## 📄 License

This project is licensed under the MIT License - see the LICENSE file for details.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📞 Support

For support, email support@speakwise.com or create an issue in the repository.

---

**SpeakWise** - Transform your speech, one word at a time. 🎤✨
