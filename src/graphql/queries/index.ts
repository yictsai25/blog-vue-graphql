import { graphql } from '@/graphql/generated'

export const gqlGetAllPosts = graphql(`
    query getAllPost {
        posts {
            data {
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
