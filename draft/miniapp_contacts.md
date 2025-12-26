# Device Permission & Contacts API Guide

This guide covers the device permission system and contacts management APIs in the miniapp framework.

---

## 1. Device Permission API

The device permission API allows you to request and check various device permissions including location, camera, bluetooth, contacts, and more.

### 1.1 Available Permission Scopes

- `location` - GPS location access
- `camera` - Camera access
- `bluetooth` - Bluetooth connectivity
- `album` - Photo album access
- `contacts` - Contacts access
- `microphone` - Microphone access
- `file` - File system access
- `call` - Phone call capability
- `vibrate` - Device vibration
- `screen` - Screen recording/capture

### 1.2 Check Permission Status - `getSetting()`

Check the current status of all device permissions.

**API Reference:**
- **Function:** `getSetting(): Promise<GetSettingResult>`
- **Module:** `src/api/permissions/getSetting.ts`
- **Bridge:** `window.WindVane.call("wv", "getSetting", {}, ...)`

**Return Type:**
```typescript
interface GetSettingResult {
  authSetting: {
    location?: boolean;
    camera?: boolean;
    bluetooth?: boolean;
    album?: boolean;
    contacts?: boolean;
    microphone?: boolean;
    file?: boolean;
    call?: boolean;
    vibrate?: boolean;
    screen?: boolean;
  };
}
```

**Sample Code:**
```typescript
import { getSetting } from './api/permissions/getSetting';

async function checkPermissions() {
  try {
    const result = await getSetting();
    const permissions = result.authSetting || {};

    console.log('Camera permission:', permissions.camera ? 'Granted' : 'Not granted');
    console.log('Location permission:', permissions.location ? 'Granted' : 'Not granted');
    console.log('Contacts permission:', permissions.contacts ? 'Granted' : 'Not granted');

    // Check specific permission
    if (permissions.camera === true) {
      // Camera is authorized, proceed with camera operations
      openCamera();
    } else {
      // Need to request permission
      console.log('Camera permission not granted');
    }
  } catch (error) {
    console.error('Failed to get settings:', error);
  }
}
```

### 1.3 Request Permission - `authorize()`

Request a specific device permission from the user.

**API Reference:**
- **Function:** `authorize(scope: PermissionScope): Promise<AuthorizeResult>`
- **Module:** `src/api/permissions/authorize.ts`
- **Bridge:** `window.WindVane.call("wv", "authorize", { scope }, ...)`

**Parameters:**
```typescript
type PermissionScope =
  | 'location'
  | 'camera'
  | 'bluetooth'
  | 'album'
  | 'contacts'
  | 'microphone'
  | 'file'
  | 'call'
  | 'vibrate'
  | 'screen';
```

**Return Type:**
```typescript
interface AuthorizeResult {
  successScope: {
    [scope: string]: boolean;
  };
  msg: string;
}
```

**Sample Code:**
```typescript
import { authorize } from './api/permissions/authorize';
import { getSetting } from './api/permissions/getSetting';

async function requestCameraPermission() {
  try {
    // First check if permission is already granted
    const settings = await getSetting();

    if (settings.authSetting?.camera === true) {
      console.log('Camera permission already granted');
      return true;
    }

    // Request camera permission
    const result = await authorize('camera');

    if (result?.successScope?.['camera']) {
      console.log('Camera permission granted:', result.msg);
      return true;
    } else {
      console.log('Camera permission denied:', result.msg);
      return false;
    }
  } catch (error) {
    console.error('Failed to request camera permission:', error);
    return false;
  }
}

async function requestLocationPermission() {
  try {
    const result = await authorize('location');

    if (result?.successScope?.['location']) {
      console.log('Location permission granted');
      // Proceed with location-based features
      getCurrentLocation();
    } else {
      console.log('Location permission denied');
      // Show alternative UI or message
      showLocationDeniedMessage();
    }
  } catch (error) {
    console.error('Permission request failed:', error);
  }
}
```

**Best Practices:**
```typescript
// Always check before requesting to avoid unnecessary prompts
async function ensurePermission(scope: PermissionScope): Promise<boolean> {
  try {
    // Step 1: Check current status
    const settings = await getSetting();

    if (settings.authSetting?.[scope] === true) {
      return true; // Already granted
    }

    // Step 2: Request permission
    const result = await authorize(scope);
    return result?.successScope?.[scope] || false;
  } catch (error) {
    console.error(`Failed to ensure ${scope} permission:`, error);
    return false;
  }
}

// Usage
if (await ensurePermission('microphone')) {
  startRecording();
}
```

---

## 2. Contacts Permission API

The contacts permission API provides iOS-specific methods to request and check contacts authorization status.

### 2.1 Request Contacts Permission - `askAuth()` (iOS only)

Request permission to access device contacts.

**API Reference:**
- **Function:** `askAuth(): Promise<AskAuthResult>`
- **Module:** `src/api/contacts/askAuth.ts`
- **Bridge:** `window.WindVane.call("WVContacts", "askAuth", {}, ...)`
- **Platform:** iOS only

**Return Type:**
```typescript
interface AskAuthResult {
  isAuthed: number; // 1 = authorized, 0 = not authorized
}
```

**Sample Code:**
```typescript
import { askAuth } from './api/contacts/askAuth';

async function requestContactsAccess() {
  try {
    const result = await askAuth();

    if (result.isAuthed === 1) {
      console.log('Contacts permission granted');
      // Proceed to access contacts
      loadContacts();
      return true;
    } else {
      console.log('Contacts permission denied');
      // Show explanation to user
      showPermissionDeniedDialog();
      return false;
    }
  } catch (error) {
    console.error('Failed to request contacts permission:', error);
    return false;
  }
}
```

### 2.2 Check Contacts Authorization Status - `authStatus()` (iOS only)

Check the detailed authorization status for contacts on iOS.

**API Reference:**
- **Function:** `authStatus(): Promise<AuthStatusResult>`
- **Module:** `src/api/contacts/authStatus.ts`
- **Bridge:** `window.WindVane.call("WVContacts", "authStatus", {}, ...)`
- **Platform:** iOS only

**Return Type:**
```typescript
interface AuthStatusResult {
  isAuthed: boolean;
  status: number; // iOS authorization status code
}
```

**iOS Status Codes:**
- `0` - Not Determined (user hasn't been asked yet)
- `1` - Restricted (access restricted by parental controls or policies)
- `2` - Denied (user explicitly denied access)
- `3` - Authorized (user granted access)

**Sample Code:**
```typescript
import { authStatus } from './api/contacts/authStatus';

async function checkContactsStatus() {
  try {
    const result = await authStatus();

    const statusMessages = {
      0: 'Not Determined - Permission not requested yet',
      1: 'Restricted - Access restricted by device policies',
      2: 'Denied - User denied permission',
      3: 'Authorized - Full access granted'
    };

    console.log('Contacts authorization:', statusMessages[result.status]);
    console.log('Is authorized:', result.isAuthed);

    switch (result.status) {
      case 0: // Not Determined
        // This is the first time, request permission
        await askAuth();
        break;
      case 1: // Restricted
        // Show message about device restrictions
        showRestrictedMessage();
        break;
      case 2: // Denied
        // Explain why permission is needed and guide to settings
        showDeniedMessage();
        break;
      case 3: // Authorized
        // Proceed with contacts operations
        loadAllContacts();
        break;
    }
  } catch (error) {
    console.error('Failed to check contacts status:', error);
  }
}
```

**Complete Permission Flow:**
```typescript
import { authStatus } from './api/contacts/authStatus';
import { askAuth } from './api/contacts/askAuth';

async function ensureContactsPermission(): Promise<boolean> {
  try {
    // Step 1: Check current authorization status
    const status = await authStatus();

    if (status.isAuthed && status.status === 3) {
      // Already authorized
      return true;
    }

    if (status.status === 0) {
      // Not determined, request permission
      const authResult = await askAuth();
      return authResult.isAuthed === 1;
    }

    if (status.status === 2) {
      // Denied - need to guide user to settings
      showSettingsPrompt('Contacts access is required. Please enable in Settings.');
      return false;
    }

    if (status.status === 1) {
      // Restricted - cannot grant permission
      showErrorMessage('Contacts access is restricted on this device.');
      return false;
    }

    return false;
  } catch (error) {
    console.error('Permission check failed:', error);
    return false;
  }
}

// Usage
async function viewContacts() {
  const hasPermission = await ensureContactsPermission();

  if (hasPermission) {
    // Proceed with contacts operations
    const contacts = await getAllContacts();
    displayContacts(contacts);
  }
}
```

---

## 3. Get Contact API

The contacts API provides methods to access, search, and manage device contacts.

### 3.1 Open Contact Picker - `choose()`

Open the native contact picker to let the user select a contact.

**API Reference:**
- **Function:** `choose(): Promise<ChooseContactResult>`
- **Module:** `src/api/contacts/choose.ts`
- **Bridge:** `window.WindVane.call("WVContacts", "choose", {}, ...)`

**Return Type:**
```typescript
interface ChooseContactResult {
  name: string;
  phone: string;
}
```

**Sample Code:**
```typescript
import { choose } from './api/contacts/choose';

async function selectContact() {
  try {
    const contact = await choose();

    console.log('Selected contact:', contact.name);
    console.log('Phone number:', contact.phone);

    // Use the selected contact
    sendMessageToContact(contact.phone, `Hello ${contact.name}!`);

    return contact;
  } catch (error) {
    console.error('Failed to choose contact:', error);
    return null;
  }
}

// Example: Fill form with selected contact
async function fillRecipientForm() {
  const contact = await choose();

  if (contact) {
    document.getElementById('recipientName').value = contact.name;
    document.getElementById('recipientPhone').value = contact.phone;
  }
}
```

### 3.2 Search Contacts - `find()`

Search for contacts by name or phone number.

**API Reference:**
- **Function:** `find(params: FindContactsParams): Promise<FindContactsResult>`
- **Module:** `src/api/contacts/find.ts`
- **Bridge:** `window.WindVane.call("WVContacts", "find", params, ...)`

**Parameters:**
```typescript
interface FindContactsParams {
  filter: {
    name?: string;    // Search by name (partial match)
    phone?: string;   // Search by phone number (partial match)
  };
}
```

**Return Type:**
```typescript
interface FindContactsResult {
  contacts: Array<{
    name: string;
    phone: string;
  }>;
}
```

**Sample Code:**
```typescript
import { find } from './api/contacts/find';

// Search by name
async function searchContactsByName(searchTerm: string) {
  try {
    const result = await find({
      filter: { name: searchTerm }
    });

    console.log(`Found ${result.contacts.length} contacts`);

    result.contacts.forEach(contact => {
      console.log(`${contact.name}: ${contact.phone}`);
    });

    return result.contacts;
  } catch (error) {
    console.error('Failed to search contacts:', error);
    return [];
  }
}

// Search by phone number
async function searchContactsByPhone(phoneNumber: string) {
  try {
    const result = await find({
      filter: { phone: phoneNumber }
    });

    if (result.contacts.length > 0) {
      console.log('Contact found:', result.contacts[0].name);
      return result.contacts[0];
    } else {
      console.log('No contact found with this phone number');
      return null;
    }
  } catch (error) {
    console.error('Failed to search contacts:', error);
    return null;
  }
}

// Search by both name and phone
async function searchContacts(name?: string, phone?: string) {
  try {
    const filter: any = {};
    if (name) filter.name = name;
    if (phone) filter.phone = phone;

    const result = await find({ filter });
    return result.contacts;
  } catch (error) {
    console.error('Failed to search contacts:', error);
    return [];
  }
}

// Example: Autocomplete feature
async function autocompleteContact(input: string) {
  // Try searching by name first
  let contacts = await searchContactsByName(input);

  // If no results, try searching by phone
  if (contacts.length === 0 && /^\d+$/.test(input)) {
    contacts = await searchContactsByPhone(input);
  }

  return contacts;
}
```

### 3.3 Add Contact - `addPhoneContact()`

Add a new contact to the device contacts.

**API Reference:**
- **Function:** `addPhoneContact(params: AddPhoneContactParams): Promise<void>`
- **Module:** `src/api/contacts/addPhoneContact.ts`
- **Bridge:** `window.WindVane.call("WVContacts", "addPhoneContact", params, ...)`

**Parameters:**
```typescript
interface AddPhoneContactParams {
  lastName: string;           // Required
  firstName: string;          // Required
  middleName?: string;        // Optional
  nickName?: string;          // Optional
  remark?: string;            // Optional
  mobilePhoneNumber?: string; // Optional
  hostNumber?: string;        // Optional (home/office number)
  address?: string;           // Optional
  email?: string;             // Optional
  organization?: string;      // Optional (company name)
  title?: string;             // Optional (job title)
  photoPath?: string;         // Optional (path to contact photo)
}
```

**Return Type:**
```typescript
Promise<void> // Returns void on success, throws error on failure
```

**Sample Code:**
```typescript
import { addPhoneContact } from './api/contacts/addPhoneContact';

// Add a simple contact
async function addSimpleContact(firstName: string, lastName: string, phone: string) {
  try {
    await addPhoneContact({
      firstName,
      lastName,
      mobilePhoneNumber: phone
    });

    console.log('Contact added successfully');
    showSuccessMessage(`${firstName} ${lastName} added to contacts`);
  } catch (error) {
    console.error('Failed to add contact:', error);
    showErrorMessage('Failed to add contact');
  }
}

// Add a complete contact with all details
async function addCompleteContact() {
  try {
    await addPhoneContact({
      firstName: 'John',
      lastName: 'Doe',
      middleName: 'Michael',
      nickName: 'Johnny',
      remark: 'Met at conference 2024',
      mobilePhoneNumber: '+84123456789',
      hostNumber: '+842412345678',
      address: '123 Main Street, Hanoi, Vietnam',
      email: 'john.doe@example.com',
      organization: 'Acme Corporation',
      title: 'Senior Developer',
      photoPath: '/path/to/photo.jpg'
    });

    console.log('Complete contact added successfully');
  } catch (error) {
    console.error('Failed to add contact:', error);
  }
}

// Add contact from form data
async function addContactFromForm(formData: any) {
  try {
    await addPhoneContact({
      firstName: formData.firstName,
      lastName: formData.lastName,
      mobilePhoneNumber: formData.phone,
      email: formData.email,
      organization: formData.company,
      title: formData.jobTitle,
      address: formData.address
    });

    return true;
  } catch (error) {
    console.error('Failed to add contact:', error);
    return false;
  }
}
```

### 3.4 Complete Workflow Example

Here's a complete example showing permission checks and contact operations:

```typescript
import { getSetting } from './api/permissions/getSetting';
import { authorize } from './api/permissions/authorize';
import { authStatus, askAuth } from './api/contacts';
import { choose, find, addPhoneContact } from './api/contacts';

class ContactsManager {
  // Ensure all necessary permissions
  async ensurePermissions(): Promise<boolean> {
    try {
      // Check general contacts permission
      const settings = await getSetting();

      if (!settings.authSetting?.contacts) {
        // Request general contacts permission
        const authResult = await authorize('contacts');
        if (!authResult?.successScope?.['contacts']) {
          console.log('General contacts permission denied');
          return false;
        }
      }

      // For iOS, check detailed authorization status
      if (window.navigator.platform.includes('iOS')) {
        const status = await authStatus();

        if (!status.isAuthed) {
          // Request iOS-specific permission
          const iosAuthResult = await askAuth();
          if (iosAuthResult.isAuthed !== 1) {
            console.log('iOS contacts permission denied');
            return false;
          }
        }
      }

      return true;
    } catch (error) {
      console.error('Permission check failed:', error);
      return false;
    }
  }

  // Select and use a contact
  async selectAndUseContact() {
    if (!(await this.ensurePermissions())) {
      return null;
    }

    try {
      const contact = await choose();
      console.log('Selected contact:', contact);
      return contact;
    } catch (error) {
      console.error('Failed to select contact:', error);
      return null;
    }
  }

  // Search for contacts
  async searchContacts(searchTerm: string) {
    if (!(await this.ensurePermissions())) {
      return [];
    }

    try {
      const result = await find({
        filter: { name: searchTerm }
      });
      return result.contacts;
    } catch (error) {
      console.error('Failed to search contacts:', error);
      return [];
    }
  }

  // Add a new contact
  async addNewContact(contactData: {
    firstName: string;
    lastName: string;
    phone: string;
    email?: string;
    company?: string;
  }) {
    if (!(await this.ensurePermissions())) {
      return false;
    }

    try {
      await addPhoneContact({
        firstName: contactData.firstName,
        lastName: contactData.lastName,
        mobilePhoneNumber: contactData.phone,
        email: contactData.email,
        organization: contactData.company
      });

      console.log('Contact added successfully');
      return true;
    } catch (error) {
      console.error('Failed to add contact:', error);
      return false;
    }
  }
}

// Usage
const contactsManager = new ContactsManager();

// Example 1: Pick a contact
async function pickContact() {
  const contact = await contactsManager.selectAndUseContact();
  if (contact) {
    console.log(`Selected: ${contact.name} (${contact.phone})`);
  }
}

// Example 2: Search contacts
async function searchForJohn() {
  const contacts = await contactsManager.searchContacts('John');
  console.log(`Found ${contacts.length} contacts named John`);
}

// Example 3: Add a contact
async function addContact() {
  const success = await contactsManager.addNewContact({
    firstName: 'Jane',
    lastName: 'Smith',
    phone: '+84987654321',
    email: 'jane.smith@example.com',
    company: 'Tech Corp'
  });

  if (success) {
    console.log('Contact added!');
  }
}
```

---

## 4. Error Handling

All APIs use consistent error handling patterns:

```typescript
// Error handling pattern
async function safeApiCall() {
  try {
    // Check if WindVane is available
    if (!window.WindVane) {
      throw new Error('WindVane is not available');
    }

    // Make API call
    const result = await someApi();
    return result;
  } catch (error) {
    console.error('API call failed:', error);

    // Show user-friendly error message
    if (error.message.includes('WindVane')) {
      showError('Platform not supported');
    } else if (error.message.includes('permission')) {
      showError('Permission denied');
    } else {
      showError('Operation failed');
    }

    return null;
  }
}
```

---

## 5. Best Practices

### 5.1 Permission Request Timing
- Always check current permission status before requesting
- Request permissions at the point of use (not on app startup)
- Explain why you need the permission before requesting

### 5.2 Error Handling
- Always wrap API calls in try-catch blocks
- Check for WindVane availability before making calls
- Provide user-friendly error messages

### 5.3 Platform-Specific APIs
- Check platform before using iOS-specific APIs (authStatus, askAuth)
- Provide fallback behavior for unsupported platforms

### 5.4 User Experience
- Use the native contact picker (choose()) for better UX
- Implement search with debouncing to avoid excessive calls
- Cache permission status to reduce redundant checks

### 5.5 Performance
- Don't request all permissions at once
- Only request permissions you actually need
- Cache contacts data when appropriate

---

## 6. Reference Links

### Source Files
- Device Permissions: [src/api/permissions/](../src/api/permissions/)
- Contacts API: [src/api/contacts/](../src/api/contacts/)
- Example Implementation: [src/pages/contacts/Page.tsx](../src/pages/contacts/Page.tsx)

### Documentation
- Permissions README: [src/api/permissions/README.md](../src/api/permissions/README.md)
- Contacts README: [src/api/contacts/README.md](../src/api/contacts/README.md)

---

## 7. Quick Reference

### Device Permissions
```typescript
// Check all permissions
const settings = await getSetting();

// Request specific permission
const result = await authorize('camera');
```

### Contacts Permissions (iOS)
```typescript
// Check status
const status = await authStatus();

// Request permission
const auth = await askAuth();
```

### Contacts Operations
```typescript
// Pick contact
const contact = await choose();

// Search contacts
const results = await find({ filter: { name: 'John' } });

// Add contact
await addPhoneContact({ firstName: 'John', lastName: 'Doe', mobilePhoneNumber: '+84123456789' });
```

---

*Last updated: 2025-12-25*
