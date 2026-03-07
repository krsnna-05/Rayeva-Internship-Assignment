import type { ProductItem } from "@/lib/dummy-products";

type ProductListResponse = {
  page: number;
  limit: number;
  total: number;
  totalPages: number;
  data: ProductItem[];
};

type CreateProductPayload = {
  name: string;
  description: string;
};

type CreateProductResponse = {
  message: string;
  product: ProductItem;
};

type DeleteProductResponse = {
  message: string;
  product: ProductItem;
};

const PRODUCTS_API_PATH = "/api/v1/products";

const extractErrorMessage = async (response: Response) => {
  try {
    const body = (await response.json()) as {
      error?: string;
      message?: string;
    };
    return body.error ?? body.message ?? "Request failed";
  } catch {
    return "Request failed";
  }
};

const listProducts = async (page = 1, limit = 6) => {
  const response = await fetch(
    `${PRODUCTS_API_PATH}?page=${page}&limit=${limit}`,
  );

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  return (await response.json()) as ProductListResponse;
};

const getProduct = async (id: string) => {
  const response = await fetch(`${PRODUCTS_API_PATH}/${id}`);

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  return (await response.json()) as ProductItem;
};

const createProduct = async (payload: CreateProductPayload) => {
  const response = await fetch(PRODUCTS_API_PATH, {
    method: "POST",
    headers: {
      "Content-Type": "application/json",
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  return (await response.json()) as CreateProductResponse;
};

const removeProduct = async (id: string) => {
  const response = await fetch(`${PRODUCTS_API_PATH}/${id}`, {
    method: "DELETE",
  });

  if (!response.ok) {
    throw new Error(await extractErrorMessage(response));
  }

  return (await response.json()) as DeleteProductResponse;
};

export { createProduct, getProduct, listProducts, removeProduct };
