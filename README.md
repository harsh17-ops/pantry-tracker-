# Pantry Tracker 

Pantry Tracker Elite is a sophisticated web application designed to help users manage their pantry inventory efficiently. With features like real-time inventory tracking, expiration date alerts, and recipe suggestions based on available ingredients, this app streamlines kitchen management and reduces food waste.

## Features

- User authentication
- Real-time pantry inventory management
- Expiration date tracking and alerts
- Recipe suggestions based on available ingredients
- Intuitive and responsive UI
- Data visualization for pantry statistics

## Tech Stack

- Next.js
- React
- TypeScript
- Firebase (Authentication and Firestore)
- Material-UI
- Framer Motion
- Recharts
- Vercel (Deployment)

## Getting Started

1. Clone the repository:
git clone https://github.com/yourusername/pantry-tracker-elite.git

2. Install dependencies:
cd pantry-tracker-elite
npm install

3. Set up environment variables:
Create a `.env.local` file in the root directory and add your Firebase and Spoonacular API credentials:
NEXT_PUBLIC_FIREBASE_API_KEY=your_api_key
NEXT_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
NEXT_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
NEXT_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
NEXT_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
NEXT_PUBLIC_FIREBASE_APP_ID=your_app_id
NEXT_PUBLIC_FIREBASE_MEASUREMENT_ID=your_measurement_id
NEXT_PUBLIC_SPOONACULAR_API_KEY=your_spoonacular_api_key

4. Run the development server:
npm run dev

5. Open [http://localhost:3000](http://localhost:3000) with your browser to see the result.

## Deployment

The app is set up for easy deployment on Vercel. Connect your GitHub repository to Vercel and it will automatically deploy your main branch.

## Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## License

This project is licensed under the MIT License.
