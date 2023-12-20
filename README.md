![pwa-crew](https://github.com/hadamalush/pwa-crew-site/assets/59387147/cdb0f7c6-79aa-45dc-abfc-d9d3e1a00b9f)

# Events Network - Pwa Crew

## [Live](https://pwa-crew-site-demo.vercel.app/) 🌍

## Overview ✍️

Events Network application dedicated to event management. In the application we can register. After logging in we can perform CRUD operations - add , edit, delete events. By default, the user has a default avatar set. We can change it in the settings, we can track notifications , if someone adds, deletes or edits an event in the user's profile. For uploading events we have implemented 3 cloud drives - in the admin panel we can choose.

## Technologies used 🚀

- **Formik**
- **Redux**
- **Redux-toolkit**
- **Mongoose**
- **Mongodb**
- **Nodemailer**
- **NextAuth**
- **React-responsive**
- **React-toastify**
- **Sharp**
- **Megajs**
- **Cloudinary**
- **Megajs**
- **and more...**

**Styled with scss modules**

## Endpoints 🛤️

**Users**

- 📤 **POST /api/auth/registration**: Register a new user
- 📤 **POST /api/auth/nextauth**: Login an existing user
- 📤 **POST /api/auth/resetPassword**: Reset the password
- 🔧 **PATCH /api/editSettings**: Edit avatar , username or email address
- 📥 **GET /api/getNotifications**: Get all notifications of the logged-in user
- 📥 **GET /api/getStatusNotifications**: Get the number of all unread notifications
- 🔧 **PATCH /api/editStatusNotifications**: Change notifications to read

**Events**

- ❌ **DELETE /api/deleteEvent**: Delete an event
- 🔧 **PATCH /api/editEvent**: Edit an event
- 📤 **POST /api/addEvent**: Create an event
- 📥 **GET /api/event**: Get an event
- 📥 **GET /api/events**: Get all events

**Upload pictures**

- 📤 **POST /api/upload/cloudinary**: Upload image to cloudinary
- 📤 **POST /api/upload/mega**: Upload image to mega.nz
- 📤 **POST /api/upload/vercelBlob**: Upload image to vercel

**Messages**

- 📤 **POST /api/sendMessage**: Send email message

**Language** Changing the language is handled with internationalization in nextjs ( pl/en )

**Protection** 🔒 Endpoints ,such as password reset, sending messages are protected on address ip.
