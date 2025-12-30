const BASE_URL = "https://www.googleapis.com/books/v1/volumes";

export async function searchBooks(query, startIndex = 0) {
  const response = await fetch(
    `${BASE_URL}?q=${encodeURIComponent(query)}&startIndex=${startIndex}&maxResults=10`
  );

  if (!response.ok) {
    throw new Error("Ошибка запроса");
  }

  return response.json();
}

export async function getBookById(id) {
  const response = await fetch(`${BASE_URL}/${id}`);

  if (!response.ok) {
    throw new Error("Книга не найдена");
  }

  return response.json();
}
