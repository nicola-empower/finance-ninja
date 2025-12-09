<img width="2815" height="1490" alt="image" src="https://github.com/user-attachments/assets/a05e934d-703c-4398-a4db-ca2cd4415e84" />
# 🥷 Finance Ninja

**Finance Ninja** is a modern, interactive personal finance dashboard built with **Next.js 15**, **React 19**, and **Tailwind CSS**. It features a premium "glassmorphism" design and allows users to track income, expenses, and savings goals with real-time data persistence.

![Finance Ninja Dashboard](https://placehold.co/1200x600/3B82F6/FFFFFF?text=Finance+Ninja+Preview)

##  Features

- **📊 Interactive Dashboard**: Visual overview of your financial health with dynamic charts (Chart.js).
- **💸 Transaction Tracking**: Add, view, and categorize income and expenses.
- **🎯 Savings Goals**: Create custom savings goals with progress bars, custom icons, and color themes.
- **🧮 Self-Employment Calculator**: Estimate take-home pay, tax, and National Insurance deductions (UK-based logic).
- **💾 Data Persistence**: All data is automatically saved to your browser's `localStorage`, so you never lose your progress.
- **🎨 Premium UI**: Fully responsive design featuring glassmorphism effects, smooth transitions, and a polished color palette.

##  Tech Stack

- **Framework**: [Next.js 15](https://nextjs.org/) (App Router)
- **Library**: [React 19](https://react.dev/)
- **Styling**: [Tailwind CSS v4](https://tailwindcss.com/)
- **Icons**: [Lucide React](https://lucide.dev/)
- **Charts**: [Chart.js](https://www.chartjs.org/) & [React Chartjs 2](https://react-chartjs-2.js.org/)
- **Font**: [Poppins](https://fonts.google.com/specimen/Poppins) (via `next/font/google`)

##  Getting Started

Follow these steps to run the project locally:

### Prerequisites

- Node.js 18+ installed on your machine.

### Installation

1.  **Clone the repository:**
    ```bash
    git clone https://github.com/nicola-empower/finance-ninja.git
    cd finance-ninja
    ```

2.  **Install dependencies:**
    ```bash
    npm install
    ```

3.  **Run the development server:**
    ```bash
    npm run dev
    ```

4.  **Open the app:**
    Visit [http://localhost:3000](http://localhost:3000) in your browser.

##  Project Structure

```
finance-ninja/
├── app/                  # Next.js App Router pages and layouts
│   ├── globals.css       # Global styles (Tailwind imports)
│   ├── layout.tsx        # Root layout with font configuration
│   └── page.tsx          # Main application logic and state
├── components/           # Reusable React components
│   ├── Dashboard.tsx     # Main overview stats and charts
│   ├── TransactionsPage.tsx # Transaction list and management
│   ├── GoalsPage.tsx     # Savings goals grid
│   ├── CalculatorPage.tsx # Tax calculator
│   └── ...               # Modals, Charts, Sidebar
├── lib/                  # Utility functions and initial data
│   ├── data.ts           # Mock data and types
│   └── utils.ts          # Helper functions
└── public/               # Static assets
```


##  License

This project is open source and available under the [MIT License](LICENSE).

---

*Empower Digital Solutions 2025 | Nicola Berry.*
