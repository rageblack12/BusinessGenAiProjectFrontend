# 🌐 Smart Feedback Portal - Frontend

<p align="center">
  <img src="https://img.shields.io/badge/React-20232A?style=for-the-badge&logo=react&logoColor=61DAFB" alt="React"/>
  <img src="https://img.shields.io/badge/Tailwind_CSS-38B2AC?style=for-the-badge&logo=tailwind-css&logoColor=white" alt="Tailwind CSS"/>
  <img src="https://img.shields.io/badge/Recharts-003366?style=for-the-badge&logo=recharts&logoColor=white" alt="Recharts"/>
</p>

This is the React frontend for the Smart Feedback Portal. It provides the user interface for customers to give feedback and for admins to manage it with AI-powered tools.

---

## ✨ Features

| 👤 Customer Features                     | 👑 Admin Features                             |
| --------------------------------------- | --------------------------------------------- |
| 🔐 Secure Sign up & Login               | 📊 View Analytics Dashboard                   |
| 📢 View Admin Posts & Updates           | ✍️ Create & Manage Posts                      |
| ❤️ Like, 💬 Comment, & Reply            | 🗂️ View & Manage All Complaints               |
| 😠 Submit Complaints with Order Details | 🔎 Filter Complaints (Status, Severity)       |
| 📊 Track Personal Complaint Status     | 🤖 Get AI-Suggested Replies for Complaints    |
| ✅ Mark a Complaint as Resolved         | 💬 Filter & Reply to Comments with AI Help    |

---

## 🛠️ Tech Stack & AI

* **Core**: React, React Router, Axios
* **Styling**: Tailwind CSS
* **Charts**: Recharts
* **AI Models Used**:
    * `twitter-roberta-base-sentiment`: For sentiment analysis on comments.
    * `bart-large-mnli`: To determine complaint severity.
    * `google/gemma-2-2b-it`: To suggest replies to admins.

---

## 🚀 Getting Started

1.  **Clone the repo and enter the directory:**
    ```bash
    git clone https://github.com/iitian360/BusinessGenAiProject
    cd frontend
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```
    > **Note:** Make sure the backend server is running first, as this frontend connects to its API.

3.  **Start the development server:**
    ```bash
    npm run dev
    ```
    The app will be available at `http://localhost:5173`.
