const newPostFormHandler = async (event) => {
    event.preventDefault();
  
    // Get the title and content from the form
    const title = document.querySelector('#post-title').value.trim();
    const content = document.querySelector('#post-content').value.trim();
  
    if (title && content) {
      // Send a POST request to create a new post
      const response = await fetch('/api/posts', {
        method: 'POST',
        body: JSON.stringify({ title, content }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.replace('/dashboard');
      } else {
        alert('Failed to create a new post.');
      }
    }
  };
  
  document.addEventListener('DOMContentLoaded', () => {
    const newPostForm = document.querySelector('.new-post-form');
    if (newPostForm) {
      newPostForm.addEventListener('submit', newPostFormHandler);
    }
  });