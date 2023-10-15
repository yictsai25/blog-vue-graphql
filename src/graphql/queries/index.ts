import { graphql } from '@/graphql/generated'

export const gqlGetPostsPerPage = graphql(`
    query getPostsPerPage(
        $options: PageQueryOptions
    ) {
        posts(options: $options) {
            data {
                id
                title
                body
                user {
                    id
                    name
                    email
                }
            }
            meta {
                totalCount
            }
        }
    }
`)

export const gqlGetPost = graphql(`
    query getPost($postId: ID!) {
        post(id: $postId) {
            id
            title
            body
            user {
                id
                name
                email
            }
            comments {
                data {
                    id
                    name
                    email
                    body
                }
            }
        }
    }
`)
