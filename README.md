# FitLog — Daily Workout Library & Training Planner

FitLog is a modern web application built with Next.js and Tailwind CSS that allows users to browse a curated library of exercises, inspect step-by-step form instructions, and manage their daily 5-lift workout plan with persistent local storage.

## Key Features

- **Curated Workout Library:** Browse 12+ strength, conditioning, and mobility movements with dynamic category filtering.
- **Detailed Execution Guides:** View sets, reps, duration, calorie burn, target muscle zones, equipment needed, and step-by-step form instructions for every movement.
- **Daily 5-Lift Session Cap:** Add up to 5 workouts to Today's Plan to stay focused and avoid overtraining.
- **Bookmark for Later:** Save favorite movements to a dedicated Saved List for future training blocks.
- **Progress Tracking & Analytics:** Mark exercises as completed, track real-time completion percentage with a visual progress bar, and monitor total estimated duration and calorie burn.
- **Persistent State & Toast Alerts:** Powered by React Context API and `localStorage` with instant toast notifications for every user action.
- **Fully Responsive UI:** Designed with a high-contrast dark theme (`#0b0d10` & `#ccff00`) optimized for mobile, tablet, and desktop screens.

## Tech Stack

- **Framework:** Next.js (App Router)
- **Styling:** Tailwind CSS
- **State Management:** React Context API & LocalStorage
- **Icons:** Lucide React
- **Fonts:** Oswald & Inter (`next/font/google`)

## API Endpoints Used

- **All Workouts:** `https://api.abcz.workers.dev/api/fitlog`
- **Single Workout Details:** `https://api.abcz.workers.dev/api/fitlog/:id`
- **Backup API:** `https://api.api-store.workers.dev/api/fitlog`

## Run Locally

1. Clone the repository:
   ```bash
   git clone [https://github.com/Takwat07/fitlog.git](https://github.com/Takwat07/fitlog.git)