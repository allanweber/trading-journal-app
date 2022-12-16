export async function readErrors(rawResponse) {
  if (rawResponse.status === 401) {
    const error = await rawResponse.json();
    throw new Error(error.error);
  }
  const response = await rawResponse.json();

  if (response.error) {
    return response.error;
  } else if (response.errors) {
    const message = response.errors.join('\n');
    return message;
  }
}
