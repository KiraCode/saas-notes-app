const getTenant = async (setTenants) => {
  try {
    const baseUrl = import.meta.env.VITE_APP_API_BASE_URL;
    const endpoint = "/tenants/list";
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
    setTenants(jsonData.tenants);
  } catch (error) {
    console.error("failed to fetch tenants");
  }
};

export { getTenant };
