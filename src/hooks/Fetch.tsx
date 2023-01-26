interface FetchProps {
  url: string;
  token: string;
  requestBody?: any;
}

export async function Get({ url, token }: FetchProps) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}${url}`, {
      method: "GET",
      credentials: "include",
      headers: { Authorization: token },
    });
    const res = await data.json();
    return { data, res };
  } catch (error) {
    return error;
  }
}

export async function Post({ url, token, requestBody }: FetchProps) {
  try {
    const data = await fetch(`${process.env.NEXT_PUBLIC_API_ROOT}${url}`, {
      method: "POST",
      credentials: "include",
      headers: {
        "Content-Type": "application/json",
        Authorization: token,
      },
      body: JSON.stringify(requestBody),
    });
    const res = await data.json();
    return { data, res };
  } catch (error) {
    return error;
  }
}
