"use server"
export const addCategory = async (name) => {
    const response = await fetch(`http://localhost:3000/api/add-category`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ name }),
    });
    console.log(name)
    const data = await response.json();
    return response.status === 201;
  };
  