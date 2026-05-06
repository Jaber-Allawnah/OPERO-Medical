# OPERO-Medical

A cross-platform mobile application for connecting patients with doctors. Built with Expo (React Native) and Firebase.

---

## Tech Stack

| Layer | Technology |
|---|---|
| Framework | Expo SDK 54 + React Native 0.81 |
| Navigation | Expo Router v6 (file-based) |
| Backend / Auth | Firebase v12 (Firestore + Auth) |
| Server State | TanStack React Query v5 |
| Forms | React Hook Form v7 |
| Local Storage | AsyncStorage + Expo SecureStore |
| Offline Storage | Expo SQLite v16 |
| Image Upload | Expo Camera + Cloudinary |
| Biometrics | Expo Local Authentication |
| Styling | StyleSheet + `react-native-responsive-screen` + `react-native-responsive-fontsize` |

---

## Project Structure

```
app/
  _layout.tsx                  ← Root Stack (QueryClientProvider)
  index.tsx                    ← Login screen (email/password + Face ID)
  edit-profile.tsx             ← Edit profile screen (root level)
  (auth)/
    _layout.tsx
    signup.tsx
    forgot-password.tsx
  (app)/
    _layout.tsx                ← Tab navigator (role-based tabs)
    doctors/
      index.tsx                ← Doctors list (online/offline)
      [id].tsx                 ← Single doctor details + booking
    appointments/
      index.tsx                ← Appointments list (role-based view)
    profile.tsx                ← Profile tab
    payment/
      index.tsx                ← Payment screen

services/
  firebase.ts                  ← Firebase app init (env vars)
  auth.service.ts              ← login, register, logout, resetPassword
  user.service.ts              ← getMe, getCachedUser, updateUserProfile, updateProfilePicture, waitForUser
  doctors.service.ts           ← getAllDoctors, getDoctorById, updateDoctorProfile, removeSlotFromDoctor, incrementDoctorCases
  appointments.service.ts      ← bookAppointment, getMyAppointments, cancelAppointment, processPayment
  cloudinary.service.ts        ← uploadToCloudinary
  storage.service.ts           ← AsyncStorage + SecureStore helpers

components/
  ui/
    ActionButton.tsx
    BackButton.tsx
    FormInput.tsx
    FormScreenLayout.tsx
    UserAvatar.tsx
    MenuItem.tsx
  doctors/
    DoctorCard.tsx
    DoctorAbout.tsx
    DoctorAvailability.tsx
    SlotRow.tsx
    StatCard.tsx
  appointments/
    AppointmentCard.tsx
  profile/
    CommonFields.tsx
    PatientFields.tsx
    DoctorFields.tsx

hooks/
  useAuthMutation.ts
  useCurrentUser.ts            ← useFocusEffect-based, refreshes on screen focus
  useEditProfile.ts

constants/
  theme.ts                     ← Colors, Spacing

__tests__/
  ActionButton.test.tsx        ← Jest unit test
```

---

## Environment Variables

Create a `.env` file in the project root (never commit this):

```
EXPO_PUBLIC_FIREBASE_API_KEY=
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=
EXPO_PUBLIC_FIREBASE_PROJECT_ID=
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=
EXPO_PUBLIC_FIREBASE_APP_ID=
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=
```

---

## Firebase Collections

### `users/{uid}`
```
name: string
email: string
phone: string
role: "patient" | "doctor"
profilePicture: string
weight: string          (patient only)
bloodGroup: string      (patient only)
height: string          (patient only)
```

### `doctors/{uid}`
```
specialty: string
bio: string
experience: number
price: number
cases: number
availableSlots: string[]    ← e.g. ["09:00 AM", "11:00 AM"]
```

### `appointments/{id}`
```
patientId: string
patientName: string
patientPhoto: string
doctorId: string
doctorName: string
doctorPhoto: string
date: string
time: string
amount: string
status: "confirmed"
createdAt: Timestamp
```

---

## Features

### Authentication
- Email/password login and registration
- Role selection on signup: **Patient** or **Doctor**
- Doctor specialty picker on signup
- Forgot password (Firebase email reset)
- **Face ID / Fingerprint login** — appears automatically after first login; uses `expo-local-authentication`

### Role-Based Navigation
- Doctors are routed directly to Appointments on login — they never see the Doctors list
- Tab bar hides the Doctors tab for doctor accounts
- Loading spinner shown while user role is being determined (prevents flash)

### Doctors List (Patients only)
- Fetches from Firestore via React Query (refetches every 10 seconds)
- Search by name + filter by specialty
- **Offline-first**: uses Expo SQLite with 3 seeded doctors when no internet connection
- Offline banner shown when in offline mode

### Doctor Details & Booking
- Shows stats (cases, experience, price), bio, and available time slots
- Patient selects a slot → saved to AsyncStorage → navigates to payment

### Payment
- Card holder name, card number, expiry date, CVV (max 3 digits)
- On success: books appointment in Firestore, removes selected slot from doctor, increments doctor's case count, invalidates React Query cache

### Appointments
- Patients see their upcoming appointments with doctor photo and details
- Doctors see their incoming appointments with patient photo and details
- Refreshes on screen focus via `useFocusEffect`

### Profile & Edit Profile
- View name, email, profile picture
- Edit name, email, phone (all roles)
- Patient fields: weight, blood group, height
- Doctor fields: specialty, bio, experience, price, available slots (add/remove)
- **Camera**: tap "Change Avatar" to open camera, take photo, upload to Cloudinary, update Firestore and cache
- Profile picture refreshes across all screens immediately after update

### Logout
- Signs out from Firebase
- Clears token from SecureStore
- Clears cached user from AsyncStorage
- `biometricEnabled` flag is kept so Face ID button reappears on next visit

---

## Navigation Architecture

```
Root Stack (_layout.tsx)
├── index                        ← Login screen
├── (auth) Group
│   ├── signup
│   └── forgot-password
├── (app) Tab Navigator
│   ├── doctors/
│   │   ├── index              (doctors list — patients only)
│   │   └── [id]              (doctor details + booking)
│   ├── appointments/index
│   └── profile
└── edit-profile               (root level — pushed over tabs, no tab bar)
```

---

## Coding Rules

- `wp()` / `hp()` — widths and heights only
- `RFValue()` — font sizes only
- `Spacing.*` constants — all margins, padding, borderRadius
- `useForm<any>()` — avoids strict inference errors on conditional fields
- `useCallback` only on functions passed as component props (e.g. `onPress`)
- All Firestore/Auth calls live in service files — screens only call service functions
- No comments in code unless the reason is non-obvious

---

## Setup & Running the App

### Prerequisites
- [Node.js](https://nodejs.org/) v18 or higher
- [Expo Go](https://expo.dev/go) app installed on your phone (iOS or Android)
- A Firebase project with Firestore and Authentication enabled
- A Cloudinary account with an unsigned upload preset

### 1. Clone the repository
```bash
git clone <your-repo-url>
cd OPERO-Medical
```

### 2. Install dependencies
```bash
npm install --legacy-peer-deps
```

### 3. Create the environment file
Create a `.env` file in the project root and fill in your credentials:
```
EXPO_PUBLIC_FIREBASE_API_KEY=your_api_key
EXPO_PUBLIC_FIREBASE_AUTH_DOMAIN=your_auth_domain
EXPO_PUBLIC_FIREBASE_PROJECT_ID=your_project_id
EXPO_PUBLIC_FIREBASE_STORAGE_BUCKET=your_storage_bucket
EXPO_PUBLIC_FIREBASE_MESSAGING_SENDER_ID=your_messaging_sender_id
EXPO_PUBLIC_FIREBASE_APP_ID=your_app_id
EXPO_PUBLIC_CLOUDINARY_CLOUD_NAME=your_cloud_name
EXPO_PUBLIC_CLOUDINARY_UPLOAD_PRESET=your_unsigned_preset_name
```

### 4. Start the development server
```bash
npx expo start
```

### 5. Open on your device
- Scan the QR code with the **Expo Go** app (Android) or the **Camera app** (iOS)
- Make sure your phone and computer are on the **same WiFi network**

---

## Scripts

```bash
npm start          # start dev server
npm run android    # run on Android emulator
npm run ios        # run on iOS simulator
npm run lint       # ESLint
npm test           # Jest unit tests
```

---

## Known Limitations

- **Face ID on Expo Go**: Face ID does not work in Expo Go on iPhone due to missing `NSFaceIDUsageDescription` permission (requires a custom build). The passcode fallback works and confirms the logic is correct.
- **Offline testing on Expo Go**: Cannot cut network while using Expo Go since it needs WiFi for the Metro bundler. Offline mode works correctly in a standalone/development build.
- **Firebase Security Rules**: Not configured — must be set before production deployment.
