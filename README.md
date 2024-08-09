# Fetch_Challenge

## Overview
This project is an automated test solution, where the goal is to identify a fake gold bar among nine bars using the minimum number of weighings. The solution is implemented using Cypress for end-to-end testing.

## Features
- **Automated Weighing Process:** The script automatically simulates the weighing of bars on a digital scale.
- **Two-Weighing Strategy:** The algorithm guarantees that the fake bar is identified within two weighings.
- **Verification:** The script verifies that the correct alert message ("Yay! You find it!") is displayed when the fake bar is selected.
- **Logging:** The number of weighings and the results of each weighing are logged for analysis.

## Project Structure
- `cypress/e2e/findFakeBar.spec.js`: The main test script containing the algorithm to find the fake gold bar.
- `README.md`: Documentation for the project.

## Installation
1. **Clone the Repository:**
   ```bash
   git clone https://github.com/yourusername/Fetch_Challenge.git
