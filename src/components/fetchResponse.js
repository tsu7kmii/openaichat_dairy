export async function fetchResponse(userInput) {
    try {
      const response = await fetch('/api/chat', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ message: userInput }),
      });
      const data = await response.json();
      if (data && data.reply) {
        return data.reply;
      }
    } catch (error) {
      console.error('Error fetching response:', error);
    }
    return '';
  }
  