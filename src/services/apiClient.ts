export async function apiGet<T>(url: string): Promise<T> {
  const response = await fetch(url);

  if (!response.ok) {
    throw new Error(`Error al consultar la API: ${response.status}`);
  }

  return (await response.json()) as T;
}

export async function apiPost<T>(url: string, payload: Record<string, unknown>): Promise<T> {
  const response = await fetch(url, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(`Error al enviar la solicitud: ${response.status}`);
  }

  return (await response.json()) as T;
}
