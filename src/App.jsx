import { useState, useEffect } from 'react';
import './App.css';

function App() {
  const [blogs, setBlogs] = useState([]);

  useEffect(() => {
    fetch('https://strapibackend-xvmv.onrender.com/api/blogs?populate=*')
      .then((response) => response.json())
      .then((data) => {
        const formattedBlogs = data.data.map((blog) => {
          const coverImg = `https://strapibackend-xvmv.onrender.com${blog.Image?.formats?.thumbnail?.url || blog.Image?.url || '/defaultImage.jpg'}`;
          console.log('Image URL:', coverImg); // Log the image URL
          return {
            id: blog.id,
            title: blog.Title,
            desc: blog.Description,
            coverImg,
          };
        });
        setBlogs(formattedBlogs);
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


