import React from "react";
import { GetStaticProps, GetStaticPaths } from "next";
import Layout from "../../components/common/Layout";
import { getAllPosts, getPostBySlug } from "../../utils/markdown";
import { Post } from "../../types";

interface PostPageProps {
  post: Post;
}

const PostPage: React.FC<PostPageProps> = ({ post }) => {
  if (!post) {
    return (
      <Layout title="Post Not Found" description="The post you're looking for could not be found.">
        <div className="container">
          <h1>Post Not Found</h1>
          <p>The post you're looking for could not be found.</p>
        </div>
      </Layout>
    );
  }

  return (
    <Layout
      title={post.title}
      description={post.description}
    >
      <article className="post-detail">
        <div className="container">
          <header className="post-header">
            <h1>{post.title}</h1>
            <div className="post-meta">
              <time className="post-date">
                {new Date(post.date).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                })}
              </time>
              <div className="post-tags">
                {post.tags && post.tags.map((tag) => (
                  <span key={tag} className="tag">
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          </header>

          {post.image && (
            <div className="post-image">
              <img src={post.image} alt={post.title} />
            </div>
          )}

          <div
            className="post-content"
            dangerouslySetInnerHTML={{ __html: post.contentHtml || "" }}
          />
        </div>
      </article>
    </Layout>
  );
};

export const getStaticPaths: GetStaticPaths = async () => {
  try {
    const posts = getAllPosts();
    const paths = posts.map((post) => ({
      params: { slug: post.slug },
    }));

    return {
      paths,
      fallback: 'blocking',
    };
  } catch (error) {
    console.error(`Error in getStaticPaths: ${error}`);
    return {
      paths: [],
      fallback: 'blocking',
    };
  }
};

export const getStaticProps: GetStaticProps = async ({ params }) => {
  try {
    const slug = params?.slug as string;
    const post = await getPostBySlug(slug);

    return {
      props: {
        post,
      },
      revalidate: 60, // Revalidate every 60 seconds
    };
  } catch (error) {
    console.error(`Error in getStaticProps: ${error}`);
    return {
      notFound: true,
    };
  }
};

export default PostPage;