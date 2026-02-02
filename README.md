# 📋 Job Application Tracker

A modern, full-stack job application tracking system built with Next.js 15, featuring a Kanban-style board for managing your job search pipeline with drag-and-drop functionality.

[![Live Demo](https://img.shields.io/badge/demo-live-success)](https://job-application-tracker-mauryankit.vercel.app/)
[![Next.js](https://img.shields.io/badge/Next.js-15-black)](https://nextjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-blue)](https://www.typescriptlang.org/)
[![MongoDB](https://img.shields.io/badge/MongoDB-Atlas-green)](https://www.mongodb.com/)

## 🚀 Live Demo

Visit the live application: [https://job-application-tracker-mauryankit.vercel.app/](https://job-application-tracker-mauryankit.vercel.app/)

## ✨ Features

- 🎯 **Kanban Board Interface** - Drag and drop job applications between columns
- 🔐 **Secure Authentication** - Email-based authentication with Better Auth
- 📊 **Multiple Status Columns** - Wish List, Applied, Interviewing, Offers, Rejected
- 📝 **Detailed Job Tracking** - Company, position, location, salary, tags, and notes
- 🎨 **Modern UI** - Built with shadcn/ui and Tailwind CSS
- 📱 **Responsive Design** - Works seamlessly on desktop and mobile
- 🔄 **Real-time Updates** - Instant synchronization across the board
- 🏷️ **Tag System** - Organize jobs with custom tags
- 🔗 **External Links** - Quick access to job posting URLs

## 🛠️ Tech Stack

- **Framework:** Next.js 15 (App Router)
- **Language:** TypeScript
- **Database:** MongoDB Atlas
- **Authentication:** Better Auth
- **UI Components:** shadcn/ui
- **Styling:** Tailwind CSS
- **Drag & Drop:** @dnd-kit
- **Deployment:** Vercel

## 📦 Installation

### Prerequisites

- Node.js 18+ installed
- MongoDB Atlas account
- npm, yarn, pnpm, or bun package manager

### Clone the Repository

```bash
git clone https://github.com/yourusername/job-application-tracker.git
cd job-application-tracker
```

### Install Dependencies

```bash
npm install
# or
yarn install
# or
pnpm install
```

### Environment Variables

Create a `.env.local` file in the root directory with the following variables:

```bash
# MongoDB Connection String
MONGODB_URI=mongodb+srv://your-username:your-password@cluster.mongodb.net/job-board

# Better Auth Configuration
BETTER_AUTH_SECRET=your-secret-key-here

# Base URLs (use http://localhost:3000 for development)
BETTER_AUTH_URL=http://localhost:3000
NEXT_PUBLIC_BETTER_AUTH_URL=http://localhost:3000
```

#### Environment Variables Explained:

| Variable | Description | Required |
|----------|-------------|----------|
| `MONGODB_URI` | MongoDB Atlas connection string with database name | ✅ Yes |
| `BETTER_AUTH_SECRET` | Secret key for authentication (generate a strong random string) | ✅ Yes |
| `BETTER_AUTH_URL` | Base URL for server-side auth redirects | ✅ Yes |
| `NEXT_PUBLIC_BETTER_AUTH_URL` | Base URL for client-side auth redirects | ✅ Yes |

**⚠️ Security Note:** 
- Never commit `.env.local` to version control
- Use different secrets for development and production
- Generate strong random strings for `BETTER_AUTH_SECRET`

### Seed Sample Data (Optional)

Populate your database with sample job applications:

```bash
npm run seed:jobs
```

## 🚀 Development

Run the development server:

```bash
npm run dev
```

Open [http://localhost:3000](http://localhost:3000) in your browser.

## 📁 Project Structure

```
job-application-tracker/
├── app/                      # Next.js App Router
│   ├── (auth)/              # Authentication routes
│   ├── (root)/              # Main application routes
│   ├── api/                 # API routes
│   └── layout.tsx           # Root layout
├── components/              # React components
│   ├── ui/                  # shadcn/ui components
│   ├── kanban-board.tsx     # Kanban board component
│   ├── job-application-card.tsx
│   └── ...
├── lib/                     # Utilities and configurations
│   ├── actions/             # Server actions
│   ├── auth/                # Authentication setup
│   ├── hooks/               # Custom React hooks
│   ├── models/              # MongoDB models
│   └── db.ts                # Database connection
├── scripts/                 # Utility scripts
│   └── seed.ts              # Database seeding script
├── public/                  # Static assets
├── .env.local              # Environment variables (not tracked)
└── next.config.ts          # Next.js configuration
```

## 🔒 .gitignore Configuration

Your `.gitignore` is correctly configured for this project. Key exclusions:

```ignore
# Dependencies
/node_modules

# Environment variables (IMPORTANT)
.env*

# Next.js build outputs
/.next/
/out/
/build

# TypeScript
*.tsbuildinfo
next-env.d.ts

# Vercel
.vercel
```

**✅ Current .gitignore is properly set up** - All sensitive files and build artifacts are excluded.

## 🌐 Deployment

### Deploy to Vercel (Recommended)

1. Push your code to GitHub
2. Import your repository in [Vercel](https://vercel.com)
3. Configure environment variables in Vercel dashboard:
   - `MONGODB_URI`
   - `BETTER_AUTH_SECRET`
   - `BETTER_AUTH_URL` (use your Vercel URL)
   - `NEXT_PUBLIC_BETTER_AUTH_URL` (use your Vercel URL)
4. Deploy!

### Production Environment Variables

For production, update your URLs:

```bash
BETTER_AUTH_URL=https://your-domain.vercel.app
NEXT_PUBLIC_BETTER_AUTH_URL=https://your-domain.vercel.app
```

## 📝 Available Scripts

```bash
npm run dev          # Start development server
npm run build        # Build for production
npm run start        # Start production server
npm run lint         # Run ESLint
npm run seed:jobs    # Seed database with sample data
```

## 🎯 Usage

1. **Sign Up/Sign In** - Create an account using your email
2. **Add Jobs** - Click the "+" button in any column to add a job application
3. **Drag & Drop** - Move jobs between columns as your application progresses
4. **Edit Details** - Click on any job card to edit information
5. **Track Progress** - Organize jobs with tags and notes

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📄 License

This project is open source and available under the [MIT License](LICENSE).

## 👨‍💻 Author

**Ankit Maurya**

<!-- - GitHub: [@ankitmaurya291202](https://github.com/ankitmaurya291202) -->
- Live Demo: [Job Application Tracker](https://job-application-tracker-mauryankit.vercel.app/)

## 🙏 Acknowledgments

- UI Components from [shadcn/ui](https://ui.shadcn.com/)
- Authentication powered by [Better Auth](https://www.better-auth.com/)
- Drag & Drop functionality by [@dnd-kit](https://dndkit.com/)

---

**⭐ If you find this project useful, please consider giving it a star!**
