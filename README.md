<div align="center">

<h1>🎬 Movie Explorer</h1>

<p>
  A responsive movie and TV show discovery web application built with
  <strong>React.js</strong> and the <strong>TVMaze API</strong>.
</p>

<p>
  <a href="https://minar-movie-explorer.vercel.app/">🌐 Live Demo</a>
  &nbsp; • &nbsp;
  <a href="https://github.com/minar-hossain82/movie-explorer">💻 GitHub</a>
</p>

</div>

<hr>

<h2>📖 About</h2>

<p>
  Movie Explorer is a responsive web application for discovering movies and TV shows.
  Users can browse shows, search by title, load more results, and view detailed
  information about individual shows.
</p>

<p>
  The application is built with React.js and uses the free TVMaze REST API
  to retrieve movie and TV show information.
</p>

<h2>✨ Features</h2>

<ul>
  <li>🎬 Browse movies and TV shows</li>
  <li>🔎 Search by movie or TV show title</li>
  <li>⏱️ 400ms debounced search</li>
  <li>📄 Load More pagination</li>
  <li>🖼️ Show posters with fallback images</li>
  <li>⭐ Display ratings</li>
  <li>📅 Display premiere dates</li>
  <li>📋 Detailed information modal</li>
  <li>🎭 Display genres and additional information</li>
  <li>⌨️ Close modal with the Escape key</li>
  <li>🖱️ Close modal with the close button or overlay</li>
  <li>♿ Accessible modal with keyboard focus management</li>
  <li>📱 Fully responsive design</li>
  <li>⏳ Loading states</li>
  <li>⚠️ Error handling</li>
  <li>🔍 Empty search result handling</li>
  <li>🔗 Official website links when available</li>
  <li>🧩 Reusable React components</li>
</ul>

<h2>🛠️ Tech Stack</h2>

<ul>
  <li>React.js</li>
  <li>JavaScript (ES6+)</li>
  <li>Vite</li>
  <li>Tailwind CSS</li>
  <li>React Router DOM</li>
  <li>React Icons</li>
  <li>Fetch API</li>
  <li>TVMaze REST API</li>
  <li>Git & GitHub</li>
  <li>Vercel</li>
</ul>

<h2>📡 API</h2>

<p>
  This project uses the free
  <a href="https://www.tvmaze.com/api">TVMaze API</a>.
</p>

<h3>Endpoints Used</h3>

<pre>
GET https://api.tvmaze.com/shows

GET https://api.tvmaze.com/search/shows?q=:query

GET https://api.tvmaze.com/shows/:id
</pre>

<h2>📂 Project Structure</h2>

<pre>
movie-explorer/
│
├── public/
│
├── src/
│   ├── assets/
│   │   └── images/
│   │
│   ├── components/
│   │   ├── layout/
│   │   │   ├── Navbar.jsx
│   │   │   └── Footer.jsx
│   │   │
│   │   └── movies/
│   │       ├── MovieCard.jsx
│   │       └── MovieModal.jsx
│   │
│   ├── pages/
│   │   ├── HomePage.jsx
│   │   └── MoviesPage.jsx
│   │
│   ├── services/
│   │   └── tvmaze.js
│   │
│   ├── utils/
│   │   └── date.js
│   │
│   ├── App.jsx
│   ├── main.jsx
│   └── index.css
│
├── .gitignore
├── index.html
├── package-lock.json
├── package.json
├── README.md
└── vite.config.js
</pre>

<h2>🏠 Pages</h2>

<h3>Home Page</h3>

<ul>
  <li>Responsive navigation bar</li>
  <li>Movie Explorer branding</li>
  <li>Hero section</li>
  <li>Movie-related content</li>
  <li>Call-to-action button</li>
  <li>Footer</li>
</ul>

<h3>Movies Page</h3>

<ul>
  <li>Search functionality</li>
  <li>Responsive movie/show grid</li>
  <li>Reusable movie cards</li>
  <li>Ratings</li>
  <li>Premiere dates</li>
  <li>Load More functionality</li>
  <li>Loading, error and empty states</li>
</ul>

<h3>Movie Details Modal</h3>

<p>
  Users can click <strong>See Details</strong> to view additional information
  about a movie or TV show.
</p>

<ul>
  <li>Poster</li>
  <li>Title</li>
  <li>Rating</li>
  <li>Premiere date</li>
  <li>Genres</li>
  <li>Summary</li>
  <li>Status</li>
  <li>Runtime</li>
  <li>Language</li>
  <li>Official website</li>
</ul>

<h2>🔎 Search Functionality</h2>

<p>
  Movie Explorer supports dynamic search using the TVMaze search API.
</p>

<ol>
  <li>The user enters a search query.</li>
  <li>A 400ms debounce prevents unnecessary API requests.</li>
  <li>Previous requests can be cancelled when a new search starts.</li>
  <li>Matching shows are retrieved from TVMaze.</li>
  <li>Results are displayed using the reusable MovieCard component.</li>
</ol>

<p>
  When the search input is cleared, the application returns to the default
  show listing.
</p>

<h2>📄 Load More</h2>

<p>
  The initial movie listing displays <strong>12 shows</strong>.
</p>

<p>
  Clicking the <strong>Load More</strong> button reveals the next 12 results.
</p>

<pre>
12 → 24 → 36 → 48 → ...
</pre>

<p>
  Additional results are displayed from the already fetched show data without
  making another API request.
</p>

<h2>♿ Accessibility</h2>

<ul>
  <li>Accessible dialog structure</li>
  <li>Keyboard focus management</li>
  <li>Focus moves into the modal when opened</li>
  <li>Tab navigation is trapped inside the modal</li>
  <li>Escape key closes the modal</li>
  <li>Focus returns to the triggering button after closing</li>
  <li>Accessible dialog labeling</li>
  <li>Keyboard-friendly mobile navigation</li>
  <li>Appropriate ARIA attributes</li>
</ul>

<h2>📱 Responsive Design</h2>

<p>
  Movie Explorer is designed to work across mobile devices, tablets,
  laptops and desktop screens.
</p>

<table>
  <thead>
    <tr>
      <th>Device</th>
      <th>Layout</th>
    </tr>
  </thead>
  <tbody>
    <tr>
      <td>📱 Mobile</td>
      <td>Single-column layout</td>
    </tr>
    <tr>
      <td>📱 Tablet</td>
      <td>Adaptive grid</td>
    </tr>
    <tr>
      <td>💻 Laptop</td>
      <td>Multi-column grid</td>
    </tr>
    <tr>
      <td>🖥️ Desktop</td>
      <td>3–4+ column grid</td>
    </tr>
  </tbody>
</table>

<h2>🚀 Getting Started</h2>

<h3>Prerequisites</h3>

<ul>
  <li>Node.js</li>
  <li>npm</li>
  <li>Git</li>
</ul>

<h3>1. Clone the Repository</h3>

<pre>
git clone https://github.com/minar-hossain82/movie-explorer.git
</pre>

<h3>2. Navigate to the Project</h3>

<pre>
cd movie-explorer
</pre>

<h3>3. Install Dependencies</h3>

<pre>
npm install
</pre>

<h3>4. Start the Development Server</h3>

<pre>
npm run dev
</pre>

<p>
  The application will be available at
  <strong>http://localhost:5173</strong>.
</p>

<h2>🏗️ Production Build</h2>

<p>Create a production build:</p>

<pre>
npm run build
</pre>

<p>Preview the production build locally:</p>

<pre>
npm run preview
</pre>

<h2>🌐 Deployment</h2>

<p>
  The project is deployed using Vercel.
</p>

<p>
  <strong>Live Website:</strong>
  <a href="https://minar-movie-explorer.vercel.app/">
    https://minar-movie-explorer.vercel.app/
  </a>
</p>

<h2>🧪 Feature Checklist</h2>

<ul>
  <li>✅ Home page</li>
  <li>✅ Responsive navigation</li>
  <li>✅ Hero section</li>
  <li>✅ Movies listing</li>
  <li>✅ Dynamic search</li>
  <li>✅ Search debounce</li>
  <li>✅ Clear search</li>
  <li>✅ Load More</li>
  <li>✅ Reusable movie cards</li>
  <li>✅ Movie details modal</li>
  <li>✅ Escape key modal close</li>
  <li>✅ Overlay modal close</li>
  <li>✅ Loading state</li>
  <li>✅ Error state</li>
  <li>✅ Empty state</li>
  <li>✅ Responsive design</li>
  <li>✅ Accessibility improvements</li>
  <li>✅ Vercel deployment</li>
</ul>

<h2>📸 Screenshots</h2>

<h3>Home Page</h3>

<p>
  Add your Home Page screenshot here.
</p>

<h3>Movies Page</h3>

<p>
  Add your Movies Page screenshot here.
</p>

<h3>Movie Details</h3>

<p>
  Add your Movie Details modal screenshot here.
</p>

<h2>📚 What I Learned</h2>

<ul>
  <li>Building React applications with Vite</li>
  <li>Creating reusable React components</li>
  <li>Managing state with React Hooks</li>
  <li>Working with REST APIs</li>
  <li>Fetching data using the Fetch API</li>
  <li>Implementing dynamic search</li>
  <li>Implementing debounced API requests</li>
  <li>Handling loading and error states</li>
  <li>Creating responsive layouts with Tailwind CSS</li>
  <li>Using React Router for navigation</li>
  <li>Building accessible modal interactions</li>
  <li>Managing request cancellation with AbortController</li>
  <li>Structuring a frontend project</li>
  <li>Using Git and GitHub for version control</li>
  <li>Deploying a React application with Vercel</li>
</ul>

<h2>👨‍💻 Author</h2>

<h3>Minar Hossain</h3>

<p>
  BSc in Computer Science & Engineering
</p>

<p>
  <a href="https://github.com/minar-hossain82">GitHub</a>
  •
  <a href="https://minar-portfolio.vercel.app/">Portfolio</a>
  •
  <a href="https://leetcode.com/u/minar-hossain/">LeetCode</a>
</p>

<h2>📄 License</h2>

<p>
  This project was created for learning and portfolio purposes.
</p>

<hr>

<div align="center">

<p>Made with ❤️ using React.js</p>

<p>⭐ If you find this project useful, consider giving it a star!</p>

</div>
