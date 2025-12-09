# WindVane API

The API used by AppViettel

## Overview

Powering Web-to-native communication, WindVane bridges the gap between WebApps and Native functionality, introducing **miniapps** - web applications that run within the AppViettel superapp and can access AppViettel Superapp's native functions.

We support using physical device functionalities, such as:

- **Authentication & Authorization** - Secure user authentication with OAuth integration
- **Location Services** - Access device GPS and location data with high accuracy
- **Bluetooth Connectivity** - Scan, connect, and communicate with Bluetooth devices
- **QR/Barcode Scanning** - Scan and process QR codes and barcodes

[Read the full documentation →](#explore-the-windvane-api-ecosystem)

---

## Explore the WindVane API Ecosystem

### Core APIs

- [App](src/api/app/README.md) - Manage application state, notifications, and settings
- [Authentication](src/api/authentication/README.md) - Secure user authentication and authorization code management
- [Base](src/api/base/README.md) - Essential utilities for clipboard, browser, and miniapp lifecycle
- [Permissions](src/api/permissions/README.md) - Request and manage device permissions

### Device & Sensors

- [Battery](src/api/battery/README.md) - Monitor device battery status and charging state
- [Bluetooth](src/api/bluetooth/README.md) - Connect and communicate with Bluetooth Low Energy devices
- [Device](src/api/device/README.md) - Access device information and system capabilities
- [Location](src/api/location/README.md) - Retrieve GPS coordinates and address information
- [Motion](src/api/motion/README.md) - Access accelerometer, gyroscope, compass, and motion sensors
- [Screen](src/api/screen/README.md) - Control screen brightness, orientation, and capture screenshots

### User Interaction

- [Interaction](src/api/interaction/README.md) - Display alerts, toasts, action sheets, and loading indicators
- [Call](src/api/call/README.md) - Initiate phone calls and dial numbers
- [Contacts](src/api/contacts/README.md) - Access and manage device contacts
- [Scan](src/api/scan/README.md) - Scan QR codes and barcodes

### Media & Storage

- [File](src/api/file/README.md) - Upload, download, and manage files
- [Multimedia](src/api/multimedia/README.md) - Capture photos/videos, save media, and manage local storage
- [Sound](src/api/sound/README.md) - Play system sounds and beeps

### Network & Data

- [Cookie](src/api/cookie/README.md) - Read and write cookies for data persistence
- [Network](src/api/network/README.md) - Monitor network connectivity and type

### Navigation

- [Navigation](src/api/navigation/README.md) - Navigate between miniapps and manage routing

### Viettel Services

- [Viettel](src/api/viettel/README.md) - Access Viettel-specific services and integrations

---

## Getting Started

All WindVane APIs follow a consistent pattern:

```typescript
import { apiFunction } from './api/category/apiFunction';

// Promise-based API calls
apiFunction(params)
  .then(result => {
    // Handle success
  })
  .catch(error => {
    // Handle error
  });
```

Each API requires the WindVane bridge to be available in the AppViettel environment. For detailed examples and usage instructions, explore the individual API documentation linked above.
