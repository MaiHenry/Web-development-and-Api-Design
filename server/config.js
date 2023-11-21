// Fetch JSON data from URL
async function fetchJSON(url, options) {
    const res = await fetch(url, options);
    if (!res.ok) {
      throw new Error(`Failed ${res.status}`);
    }
    return await res.json();
  }
  
  // Fetch Google OpenID config
  export async function googleConfig() {
    const discovery_endpoint = "https://accounts.google.com/.well-known/openid-configuration";
    const client_id = process.env.GOOGLE_CLIENT_ID;
    const { userinfo_endpoint, authorization_endpoint } = await fetchJSON(discovery_endpoint);
    return {
      response_type: "token",
      authorization_endpoint,
      scope: "profile email",
      userinfo_endpoint,
      client_id,
    };
  }
  
  // Fetch Microsoft config
  export async function microsoftConfig() {
    const discovery_endpoint = "https://login.microsoftonline.com/common/v2.0/.well-known/openid-configuration";
    const client_id = process.env.MICROSOFT_CLIENT_ID;
    const redirect_uri = process.env.REDIRECT_URI;
    const { userinfo_endpoint, authorization_endpoint, token_endpoint } = await fetchJSON(discovery_endpoint);
    return {
      response_type: "code",
      authorization_endpoint,
      userinfo_endpoint,
      token_endpoint,
      client_id,
      scope: "openid email profile",
      code_challenge_method: "S256",
      redirect_uri: redirect_uri
    };
  }
  
  // Fetch user information using an access token and OpenID config
  export async function fetchUser(access_token, config) {
    const userinfo = await fetch(config.userinfo_endpoint, {
      headers: {
        Authorization: `Bearer ${access_token}`,
      },
    });
    if (userinfo.ok) {
      return await userinfo.json();
    } else {
      console.log(`Failed to fetch user info: ${userinfo.status}`);
      return undefined;
    }
  }
  