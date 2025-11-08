# 🌿 AgroFlow Website

[![Project Status](https://img.shields.io/badge/Status-Active-brightgreen)](link-to-project-board)
[![Built with Next.js](https://img.shields.io/badge/Built%20with-Next.js%2014-000000.svg)](https://nextjs.org/)
[![Styling with MUI](https://img.shields.io/badge/Styling-Material--UI-007FFF.svg)](https://mui.com/)

A **modern, professional, and high-performance presentation website** for the AgroFlow project, built with **Next.js 14** and **Material-UI (MUI)**.

## 🚀 Getting Started

Follow these steps to set up and run the project locally.

### Prerequisites

Ensure you have [Node.js](https://nodejs.org/) (version 18 or higher) and npm/yarn installed.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone [repository-url]
    cd agroflow-website
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Configure Environment Variables:**
    Create a copy of the example environment file:
    ```bash
    cp .env.example .env.local
    ```
    Edit the `.env.local` file with your settings, particularly for the email functionality:

    ```env
    # Email Configuration for Nodemailer
    SMTP_HOST=your-smtp-host
    SMTP_PORT=587
    SMTP_USER=your-email@domain.com
    SMTP_PASS=your-email-password
    EMAIL_FROM=your-email@domain.com

    # Optional: Site URL
    NEXT_PUBLIC_SITE_URL=[https://your-domain.com](https://your-domain.com)
    ```

### Run in Development

```bash
npm run dev
