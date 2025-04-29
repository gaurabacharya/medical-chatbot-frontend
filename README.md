# Medical AI Chatbot Frontend

## Demo
https://youtu.be/-NcgFqA0GN8

## Summary
This medical chatbot is  modern, user-friendly medical chatbot interface built with Next.js and Tailwind CSS.
It provides a chat interface used with a connection to the backend RAG chatbot that I created previously 
[Medical-RAG-Chatbot](https://github.com/gaurabacharya/Medical-RAG-Chatbot). In order to create 
this UI, I first created wireframes using Figma which can be viewed [here](https://www.figma.com/design/WHk0aMjc3l8BdZxzo243TL/Medical-Chatbot-UI?node-id=0-1&t=3Cb06KrxV4k4cR6y-1). Then the 
react website was created using TypeScript, Next.js and styled using tailwindcss. In order to 
run this locally please follow the steps below. 

<img width="917" alt="Medical Chatbot" src="https://github.com/user-attachments/assets/753736ec-8eaa-405e-9304-806d4bfe471b" />


## Prerequisites

Before you begin, ensure you have the following installed:
- [Node.js](https://nodejs.org/) (version 16 or higher)
- [npm](https://www.npmjs.com/) (usually comes with Node.js)
- [Git](https://git-scm.com/)

## Getting Started

Follow these steps to run the project locally:

1. **Clone the repository**
   ```bash
   git clone https://github.com/yourusername/medical-chatbot-frontend.git
   cd medical-chatbot-frontend
   ```

2. **Install dependencies**
   ```bash
   npm install
   ```

3. **Set up environment variables**
   Create a `.env.local` file in the root directory and add:
   ```
   NEXT_PUBLIC_API_BASE=http://localhost:8080
   ```
   Note: Adjust the API base URL if your backend is running on a different port or host.

4. **Add required assets**
   - Place `public-health.svg` in the `public` directory
   - Place `Send.svg` in the `public` directory

5. **Start the development server**
   ```bash
   npm run dev
   ```

6. **Follow the steps in [Medical-RAG-Chatbot](https://github.com/gaurabacharya/Medical-RAG-Chatbot)** 
    In order to get the backend api running, follow the steps in the link and run 
    ```bash
        python app.py
    ```
    to get server side running on localhost port 8080

6. **Open the application**
   Open [http://localhost:3000](http://localhost:3000) in your browser to see the application.

## Features

- Real-time chat interface
- Suggested medical questions
- Responsive design
- Modern UI with gradient effects
- Backend API integration

## Project Structure

```
medical-chatbot-frontend/
├── src/
│   ├── app/
│   │   ├── layout.tsx
│   │   ├── page.tsx
│   │   └── globals.css
│   ├── components/
│   │   ├── ChatCard.tsx
│   │   ├── MessageBubble.tsx
│   │   └── MessageInput.tsx
│   └── lib/
│       └── api.ts
├── public/
│   ├── public-health.svg
│   └── Send.svg
└── package.json
```

## Development

- Built with Next.js 13+
- Styled using Tailwind CSS
- TypeScript for type safety
- Component-based architecture

## Backend Requirements

This frontend expects a backend server that:
- Runs on the URL specified in NEXT_PUBLIC_API_BASE
- Has a POST endpoint at `/api/chat`
- Accepts JSON with a `msg` field
- Returns JSON with an `answer` field

## Troubleshooting

1. If you see a "Failed to contact the server" error:
   - Ensure your backend server is running
   - Check if the NEXT_PUBLIC_API_BASE URL is correct
   - Verify the backend endpoint is accessible

2. If the send button image doesn't appear:
   - Verify that Send.svg exists in the public directory
   - Check the image path in MessageInput.tsx

## Contributing

Feel free to submit issues and enhancement requests!
