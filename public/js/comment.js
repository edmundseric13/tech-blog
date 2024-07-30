const commentFormHandler = async (event) => {
    event.preventDefault();
  
    const commentText = document.querySelector('#comment-text').value.trim();
    const postId = window.location.toString().split('/')[
      window.location.toString().split('/').length - 1
    ];
  
    if (commentText) {
      const response = await fetch('/api/comments', {
        method: 'POST',
        body: JSON.stringify({ comment_text: commentText, post_id: postId }),
        headers: { 'Content-Type': 'application/json' },
      });
  
      if (response.ok) {
        document.location.reload();
      } else {
        alert('Failed to add comment.');
      }
    }
  };
  
  document
    .querySelector('#comment-form')
    .addEventListener('submit', commentFormHandler);