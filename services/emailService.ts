// Send to backend API endpoint
const backendUrl = getBackendUrl();
console.log("Using backend URL:", `${backendUrl}/send`);

const response = await fetch(`${backendUrl}/send`, {