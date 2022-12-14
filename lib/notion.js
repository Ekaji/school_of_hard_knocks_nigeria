import {Client} from "@notionhq/client";
// import { NotionToMarkdown } from "notion-to-md";
// import { BlogPost } from "../@types/schema";


const notion = new Client({auth: process.env.NOTION_ACCESS_TOKEN});


export const getDatabase = async (databaseId, filterBySection ) => {
    const response = await notion.databases.query({
        database_id: databaseId,
        filter: {
            'and': [
                {
                    property: "Published",
                    checkbox: {
                        equals: true
                    }
                }, 
                {
                    property: "Category",
                    select: {
                        equals: filterBySection
                    }
                }
            ]
        },
        sorts: [
            {
                property: 'Created',
                direction: 'descending'
            }
        ]
    });
    return response.results;
};

export const getPage = async (pageId) => {
    const response = await notion.pages.retrieve({page_id: pageId});
    return response;
};

export const getBlocks = async (blockId) => {
    const blocks = [];
    let cursor;
    while (true) {
        const {results, next_cursor}  = await notion.blocks.children.list({start_cursor: cursor, block_id: blockId});
        blocks.push(...results);
        if (!next_cursor) {
            break;
        }
        cursor = next_cursor;
    }
    return blocks;
};
