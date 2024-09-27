export const sampleBlog = {
  id: 1,
  title: "The Beauty of MERN Stack Development",
  content: `
      <p>In the world of web development, the MERN stack has become a powerhouse for creating full-stack applications. 
      Comprising MongoDB, Express.js, React, and Node.js, the MERN stack is ideal for developers seeking a unified 
      JavaScript-based development experience. In this post, we’ll dive into the strengths of each technology and why 
      the MERN stack is so widely embraced.</p>
      <p>MongoDB offers flexibility in storing data as documents, while Express.js simplifies building web applications 
      on the backend. With React's component-based architecture, developers can create dynamic, responsive user 
      interfaces. Finally, Node.js ensures that everything runs smoothly on the server side. Together, these tools make 
      the MERN stack a powerful choice for modern web development.</p>`,
  image: "https://via.placeholder.com/800x400", // Sample image URL
  author: "John Doe",
  createdAt: "2024-09-25",
};

// Sample related posts
export const sampleRelatedPosts = [
  {
    id: 2,
    title: "Why React is the Future of Frontend Development",
    excerpt:
      "Learn why React is considered one of the best frameworks for building user interfaces...",
    image: "https://via.placeholder.com/300", // Sample image URL
  },
  {
    id: 3,
    title: "Mastering Node.js for Backend Development",
    excerpt:
      "Node.js is an essential part of the MERN stack. This guide will help you master it...",
    image: "https://via.placeholder.com/300", // Sample image URL
  },
];

// Sample comments
export const sampleComments = [
  {
    id: 1,
    content:
      "Great post! MERN is definitely one of my favorite stacks for web development.",
    author: "Jane Smith",
    createdAt: "2024-09-26",
  },
  {
    id: 2,
    content:
      "Thanks for the insights, I found the comparison between Express.js and other backend frameworks very useful.",
    author: "Mark Lee",
    createdAt: "2024-09-27",
  },
];
