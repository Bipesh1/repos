import { getBlogBySlug } from "@/app/(protected)/actions/blog";
import BlogDetailClient from "@/components/blogdetail";

export async function generateMetadata({ params }:{
  params:any
}) {
  const slug = params.slugandId;
  const response = await getBlogBySlug(slug);
  const blog = response?.data;

  if (!blog) {
    return {
      title: "Blog Not Found | GoingCollege",
      description: "The requested blog could not be found.",
    };
  }

  return {
    title: `${blog.title} | GoingCollege Blog`,
    description: blog.content?.slice(0, 150)?.replace(/<[^>]*>?/gm, "") || "Read this blog on GoingCollege.",
    openGraph: {
      title: `${blog.title} | GoingCollege Blog`,
      description: blog.content?.slice(0, 150)?.replace(/<[^>]*>?/gm, ""),
      images: blog.images?.length ? [{ url: blog.images[0].url }] : [],
    },
    twitter: {
      card: "summary_large_image",
      title: `${blog.title} | GoingCollege Blog`,
      description: blog.content?.slice(0, 150)?.replace(/<[^>]*>?/gm, ""),
      images: blog.images?.length ? [blog.images[0].url] : [],
    },
  };
}

export default async function BlogDetailPage({ params }) {
  const slugandId = params.slugandId;
  
  // Pre-fetch the blog data on the server
  const response = await getBlogBySlug(slugandId);
  const blogData = response?.data || null;

  return <BlogDetailClient initialBlog={blogData} slugandId={slugandId} />;
}