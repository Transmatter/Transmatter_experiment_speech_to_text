import graphqlClient from '@/service/GraphQLClient';

const ContentDetailSerivce = () => {

    const getContentById = (id) => {
        const query = `
        query($id:String){
            getContent(id:$id){
                id
                source
                author
                title
                content
                images { url alt }
                public_date
            }
        }
        `;

        const graphql = {
            query: query,
            variables: {
                id: id
            }
        }
        return graphqlClient(graphql);
    }
    return { getContentById }
}

export default ContentDetailSerivce;