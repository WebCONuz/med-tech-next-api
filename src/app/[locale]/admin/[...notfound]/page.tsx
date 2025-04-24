import { notFound } from "next/navigation";

export default function CatchAllAdminPage() {
  notFound(); // bu avtomatik not-found sahifaga redirect qiladi
}
