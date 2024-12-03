import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    // Fetch data from the Strapi API
    fetch('http://localhost:1337/api/blogs?populate=*')
      .then((response) => response.json())
      .then((data) => {
        // Map the fetched data to match the required structure
        const formattedBlogs = data.data.map((blog) => ({
          id: blog.id,
          title: blog.Title,
          desc: blog.Description,
          coverImg: `http://localhost:1337${blog.Image?.formats?.thumbnail?.url || blog.Image?.url || '/defaultImage.jpg'}` // Add image URL
        }));
        setBlogs(formattedBlogs);
        console.log(formattedBlogs);
      })
      .catch((error) => console.error('Error fetching blogs:', error));
  }, []);

  return (
    <div className="App">
      {blogs.map((blog) => (
        <div key={blog.id} className="blog-card">
          <img src={blog.coverImg} alt={blog.title} width="250px" height="100px" />
          <h1>{blog.title}</h1>
          <h6>{blog.desc}</h6>
        </div>
      ))}
    </div>
  );
}

export default App;


