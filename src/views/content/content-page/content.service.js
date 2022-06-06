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
    
    const getThairathContents = () => {
        const query = `
        query($source:String){
            getNewsBySource(source:$source){
                id
                title
                public_date
                author
            }
        }
        `;

        const graphql = {
            query: query,
            variables : {
                source: "ไทยรัฐออนไลน์"
            }
        }
        return graphqlClient(graphql);
    };

    const getSanookContents = () => {
        const query = `
        query($source:String){
            getNewsBySource(source:$source){
                id
                title
                public_date
                author
            }
        }
        `;

        const variables = {
            source: "sanook"
        }
        const graphql = {
            query: query,
            variables : variables
        }
        return graphqlClient(graphql);
    };

    const getDekDContents = () => {
        const query = `
        query($source:String){
            getNewsBySource(source:$source){
                id
                title
                public_date
                author
            }
        }
        `;

        const variables = {
            source: "dek-d"
        }
        const graphql = {
            query: query,
            variables : variables
        }
        return graphqlClient(graphql);
    }; 

    const getOtherContents = () => {
        const query = `
        query($source:String){
            getNewsBySource(source:$source){
                id
                title
                public_date
                author
            }
        }
        `;

        const variables = {
            source: "normal people"
        }
        const graphql = {
            query: query,
            variables : variables
        }
        return graphqlClient(graphql);
    };
    return { getAllContents, getThairathContents, getSanookContents, getDekDContents, getOtherContents };

}

export default ContentService;
