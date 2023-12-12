Introducing you [PHP-Hospital](https://php-hospital-dev.vercel.app/).

A Hospital website with management dashboard which is a [Next.js](https://nextjs.org/) + [MySQL](https://www.mysql.com/) practice project. I have learned both NextJs and SQL using MySQL doing this project.

## Technologies, Component Libraries and Packeges I have used:
1. NextJs (ReactJS fullstack framework)
2. [NodeJS](https://nodejs.org/en) (For backend)
3. [DaisyUI](https://daisyui.com/) (For Frontend Design)
4. [NextAuth.js](https://next-auth.js.org/) (For Authentication and Authorization)
5. [Nodemailer](https://nodemailer.com/)
6. [SSLCommerz](https://sslcommerz.com/) (For Payment)
7. [jsPDF](http://raw.githack.com/MrRio/jsPDF/master/docs/index.html) (To create invoices)

## Things I have learned through this project:
1. Server Side Rendering (SSR) & Client Side Rendering (CSR).
2. NextJS fullstack facility at one platform.
3. Role Based Authorization
4. Content Mangement System. Content Management by the authorized roles.
5. Invoice, PDF Generation
6. Image management through Cloudinary
7. Vercel Deployment
8. Database Hosting

## Challenges I have faced during this project:
1. Implementing nextJS api method.
2. Invoices, PDFs generation.
3. MySQL database hosting.

## Features
1. User Registration
2. Role based authorization
3. Appointment Booking
4. Doctor Registration
5. Registration for vaccination
6. Delete User
7. Update Role
9. Lab Test Registration
10. Lab Report Upload
11. Presription By Doctor

## Roles in the project:
1. Super Admin
2. Admin
3. Receptionist
4. Lab Attendant
5. Doctor
6. User

## Description
This practise projects shows up a Hospital with management system. There are 6 roles and their accesses are distributed according to their Role Priority. 
-> A Super Admin has the power to add Doctors in the system, delete doctor, Approve or Promoting user to other roles, delete users, see appointments status, update vaccine status, register lab tests of an user.
-> An Admin has all the accesses of Super Admin despite updating Vaccine status and Lab Test Registration.
-> A Receptionist can register lab tests for users and provides invoice of registration.
-> A Lab Attendant can Update Vaccine Status, Upload Lab Reports.
-> A Doctor can check Appointments and Upload Prescriptions for patients.
-> A general user has no access to the Dashboard or Management System, he or she can only take facility of Taking Appointments of Doctors, Vaccine Registration, Profile Editing, Reviewing. Moreover a general user can find his/her documents (Prescriptions and Lab Reports) in profile section.

In Doctor registering section, after completing Doctor's registration system sends an email with credential to the email(Valid Email) with which Super Admin or Admin registered the doctor.
While registering a user the system sends OTP to verify the user.
An user may not register in the system but can take appointment of doctors, vaccine registration, find it's documents in 'Find Your Things'. But to keep track of user's documents I prefer to register as an user into the system.

## Deployment
I have deployed my project into [Vercel](https://vercel.com/) and hosted database into [Aviens](https://aiven.io/) for free plan. This platform needs no card requirements.