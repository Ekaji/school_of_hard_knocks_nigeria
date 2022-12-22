/* eslint-disable react/jsx-key */
// import { GetStaticProps } from 'next';
import React from 'react'
import { getDatabase } from '../../lib/notion';
import { Text } from './[id]';
import Link from 'next/link';

const databaseId = process.env.NOTION_BLOG_DATABASE_ID || ""

export const getStaticProps = async () => {
  const newsletter = await getDatabase(databaseId, 'newsletter');

  return {
    props: {
      posts: newsletter,
    }
  };
};

export default function Newsletters({ posts } ) {
    console.log(posts[0].properties.excerpt.rich_text, '<>' )
  return (
    <div className=' bg-white '>
        <div className="pt-32 pb-32 flex flex-col gap-4 items-center justify-center">
            {
            posts.map((post , i ) => (
                <Link href={`${post.properties.externalURL.url}`}  >
                  <a className="rounded-sm w-10/12 lg:w-1/2 grid grid-cols-12  bg-gray-200 shadow p-3 gap-2 items-center hover:shadow-lg transition delay-150 duration-300 ease-in-out hover:scale-105 transform">
                    {/* <!-- Title --> */}
                    <div className="col-span-11 xl:ml-5">
                    <p className="text-blue-600 font-semibold"> 
                        <Text text={post.properties.Name.title} />
                    </p>
                    </div>
                    
                    {/* <!-- Description --> */}

                    <div className=" col-span-11 xl:ml-5">
                        <p className="text-sm text-gray-800 font-light "> 
                            <Text text={post.properties.excerpt.rich_text} />
                        </p>
                    </div>
                  </a>
                    
                </Link >
            ))
            }
        </div>
    </div>
  )
}
