# Deployment Checklist

Use this checklist to ensure you've completed all steps for deployment.

## Pre-Deployment

- [ ] Code is pushed to GitHub repository
- [ ] All local changes are committed
- [ ] `.env` files are NOT committed (check `.gitignore`)

## MongoDB Atlas Setup

- [ ] Created MongoDB Atlas account
- [ ] Created a new cluster (M0 free tier)
- [ ] Created database user with read/write permissions
- [ ] Whitelisted IP addresses (0.0.0.0/0 for Render)
- [ ] Copied connection string
- [ ] Replaced `<password>` and `<dbname>` in connection string

## Cloudinary Setup

- [ ] Created Cloudinary account
- [ ] Copied Cloud Name
- [ ] Copied API Key
- [ ] Copied API Secret

## Backend Deployment (Render)

- [ ] Created new Web Service on Render
- [ ] Connected GitHub repository
- [ ] Set Root Directory to `backend`
- [ ] Set Build Command to `npm install`
- [ ] Set Start Command to `npm start`
- [ ] Added environment variable: `PORT=10000`
- [ ] Added environment variable: `NODE_ENV=production`
- [ ] Added environment variable: `MONGO_URI` (with Atlas connection string)
- [ ] Added environment variable: `JWT_SECRET` (strong random string)
- [ ] Added environment variable: `ADMIN_EMAIL` (your admin email)
- [ ] Added environment variable: `ADMIN_PASSWORD` (your admin password)
- [ ] Added environment variable: `CLOUDINARY_CLOUD_NAME`
- [ ] Added environment variable: `CLOUDINARY_API_KEY`
- [ ] Added environment variable: `CLOUDINARY_API_SECRET`
- [ ] Added environment variable: `FRONTEND_URL` (will update after frontend deploy)
- [ ] Deployment completed successfully
- [ ] Copied backend URL

## Frontend Deployment (Render)

- [ ] Created new Static Site on Render
- [ ] Connected GitHub repository
- [ ] Set Root Directory to `frontend`
- [ ] Set Build Command to `npm install && npm run build`
- [ ] Set Publish Directory to `dist`
- [ ] Added environment variable: `VITE_API_BASE_URL` (your backend URL + `/api`)
- [ ] Deployment completed successfully
- [ ] Copied frontend URL

## Post-Deployment

- [ ] Updated backend `FRONTEND_URL` environment variable with frontend URL
- [ ] Backend redeployed with updated CORS settings
- [ ] Tested frontend loads correctly
- [ ] Tested admin login works
- [ ] Tested project creation with image upload
- [ ] Tested client testimonial creation with image upload
- [ ] Tested contact form submission
- [ ] Tested newsletter subscription

## Security Check

- [ ] Strong JWT_SECRET is set (32+ characters)
- [ ] Admin password is changed from default
- [ ] MongoDB Atlas IP whitelist is configured
- [ ] No sensitive data in code repository
- [ ] Environment variables are set in Render (not in code)

## Optional Enhancements

- [ ] Custom domain configured
- [ ] SSL certificate active
- [ ] Monitoring/logging set up
- [ ] Backup strategy in place

---

**Deployment Complete!** 🎉

Your application should now be live and accessible at your frontend URL.

