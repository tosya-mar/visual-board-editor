import { http } from "../http";
import type { ApiSchemas } from "@shared/api/schema";
import { verifyTokenOrThrow } from "./session";
import { delay, HttpResponse } from "msw";

const boards: ApiSchemas["Board"][] = Array.from({ length: 1000 }, (_, index) => {
  const createdAt = new Date(Date.now() - index * 1000 * 60 * 60 * 24);
  const updatedAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 12);
  const lastOpenedAt = new Date(createdAt.getTime() + 1000 * 60 * 60 * 24);

  return {
    id: crypto.randomUUID(),
    name: `Board ${index + 1}`,
    createdAt: createdAt.toISOString(),
    updatedAt: updatedAt.toISOString(),
    lastOpenedAt: lastOpenedAt.toISOString(),
    isFavorite: index % 5 === 0,
  };
});

// TODO: remove this later
boards.push({
  id: "const-id",
  name: "Board const-id",
  createdAt: new Date().toISOString(),
  updatedAt: new Date().toISOString(),
  lastOpenedAt: new Date().toISOString(),
  isFavorite: false,
});

export const handlers = [
  http.get("/boards", async ({ request, query, response }) => {
    await verifyTokenOrThrow(request);
    await delay(200);
    
    const page = Number(query.get("page") || 1);
    const limit = Number(query.get("limit") || 20);
    const sort = query.get("sort") || "createdAt";
    const search = query.get("search") || "";
    let filteredBoards = [...boards];

    if (query.has("isFavorite")) {
      const isFavorite = query.get("isFavorite") === "true";
      filteredBoards = filteredBoards.filter(
        (board) => board.isFavorite === isFavorite,
      );
    }

    if (search) {
      const normalizedSearch = search.toLowerCase();
      filteredBoards = filteredBoards.filter((board) =>
        board.name.toLowerCase().includes(normalizedSearch),
      );
    }

    filteredBoards.sort((a, b) => {
      if (sort === "name") {
        return a.name.localeCompare(b.name);
      }

      return new Date(b[sort]).getTime() - new Date(a[sort]).getTime();
    });

    const total = filteredBoards.length;
    const totalPages = Math.max(1, Math.ceil(total / limit));
    const start = (page - 1) * limit;
    const paginatedBoards = filteredBoards.slice(start, start + limit);

    return HttpResponse.json({
      boards: paginatedBoards,
      total,
      totalPages,
    }, { status: 200 });
  }),

  http.get("/boards/{boardId}", async ({ request, params }) => {
    await verifyTokenOrThrow(request);
    await delay(200);

    const board = boards.find((board) => board.id === params.boardId);

    if (!board) {
      return HttpResponse.json({
        message: "Board not found",
        code: "NOT_FOUND",
      }, { status: 404 });
    }

    return HttpResponse.json(board, { status: 200 });
  }),

  http.post("/boards", async ({ request }) => {
    await verifyTokenOrThrow(request);
    const nowDate = new Date().toISOString();
    await delay(200);

    const board: ApiSchemas["Board"] = {
      id: crypto.randomUUID(),
      name: "Untitled",
      createdAt: nowDate,
      updatedAt: nowDate,
      lastOpenedAt: nowDate,
      isFavorite: false,
    };

    boards.push(board);
    return HttpResponse.json(board, { status: 201 });
  }),

  http.put("/boards/{boardId}/favorite", async ({ request, params }) => {
    await verifyTokenOrThrow(request);
    await delay(200);

    const boardIndex = boards.findIndex((board) => board.id === params.boardId);
    const board = boards[boardIndex];

    if (!board) {
      return HttpResponse.json({
        message: "Board not found",
        code: "NOT_FOUND",
      }, { status: 404 });
    }

    const body = await request.json();


    if('isFavorite' in body) {
      board.isFavorite = body.isFavorite;
    }

    const updatedBoard: ApiSchemas["Board"] = {
      ...board,
      updatedAt: new Date().toISOString(),
    };

    boards[boardIndex] = updatedBoard;
    return HttpResponse.json(updatedBoard, { status: 201 });
  }),


  http.put("/boards/{boardId}/rename", async ({ request, params }) => {
    await verifyTokenOrThrow(request);
    await delay(200);

    const boardIndex = boards.findIndex((board) => board.id === params.boardId);
    const board = boards[boardIndex];

    if (!board) {
      return HttpResponse.json({
        message: "Board not found",
        code: "NOT_FOUND",
      }, { status: 404 });
    }

    const body = await request.json();


    if('name' in body) {
      board.name = body.name;
    }

    const updatedBoard: ApiSchemas["Board"] = {
      ...board,
      updatedAt: new Date().toISOString(),
    };

    boards[boardIndex] = updatedBoard;
    return HttpResponse.json(updatedBoard, { status: 201 });
  }),

  http.delete("/boards/{boardId}", async ({ request, params }) => {
    await verifyTokenOrThrow(request);
    await delay(200);

    const boardIndex = boards.findIndex((board) => board.id === params.boardId);

    if (boardIndex === -1) {
      return HttpResponse.json({
        message: "Board not found",
        code: "NOT_FOUND",
      }, { status: 404 });
    }

    boards.splice(boardIndex, 1);
    return HttpResponse.json(null, { status: 204 });
  })
];
