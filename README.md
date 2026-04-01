# Playwright E2E API Testing Framework

A comprehensive Playwright-based API testing framework for the Restful-Booker API with support for all HTTP methods (GET, POST, PUT, PATCH, DELETE) and comprehensive validation.

## 📋 Features

- ✅ Full CRUD operations testing (Create, Read, Update, Patch, Delete)
- ✅ Comprehensive API validation (status codes, schemas, headers, timing, errors)
- ✅ Authentication fixture for token-based requests
- ✅ Reusable booking data factory
- ✅ Response validation utilities
- ✅ Performance timing assertions
- ✅ Error handling and edge case testing
- ✅ Booking count retrieval and validation
- ✅ HTML, JSON, and JUnit test reports

## 🚀 Quick Start

### Prerequisites

- Node.js 16+ (with npm)
- Git

### Installation

```bash
# Install dependencies
npm install

# Install Playwright browsers (one-time setup)
npx playwright install
```

### Configuration

Create or update the `.env` file with your credentials:

```env
AUTH_USERNAME=admin
AUTH_PASSWORD=password123
API_BASE_URL=https://restful-booker.herokuapp.com
API_TIMEOUT=10000
```

## 🧪 Running Tests

### Run All Tests
```bash
npm test
```

### Run Tests in Headed Mode (See Browser)
```bash
npm run test:headed
```

### Run Tests in Debug Mode
```bash
npm run test:debug
```

### Run Specific Test Suites

**Health Check Tests:**
```bash
npm run test:health
```

**Authentication Tests:**
```bash
npm run test:auth
```

**Booking CRUD Tests:**
```bash
npm run test:bookings
```

**Booking Count Test Only:**
```bash
npm run test:count
```

## 📁 Project Structure

```
.
├── tests/
│   ├── api/
│   │   ├── auth/                    # Authentication tests
│   │   │   └── authentication.spec.ts
│   │   ├── bookings/                # CRUD operation tests
│   │   │   ├── create-booking.spec.ts
│   │   │   ├── read-booking.spec.ts
│   │   │   ├── update-booking.spec.ts
│   │   │   ├── patch-booking.spec.ts
│   │   │   ├── delete-booking.spec.ts
│   │   │   └── booking-count.spec.ts
│   │   └── health/                  # Health check tests
│   │       └── health-check.spec.ts
│   ├── fixtures/
│   │   ├── auth.fixture.ts          # Auth token provider
│   │   └── booking.fixture.ts       # Booking data factory
│   └── utils/
│       ├── api-helpers.ts           # API validation utilities
│       └── global-setup.ts          # Global test setup
├── playwright.config.ts             # Playwright configuration
├── tsconfig.json                    # TypeScript configuration
├── package.json                     # Dependencies and scripts
├── .env                             # Environment variables (not in git)
└── .gitignore                       # Git ignore rules
```

## 📊 Test Coverage

### Health Check
- Ping endpoint validation
- Status code assertions
- Response timing checks

### Authentication
- Valid credential authentication
- Invalid credential handling
- Token structure validation
- Response headers validation
- Auth fixture functionality

### Booking Create (POST)
- Successful booking creation
- Response structure validation
- Header validation
- Error handling (missing fields, invalid data)

### Booking Read (GET)
- Retrieve all bookings
- Retrieve booking by ID
- Query parameter support
- 404 handling for non-existent IDs
- Response headers validation

### Booking Update (PUT)
- Full booking update with auth token
- Auth token requirement validation
- Response structure validation
- Invalid booking ID handling

### Booking Patch (PATCH)
- Partial booking update
- Auth token requirement
- Specific field updates
- Unchanged field preservation
- Empty body handling

### Booking Delete (DELETE)
- Delete booking with auth token
- Auth token requirement validation
- Deletion confirmation (GET after DELETE)
- 404 validation for deleted resources
- Non-existent booking handling

### Booking Count
- Total booking count retrieval
- Array structure validation
- Unique ID verification
- Response headers validation

## 🔍 Test Reports

After running tests, view reports:

### HTML Report (Interactive)
```bash
npx playwright show-report
```
The HTML report opens at `playwright-report/index.html`

### JSON Report
Located at `test-results/results.json`

### JUnit Report
Located at `test-results/junit.xml`

## 🛠️ Extending the Framework

### Adding New Tests

1. Create a new test file in the appropriate directory under `tests/api/`
2. Use the fixture pattern:

```typescript
import { test, expect } from '@fixtures/auth.fixture';

test.describe('New Feature', () => {
  test('should do something', async ({ request, authToken }) => {
    const response = await request.get('/endpoint');
    expect(response.status()).toBe(200);
  });
});
```

### Adding Custom Validators

Add validation functions to `tests/utils/api-helpers.ts`:

```typescript
export async function myCustomValidator(response: any): Promise<void> {
  // Custom validation logic
}
```

### Using Booking Factory

Create custom booking data:

```typescript
import { createValidBooking, createBookingWithCustomData } from '@fixtures/booking.fixture';

const booking = createValidBooking();
const customBooking = createBookingWithCustomData({
  firstname: 'Custom',
  totalprice: 500,
});
```

## 🔐 Security Notes

- **Do NOT commit `.env` file** to version control
- Credentials are stored in `.env` locally
- Use environment variables in CI/CD pipelines
- The test framework uses secure token handling

## 📈 Performance Considerations

- Tests run in parallel by default (configurable in `playwright.config.ts`)
- Response timeout: 10 seconds (adjustable in `.env`)
- Retries: Auto-enabled in CI environments
- Network delays may vary; adjust performance assertions as needed

## 🐛 Debugging

### Debug Single Test
```bash
npm run test:debug -- tests/api/bookings/create-booking.spec.ts
```

### Verbose Logging
```bash
DEBUG=pw:api npm test
```

### VS Code Integration

Ensure you have the Playwright Test for VS Code extension installed for inline debugging.

## 📝 Booking Count Data

The test suite includes a dedicated test that fetches and displays the current booking count:

```
POST /booking          - Create a new booking
GET /booking           - Get all booking IDs (returns count)
GET /booking/:id       - Get booking details
PUT /booking/:id       - Update entire booking (requires auth)
PATCH /booking/:id     - Partial update (requires auth)
DELETE /booking/:id    - Delete booking (requires auth)
```

**Current Count on Restful-Booker**: 54+ bookings (dynamic)

Run the count test:
```bash
npm run test:count
```

## 🤝 Contributing

1. Follow the existing test structure
2. Add descriptive test names and comments
3. Include both positive and negative test cases
4. Validate error responses
5. Update documentation for new features

## 📞 Support

For issues or questions:
1. Check `playwright.config.ts` for configuration options
2. Review test output in HTML report
3. Enable debug mode: `npm run test:debug`

## 📄 License

ISC
