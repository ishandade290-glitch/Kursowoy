import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { searchSchema } from "../schemas/searchSchema";


function SearchForm({ onSearch }) {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm({
    resolver: zodResolver(searchSchema),
  });

  return (
    <form onSubmit={handleSubmit(data => onSearch(data.query))}>
      <input {...register("query")} />
      {errors.query && <p>{errors.query.message}</p>}
      <button type="submit">Поиск</button>
    </form>
  );
}
export default SearchForm