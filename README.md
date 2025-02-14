# Trello Clone

A React-based project management application inspired by Trello, featuring drag-and-drop task management, user authentication, and responsive design.

## Features

- **User Authentication**
  - Register new account
  - Login with existing account
  - Secure session management
  - Logout functionality

- **Project Management**
  - View all projects in a responsive grid layout
  - Project cards with cover images
  - Pagination for project list
  - Project details view

- **Task Management**
  - Four-column Kanban board (Backlog, Ready, In Progress, Done)
  - Drag and drop tasks between columns
  - Task details popup
  - Task status tracking

- **Responsive Design**
  - Mobile-friendly interface
  - Adaptive layout for different screen sizes
  - Touch-friendly interactions

## Technologies Used

- React 18
- React Router v6
- @hello-pangea/dnd (Drag and Drop)
- Local Storage for data persistence
- CSS3 with Flexbox and Grid
- Responsive Design

## Getting Started

### Prerequisites

- Node.js (version 14 or higher)
- npm (Node Package Manager)

### Installation

1. Clone the repository
```bash
git clone https://github.com/yourusername/trello-clone.git

2. Navigate to project directory
cd trello-clone

3. Install dependencies
npm install

4. Start the development server
npm start

5. Open http://localhost:3000 to view it in your browser

### Usage
1.Register a new account or login with existing credentials
2.View and manage projects from the dashboard
3.Click on a project to view its task board
4.Drag and drop tasks between different status columns
5.Click on a task to view its details

Project Structure : 

trello-clone/
├── src/
│   ├── components/
│   │   ├── auth/         # Authentication components
│   │   ├── common/       # Shared components
│   │   ├── dashboard/    # Dashboard view
│   │   └── project/      # Project management
│   ├── context/         # React Context
│   ├── styles/         # CSS styles
│   └── utils/          # Utility functions
└── public/            # Static files

Key Features Implementation
Authentication
Local storage based user management
Protected routes
Session persistence
Project Management
Project creation and listing
Cover image management
Pagination for better performance
Task Management
Drag and drop interface
Real-time status updates
Task details modal
Responsive task cards
Contributing
Fork the repository
Create your feature branch (git checkout -b feature/AmazingFeature)
Commit your changes (git commit -m 'Add some AmazingFeature')
Push to the branch (git push origin feature/AmazingFeature)
Open a Pull Request
License
This project is licensed under the MIT License - see the LICENSE.md file for details

Acknowledgments
Inspired by Trello's interface and functionality
Built with React and modern web technologies
Uses @hello-pangea/dnd for drag and drop functionality

