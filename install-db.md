# Database Setup Instructions

## Install Dependencies
```bash
npm install mongoose
npm install @types/mongoose --save-dev
```

## Environment Variables
Create a `.env.local` file in your project root with:
```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/malikal-events?retryWrites=true&w=majority
```