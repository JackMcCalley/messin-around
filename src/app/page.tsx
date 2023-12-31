import { prisma } from "@/db";
import Link from "next/Link";
import { TodoItem } from "@/components/TodoItem";

function getTodos() {
  return prisma.todo.findMany();
}

async function toggleTodo(id: string, complete: boolean) {
  "use server";
  await prisma.todo.update({ where: { id }, data: { complete } });
}


export default async function Home() {
  const todos = await getTodos();
  return (
    <>
      <header className="flex justify-between items-center mb-4">
        <h1 className="text-2xl">Todos</h1>
        <Link
          className="border border-slate-300 text-slate-300 px-2 py-1 rounded hover:bg-slate-700 focus-within:bg-slate-700 outline-none"
          href="/new"
        >
          New
        </Link>
      </header>
      <p>
        This project is just me getting my feet wet with Next.js server components.<br/>
        I take no credit, all credit goes to Kyle at{" "}
        <a className="text-violet-700" href="https://www.youtube.com/@WebDevSimplified" target="_blank">
          Web Dev Simplified
        </a>{" "}
        on Youtube.<br/>
      </p>
      <ul className="p1-4">
        {todos.map((todo) => (
          <TodoItem key={todo.id} {...todo} toggleTodo={toggleTodo} />
        ))}
      </ul>
    </>
  );
}
