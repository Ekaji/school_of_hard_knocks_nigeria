import React, { useRef, useState } from "react";
import { getPostBySlug, getAllPosts } from "../../utils/api";
import ContentSection from "../../components/ContentSection";
import Head from "next/head";
import Button from "../../components/Button";
import BlogEditor from "../../components/BlogEditor";
import { useRouter } from "next/router";

const BlogPost = ({ post }) => {
  const [showEditor, setShowEditor] = useState(false);
  const router = useRouter();

  return (
    <>
      <Head>
        <title>{"Blog - " + post.title}</title>
        <meta name="description" content={post.preview} />
      </Head>
       {/* <Cursor /> */}
      {/* {!showEditor && ( */}
        <>
            `<div
              className={`container mx-auto mt-10`}
            >
              {/* <Header isBlog={true} /> */}
              <div className="mt-10 flex flex-col ">
                  <h1
                    // ref={textOne}
                    className="mt-10 text-4xl mob:text-2xl laptop:text-6xl text-bold text-blue-900 m-12 "
                    style={{padding: '20px'}}
                  >
                    {post.title}
                  </h1>
                <img
                  className="w-full  rounded-lg shadow-lg object-cover"
                  src={post.image}
                  alt={post.title}
                ></img>
   
              </div>
              <ContentSection content={post.content}></ContentSection>
              {/* <Footer /> */}
            </div>
            {process.env.NODE_ENV === "development" && (
              <div className="fixed bottom-6 right-6" onClick={() => setShowEditor(true)}>
                <Button type={"primary"} text='Edit this blog' />
              </div>
            )}
`        </>

       {/* ) } */}

      {showEditor && (
        <BlogEditor
          post={post}
          close={() => setShowEditor(false)}
          refresh={() => router.reload(window.location.pathname)}
        />
      )}
    </>
  );
};

export async function getStaticProps({ params }) {
  const post = getPostBySlug(params.slug, [
    "date",
    "slug",
    "preview",
    "title",
    "tagline",
    "preview",
    "image",
    "content",
  ]);

  return {
    props: {
      post: {
        ...post,
      },
    },
  };
}

export async function getStaticPaths() {
  const posts = getAllPosts(["slug"]);

  return {
    paths: posts.map((post) => {
      return {
        params: {
          slug: post.slug,
        },
      };
    }),
    fallback: false,
  };
}
export default BlogPost;
