# Cypress E2E Testing for Appointment Booking System

This project contains automated end-to-end tests for an appointment booking system using Cypress. The tests verify functionality both from client and admin perspectives.

## Project Overview

The testing suite covers three main feature areas:
- Guest reservation process
- Admin client management
- Admin reservation management

## Test Structure

Tests are organized into three main Cypress test files:
- `guest_reservation.cy.js`: Verifies the complete guest appointment booking flow
- `admin_clients_manage.cy.js`: Tests client management features for administrators
- `admin_res_manage.cy.js`: Validates reservation management capabilities for administrators

## Key Features Tested

### Guest Reservation
- Appointment time selection
- Contact information submission
- Appointment confirmation
- Appointment modification

### Admin Client Management
- Client search functionality
- Client information editing
- Client notes management
- Customer appointment viewing

### Admin Reservation Management
- Creating appointments from calendar
- Editing existing reservations
- Deleting reservations
- Setting up unavailability periods
- Calendar synchronization options

## Getting Started
```
docker compose up -d
npx cypress open

```
