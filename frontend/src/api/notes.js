const getNotes = async (setNotes) => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/notes/list";
    const url = `${baseUrl}${endpoint}`;
    console.log(url);

    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "GET",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response", errorText);
      throw new Error(`Http Error ${response.status}:${errorText}`);
    }
    const jsonData = await response.json();
    setNotes(jsonData.notes);
  } catch (error) {
    console.error("failed to fetch notes");
  }
};

const deleteNotes = async (id, notes, setNotes) => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = `/notes/delete/${id}`;
    const url = `${baseUrl}${endpoint}`;
    console.log(url);

    const accessToken = localStorage.getItem("accessToken");
    const response = await fetch(url, {
      method: "DELETE",
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${accessToken}`,
      },
    });

    if (!response.ok) {
      const errorText = await response.text();
      console.error("Error Response", errorText);
      throw new Error(`Http Error ${response.status}:${errorText}`);
    }
    const jsonData = await response.json();
    if (jsonData.success) {
      setNotes(notes.filter((note) => note._id !== id));
    }
  } catch (error) {
    console.error("failed to fetch notes");
  }
};

export { getNotes, deleteNotes };
