# Deployment Guide - Flipr Project

This guide will help you deploy your Flipr MERN application on Render with MongoDB Atlas and Cloudinary.

## Prerequisites

1. **GitHub Account** - Your code should be pushed to a GitHub repository
2. **MongoDB Atlas Account** - Free tier is sufficient
3. **Cloudinary Account** - Free tier is sufficient
4. **Render Account** - Free tier available

---

## Step 1: Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://www.mongodb.com/cloud/atlas)
2. Create a new cluster (choose the free M0 tier)
3. Create a database user:
   - Go to **Database Access** → **Add New Database User**
   - Choose **Password** authentication
   - Create username and password (save these!)
   - Set user privileges to **Read and write to any database**
4. Whitelist IP addresses:
   - Go to **Network Access** → **Add IP Address**
   - Click **Allow Access from Anywhere** (0.0.0.0/0) for Render deployment
5. Get your connection string:
   - Go to **Clusters** → Click **Connect** → Choose **Connect your application**
   - Copy the connection string
   - Replace `<password>` with your database user password
   - Replace `<dbname>` with `flipr` (or your preferred database name)
   - Example: `mongodb+srv://username:password@cluster.mongodb.net/flipr?retryWrites=true&w=majority`

---

## Step 2: Set Up Cloudinary

1. Go to [Cloudinary](https://cloudinary.com/) and sign up
2. After logging in, go to **Dashboard**
3. Copy these values (you'll need them later):
   - **Cloud Name**
   - **API Key**
   - **API Secret**

---

## Step 3: Deploy Backend on Render

1. Go to [Render Dashboard](https://dashboard.render.com/)
2. Click **New +** → **Web Service**
3. Connect your GitHub repository
4. Configure the service:
   - **Name**: `flipr-backend` (or your preferred name)
   - **Region**: Choose closest to you
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `backend`
   - **Runtime**: `Node`
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
5. Add Environment Variables (click **Add Environment Variable** for each):
   ```
   PORT=10000
   NODE_ENV=production
   MONGO_URI=<your-mongodb-atlas-connection-string>
   JWT_SECRET=<generate-a-long-random-string>
   ADMIN_EMAIL=shreyansh0611@gmail.com
   ADMIN_PASSWORD=admin123
   CLOUDINARY_CLOUD_NAME=<your-cloudinary-cloud-name>
   CLOUDINARY_API_KEY=<your-cloudinary-api-key>
   CLOUDINARY_API_SECRET=<your-cloudinary-api-secret>
   FRONTEND_URL=https://your-frontend-url.onrender.com
   ```
   **Note**: You'll update `FRONTEND_URL` after deploying the frontend.

6. Click **Create Web Service**
7. Wait for deployment to complete
8. Copy your backend URL (e.g., `https://flipr-backend.onrender.com`)

---

## Step 4: Deploy Frontend on Render

1. In Render Dashboard, click **New +** → **Static Site**
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `flipr-frontend` (or your preferred name)
   - **Branch**: `main` (or your default branch)
   - **Root Directory**: `frontend`
   - **Build Command**: `npm install && npm run build`
   - **Publish Directory**: `dist`
4. Add Environment Variable:
   ```
   VITE_API_BASE_URL=https://your-backend-url.onrender.com/api
   ```
   Replace `your-backend-url` with your actual backend URL from Step 3.

5. Click **Create Static Site**
6. Wait for deployment to complete
7. Copy your frontend URL (e.g., `https://flipr-frontend.onrender.com`)

---

## Step 5: Update Backend CORS

1. Go back to your backend service on Render
2. Go to **Environment** tab
3. Update `FRONTEND_URL` to your frontend URL from Step 4:
   ```
   FRONTEND_URL=https://flipr-frontend.onrender.com
   ```
4. Render will automatically redeploy

---

## Step 6: Test Your Deployment

1. Visit your frontend URL
2. Test the landing page loads correctly
3. Click **Admin Panel** button
4. Login with:
   - Email: `shreyansh0611@gmail.com`
   - Password: `admin123`
5. Test creating a project with image upload
6. Test creating a client testimonial with image upload

---

## Troubleshooting

### Backend Issues

- **Connection Error**: Check your MongoDB Atlas connection string and IP whitelist
- **CORS Error**: Verify `FRONTEND_URL` matches your frontend URL exactly
- **Image Upload Fails**: Check Cloudinary credentials in environment variables

### Frontend Issues

- **API Calls Fail**: Verify `VITE_API_BASE_URL` is set correctly
- **Build Fails**: Check that all dependencies are in `package.json`
- **404 Errors**: Ensure `Publish Directory` is set to `dist`

### Common Issues

- **Slow First Load**: Render free tier spins down after inactivity. First request may take 30-60 seconds.
- **Environment Variables Not Working**: Make sure to redeploy after adding/updating environment variables
- **Image Uploads Not Working**: Verify Cloudinary credentials and check backend logs

---

## Security Notes

1. **Never commit `.env` files** to GitHub
2. **Use strong JWT_SECRET** - Generate a random string (at least 32 characters)
3. **Change default admin credentials** in production
4. **Use MongoDB Atlas IP whitelist** - Restrict to Render IPs if possible
5. **Enable Cloudinary signed uploads** for production (optional but recommended)

---

## Generating a Strong JWT Secret

You can generate a secure JWT secret using:

**Node.js:**
```bash
node -e "console.log(require('crypto').randomBytes(32).toString('hex'))"
```

**Online:**
- Use a password generator to create a 32+ character random string

---

## Updating Your Application

1. Make changes to your code
2. Commit and push to GitHub
3. Render will automatically detect changes and redeploy
4. Monitor the deployment logs in Render dashboard

---

## Cost Considerations

- **Render Free Tier**: 
  - Services spin down after 15 minutes of inactivity
  - First request after spin-down takes 30-60 seconds
  - Consider upgrading for production use
  
- **MongoDB Atlas Free Tier**:
  - 512 MB storage
  - Shared RAM and CPU
  - Sufficient for small to medium projects

- **Cloudinary Free Tier**:
  - 25 GB storage
  - 25 GB monthly bandwidth
  - Sufficient for most projects

---

## Next Steps

- Set up custom domain (optional)
- Configure email notifications
- Add monitoring and logging
- Set up automated backups
- Consider upgrading to paid tiers for production

---

## Support

If you encounter issues:
1. Check Render deployment logs
2. Check browser console for frontend errors
3. Verify all environment variables are set correctly
4. Ensure MongoDB Atlas cluster is running
5. Check Cloudinary dashboard for upload issues

