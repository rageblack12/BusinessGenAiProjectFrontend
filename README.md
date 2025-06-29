# 🌐 Smart Feedback Portal - Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/React_Router-CA4245?style=for-the-badge&logo=react-router&logoColor=white" alt="React Router"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Axios-5A29E4?style=for-the-badge&logo=axios&logoColor=white" alt="Axios"/>
</p>

This repository contains the **React frontend** for the Smart Feedback Portal, a full-featured application built on the MERN stack. It provides a seamless interface for customers to submit feedback and for administrators to manage it using powerful, integrated AI features.

---

## ✨ Table of Contents

- [🚀 Key Features](#-key-features)
  - [👤 Customer Features](#-customer-features)
  - [👑 Admin Features](#-admin-features)
- [🤖 AI-Powered Capabilities](#-ai-powered-capabilities)
- [🛠️ Tech Stack](#️-tech-stack)
- [🧑‍💻 Getting Started](#-getting-started)
  - [Prerequisites](#prerequisites)
  - [Installation & Setup](#installation--setup)
- [⚙️ Environment Configuration](#️-environment-configuration)

---

## 🚀 Key Features

### 👤 Customer Features

* **🔐 Secure Authentication**: Sign up and log in securely to a personal account.
* **📢 View Posts**: Browse all posts created by the admin, complete with titles, descriptions, and images.
* **❤️ Like Posts**: Engage with posts by liking them, with a real-time like count and a visual indicator for liked posts.
* **💬 Comment & Reply**: Participate in discussions by commenting on posts and replying to other comments.
* **😠 Submit Complaints**: Easily submit a complaint with details like Order ID, product type, and a full description.
* **📊 View Complaint History**: Track all personal complaints and view the corresponding replies from the admin.
* **✅ Resolve Complaints**: Mark a complaint as resolved to officially close the ticket.

### 👑 Admin Features

* **🔑 Admin Login**: Access a separate, secure login for administrators.
* **✍️ Post Management**: Create, view, and manage posts with titles, descriptions, and images.
* **☁️ Cloudinary Integration**: Images are automatically uploaded to Cloudinary and seamlessly linked in post data.
* **🗂️ Comprehensive Complaint Management**: View and manage all user-submitted complaints in a centralized dashboard.
* **🔎 Advanced Filtering**:
    * Filter complaints by **status** (Open/Resolved), **severity** (High/Medium/Low), or **product type**.
    * Filter comments by the **post** they belong to or their **sentiment**.
* **📝 Reply to Feedback**:
    * Reply to user complaints and comments manually.
    * Utilize AI-suggested responses for faster and more consistent communication.
* **📈 Analytics Dashboard**: Visualize complaint statistics and key metrics using an interactive dashboard built with **Recharts**.

---

## 🤖 AI-Powered Capabilities

The portal leverages state-of-the-art AI models to automate and enhance feedback management:

* **Sentiment Analysis**: Customer comments are automatically analyzed for sentiment (Positive, Neutral, Negative) using the `twitter-roberta-base-sentiment` model from Hugging Face.
* **Complaint Severity Analysis**: The severity of each complaint is intelligently determined using the `bart-large-mnli` model, helping admins prioritize critical issues.
* **AI-Suggested Replies**: Admins can generate context-aware replies to complaints and comments using Google's `gemma-2-2b-it` model, which considers the complaint's description, severity, and the comment's sentiment.

---

## 🛠️ Tech Stack

This frontend is built with a modern and robust set of technologies:

* **Core Framework**: React
* **Routing**: React Router
* **Styling**: Tailwind CSS
* **HTTP Requests**: Axios
* **Data Visualization**: Recharts
* **Authentication**: JWT (handled by the backend)

---

## 🧑‍💻 Getting Started

Follow these instructions to get the frontend development server up and running on your local machine.

### Prerequisites

* Node.js (v18 or later recommended)
* npm
* A running instance of the [backend server](<link-to-your-backend-repo>).

### Installation & Setup

1.  **Clone the repository and navigate to the frontend directory:**
    ```bash
    git clone <your-repo-url>
    cd frontend
    ```

2.  **Install all the required dependencies:**
    ```bash
    npm install
    ```

    > **Important Note**
    > Before starting, ensure the backend server is running and its `.env` file is correctly configured. The frontend relies on the backend for API calls and authentication. Refer to the `backend/.env.example` file for the required variables.

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The application should now be running on `http://localhost:5173` (or another port if specified).

---

## ⚙️ Environment Configuration

The frontend is designed to connect to the backend API via a base URL configured in Axios. No separate `.env` file is required on the frontend unless you need to set up a proxy for development. All critical environment variables, such as database connections and API keys for AI models, are managed exclusively on the backend.
