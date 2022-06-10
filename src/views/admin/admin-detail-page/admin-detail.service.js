import graphqlClient from '@/service/GraphQLClient';

const adminDetailService = () => {
    const getAdminDetail = (id) => {
        const query = `
        query($id:Int) {
	        getUserByID(id:$id){
		        id
		        username
		        firstname
		        lastname
		        status
		        email
		        phoneNo
                status
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

    const getVerifyStatusToUser = (id,status) => {
        const query = `
        mutation($id:Int,$status:String){
	        verifyUser(id:$id,status:$status){
		        id
		        username
		        status
		        email
	        }
        }
        `;
        const graphql = {
            query: query,
            variables : {
	            id: id,
	            status: status
            }
        }
        return graphqlClient(graphql);
    }

    return { getAdminDetail , getVerifyStatusToUser};
}
export default adminDetailService;