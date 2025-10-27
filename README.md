# Readers Ticket

This is an interactive demo app created using **Next.js 15**.
It features an online service subscription calculator wizard.
You can select a plan and additional features before generating a library card PDF after filling out a form.
This project was created to showcase SSR pages, Zustand storage, dynamic navigation between steps, error handling, responsive layout, basic API integration, and configured tests.

---

## Demo

Live demo is available at: https://readers-ticket.vercel.app/

---

## Performance & Quality

- **Lighthouse Scores**:
  - Desktop: Performance 100 • Accessibility 92 • Best Practices 100 • SEO 100
  - Mobile: Performance 95 • Accessibility 92 • Best Practices 100 • SEO 100
- **TypeScript** with strict mode
- **ESLint** + **Prettier** for code quality

---

## Screenshots

![Plan selection page](public/screenshots/step1.png)
![Options selection page](public/screenshots/step2.png)
![Final ticket](public/screenshots/step3.png)

---

## Tech Stack

- **Next.js 15 (App Router)**
- **React 19**
- **TypeScript**
- **Radix UI**
- **Tailwind CSS**
- **Zustand** - client state (fetched data, selected plan, features, etc.)
- **Vitest + Testing Library** - comprehensive unit testing (25+ tests)
- **Playwright** - end-to-end testing (user flow)
- **CI/CD**: GitHub Actions + Vercel automatic deploys

---

## Installation and usage

```bash
# 1. Clone the repository
git clone https://github.com/quileute/readers-ticket.git
cd readers-ticket

# 2. Install dependencies
npm install

# 3. Create a .env.local file
echo "NEXT_PUBLIC_BASE_URL=http://localhost:3000" > .env.local

# 4. Start the app
npm run dev
```

The application will be available at: http://localhost:3000

---

## Tests

The project includes comprehensive test coverage:

### Unit Tests (Vitest + Testing Library)

- **25 tests** across 6 test suites
- Covers: Zustand store, utility functions, and React components
- Tests user interactions, state changes, and component rendering

### End-to-End Tests (Playwright)

- Verifies complete user workflow
- Tests navigation between steps and UI element visibility

Run tests:

```bash
# Unit tests
npm run test

# E2E tests
npm run test:e2e

# Install Playwright browsers (first time)
npx playwright install --with-deps
```

---

## Project structure

```bash
app/
 ├── layout.tsx            # Root layout (SSR)
 ├── (wizard)/layout.tsx   # Main app layout
 ├── (wizard)/plans/       # Step 1: choose plan
 ├── (wizard)/options/     # Step 2: extra options (features)
 ├── (wizard)/ticket/      # Step 3: final ticket
 └── api/                  # Mock API endpoints (plans, features, faq)

components/                # React components (with corresponding .test.tsx files)
 ├── Header.tsx
 ├── Step1Plans.tsx
 ├── Step2Options.tsx
 ├── TicketCard.tsx
 ├── ProgressBar.tsx
 ├── StepNavigation.tsx
 ├── PricingTable.tsx
 ├── FAQ.tsx
 └── Summary.tsx

store/
 └── useReadersStore.ts    # zustand store (with tests)

e2e/
 └── plans.spec.ts         # End-to-end user flow tests

utils/                     # Utility functions (with tests)

```
