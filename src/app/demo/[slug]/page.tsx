export async function generateStaticParams() {
  // Define all slugs to statically generate at build time
  const posts = ['nextjs-introduction', 'react-tutorial', 'typescript-guide'];

  // Return an array of objects, each containing a `slug`
  return posts.map((slug) => ({
    slug,
  }));
}

export default function Page({ params }: { params: { slug: string } }) {
  return <h1>Demo : {params.slug}</h1>;
}
