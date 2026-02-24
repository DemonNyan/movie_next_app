import { Badge } from "@/components/ui/badge";
import Persons from "../../components/Persons";

const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;

// ၁။ Movie အတွက် Interface သတ်မှတ်ပါ (Build error ကင်းဝေးစေရန်)
interface Genre {
  id: number;
  name: string;
}

interface MovieData {
  id: number;
  title: string;
  release_date: string;
  backdrop_path: string;
  overview: string;
  genres: Genre[];
  success?: boolean;
}

async function fetchMovie(id: string | number): Promise<MovieData> {
  const res = await fetch(`https://api.themoviedb.org/3/movie/${id}`, {
    headers: { Authorization: `Bearer ${token}` },
    next: { revalidate: 3600 }, // Cache သတ်မှတ်ခြင်း
  });

  if (!res.ok) {
    throw new Error("Failed to fetch movie");
  }

  return await res.json();
}

export default async function Movie({
  params,
}: {
  params: Promise<{ id: string }>;
}) {
  const resolvedParams = await params;
  const id = resolvedParams.id;
  const movie = await fetchMovie(id);

  const cover = "http://image.tmdb.org/t/p/w1280";

  // API က data မပြန်ပေးတဲ့အခါ စစ်ဆေးခြင်း
  if (!movie || movie.success === false) {
    return <div className="p-10 text-center">Movie not found.</div>;
  }

  const releaseYear = movie.release_date
    ? movie.release_date.split("-")[0]
    : "N/A";

  return (
    <>
      <h2 className="text-2xl font-bold">
        {movie.title}
        <span className="ml-2 text-gray-500">({releaseYear})</span>
      </h2>

      <div className="mb-4 mt-2 flex flex-wrap gap-2">
        {movie.genres &&
          movie.genres.map((genre) => (
            // variant="outline" လို့ စာလုံးပေါင်းပြင်ပေးထားပါတယ်
            <Badge key={genre.id} variant="outline">
              {genre.name}
            </Badge>
          ))}
      </div>

      {/* alt tag ထည့်ပေးခြင်းဖြင့် accessibility error ကို ဖြေရှင်းပါ */}
      <img
        src={cover + movie.backdrop_path}
        alt={movie.title}
        className="rounded-lg shadow-md"
      />

      <p className="mt-5 text-lg leading-relaxed">{movie.overview}</p>

      <div className="mt-8">
        <h3 className="font-bold border-b mb-4 pb-2 text-xl">Starring</h3>
        {/* Persons component ထဲမှာ movie data သုံးထားရင် အခုလို ပို့ပေးနိုင်ပါတယ် */}
        <Persons movie={movie} />
      </div>
    </>
  );
}
