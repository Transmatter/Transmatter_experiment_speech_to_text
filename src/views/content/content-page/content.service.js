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
    
    const getContents = (source) => {
        const query = `
        query($source:String){
            getNewsBySource(source:$source){
                id
                title
                public_date
                content
                author
            }
        }
        `;

        const graphql = {
            query: query,
            variables : {
                source: source,
            }
        }
        return graphqlClient(graphql);
    };

    const searchContent = (keyword) => {
        const query = `
        query($title:String){
	        searchNews(title:$title){
		        id
		        source
		        title
                author
                content
		        public_date
	        }
        }
        `;
        const graphql = {
            query: query,
            variables : {
                title: keyword,
            }
        }
        return graphqlClient(graphql);
    }
    return { getAllContents, getContents, searchContent};
};

export default ContentService;
