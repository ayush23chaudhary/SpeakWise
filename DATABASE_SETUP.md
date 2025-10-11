# Database Setup Guide for SpeakWise

## 🗄️ MongoDB Atlas Connection

Your SpeakWise project is now configured to connect to your MongoDB Atlas database:

**Database URL:** `mongodb+srv://ayush23chaudhary:JbmiDXSwZsvJBfIH@client.y5s93z3.mongodb.net/speakwise`

## 🚀 Quick Setup Instructions

### 1. Create Environment File

Create a `.env` file in the `server` directory:

```bash
# Navigate to server directory
cd server

# Create .env file
touch .env
```

Add the following content to `server/.env`:

```env
PORT=5000
MONGODB_URI=mongodb+srv://ayush23chaudhary:JbmiDXSwZsvJBfIH@client.y5s93z3.mongodb.net/speakwise
JWT_SECRET=speakwise_super_secret_jwt_key_2024_secure_token
NODE_ENV=development
```

### 2. Install Dependencies

```bash
# Install all dependencies
npm run install-all
```

### 3. Test Database Connection

```bash
# Test database connection
cd server
npm run test-db
```

You should see:
```
✅ Connected to MongoDB Atlas
📊 Database connection closed
```

### 4. Setup Database (Optional)

```bash
# Setup database with indexes and demo user
cd server
npm run setup-db
```

This will:
- Create database indexes for better performance
- Create a demo user: `demo@speakwise.com` / `demo123`

### 5. Start the Application

```bash
# Start both client and server
npm run dev
```

## 🔧 Database Configuration Details

### Connection String Breakdown
- **Protocol:** `mongodb+srv://` (MongoDB Atlas connection)
- **Username:** `ayush23chaudhary`
- **Password:** `JbmiDXSwZsvJBfIH`
- **Cluster:** `client.y5s93z3.mongodb.net`
- **Database:** `speakwise`

### Database Collections

The application will automatically create these collections:

1. **users** - User accounts and authentication data
2. **analysisreports** - Speech analysis results and history

### Environment Variables

| Variable | Description | Default |
|----------|-------------|---------|
| `PORT` | Server port | `5000` |
| `MONGODB_URI` | MongoDB connection string | Your Atlas URL |
| `JWT_SECRET` | Secret key for JWT tokens | Generated secret |
| `NODE_ENV` | Environment mode | `development` |

## 🛠️ Troubleshooting

### Connection Issues

1. **Check MongoDB Atlas Network Access:**
   - Ensure your IP address is whitelisted
   - Or add `0.0.0.0/0` for all IPs (development only)

2. **Verify Database User:**
   - Username: `ayush23chaudhary`
   - Password: `JbmiDXSwZsvJBfIH`
   - Database: `speakwise`

3. **Test Connection:**
   ```bash
   cd server
   npm run test-db
   ```

### Common Errors

**Error: `MongoNetworkError`**
- Check internet connection
- Verify MongoDB Atlas cluster is running
- Check IP whitelist settings

**Error: `MongoAuthenticationError`**
- Verify username and password
- Check database user permissions

**Error: `MongoParseError`**
- Check connection string format
- Ensure special characters are URL encoded

## 📊 Database Schema

### User Schema
```javascript
{
  email: String (unique, required),
  password: String (hashed, required),
  name: String (required),
  createdAt: Date (default: now)
}
```

### AnalysisReport Schema
```javascript
{
  userId: ObjectId (ref: User, required),
  createdAt: Date (default: now),
  analysisData: Object (required),
  transcript: String (required),
  overallScore: Number (0-100, required),
  audioFileName: String (required)
}
```

## 🔒 Security Notes

1. **Never commit `.env` file to version control**
2. **Use strong JWT secrets in production**
3. **Restrict MongoDB Atlas network access in production**
4. **Use environment-specific database URLs**

## 🚀 Production Deployment

For production deployment:

1. **Create production database cluster**
2. **Update environment variables**
3. **Set up proper network access rules**
4. **Use strong, unique JWT secrets**
5. **Enable MongoDB Atlas monitoring**

## 📞 Support

If you encounter any issues:

1. Check MongoDB Atlas dashboard
2. Verify network access settings
3. Test connection with provided scripts
4. Check server logs for detailed error messages

---

**Your SpeakWise application is now ready to connect to MongoDB Atlas! 🎉**
