# AI Crypto Advisor

A full-stack cryptocurrency advisory application that provides AI-powered insights, real-time price tracking, and curated market news to help users make informed investment decisions.

## Overview

AI Crypto Advisor is a personalized cryptocurrency dashboard that leverages artificial intelligence to deliver customized investment recommendations based on user preferences, risk tolerance, and market conditions. The platform aggregates real-time market data and news to provide users with comprehensive insights into the cryptocurrency market.

## Features

- **AI-Powered Investment Insights** - Personalized cryptocurrency recommendations generated using advanced language models, tailored to user-defined investment strategies and risk profiles
- **Real-Time Price Tracking** - Live cryptocurrency price monitoring with support for multiple digital assets
- **Market News Aggregation** - Curated cryptocurrency news feed from industry sources
- **Investor Profile Management** - Customizable investment profiles supporting various trading strategies (long-term holding, day trading, etc.)
- **User Authentication & Authorization** - JWT-based secure authentication system
- **Personalized Dashboard** - Unified interface displaying AI insights, price data, news, and user preferences

## Tech Stack

**Frontend:**

- React
- Vite
- CSS for styling

**Backend:**

- Node.js + Express
- PostgreSQL
- OpenRouter API

## Installation & Setup

### Prerequisites

The following dependencies must be installed:

- Node.js (v16 or higher)
- PostgreSQL

### Installation

1. **Clone the repo**

   ```bash
   git clone <your-repo-url>
   cd ai-crypto-advisor
   ```

2. **Set up the backend**

   ```bash
   cd server
   npm install
   ```

   Create a `.env` file in the server directory:

   ```env
   PORT=5000
   DATABASE_URL=postgresql://username:password@localhost:5432/crypto_advisor
   JWT_SECRET=your-super-secret-jwt-key
   OPENROUTER_API_KEY=your-openrouter-api-key
   NEWS_API_KEY=your-news-api-key (optional)
   REDDIT_USER_AGENT=
   COIN_GECKO_API_KEY=
   CRYPTO_PANIC_API_KEY=
   ```

   Run database migrations (if you have any):

   ```bash
   npm run migrate
   ```

3. **Set up the frontend**

   ```bash
   cd ../client
   npm install
   ```

   Create a `.env` file in the client directory:

   ```env
   VITE_API_URL=http://localhost:5000
   ```

### Running the App

**Start the backend:**

```bash
cd server
npm start
```

**Start the frontend (in a new terminal):**

```bash
cd client
npm run dev
```

The application will be available at `http://localhost:5173` (default Vite development server port).

## Project Structure

```
ai-crypto-advisor/
├── client/                 # Frontend React app
│   ├── src/
│   │   ├── components/    # Reusable UI components
│   │   ├── pages/         # Page components
│   │   └── utils/         # Helper functions
│   └── public/            # Static assets
│
├── server/                # Backend Node.js app
│   ├── src/
│   │   ├── controllers/   # Request handlers
│   │   ├── routes/        # API routes
│   │   ├── services/      # Business logic
│   │   ├── middleware/    # Express middleware
│   │   ├── database/      # DB connection
│   │   └── clients/       # External API clients
│   └── public/            # Static files served by Express
```

## Usage

1. **User Registration** - Create an account with email and password
2. **Configure Preferences** - Define your investor profile, risk tolerance, and cryptocurrency interests
3. **Dashboard Access** - View AI-generated insights, real-time price data, and aggregated news
4. **Feedback Submission** - Provide feedback on AI recommendations to improve future insights

## Contributing

Contributions are welcome. Please open an issue to discuss proposed changes before submitting a pull request.

## License

This project is licensed under the MIT License.

## Disclaimer

This application is for informational purposes only and does not constitute financial advice. Users should conduct their own research and consult with qualified financial advisors before making investment decisions. The developers are not responsible for any financial losses incurred through the use of this application.
