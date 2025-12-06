# Holidaze 🌍

![Holidaze logo ](./public/img/logo.png)
## Description ✏️

- Holidaze is a web application developed as part of Project Exam 2 at Noroff.  
- The app allows users to register with an email address ending in `stud.noroff.no`. During registration, users can choose to be either a **Venue Manager (admin)** or a regular user.  

### Features for all visitors
- All visitors can view the **home page** and **Explore Page**, where they can search for available venues.  
- Visitors can click into each venue to see more information and browse the image carousel.  
- Note: You must be logged in to book a room.  

### Features for regular users
- Regular users can log in, book rooms, and see their **upcoming bookings** on their private page. Here, users can also customize their page by choosing a banner and avatar.  
- When booking a room, users must select the number of guests and the date, using a calendar that shows which days are booked and which are available. This feature is implemented using React's Datepicker component.  

### Features for Venue Managers (admin)
- Venue Manager users can create, edit, and delete their own venues on their admin page. Admins can also customize their page by selecting a banner and avatar of their choice.  

⚠️ Note: This is just a project for an exam, so the room bookings are not real. Even if it looks like you booked a room for the FIFA World Cup in the USA for 1 dollar, we’re afraid your dream remains digital! 😅

## Technologies 🛠️
- Next.js
- React
- TypeScript
- Tailwind CSS
- Vercel (for deployment) 🚀 – [Live Demo](https://project-exam-2-lemon.vercel.app/)

## 🚀 Getting Started

### Clone the repository
```bash
git clone https://github.com/Andlie94/Project_Exam_2.git
cd Project_Exam_2 
```

Install dependencies:
```bash
npm install
```

### Run Web Aplication 

```bash
npm run dev
```
The app should now be running at http://localhost:3000.
```bash
npm run build
```
then 
```bash
npm start
```

### Set up environment variables 🔑
- Create a `.env` file in the root of the project.  
- Add the required variables as shown in `.env.example` (e.g., API keys, database URLs, etc.).  
- You can get the necessary API keys and credentials from Noroff’s student portal if needed.
  
   💍 Remember: one `.env` to rule them all, one `.env` to find them,  
  one `.env` to bring them all and in the project bind them. 🧙‍♂️

### Folder structure

```
Project_Exam_2/
├── app/
│   ├── admin/
│   │   └── page.tsx
│   ├── explore/
│   │   └── page.tsx
│   ├── individual/
│   │   └── [id]/
│   │       └── page.tsx
│   ├── login/
│   │   └── page.tsx
│   ├── signup/
│   │   └── page.tsx
│   └── user/
│       └── page.tsx
├── components/
│   ├── calender.tsx
│   ├── footer.tsx
│   ├── header.tsx
│   ├── searchfunction.tsx
│   ├── settings.tsx
│   ├── admin/
│   │   ├── adminContent.tsx
│   │   ├── forms.tsx
│   │   ├── layout.tsx
│   │   ├── upcoming.tsx
│   │   └── UserVenue.tsx
│   ├── expolrepage/
│   │   ├── exploreContent.tsx
│   │   ├── herosection.tsx
│   │   └── productsection.tsx
│   ├── individualpage/
│   │   ├── bookingsection.tsx
│   │   ├── imagesection.tsx
│   │   ├── individualContent.tsx
│   │   └── infosection.tsx
│   ├── ladningpage/
│   │   ├── herosection.tsx
│   │   ├── InfocardSection.tsx
│   │   ├── kvote.tsx
│   │   └── productcardsection.tsx
│   ├── login/
│   │   └── loginContent.tsx
│   ├── meta_data/
│   │   └── metadata.tsx
│   ├── signUp/
│   │   └── signUpContent.tsx
│   ├── ui/
│   │   ├── button.tsx
│   │   ├── card.tsx
│   │   ├── input.tsx
│   │   ├── loading.tsx
│   │   └── message.tsx
│   └── user/
│       ├── accountInformation.tsx
│       ├── bookings.tsx
│       └── userContent.tsx
├── lib/
│   └── api/
│       ├── auth.tsx
│       ├── config.tsx
│       ├── product.tsx
│       ├── profile.tsx
│       └── venues.tsx
├── public/
│   └── img/
│       └── logo.png
├── eslint.config.mjs
├── next-env.d.ts
├── next.config.ts
├── package.json
├── postcss.config.mjs
├── README.md
└── tsconfig.json
```

## Contributing 🍻
Contributions are welcome! Please open an issue or submit a pull request. 💻

## Contact 📨
For questions or support, contact: andlie02174@stud.noroff.no
