# AgriSatya

## Current State
New project — no existing application.

## Requested Changes (Diff)

### Add
- Dashboard with sidebar navigation and header
- Satellite Land Health card: NDVI index display with health status (Excellent/Good/Poor)
- Crop Disease Detection card: image upload/scan interface with recent scan results and disease detection
- Farming Assistant Chat card: GenAI-style Q&A chatbot with predefined smart responses about farming
- IoT Animal Tracking card: map-style view with animal positions, movement alerts, boundary detection
- Recent Activity Feed: aggregated alerts and events
- Farm Overview stats panel: area, scans, animals tracked, alert count
- Authorization for farmer login

### Modify
- None

### Remove
- None

## Implementation Plan
1. Backend: store farm data, crop scan history, chat messages, animal movement events, NDVI readings
2. Authorization component for farmer login/roles
3. HTTP outcalls component for simulated satellite/IoT data
4. Frontend: dashboard layout with sidebar, 6 feature cards, chat interface, scan interface
