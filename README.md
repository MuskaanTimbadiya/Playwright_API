# 🚀 Playwright API Automation Framework

[![Tests](https://github.com/<username>/<repo>/actions/workflows/playwright.yml/badge.svg)](https://github.com/<username>/<repo>/actions/workflows/playwright.yml)
[![Node Version](https://img.shields.io/badge/node-%3E%3D18-blue.svg)](https://nodejs.org/)

A scalable API automation framework built using [Playwright Test](https://playwright.dev/docs/intro), designed to support reliable testing, faster feedback cycles, and maintainable architecture for Agile teams.

This repository serves as a polished example suitable for interviews or portfolio demonstrations. It includes:

* Clear folder organization (`tests`, `utils`, `config`, `data`)
* Reusable utilities and environment configuration
* CI/CD workflow using GitHub Actions
* Sample API tests exercising GET/POST/PUT/PATCH/DELETE requests
* Lightweight and easy to extend to new services

---

---

## 🎯 Purpose

The goal of this framework is to provide a clean and extensible structure for API automation by:

* Validating critical API workflows
* Improving regression efficiency
* Supporting maintainable and scalable test design
* Enabling future CI/CD integration

---

## 🏗️ Framework Architecture

The framework follows a modular design to keep test logic reusable and easy to scale.

Key design principles:

* Separation of test logic and API utilities
* Reusable request handling
* Environment-based configuration
* Clean test data management

---

## 📂 Folder Structure

tests/ → Contains API test cases
utils/ → Helper methods for API requests and validations
config/ → Environment configurations and base setup
data/ → Test data and payloads

This structure helps teams extend tests without breaking existing workflows.

---

## ⚙️ Environment Configuration

The framework supports flexible configuration to allow testing across different environments such as:

* books
* activities
* staging

Configuration values can be managed centrally to avoid hardcoding test data.

---

## ▶️ Getting Started

### Prerequisites

* Node.js 18+ (LTS recommended)
* npm or yarn
* Git (to clone the repo)

### Installation

```bash
npm ci            # install dependencies
npx playwright install    # download browsers (not needed for API tests but kept for completeness)
```

### Running the tests

By default the framework targets the `books` environment (configured in `config/config.js`). You can switch environments by setting the `TEST_ENV` variable:

```bash
# run against default (`books`) service
npm test

# run against activities environment
TEST_ENV=activities npm test
```

The `test` script is defined in `package.json` and simply calls `npx playwright test`. You can show the HTML report after execution with:

```bash
npm run report
```

---

---

## � Project Highlights

* **Modular architecture** – configuration, utilities and data are separated from test logic.
* **Environment support** – easily switch between `books`, `activities` or `staging` by changing a variable.
* **Reusable helpers** – located under `utils/`, e.g. authentication helper.
* **Clean test data** – payloads stored in `data/` JSON files for clarity and reuse.
* **CI/CD ready** – GitHub Actions workflow is included; badge at top of this README.
* **License & contribution guide** – MIT license and `CONTRIBUTING.md` demonstrate open source best practices.

---

---

## 🚀 CI/CD Ready

This framework is designed to integrate easily with CI/CD pipelines such as GitHub Actions or Jenkins to support automated quality gates.

---

## 🧠 Design Decisions

* Focus on API-level automation to reduce heavy UI dependency
* Modular utilities for better maintainability
* Scalable structure aligned with Agile team workflows

---

## 🔮 Future Improvements

* Add data-driven testing and parametrization
* Implement contract testing (e.g. with Pact)
* Add linting and pre-commit hooks
* Extend utilities with common request/response validation helpers
* Integrate with Slack or email for failures in CI

---
## 🔄 Test Execution Flow

Test → API Client → Config → Environment → Validation → Report


⭐ This repository represents a practical example of building scalable API automation aligned with modern QA engineering practices.
