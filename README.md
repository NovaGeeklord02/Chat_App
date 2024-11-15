# Real-Time Chat Application

A modern real-time chat application built with React and Firebase, featuring video/audio calls, file sharing, and user management.

## Features

- 🔐 User authentication with email/password
- 💬 Real-time messaging with Firebase
- 📞 Video and audio calls using Tencent Cloud UIKit
- 📁 File and image sharing
- 🚫 User blocking functionality
- 🔄 Chat history with clear chat option
- 🔍 User search and add contacts
- 👤 User status and profile management
- 🎨 Modern responsive UI with dark theme

## Tech Stack

- React 18
- Firebase (Authentication, Firestore, Storage)
- Zustand for state management
- Tencent Cloud UIKit for video/audio calls
- React Toastify for notifications
- Vite for build tooling

## Quick Start

1. Clone the repository
2. Install dependencies with `npm install`
3. Set up Firebase credentials in `.env` file
4. Run development server with `npm run dev`

## Environment Variables

Create a `.env` file with your Firebase configuration:

```env
VITE_API_KEY=your_api_key
VITE_AUTH_DOMAIN=your_auth_domain
VITE_PROJECT_ID=your_project_id
VITE_STORAGE_BUCKET=your_storage_bucket
VITE_MESSAGING_SENDER_ID=your_messaging_sender_id
VITE_APP_ID=your_app_id
