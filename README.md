#SDET Task for testing http://automationpractice.multiformis.com/index.php

The project has both UI and API tests organized in two directories, the ui tests are split into checklist tests and smoke tests. The features being tested are the contact us form submission, the search feature and the search results page.
The project is integrated with circleCI. The UI tests run first then the API tests run afterwards. The API tests run using Jest test runner.

## Table of Contents

- [Installation](#installation)
- [Running Tests](#run-tests)
- [CircleCI Badge](#circleci-badge)

## Installation

### Prerequisites

- Node.js
- Nightwatch
- git
- jest

### Steps

1. Clone the repository:
   ```bash
   git clone https://github.com/yomnaelfawal/SDET_Task.git
   ```

## Run Tests

You can run tests using Nightwatch in two ways: directly through the command line or by triggering the CircleCI pipeline.

### Running Tests via Command Line

To run the tests locally using Nightwatch, follow these steps:

1. Open your command line interface (CMD, Terminal, etc.).
2. Navigate to the project directory:
   ```bash
   cd <project-directory>
   ```
3. Navigate to the subdirectory containing the tests you want to run
   3.1. For UI tests:
   ```bash
   cd ui_tests
   ```
   3.2. For API tests:
   ```bash
   cd api_tests
   ```
4. Run tests
   ```bash
   npx nightwatch
   ```

### Running Tests via CircleCI

You can run the tests through the CircleCI pipeline by manually triggering the pipeline.

#### To Trigger the Pipeline Manually:

1. Navigate to circleCI project page
2. Choose Branch -- master
3. Click the **"Trigger Pipeline"** button to start the pipeline.

## CircleCI Badge

[![CircleCI](https://dl.circleci.com/status-badge/img/gh/yomnaelfawal/SDET_Task/tree/master.svg?style=svg)](https://dl.circleci.com/status-badge/redirect/gh/yomnaelfawal/SDET_Task/tree/master)
