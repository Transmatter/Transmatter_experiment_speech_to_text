import graphqlClient from "@/service/GraphQLClient";

const ContentService = () => {
    const getAllContents = () => {
        const query = `
        query {
            getAllContents{
                id
                source
                author
                title
                content
                public_date
            }
        }
        `;

        const graphql = {
            query: query
        }
        return graphqlClient(graphql);
    };

    return { getAllContents }
}

export default ContentService;
