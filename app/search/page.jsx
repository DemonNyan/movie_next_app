import Movies from "../components/Movies";

const token = process.env.NEXT_PUBLIC_TMDB_API_KEY;

async function fetchSearch(query) {
  const res = await fetch(
    `https://api.themoviedb.org/3/search/multi?query=${encodeURIComponent(query)}`,
    {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    },
  );
  return await res.json();
}

// Type definitions (: { ... }) တွေကို ဖယ်လိုက်ပါပြီ
export default async function Search({ searchParams }) {
  // 1. searchParams က Promise ဖြစ်လို့ await အရင်လုပ်ရပါမယ်
  const resolvedSearchParams = await searchParams;
  const q = resolvedSearchParams.q;

  if (!q) {
    return <p className="p-10 text-center">ရှာချင်သော အမည်ကို ရိုက်ထည့်ပါ။</p>;
  }

  const search = await fetchSearch(q);
  const filteredMovies = search.results.filter(
    (item) => item.media_type === "movie" || item.media_type === "tv",
  );

  return (
    <div className="p-4">
      <h3 className="font-bold border-b mb-4 pb-2">
        Search Results for: <span className="text-blue-500">{q}</span>
      </h3>

      {search.results && search.results.length > 0 ? (
        <Movies movies={filteredMovies} />
      ) : (
        <p className="mt-4 text-gray-500 text-center">
          {`"${q}" နဲ့ ပတ်သက်တာ ဘာမှ ရှာမတွေ့ပါ။`}
        </p>
      )}
    </div>
  );
}
